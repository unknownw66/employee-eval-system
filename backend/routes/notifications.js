// backend/routes/notifications.js
import express from 'express';
import pool from '../config/db.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all notifications for current user
router.get('/', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const result = await pool.query(
    'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  res.json(result.rows);
});

// Mark notification as read
router.put('/:id/read', verifyToken, async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE notifications SET read = true WHERE id = $1 RETURNING *',
    [id]
  );
  res.json(result.rows[0]);
});

// Admin sends notification
router.post('/send', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });

  const { message, target_user_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *',
      [target_user_id, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
