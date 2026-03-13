import type { EmailDraft } from '../types/email';

export const copyToClipboard = (draft: EmailDraft): void => {
  const text = `Subject: ${draft.subject}\n\n${draft.body}`;
  navigator.clipboard.writeText(text);
};
