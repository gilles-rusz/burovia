const bcrypt = require('bcryptjs');
const pool = require('./db');

const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(100) NOT NULL,
      slug        VARCHAR(120) UNIQUE NOT NULL,
      description TEXT,
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS suppliers (
      id            SERIAL PRIMARY KEY,
      name          VARCHAR(150) NOT NULL,
      website_url   VARCHAR(255),
      contact_email VARCHAR(150),
      country       VARCHAR(100),
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id                  SERIAL PRIMARY KEY,
      sku                 VARCHAR(50) UNIQUE NOT NULL,
      supplier_id         INT REFERENCES suppliers(id) ON DELETE SET NULL,
      supplier_product_id VARCHAR(100),
      supplier_vid        VARCHAR(100),
      name                VARCHAR(255) NOT NULL,
      slug                VARCHAR(255) UNIQUE NOT NULL,
      short_description   VARCHAR(500),
      description         TEXT,
      price_cents         INT NOT NULL,
      cost_price_cents    INT NOT NULL,
      stock_quantity      INT DEFAULT 0,
      is_dropshipping     BOOLEAN DEFAULT TRUE,
      is_active           BOOLEAN DEFAULT TRUE,
      is_featured         BOOLEAN DEFAULT FALSE,
      is_seasonal         BOOLEAN DEFAULT FALSE,
      category_id         INT REFERENCES categories(id) ON DELETE SET NULL,
      delivery_estimate   VARCHAR(100),
      created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS product_images (
      id         SERIAL PRIMARY KEY,
      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      url        VARCHAR(255) NOT NULL,
      alt_text   VARCHAR(255),
      is_main    BOOLEAN DEFAULT FALSE,
      sort_order INT DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS orders (
      id                       SERIAL PRIMARY KEY,
      status                   VARCHAR(50) DEFAULT 'pending_payment',
      total_amount_cents       INT NOT NULL DEFAULT 0,
      customer_email           VARCHAR(150),
      customer_name            VARCHAR(150),
      customer_phone           VARCHAR(50),
      shipping_address_line1   VARCHAR(255),
      shipping_address_line2   VARCHAR(255),
      shipping_city            VARCHAR(100),
      shipping_postal_code     VARCHAR(20),
      shipping_country_code    VARCHAR(10),
      stripe_session_id        VARCHAR(255),
      stripe_payment_intent_id VARCHAR(255),
      supplier_status          VARCHAR(50),
      supplier_response        TEXT,
      supplier_error           TEXT,
      created_at               TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at               TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id               SERIAL PRIMARY KEY,
      order_id         INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id       INT NOT NULL REFERENCES products(id),
      supplier_id      INT,
      supplier_vid     VARCHAR(100),
      name             VARCHAR(255) NOT NULL,
      quantity         INT NOT NULL,
      unit_price_cents INT NOT NULL,
      cost_price_cents INT NOT NULL,
      created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id            SERIAL PRIMARY KEY,
      email         VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role          VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
      first_name    VARCHAR(100),
      last_name     VARCHAR(100),
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    INSERT INTO suppliers (name, website_url, country)
    SELECT 'CJ Dropshipping', 'https://cjdropshipping.com', 'CN'
    WHERE NOT EXISTS (SELECT 1 FROM suppliers)
  `);

  const result = await pool.query("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
  if (result.rows.length === 0) {
    const password_hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin2026!', 12);
    await pool.query(
      "INSERT INTO users (email, password_hash, role, first_name) VALUES ($1, $2, 'admin', 'Admin')",
      ['admin@burovia.fr', password_hash]
    );
    console.log('Compte admin créé : admin@burovia.fr');
  }
};

module.exports = initDb;
