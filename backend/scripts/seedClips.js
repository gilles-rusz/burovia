const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = require('../config/db');

async function seedClips() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(`
      INSERT INTO products (
        sku, name, slug, short_description,
        price_cents, cost_price_cents,
        category_id, supplier_id, supplier_vid,
        is_active, is_featured, is_dropshipping,
        delivery_estimate
      ) VALUES (
        'BUR-023',
        'Clips câbles magnétiques sous bureau',
        'clips-cables-magnetiques',
        'Set de clips magnétiques pour organiser les câbles sous le bureau. Design épuré blanc et noir. Fixation adhésive sans perçage.',
        1490, 600,
        2, 1, 'CJYD197888515OL',
        TRUE, FALSE, TRUE,
        'Livraison estimée 8-15 jours ouvrés'
      )
    `);

    await client.query(`
      INSERT INTO product_images (product_id, url, is_main)
      VALUES ((SELECT id FROM products WHERE slug = 'clips-cables-magnetiques'), '/images/clips-cables-magnetiques.jpg', TRUE)
    `);

    await client.query('COMMIT');
    console.log('Clips câbles ajoutés avec succès');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erreur lors du seed :', err.message);
    process.exit(1);
  } finally {
    client.release();
    process.exit(0);
  }
}

seedClips();
