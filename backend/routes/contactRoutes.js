const express = require('express');
const rateLimit = require('express-rate-limit');
const { envoyerMessage } = require('../controllers/contactController');

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de messages envoyés, réessaie dans une heure.' },
});

router.post('/', contactLimiter, envoyerMessage);

module.exports = router;
