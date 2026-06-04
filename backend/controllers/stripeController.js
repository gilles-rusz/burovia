const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const {
  getProductsByIds,
  createPendingOrderWithItems,
  getOrderById,
  getOrderItems,
  markOrderAsPaid,
  updateOrderStatus
} = require('../services/orderService');

const { sendOrderConfirmation } = require('../services/emailService');
const cjService = require('../services/cjService');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Panier vide ou invalide.'
      });
    }

    const productIds = items.map((item) => Number(item.id));
    const products = await getProductsByIds(productIds);

    const lineItems = [];
    const orderItems = [];
    let totalAmountCents = 0;

    for (const item of items) {
      const productId = Number(item.id);
      const quantity = Number(item.quantity);

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
          success: false,
          error: 'Produit invalide.'
        });
      }

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
        return res.status(400).json({
          success: false,
          error: 'La quantité doit être comprise entre 1 et 10.'
        });
      }

      const product = products.find((p) => p.id === productId);

      if (!product) {
        return res.status(400).json({
          success: false,
          error: `Produit introuvable ou inactif : ${productId}`
        });
      }

      totalAmountCents += product.price_cents * quantity;

      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name
          },
          unit_amount: product.price_cents
        },
        quantity
      });

      orderItems.push({
        product_id: product.id,
        supplier_id: product.supplier_id,
        supplier_vid: product.supplier_vid,
        name: product.name,
        quantity,
        unit_price_cents: product.price_cents,
        cost_price_cents: product.cost_price_cents
      });
    }

    const order = await createPendingOrderWithItems({
      totalAmountCents,
      items: orderItems
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,

      client_reference_id: String(order.id),
      metadata: {
        order_id: String(order.id)
      },

      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,

      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'LU']
      },

      phone_number_collection: {
        enabled: true
      }
    });

    return res.json({
      success: true,
      id: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('Erreur création session Stripe :', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Erreur lors de la création de la session Stripe.'
    });
  }
};

exports.handleStripeWebhook = async (req, res) => {
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Erreur signature webhook Stripe :', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      if (session.payment_status !== 'paid') {
        console.log('Session reçue mais paiement non confirmé.');
        return res.json({ received: true });
      }

      const orderId = session.metadata?.order_id || session.client_reference_id;

      if (!orderId) {
        console.error('Aucun order_id trouvé dans la session Stripe.');
        return res.json({ received: true });
      }

      const order = await getOrderById(orderId);

      if (!order) {
        console.error(`Commande introuvable en base : ${orderId}`);
        return res.json({ received: true });
      }

      if (order.status === 'paid') {
        console.log(`Commande ${orderId} déjà marquée comme payée.`);
        return res.json({ received: true });
      }

      const shipping = session.shipping_details;
      const customer = session.customer_details;

      const paidData = {
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent,
        customer_email: customer?.email || null,
        customer_name: shipping?.name || customer?.name || null,
        customer_phone: customer?.phone || null,
        shipping_address_line1: shipping?.address?.line1 || null,
        shipping_address_line2: shipping?.address?.line2 || null,
        shipping_city: shipping?.address?.city || null,
        shipping_postal_code: shipping?.address?.postal_code || null,
        shipping_country_code: shipping?.address?.country || null
      };

      await markOrderAsPaid(orderId, paidData);

      console.log(`Commande ${orderId} passée en statut paid.`);

      let items = [];
      try {
        items = await getOrderItems(orderId);
      } catch (itemsError) {
        console.error('Erreur récupération items commande :', itemsError.message);
      }

      try {
        await sendOrderConfirmation({
          id: orderId,
          customer_email: paidData.customer_email,
          customer_name: paidData.customer_name,
          total_amount_cents: order.total_amount_cents,
          items,
          shipping_address_line1: paidData.shipping_address_line1,
          shipping_city: paidData.shipping_city,
          shipping_postal_code: paidData.shipping_postal_code,
          shipping_country_code: paidData.shipping_country_code,
        });
      } catch (emailError) {
        console.error('Erreur envoi email confirmation (non bloquant) :', emailError.message);
      }

      try {
        const cjItems = items.filter((i) => i.supplier_vid);

        if (cjItems.length > 0) {
          const cjOrderPayload = {
            orderNumber: `BUROVIA-${orderId}`,
            shippingCountry: paidData.shipping_country_code,
            shippingZip: paidData.shipping_postal_code,
            shippingPhone: paidData.customer_phone,
            shippingCustomerName: paidData.customer_name,
            shippingAddress: paidData.shipping_address_line1,
            shippingAddress2: paidData.shipping_address_line2 || '',
            shippingCity: paidData.shipping_city,
            products: cjItems.map((i) => ({
              vid: i.supplier_vid,
              quantity: i.quantity
            }))
          };

          const cjResult = await cjService.createOrder(cjOrderPayload);
          console.log(`Commande CJ créée pour commande ${orderId} :`, JSON.stringify(cjResult));

          await updateOrderStatus(orderId, 'supplier_pending');
          console.log(`Commande ${orderId} passée en statut supplier_pending.`);
        }
      } catch (cjError) {
        console.error(`Erreur création commande CJ (non bloquant) :`, cjError.message);
      }
    }

    return res.json({ received: true });

  } catch (error) {
    console.error('Erreur traitement webhook Stripe :', error);
    return res.status(500).json({ received: false });
  }
};