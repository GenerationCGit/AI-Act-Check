import type { IntakeData } from "./types";

export interface Submission {
  id: string;
  submittedAt: string; // ISO 8601
  name: string;
  email: string;
  companyName: string;
  website: string;
  sector: string;
  companySize: string;
  aiUsageLevel: number;
  aiSystemsUsed: string;
}

const STORAGE_KEY = "ai-act-check-submissions";

export function saveSubmission(data: IntakeData): Submission {
  const submission: Submission = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    name: data.name.trim(),
    email: data.email.trim(),
    companyName: data.companyName.trim(),
    website: data.website.trim(),
    sector: data.sector,
    companySize: data.companySize,
    aiUsageLevel: data.aiUsageLevel,
    aiSystemsUsed: data.aiSystemsUsed.trim(),
  };

  const existing = getSubmissions();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, submission]));
  return submission;
}

export function getSubmissions(): Submission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Submission[]) : [];
  } catch {
    return [];
  }
}

export function getSubmissionCount(): number {
  return getSubmissions().length;
}
