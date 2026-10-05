require('dotenv').config();

const app = require('./app');
const initDb = require('./config/initDb');

const PORT = process.env.PORT || 5000;


app.listen(PORT, async () => {
  console.log(`Serveur Burovia lancé sur le port ${PORT}`);
  try {
    await initDb();
  } catch (error) {
    console.error('Erreur initialisation base de données :', error);
  }
});
