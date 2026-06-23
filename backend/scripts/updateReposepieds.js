const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = require('../config/db');

async function updateProduct() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const res1 = await client.query(`
      UPDATE products SET
        name               = 'Lampe de bureau portable rechargeable',
        slug               = 'lampe-bureau-portable',
        short_description  = 'Lampe de bureau LED portable et rechargeable. Protection des yeux, idéale pour le télétravail. Plusieurs couleurs disponibles.',
        price_cents        = 1490,
        supplier_vid       = 'CJCD135478206FU',
        delivery_estimate  = 'Livraison estimée 8-15 jours ouvrés'
      WHERE slug = 'repose-pieds-ergonomique'
    `);

    if (res1.rowCount === 0) {
      throw new Error('Produit "repose-pieds-ergonomique" introuvable — aucune ligne mise à jour.');
    }

    await client.query(`
      UPDATE product_images
      SET url = '/images/lampe-bureau.jpg'
      WHERE product_id = (SELECT id FROM products WHERE slug = 'lampe-bureau-portable')
    `);

    await client.query('COMMIT');

    console.log('Produit mis à jour avec succès : lampe-bureau-portable');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erreur :', err.message);
    process.exit(1);
  } finally {
    client.release();
    process.exit(0);
  }
}

updateProduct();
