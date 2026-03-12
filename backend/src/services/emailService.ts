import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config/env.js';
import type { EmailDraft, ToneType } from '../types/index.js';

const anthropic = new Anthropic({
  apiKey: config.anthropicApiKey,
});

const createPrompt = (description: string, tone: ToneType): string => {
  return `
  Generate 3 different email drafts based on this description: "${description}"

  Tone: ${tone}

  Requirements:
  - Create 3 distinct versions with different approaches
  - Each should be complete and ready to send
  - Include appropriate subject lines
  - Keep emails concise and clear
  - Match the ${tone} tone throughout

  Format your response as JSON only (no markdown, no preamble):
  {
    "drafts": [
      {"subject": "...", "body": "..."},
      {"subject": "...", "body": "..."},
      {"subject": "...", "body": "..."}
    ]
  }`;
};

export const generateEmailDrafts = async (
  description: string,
  tone: ToneType
): Promise<EmailDraft[]> => {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: createPrompt(description, tone),
        },
      ],
    });

    const textContent = message.content
      .filter((block) => block.type === 'text')
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('');

    const cleanJson = textContent.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return parsed.drafts;
  } catch (error) {
    console.error('Error generating email drafts:', error);
    throw new Error('Failed to generate email drafts');
  }
};
