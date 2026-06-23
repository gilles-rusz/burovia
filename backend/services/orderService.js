const pool = require('../config/db');

exports.getProductsByIds = async (ids) => {
  if (!ids.length) return [];

  const result = await pool.query(
    `
    SELECT 
      id,
      sku,
      supplier_id,
      supplier_product_id,
      supplier_vid,
      name,
      slug,
      price_cents,
      cost_price_cents,
      is_active,
      is_dropshipping
    FROM products
    WHERE id = ANY($1::int[])
    AND is_active = TRUE
    `,
    [ids]
  );

  return result.rows;
};

exports.createPendingOrderWithItems = async ({ totalAmountCents, items }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const orderResult = await client.query(
      `
      INSERT INTO orders (
        status,
        total_amount_cents
      ) VALUES ($1, $2)
      RETURNING id
      `,
      ['pending_payment', totalAmountCents]
    );

    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await client.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          supplier_id,
          supplier_vid,
          name,
          quantity,
          unit_price_cents,
          cost_price_cents
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [
          orderId,
          item.product_id,
          item.supplier_id,
          item.supplier_vid,
          item.name,
          item.quantity,
          item.unit_price_cents,
          item.cost_price_cents
        ]
      );
    }

    await client.query('COMMIT');

    return {
      id: orderId,
      total_amount_cents: totalAmountCents
    };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

exports.getOrderById = async (orderId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM orders
    WHERE id = $1
    LIMIT 1
    `,
    [orderId]
  );

  return result.rows[0] || null;
};

exports.getOrderItems = async (orderId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM order_items
    WHERE order_id = $1
    `,
    [orderId]
  );

  return result.rows;
};

exports.updateOrderStatus = async (orderId, status) => {
  await pool.query(
    'UPDATE orders SET status = $1 WHERE id = $2',
    [status, orderId]
  );
};

exports.markOrderAsPaid = async (orderId, data) => {
  await pool.query(
    `
    UPDATE orders
    SET
      status = $1,
      customer_email = $2,
      customer_name = $3,
      customer_phone = $4,
      shipping_address_line1 = $5,
      shipping_address_line2 = $6,
      shipping_city = $7,
      shipping_postal_code = $8,
      shipping_country_code = $9,
      stripe_session_id = $10,
      stripe_payment_intent_id = $11
    WHERE id = $12
    `,
    [
      'paid',
      data.customer_email || null,
      data.customer_name || null,
      data.customer_phone || null,
      data.shipping_address_line1 || null,
      data.shipping_address_line2 || null,
      data.shipping_city || null,
      data.shipping_postal_code || null,
      data.shipping_country_code || null,
      data.stripe_session_id || null,
      data.stripe_payment_intent_id || null,
      orderId
    ]
  );
};
