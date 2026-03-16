import type { EmailDraft, ToneType } from '../types/email';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';

interface GenerateDraftsParams {
  description: string;
  tone: ToneType;
}

interface BackendResponse {
  drafts: EmailDraft[];
}

export const generateEmailDrafts = async ({ description, tone }: GenerateDraftsParams): Promise<EmailDraft[]> => {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.EMAIL_GENERATE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, tone }),
    });
  } catch {
    throw new Error('Network error. Please check your connection and try again.');
  }

  if (!response.ok) {
    let errorMessage = `Request failed (${response.status})`;
    try {
      const errorData = await response.json() as unknown;
      if (typeof errorData === 'object' && errorData !== null && 'message' in errorData) {
        errorMessage = String((errorData as { message: unknown }).message);
      }
    } catch {
      // Use the HTTP status message if JSON parsing fails
    }
    throw new Error(errorMessage);
  }

  const data = await response.json() as BackendResponse;

  if (!Array.isArray(data.drafts)) {
    throw new Error('Invalid response from server');
  }

  return data.drafts;
};
