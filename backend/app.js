// backend/app.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import evaluationRoutes from './routes/evaluation.js';
import rankingsRoutes from './routes/rankings.js';
import formSettingsRoutes from './routes/formSettings.js';
import notificationRoutes from './routes/notifications.js';
import passwordResetRoutes from './routes/passwordReset.js';



const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/evaluation', evaluationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rankings', rankingsRoutes);
app.use('/api/form-settings', formSettingsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reset', passwordResetRoutes);

app.get('/', (req, res) => {
  res.send("✅ API is running");
});

export default app;
