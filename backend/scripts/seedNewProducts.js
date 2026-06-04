const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = require('../config/db');

async function seedNewProducts() {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await conn.execute(`
      INSERT INTO products (
        sku, name, slug, short_description,
        price_cents, cost_price_cents,
        category_id, supplier_id, supplier_vid,
        is_active, is_featured, is_dropshipping,
        delivery_estimate
      ) VALUES
      ('BUR-006',
        'Coussin lombaire ergonomique',
        'coussin-lombaire-ergonomique',
        'Coussin de soutien lombaire pour bureau et voiture. Réduit les douleurs de dos lors des longues sessions de travail.',
        2990, 1100, 1, 1, 'CJCS1067828', 1, 1, 1,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-007',
        'Bras articulé pour écran',
        'bras-articule-ecran',
        'Support bras articulé pour écran PC. Rotation 360°, hauteur réglable. Libère de l''espace sur votre bureau.',
        2990, 1100, 1, 1, 'CJYD2762246', 1, 0, 1,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-008',
        'Repose-pieds ergonomique',
        'repose-pieds-ergonomique',
        'Repose-pieds réglable en hauteur pour un meilleur confort en position assise. 3 niveaux de hauteur.',
        3990, 1500, 1, 1, 'CJFU2673628', 1, 0, 1,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-009',
        'Souris verticale ergonomique',
        'souris-verticale-ergonomique',
        'Souris verticale sans fil ergonomique. Réduit les tensions du poignet et de l''avant-bras. Compatible Windows et Mac.',
        1990, 750, 1, 1, 'CJXFSPYX00308', 1, 1, 1,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-010',
        'Organisateur de bureau modulable',
        'organisateur-bureau-modulable',
        'Organisateur de bureau avec compartiments modulables. Rangez stylos, papiers, téléphone et accessoires.',
        3990, 1500, 2, 1, 'CJJJJTJT11495', 1, 0, 1,
        'Livraison estimée 7-15 jours ouvrés')
    `);

    await conn.execute(`
      INSERT INTO product_images (product_id, url, is_main) VALUES
      ((SELECT id FROM products WHERE slug='coussin-lombaire-ergonomique'),  '/images/coussin-lombaire.jpg', 1),
      ((SELECT id FROM products WHERE slug='bras-articule-ecran'),           '/images/bras-ecran.jpg', 1),
      ((SELECT id FROM products WHERE slug='repose-pieds-ergonomique'),      '/images/repose-pieds.jpg', 1),
      ((SELECT id FROM products WHERE slug='souris-verticale-ergonomique'),  '/images/souris-verticale.jpg', 1),
      ((SELECT id FROM products WHERE slug='organisateur-bureau-modulable'), '/images/organisateur-bureau.jpg', 1)
    `);

    await conn.commit();

    console.log('5 nouveaux produits ajoutés avec succès');
  } catch (err) {
    await conn.rollback();
    console.error('Erreur lors du seed :', err.message);
    process.exit(1);
  } finally {
    conn.release();
    process.exit(0);
  }
}

seedNewProducts();
