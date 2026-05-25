const express = require('express');
const cors = require('cors');
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

app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API Burovia opérationnelle'
  });
});

app.get('/api/test-db', async (req, res) => {
  try {
    const [products] = await pool.execute('SELECT * FROM products');

    res.json({
      success: true,
      message: 'Connexion MySQL réussie',
      products
    });
  } catch (error) {
    console.error('Erreur MySQL :', error);

    res.status(500).json({
      success: false,
      message: 'Erreur de connexion MySQL',
      error: error.message
    });
  }
});

app.use('/api/products', productRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Serveur Burovia lancé sur le port ${PORT}`);
  try {
    await initDb();
  } catch (error) {
    console.error('Erreur initialisation base de données :', error);
  }
});