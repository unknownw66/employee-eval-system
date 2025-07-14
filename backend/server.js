// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Import routes
import authRoutes from './routes/auth.js';
import evaluationRoutes from './routes/evaluation.js';
import rankingsRoutes from './routes/rankings.js';
import notificationRoutes from './routes/notifications.js';
import formSettingsRoutes from './routes/formSettings.js';
import passwordResetRoutes from './routes/passwordReset.js';

// DB connect
import pool from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/evaluation', evaluationRoutes);
app.use('/api/rankings', rankingsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/form-settings', formSettingsRoutes);
app.use('/api/reset', passwordResetRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('✅ Employee Evaluation API is running');
});

// DB connect test (optional)
pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => console.error('❌ PostgreSQL Connection Error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
