import type { Request, Response, NextFunction } from 'express';

const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

const requestLog = new Map<string, { count: number; resetAt: number }>();

export const rateLimiter = (req: Request, res: Response, next: NextFunction): void => {
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
