import { Request, Response } from 'express';
import { generateEmailDrafts } from '../services/emailService.js';
import type { GenerateEmailRequest, GenerateEmailResponse, ErrorResponse, ToneType } from '../types/index.js';

const VALID_TONES: ToneType[] = ['professional', 'friendly', 'formal'];
const MAX_DESCRIPTION_LENGTH = 2000;

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

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      res.status(400).json({
        error: 'ValidationError',
        message: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer`
      });
      return;
    }

    if (!tone || !VALID_TONES.includes(tone)) {
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
      message: 'Failed to generate email drafts'
    });
  }
};
