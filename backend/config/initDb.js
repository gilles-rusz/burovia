const bcrypt = require('bcryptjs');
const pool = require('./db');

const initDb = async () => {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      email         VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role          ENUM('customer', 'admin') DEFAULT 'customer',
      first_name    VARCHAR(100),
      last_name     VARCHAR(100),
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const [admins] = await pool.execute("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
  if (admins.length === 0) {
    const password_hash = await bcrypt.hash('Admin2026!', 12);
    await pool.execute(
      "INSERT INTO users (email, password_hash, role, first_name) VALUES (?, ?, 'admin', 'Admin')",
      ['admin@burovia.fr', password_hash]
    );
    console.log('Compte admin créé : admin@burovia.fr');
  }
};

module.exports = initDb;
