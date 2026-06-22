const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = require('../config/db');

const galleryImages = [
  { slug: 'repose-poignet-ergonomique',       images: ['/images/repose-poignet-2.jpg',       '/images/repose-poignet-3.jpg'] },
  { slug: 'support-pc-pliable',               images: ['/images/support-pc-2.jpg',           '/images/support-pc-3.jpg'] },
  { slug: 'coussin-lombaire-ergonomique',      images: ['/images/coussin-lombaire-2.jpg',     '/images/coussin-lombaire-3.jpg'] },
  { slug: 'bras-articule-ecran',               images: ['/images/bras-ecran-2.jpg',           '/images/bras-ecran-3.jpg'] },
  { slug: 'souris-verticale-ergonomique',      images: ['/images/souris-verticale-2.jpg',     '/images/souris-verticale-3.jpg'] },
  { slug: 'organisateur-cables-silicone',      images: ['/images/organisateur-cables-2.jpg',  '/images/organisateur-cables-3.jpg'] },
  { slug: 'support-casque-rgb',                images: ['/images/support-casque-rgb-2.jpg',   '/images/support-casque-rgb-3.jpg'] },
  { slug: 'support-ecran-bois-tiroirs',        images: ['/images/support-ecran-2.jpg',        '/images/support-ecran-3.jpg'] },
  { slug: 'organisateur-bureau-modulable',     images: ['/images/organisateur-bureau-2.jpg',  '/images/organisateur-bureau-3.jpg'] },
];

async function seedGallery() {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    let inserted = 0;

    for (const entry of galleryImages) {
      const [rows] = await conn.execute(
        'SELECT id, name FROM products WHERE slug = ?',
        [entry.slug]
      );

      if (rows.length === 0) {
        console.warn(`Produit introuvable : ${entry.slug} — ignoré`);
        continue;
      }

      const productId = rows[0].id;
      const productName = rows[0].name;

      for (let i = 0; i < entry.images.length; i++) {
        await conn.execute(
          `INSERT INTO product_images (product_id, url, alt_text, is_main, sort_order)
           VALUES (?, ?, ?, FALSE, ?)`,
          [productId, entry.images[i], `${productName} — vue ${i + 2}`, i + 1]
        );
        inserted++;
      }
    }

    await conn.commit();
    console.log(`${inserted} images galerie ajoutées avec succès`);
  } catch (err) {
    await conn.rollback();
    console.error('Erreur lors du seed galerie :', err.message);
    process.exit(1);
  } finally {
    conn.release();
    process.exit(0);
  }
}

seedGallery();
