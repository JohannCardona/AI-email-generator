import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes.js';
import { config, validateConfig } from './config/env.js';

const app = express();

// Validate configuration
try {
  validateConfig();
} catch (error) {
  console.error('Configuration error:', error);
  process.exit(1);
}

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(express.json());

// Simple in-memory rate limiter: 30 requests per 15 minutes per IP
const requestLog = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

const rateLimiter = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const ip = req.ip ?? 'unknown';
  const now = Date.now();
  const record = requestLog.get(ip);

  if (!record || now > record.resetAt) {
    requestLog.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (record.count >= RATE_LIMIT_MAX) {
    res.status(429).json({ error: 'TooManyRequests', message: 'Too many requests. Please try again later.' });
    return;
  }

  record.count++;
  next();
};

// Routes
app.use('/api/email', rateLimiter, emailRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'InternalServerError',
    message: config.nodeEnv === 'development' ? err.message : 'An error occurred'
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`CORS origin: ${config.corsOrigin}`);
});
