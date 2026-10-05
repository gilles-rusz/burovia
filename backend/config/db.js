const { Pool } = require('pg');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: /@(localhost|127\.0\.0\.1)[:/]/.test(process.env.DATABASE_URL)
        ? false
        : { rejectUnauthorized: false },
      max: 3,
    })
  : new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      max: 10,
    });

module.exports = pool;
