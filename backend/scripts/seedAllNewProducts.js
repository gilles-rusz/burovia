const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = require('../config/db');

async function seedAllNewProducts() {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // Nouvelles catégories (INSERT IGNORE pour ne pas planter si déjà présentes)
    await conn.execute(`
      INSERT IGNORE INTO categories (name, slug) VALUES
      ('Périphériques & Accessoires', 'peripheriques-accessoires'),
      ('Spécial Été',                 'special-ete')
    `);

    // Récupère les IDs des catégories nécessaires
    const [[{ id: catConfort }]]      = await conn.execute(`SELECT id FROM categories WHERE slug = 'confort-posture'`);
    const [[{ id: catOrga }]]         = await conn.execute(`SELECT id FROM categories WHERE slug = 'organisation-bureau'`);
    const [[{ id: catPeri }]]         = await conn.execute(`SELECT id FROM categories WHERE slug = 'peripheriques-accessoires'`);
    const [[{ id: catEte }]]          = await conn.execute(`SELECT id FROM categories WHERE slug = 'special-ete'`);

    // 12 nouveaux produits
    await conn.execute(`
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
        3990, 1500, ?, 1, 'CJJJJTJT05906', 1, 1, 1,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-012',
        'Support téléphone rotatif aluminium',
        'support-telephone-rotatif',
        'Support téléphone pliable en aluminium avec rotation 360°. Compatible tous smartphones. Idéal pour les visioconférences.',
        1490, 600, ?, 1, 'CJSJ192138601AZ', 1, 0, 1,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-013',
        'Lampe de bureau multifonction avec ventilateur',
        'lampe-bureau-multifonction',
        'Lampe LED de bureau 3-en-1 avec ventilateur intégré et porte-stylos. Parfaite pour le télétravail estival.',
        2490, 1000, ?, 1, 'CJSN199785503CX', 1, 1, 1,
        'Livraison estimée 6-12 jours ouvrés'),

      ('BUR-014',
        'Clavier Bluetooth esthétique rose',
        'clavier-bluetooth-rose',
        'Clavier Bluetooth sans fil touches rondes design rétro. Double mode connexion. Disponible en rose.',
        4490, 1800, ?, 1, 'CJYD243839702BY', 1, 1, 1,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-015',
        'Webcam 4K avec anneau lumineux',
        'webcam-4k-anneau',
        'Webcam 4K USB avec anneau lumineux intégré. Idéale pour les visioconférences et le streaming.',
        2490, 1000, ?, 1, 'CJCZ110385501AZ', 1, 1, 1,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-016',
        'Barre de son USB pour bureau',
        'barre-son-usb-bureau',
        'Barre de son compacte USB pour ordinateur de bureau. Son stéréo clair pour les réunions et la musique.',
        2790, 1100, ?, 1, 'CJYS102705301AZ', 1, 0, 1,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-017',
        'Souris transparente Bluetooth 3 modes',
        'souris-transparente-bluetooth',
        'Souris sans fil transparente design unique. 3 modes de connexion : 2.4G, BT3.0, BT5.2. 11 coloris.',
        1990, 800, ?, 1, 'CJYD205766901AZ', 1, 1, 1,
        'Livraison estimée 8-15 jours ouvrés'),

      ('BUR-018',
        'Clavier slim Bluetooth blanc',
        'clavier-slim-bluetooth-blanc',
        'Clavier Bluetooth slim 109 touches design minimaliste blanc. Compatible Mac, Windows, iPad.',
        3490, 1400, ?, 1, 'CJJSPBPB00281-White', 1, 0, 1,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-019',
        'Filtre de confidentialité MacBook',
        'filtre-confidentialite-macbook',
        'Filtre magnétique de confidentialité pour MacBook Pro 14/16 pouces. Anti-lumière bleue. Pose et retrait facile.',
        1990, 800, ?, 1, 'CJPB145970509IR', 1, 0, 1,
        'Livraison estimée 8-15 jours ouvrés'),

      ('BUR-020',
        'Support PC portable pliable léger',
        'support-pc-pliable-leger',
        'Support ordinateur portable ultra-léger et pliable. 5 coloris disponibles. Compatible 10-17 pouces.',
        2490, 1000, ?, 1, 'CJXFLPJY00201', 1, 0, 1,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-021',
        'Grand tapis de bureau XXL',
        'tapis-bureau-xxl',
        'Tapis de bureau XXL 700x300mm coutures épaisses. Design hexagonal moderne. 6 coloris disponibles.',
        1690, 700, ?, 1, 'CJHB110177901AZ', 1, 1, 1,
        'Livraison estimée 7-15 jours ouvrés'),

      ('BUR-022',
        'Batterie solaire portable étanche',
        'batterie-solaire-portable',
        'Batterie externe solaire 10000mAh étanche. Recharge solaire, torche LED intégrée. Idéale pour travailler en extérieur.',
        3490, 1400, ?, 1, 'CJYD181648204DW', 1, 1, 1,
        'Livraison estimée 13-18 jours ouvrés')
    `, [
      catConfort,
      catOrga, catOrga,
      catPeri, catPeri, catPeri, catPeri, catPeri, catPeri, catPeri, catPeri,
      catEte
    ]);

    // Images
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
      const [[product]] = await conn.execute(
        `SELECT id FROM products WHERE slug = ?`, [slug]
      );
      if (product) {
        await conn.execute(
          `INSERT IGNORE INTO product_images (product_id, url, is_main) VALUES (?, ?, 1)`,
          [product.id, `/images/${image}`]
        );
      }
    }

    await conn.commit();

    // Compte et affiche le résultat
    const [[{ total }]] = await conn.execute(
      `SELECT COUNT(*) AS total FROM products WHERE slug IN (${Object.keys(slugImageMap).map(() => '?').join(',')})`,
      Object.keys(slugImageMap)
    );
    console.log(`\nSeed terminé — ${total} nouveaux produits insérés dans MySQL.`);
    console.log('Catégories ajoutées : Périphériques & Accessoires, Spécial Été');

  } catch (err) {
    await conn.rollback();
    console.error('Erreur lors du seed :', err.message);
    process.exit(1);
  } finally {
    conn.release();
    process.exit(0);
  }
}

seedAllNewProducts();
