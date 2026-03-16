export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? 'http://localhost:3001' : '');

export const API_ENDPOINTS = {
  EMAIL_GENERATE: '/api/email/generate',
} as const;
