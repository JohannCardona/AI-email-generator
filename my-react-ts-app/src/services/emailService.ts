import type { EmailDraft, ToneType } from '../types/email';

interface GenerateDraftsParams {
  description: string;
  tone: ToneType;
}

interface BackendResponse {
  drafts: EmailDraft[];
}

interface BackendError {
  error: string;
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const generateEmailDrafts = async ({ description, tone }: GenerateDraftsParams): Promise<EmailDraft[]> => {
  const response = await fetch(`${API_BASE_URL}/api/email/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      tone
    })
  });

  if (!response.ok) {
    const errorData: BackendError = await response.json();
    throw new Error(errorData.message || "Failed to generate drafts");
  }

  const data: BackendResponse = await response.json();
  return data.drafts;
};
