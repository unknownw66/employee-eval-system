// backend/routes/formSettings.js
import express from 'express';
import pool from '../config/db.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET - Fetch current formula config
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM evaluation_form_settings ORDER BY updated_at DESC LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Update formula config (admin only)
router.post('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admin can update settings' });
  }

  const { config } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO evaluation_form_settings (config) VALUES ($1) RETURNING *',
      [config]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
