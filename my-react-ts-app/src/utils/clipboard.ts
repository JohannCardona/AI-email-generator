import type { EmailDraft } from '../types/email';

export const copyToClipboard = async (draft: EmailDraft): Promise<void> => {
  const text = `Subject: ${draft.subject}\n\n${draft.body}`;
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    throw new Error('Failed to copy email to clipboard');
  }
};
