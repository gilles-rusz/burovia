const app = require('../backend/app');
const initDb = require('../backend/config/initDb');

let ready;

module.exports = async (req, res) => {
  if (!ready) {
    ready = initDb().catch((error) => {
      ready = null;
      console.error('Erreur initialisation base de données :', error);
    });
  }
  await ready;
  return app(req, res);
};
