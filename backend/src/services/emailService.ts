import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config/env.js';
import type { EmailDraft, ToneType } from '../types/index.js';

const anthropic = new Anthropic({
  apiKey: config.anthropicApiKey,
});

const TIMEOUT_MS = 30_000;

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

const isValidDraft = (d: unknown): d is EmailDraft =>
  typeof d === 'object' &&
  d !== null &&
  typeof (d as EmailDraft).subject === 'string' &&
  typeof (d as EmailDraft).body === 'string';

export const generateEmailDrafts = async (
  description: string,
  tone: ToneType
): Promise<EmailDraft[]> => {
  try {
    const message = await Promise.race([
      anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: createPrompt(description, tone) }],
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), TIMEOUT_MS)
      ),
    ]);

    const textContent = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('');

    const cleanJson = textContent.replace(/```json\n?|\n?```/g, '').trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(cleanJson);
    } catch {
      console.error('JSON parse error. Raw response:', textContent);
      throw new Error('API returned an invalid response format');
    }

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !Array.isArray((parsed as { drafts?: unknown }).drafts) ||
      !(parsed as { drafts: unknown[] }).drafts.every(isValidDraft)
    ) {
      throw new Error('API returned an unexpected response structure');
    }

    return (parsed as { drafts: EmailDraft[] }).drafts;
  } catch (error) {
    console.error('Error generating email drafts:', error);
    throw error instanceof Error ? error : new Error('Failed to generate email drafts');
  }
};
