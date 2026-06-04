const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

router.post('/register', authController.registerValidators, authController.register);
router.post('/login', authController.loginValidators, authController.login);
router.get('/me', requireAuth, authController.getMe);

module.exports = router;
