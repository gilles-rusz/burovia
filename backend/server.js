const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const stripeController = require('./controllers/stripeController');

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur Burovia lancé sur le port ${PORT}`);
});