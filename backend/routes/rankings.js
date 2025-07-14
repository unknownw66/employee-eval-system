// backend/routes/rankings.js
import express from 'express';
import pool from '../config/db.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin: Add or Update Ranking
router.post('/update', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }

  const { user_id, score, rank } = req.body;

  try {
    const existing = await pool.query(
      'SELECT * FROM rankings WHERE user_id = $1',
      [user_id]
    );

    let result;
    if (existing.rows.length > 0) {
      // update
      result = await pool.query(
        'UPDATE rankings SET score = $1, rank = $2, updated_at = NOW() WHERE user_id = $3 RETURNING *',
        [score, rank, user_id]
      );
    } else {
      // insert
      result = await pool.query(
        'INSERT INTO rankings (user_id, score, rank) VALUES ($1, $2, $3) RETURNING *',
        [user_id, score, rank]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Employee: Get My Rank
router.get('/me', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT score, rank, updated_at FROM rankings WHERE user_id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ranking not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Everyone: Get Global Rankings List
router.get('/all', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.user_id, r.score, r.rank, u.name, u.staff_id
      FROM rankings r
      JOIN users u ON u.id = r.user_id
      ORDER BY r.rank ASC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
