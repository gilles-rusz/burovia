const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/orders', requireAuth, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT
        o.id,
        o.created_at,
        o.status,
        o.total_amount_cents,
        o.customer_name,
        o.customer_email,
        o.shipping_address_line1,
        o.shipping_city,
        o.shipping_postal_code,
        o.shipping_country_code,
        oi.name        AS item_name,
        oi.quantity    AS item_quantity,
        oi.unit_price_cents
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      ORDER BY o.created_at DESC, o.id DESC
    `);

    const ordersMap = new Map();

    for (const row of rows) {
      if (!ordersMap.has(row.id)) {
        ordersMap.set(row.id, {
          id: row.id,
          created_at: row.created_at,
          status: row.status,
          total_amount_cents: row.total_amount_cents,
          customer_name: row.customer_name,
          customer_email: row.customer_email,
          shipping_address_line1: row.shipping_address_line1,
          shipping_city: row.shipping_city,
          shipping_postal_code: row.shipping_postal_code,
          shipping_country_code: row.shipping_country_code,
          items: [],
        });
      }

      if (row.item_name) {
        ordersMap.get(row.id).items.push({
          name: row.item_name,
          quantity: row.item_quantity,
          unit_price_cents: row.unit_price_cents,
        });
      }
    }

    res.json({ orders: Array.from(ordersMap.values()) });
  } catch (error) {
    console.error('Erreur récupération commandes :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/orders/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const orderId = Number(req.params.id);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return res.status(400).json({ error: 'ID commande invalide.' });
    }

    const [[order]] = await pool.execute(
      'SELECT * FROM orders WHERE id = ? LIMIT 1',
      [orderId]
    );

    if (!order) {
      return res.status(404).json({ error: 'Commande introuvable.' });
    }

    const [items] = await pool.execute(
      `SELECT product_id, supplier_id, supplier_vid, name, quantity, unit_price_cents, cost_price_cents
       FROM order_items WHERE order_id = ?`,
      [orderId]
    );

    return res.json({ order: { ...order, items } });
  } catch (error) {
    console.error('Erreur récupération commande :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

const VALID_STATUSES = [
  'pending_payment',
  'paid',
  'supplier_pending',
  'supplier_confirmed',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
];

router.put('/orders/:id/status', requireAuth, requireAdmin, async (req, res) => {
  try {
    const orderId = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return res.status(400).json({ error: 'ID commande invalide.' });
    }

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        error: `Statut invalide. Valeurs acceptées : ${VALID_STATUSES.join(', ')}`
      });
    }

    const [[order]] = await pool.execute(
      'SELECT id FROM orders WHERE id = ? LIMIT 1',
      [orderId]
    );

    if (!order) {
      return res.status(404).json({ error: 'Commande introuvable.' });
    }

    await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);

    return res.json({ success: true, order_id: orderId, status });
  } catch (error) {
    console.error('Erreur mise à jour statut commande :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
