const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = require('../config/db');

async function seedAllNewProducts() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(`
      INSERT INTO categories (name, slug) VALUES
      ('Périphériques & Accessoires', 'peripheriques-accessoires'),
      ('Spécial Été',                 'special-ete')
      ON CONFLICT DO NOTHING
    `);

    const catConfortResult = await client.query(`SELECT id FROM categories WHERE slug = 'confort-posture'`);
    const catOrgaResult    = await client.query(`SELECT id FROM categories WHERE slug = 'organisation-bureau'`);
    const catPeriResult    = await client.query(`SELECT id FROM categories WHERE slug = 'peripheriques-accessoires'`);
    const catEteResult     = await client.query(`SELECT id FROM categories WHERE slug = 'special-ete'`);

    const catConfort = catConfortResult.rows[0].id;
    const catOrga    = catOrgaResult.rows[0].id;
    const catPeri    = catPeriResult.rows[0].id;
    const catEte     = catEteResult.rows[0].id;

    await client.query(`
      INSERT INTO products (
        sku, name, slug, short_description,
        price_cents, cost_price_cents,
        category_id, supplier_id, supplier_vid,
        is_active, is_featured, is_dropshipping,
        delivery_estimate
      ) VALUES
      ('BUR-011',
        'Coussin siège et dossier intégré',
        'coussin-siege-dossier',
        'Coussin intégré siège et dossier pour chaise. Disponible en 15 couleurs. Idéal pour les chaises de salle à manger utilisées en télétravail.',
        3990, 1500, $1, 1, 'CJJJJTJT05906', TRUE, TRUE, TRUE,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-012',
        'Support téléphone rotatif aluminium',
        'support-telephone-rotatif',
        'Support téléphone pliable en aluminium avec rotation 360°. Compatible tous smartphones. Idéal pour les visioconférences.',
        1490, 600, $2, 1, 'CJSJ192138601AZ', TRUE, FALSE, TRUE,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-013',
        'Lampe de bureau multifonction avec ventilateur',
        'lampe-bureau-multifonction',
        'Lampe LED de bureau 3-en-1 avec ventilateur intégré et porte-stylos. Parfaite pour le télétravail estival.',
        2490, 1000, $3, 1, 'CJSN199785503CX', TRUE, TRUE, TRUE,
        'Livraison estimée 6-12 jours ouvrés'),

      ('BUR-014',
        'Clavier Bluetooth esthétique rose',
        'clavier-bluetooth-rose',
        'Clavier Bluetooth sans fil touches rondes design rétro. Double mode connexion. Disponible en rose.',
        4490, 1800, $4, 1, 'CJYD243839702BY', TRUE, TRUE, TRUE,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-015',
        'Webcam 4K avec anneau lumineux',
        'webcam-4k-anneau',
        'Webcam 4K USB avec anneau lumineux intégré. Idéale pour les visioconférences et le streaming.',
        2490, 1000, $5, 1, 'CJCZ110385501AZ', TRUE, TRUE, TRUE,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-016',
        'Barre de son USB pour bureau',
        'barre-son-usb-bureau',
        'Barre de son compacte USB pour ordinateur de bureau. Son stéréo clair pour les réunions et la musique.',
        2790, 1100, $6, 1, 'CJYS102705301AZ', TRUE, FALSE, TRUE,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-017',
        'Souris transparente Bluetooth 3 modes',
        'souris-transparente-bluetooth',
        'Souris sans fil transparente design unique. 3 modes de connexion : 2.4G, BT3.0, BT5.2. 11 coloris.',
        1990, 800, $7, 1, 'CJYD205766901AZ', TRUE, TRUE, TRUE,
        'Livraison estimée 8-15 jours ouvrés'),

      ('BUR-018',
        'Clavier slim Bluetooth blanc',
        'clavier-slim-bluetooth-blanc',
        'Clavier Bluetooth slim 109 touches design minimaliste blanc. Compatible Mac, Windows, iPad.',
        3490, 1400, $8, 1, 'CJJSPBPB00281-White', TRUE, FALSE, TRUE,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-019',
        'Filtre de confidentialité MacBook',
        'filtre-confidentialite-macbook',
        'Filtre magnétique de confidentialité pour MacBook Pro 14/16 pouces. Anti-lumière bleue. Pose et retrait facile.',
        1990, 800, $9, 1, 'CJPB145970509IR', TRUE, FALSE, TRUE,
        'Livraison estimée 8-15 jours ouvrés'),

      ('BUR-020',
        'Support PC portable pliable léger',
        'support-pc-pliable-leger',
        'Support ordinateur portable ultra-léger et pliable. 5 coloris disponibles. Compatible 10-17 pouces.',
        2490, 1000, $10, 1, 'CJXFLPJY00201', TRUE, FALSE, TRUE,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-021',
        'Grand tapis de bureau XXL',
        'tapis-bureau-xxl',
        'Tapis de bureau XXL 700x300mm coutures épaisses. Design hexagonal moderne. 6 coloris disponibles.',
        1690, 700, $11, 1, 'CJHB110177901AZ', TRUE, TRUE, TRUE,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-022',
        'Batterie solaire portable étanche',
        'batterie-solaire-portable',
        'Batterie externe solaire 10000mAh étanche. Recharge solaire, torche LED intégrée. Idéale pour travailler en extérieur.',
        3490, 1400, $12, 1, 'CJYD181648204DW', TRUE, TRUE, TRUE,
        'Livraison estimée 13-18 jours ouvrés')
    `, [
      catConfort,
      catOrga, catOrga,
      catPeri, catPeri, catPeri, catPeri, catPeri, catPeri, catPeri, catPeri,
      catEte
    ]);

    const slugImageMap = {
      'coussin-siege-dossier':        'coussin-siege.jpg',
      'support-telephone-rotatif':    'support-telephone.jpg',
      'lampe-bureau-multifonction':   'lampe-multifonction.jpg',
      'clavier-bluetooth-rose':       'clavier-bluetooth-rose.jpg',
      'webcam-4k-anneau':             'webcam-4k.jpg',
      'barre-son-usb-bureau':         'barre-son-usb.jpg',
      'souris-transparente-bluetooth':'souris-transparente.jpg',
      'clavier-slim-bluetooth-blanc': 'clavier-slim-blanc.jpg',
      'filtre-confidentialite-macbook':'filtre-confidentialite.jpg',
      'support-pc-pliable-leger':     'support-pc-pliable.jpg',
      'tapis-bureau-xxl':             'tapis-bureau-xxl.jpg',
      'batterie-solaire-portable':    'batterie-solaire.jpg',
    };

    for (const [slug, image] of Object.entries(slugImageMap)) {
      const productResult = await client.query(
        `SELECT id FROM products WHERE slug = $1`, [slug]
      );
      if (productResult.rows[0]) {
        await client.query(
          `INSERT INTO product_images (product_id, url, is_main) VALUES ($1, $2, TRUE)
           ON CONFLICT DO NOTHING`,
          [productResult.rows[0].id, `/images/${image}`]
        );
      }
    }

    await client.query('COMMIT');

    const slugKeys = Object.keys(slugImageMap);
    const placeholders = slugKeys.map((_, i) => `$${i + 1}`).join(',');
    const countResult = await client.query(
      `SELECT COUNT(*) AS total FROM products WHERE slug IN (${placeholders})`,
      slugKeys
    );
    console.log(`\nSeed terminé — ${countResult.rows[0].total} nouveaux produits insérés dans PostgreSQL.`);
    console.log('Catégories ajoutées : Périphériques & Accessoires, Spécial Été');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erreur lors du seed :', err.message);
    process.exit(1);
  } finally {
    client.release();
    process.exit(0);
  }
}

seedAllNewProducts();
