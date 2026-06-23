const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = require('../config/db');

async function seed() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('TRUNCATE product_images, products, categories RESTART IDENTITY CASCADE');

    await client.query(`
      INSERT INTO categories (id, name, slug) VALUES
      (1, 'Confort & Posture',        'confort-posture'),
      (2, 'Organisation du bureau',   'organisation-bureau'),
      (3, 'Été & Foot 2026',          'foot-2026')
    `);

    await client.query(`SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories))`);

    await client.query(`
      INSERT INTO products (
        id, sku, name, slug, short_description,
        price_cents, cost_price_cents,
        category_id, supplier_id, supplier_vid,
        is_active, is_featured, is_dropshipping,
        delivery_estimate
      ) VALUES
      (1, 'BUR-001',
        'Repose-poignet ergonomique mémoire de forme',
        'repose-poignet-ergonomique',
        'Coussin mémoire de forme pour clavier et souris. Réduit la fatigue des poignets lors des longues sessions de travail.',
        3990, 1500, 1, 1, 'QSJJJTJT17317-Black', TRUE, TRUE, TRUE,
        'Livraison estimée 8-15 jours ouvrés'),

      (2, 'BUR-002',
        'Support PC portable pliable',
        'support-pc-pliable',
        'Support réglable et pliable pour ordinateur portable 11-17 pouces. Améliore votre posture et la ventilation de votre PC.',
        1990, 750, 1, 1, 'QSJJJTJT16685-Black', TRUE, TRUE, TRUE,
        'Livraison estimée 8-15 jours ouvrés'),

      (3, 'BUR-003',
        'Organisateur de câbles silicone',
        'organisateur-cables-silicone',
        'Set de clips organisateurs de câbles en silicone. Gardez votre bureau parfaitement rangé. Lot de 20 pièces.',
        1290, 450, 2, 1, 'QSJJJTJT15947-Blue-20pcs', TRUE, FALSE, TRUE,
        'Livraison estimée 7-15 jours ouvrés'),

      (4, 'BUR-004',
        'Support casque RGB lumineux',
        'support-casque-rgb',
        'Support casque avec éclairage RGB 16 modes, 3 ports USB intégrés. Compatible tous casques.',
        3990, 1500, 2, 1, 'QSJY140277103CX', TRUE, TRUE, TRUE,
        'Livraison estimée 6-12 jours ouvrés'),

      (5, 'BUR-005',
        'Support écran bois avec tiroirs',
        'support-ecran-bois-tiroirs',
        'Rehausseur écran en bois avec 2 tiroirs de rangement. Disponible en 8 coloris. Expédié depuis l''Allemagne.',
        5990, 2500, 2, 1, 'QSFU25999010018', TRUE, TRUE, TRUE,
        'Livraison estimée 4-5 jours ouvrés')
    `);

    await client.query(`SELECT setval('products_id_seq', (SELECT MAX(id) FROM products))`);

    await client.query(`
      INSERT INTO product_images (product_id, url, is_main) VALUES
      (1, '/images/repose-poignet.jpg',    TRUE),
      (2, '/images/support-pc.jpg',        TRUE),
      (3, '/images/organisateur-cables.jpg', TRUE),
      (4, '/images/support-casque-rgb.jpg', TRUE),
      (5, '/images/support-ecran.jpg',     TRUE)
    `);

    await client.query('COMMIT');

    console.log('Produits importés avec succès');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erreur lors du seed :', err.message);
    process.exit(1);
  } finally {
    client.release();
    process.exit(0);
  }
}

seed();
