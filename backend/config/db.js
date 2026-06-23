const { Pool } = require('pg');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

console.log('Config PostgreSQL chargée :', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  hasPassword: process.env.DB_PASSWORD ? true : false
});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  max: 10,
});

module.exports = pool;
