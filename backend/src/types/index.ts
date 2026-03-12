export interface EmailDraft {
  subject: string;
  body: string;
}

export interface GenerateEmailRequest {
  description: string;
  tone: ToneType;
}

export interface GenerateEmailResponse {
  drafts: EmailDraft[];
}

export type ToneType = "professional" | "friendly" | "formal";

export interface ErrorResponse {
  error: string;
  message: string;
}
