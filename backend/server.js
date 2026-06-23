const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const pool = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const stripeController = require('./controllers/stripeController');
const initDb = require('./config/initDb');

const app = express();

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeController.handleStripeWebhook
);

app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requêtes, veuillez réessayer dans 15 minutes.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de tentatives de connexion, veuillez réessayer dans 15 minutes.' }
});

app.use(express.json());

app.use(generalLimiter);

app.get('/', (req, res) => {
  res.json({
    message: 'API Burovia opérationnelle'
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.get('/api/test-db', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM products');
      res.json({ success: true, message: 'Connexion PostgreSQL réussie', products: result.rows });
    } catch (error) {
      console.error('Erreur PostgreSQL :', error);
      res.status(500).json({ success: false, message: 'Erreur de connexion PostgreSQL' });
    }
  });
}

app.use('/api/products', productRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authLimiter, authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Serveur Burovia lancé sur le port ${PORT}`);
  try {
    await initDb();
  } catch (error) {
    console.error('Erreur initialisation base de données :', error);
  }
});
