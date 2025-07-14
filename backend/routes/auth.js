// backend/routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER (EMPLOYEE SIGNUP)
router.post('/signup', async (req, res) => {
  const { name, staff_id, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR staff_id = $2',
      [email, staff_id]
    );
    if (existing.rows.length > 0) return res.status(400).json({ error: 'User already exists' });

    const result = await pool.query(
      `INSERT INTO users (name, staff_id, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
      [name, staff_id, email, hashedPassword]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
