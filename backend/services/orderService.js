const pool = require('../config/db');

exports.getProductsByIds = async (ids) => {
  if (!ids.length) return [];

  const placeholders = ids.map(() => '?').join(',');

  const [rows] = await pool.execute(
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
    WHERE id IN (${placeholders})
    AND is_active = TRUE
    `,
    ids
  );

  return rows;
};

exports.createPendingOrderWithItems = async ({ totalAmountCents, items }) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [orderResult] = await connection.execute(
      `
      INSERT INTO orders (
        status,
        total_amount_cents
      ) VALUES (?, ?)
      `,
      ['pending_payment', totalAmountCents]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.execute(
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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

    await connection.commit();

    return {
      id: orderId,
      total_amount_cents: totalAmountCents
    };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

exports.getOrderById = async (orderId) => {
  const [rows] = await pool.execute(
    `
    SELECT *
    FROM orders
    WHERE id = ?
    LIMIT 1
    `,
    [orderId]
  );

  return rows[0] || null;
};

exports.getOrderItems = async (orderId) => {
  const [rows] = await pool.execute(
    `
    SELECT *
    FROM order_items
    WHERE order_id = ?
    `,
    [orderId]
  );

  return rows;
};

exports.markOrderAsPaid = async (orderId, data) => {
  await pool.execute(
    `
    UPDATE orders
    SET
      status = ?,
      customer_email = ?,
      customer_name = ?,
      customer_phone = ?,
      shipping_address_line1 = ?,
      shipping_address_line2 = ?,
      shipping_city = ?,
      shipping_postal_code = ?,
      shipping_country_code = ?,
      stripe_session_id = ?,
      stripe_payment_intent_id = ?
    WHERE id = ?
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