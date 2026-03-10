import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { initDb } from './db/connection';
import counterRouter from './api/routes/counter';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Initialize database
initDb();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/counter', counterRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Error handling middleware
app.use(errorHandler);

export default app;