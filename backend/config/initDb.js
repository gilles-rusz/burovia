const bcrypt = require('bcryptjs');
const pool = require('./db');

const initDb = async () => {
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

  const result = await pool.query("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
  if (result.rows.length === 0) {
    const password_hash = await bcrypt.hash('Admin2026!', 12);
    await pool.query(
      "INSERT INTO users (email, password_hash, role, first_name) VALUES ($1, $2, 'admin', 'Admin')",
      ['admin@burovia.fr', password_hash]
    );
    console.log('Compte admin créé : admin@burovia.fr');
  }
};

module.exports = initDb;
