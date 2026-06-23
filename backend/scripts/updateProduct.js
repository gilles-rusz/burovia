const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = require('../config/db');

async function update() {
  const client = await pool.connect();
  await client.query(`
    UPDATE products SET
      name = 'Lampe de bureau portable rechargeable',
      slug = 'lampe-bureau-portable',
      short_description = 'Lampe de bureau LED portable et rechargeable. Protection des yeux, idéale pour le télétravail. Plusieurs couleurs disponibles.',
      price_cents = 1490,
      supplier_vid = 'CJCD135478206FU',
      delivery_estimate = 'Livraison estimée 8-15 jours ouvrés'
    WHERE name = 'Repose-pieds ergonomique'
  `);
  await client.query(`
    UPDATE product_images SET url = '/images/lampe-bureau.jpg'
    WHERE product_id = (SELECT id FROM products WHERE slug = 'lampe-bureau-portable')
  `);
  console.log('Produit mis à jour avec succès');
  client.release();
  process.exit();
}

update();
