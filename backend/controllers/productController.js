const pool = require('../config/db');

exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;

    const params = [];
    let categoryFilter = '';

    if (category) {
      params.push(category);
      categoryFilter = `AND c.slug = $${params.length}`;
    }

    const query = `
      SELECT
        p.id,
        p.sku,
        p.name,
        p.slug,
        p.short_description,
        p.description,
        p.price_cents,
        p.stock_quantity,
        p.is_dropshipping,
        p.is_active,
        p.is_featured,
        p.is_seasonal,
        p.delivery_estimate,
        c.name AS category_name,
        c.slug AS category_slug,
        pi.url AS image_url,
        pi.alt_text AS image_alt
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi
        ON pi.product_id = p.id
        AND pi.is_main = TRUE
      WHERE p.is_active = TRUE
      ${categoryFilter}
      ORDER BY p.created_at DESC
    `;

    const result = await pool.query(query, params);

    res.json({
      success: true,
      products: result.rows
    });
  } catch (error) {
    console.error('Erreur récupération produits :', error);

    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits.'
    });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await pool.query(
      `
      SELECT 
        p.id,
        p.sku,
        p.name,
        p.slug,
        p.short_description,
        p.description,
        p.price_cents,
        p.stock_quantity,
        p.is_dropshipping,
        p.is_active,
        p.is_featured,
        p.is_seasonal,
        p.delivery_estimate,
        c.name AS category_name,
        c.slug AS category_slug,
        pi.url AS image_url,
        pi.alt_text AS image_alt
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi 
        ON pi.product_id = p.id 
        AND pi.is_main = TRUE
      WHERE p.slug = $1
      AND p.is_active = TRUE
      LIMIT 1
      `,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Produit introuvable.'
      });
    }

    const product = result.rows[0];

    const imagesResult = await pool.query(
      `SELECT url, alt_text, is_main, sort_order
       FROM product_images
       WHERE product_id = $1
       ORDER BY is_main DESC, sort_order ASC`,
      [product.id]
    );

    product.images = imagesResult.rows;

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Erreur récupération produit :', error);

    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du produit.'
    });
  }
};
