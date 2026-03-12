import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};

export const validateConfig = (): void => {
  if (!config.anthropicApiKey) {
    throw new Error('ANTHROPIC_API_KEY is required in environment variables');
  }
};
