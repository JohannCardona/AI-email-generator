import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes.js';
import { config, validateConfig } from './config/env.js';
import { rateLimiter } from './middleware/rateLimiter.js';

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
