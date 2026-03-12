import { Request, Response } from 'express';
import { generateEmailDrafts } from '../services/emailService.js';
import type { GenerateEmailRequest, GenerateEmailResponse, ErrorResponse } from '../types/index.js';

export const generateDrafts = async (
  req: Request<{}, {}, GenerateEmailRequest>,
  res: Response<GenerateEmailResponse | ErrorResponse>
): Promise<void> => {
  try {
    const { description, tone } = req.body;

    if (!description || !description.trim()) {
      res.status(400).json({
        error: 'ValidationError',
        message: 'Description is required'
      });
      return;
    }

    if (!tone || !['professional', 'friendly', 'formal'].includes(tone)) {
      res.status(400).json({
        error: 'ValidationError',
        message: 'Invalid tone. Must be one of: professional, friendly, formal'
      });
      return;
    }

    const drafts = await generateEmailDrafts(description, tone);

    res.status(200).json({ drafts });
  } catch (error) {
    console.error('Error in generateDrafts controller:', error);
    res.status(500).json({
      error: 'InternalServerError',
      message: error instanceof Error ? error.message : 'Failed to generate email drafts'
    });
  }
};
