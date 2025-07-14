// backend/routes/evaluation.js
import express from 'express';
import pool from '../config/db.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST - Submit Evaluation Form
router.post('/', verifyToken, async (req, res) => {
  const { part_ii, part_iii, part_iv, total_score } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `INSERT INTO evaluations (user_id, part_ii, part_iii, part_iv, total_score)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, part_ii, part_iii, part_iv, total_score]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Get Own Evaluation (Employee)
router.get('/me', verifyToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `SELECT * FROM evaluations WHERE user_id = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Admin: Get All Evaluations
router.get('/all', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }

  try {
    const result = await pool.query(`
      SELECT e.*, u.name, u.staff_id, u.email
      FROM evaluations e
      JOIN users u ON e.user_id = u.id
      ORDER BY u.staff_id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
