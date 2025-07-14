// backend/routes/passwordReset.js
import express from 'express';
import pool from '../config/db.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const router = express.Router();

// Email config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // Your email
    pass: process.env.EMAIL_PASS        // Your email app password
  }
});

// 1. Request OTP
router.post('/request-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  try {
    await pool.query(
      'INSERT INTO password_reset_otps (email, otp, expires_at) VALUES ($1, $2, $3)',
      [email, otp, expiresAt]
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password - Employee Eval System",
      text: `Your OTP is ${otp}. It expires in 10 minutes.`
    });

    res.json({ message: 'OTP sent to your email.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Verify OTP + Reset Password
import bcrypt from 'bcrypt';

router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM password_reset_otps WHERE email = $1 AND otp = $2 AND used = false AND expires_at > NOW()',
      [email, otp]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashed, email]);
    await pool.query('UPDATE password_reset_otps SET used = true WHERE email = $1 AND otp = $2', [email, otp]);

    res.json({ message: '✅ Password reset successful.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
