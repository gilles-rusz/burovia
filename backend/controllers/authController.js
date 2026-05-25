const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role, first_name: user.first_name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

const register = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caractères' });
  }

  try {
    const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
      'INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)',
      [email, password_hash, first_name || null, last_name || null]
    );

    const user = { id: result.insertId, email, role: 'customer', first_name: first_name || null };
    res.status(201).json({ token: signToken(user), user });
  } catch (error) {
    console.error('Erreur register :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT id, email, password_hash, role, first_name FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const payload = { id: user.id, email: user.email, role: user.role, first_name: user.first_name };
    res.json({ token: signToken(payload), user: payload });
  } catch (error) {
    console.error('Erreur login :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const getMe = (req, res) => {
  res.json({ user: req.user });
};

module.exports = { register, login, getMe };
