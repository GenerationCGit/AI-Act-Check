export type QuestionType = "single" | "multi";

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options: QuestionOption[];
  helperText?: string;
}

export type Answer = string | string[];

export type Answers = Record<string, Answer>;

export type RiskCategory = "low" | "medium" | "high" | "prohibited";

export interface AssessmentResult {
  category: RiskCategory;
  badge: string;
  headline: string;
  description: string;
  reasons: string[];
  nextSteps: string[];
}

export interface IntakeData {
  name: string;
  email: string;
  companyName: string;
  website: string;
  sector: string;
  companySize: string;
  aiUsageLevel: number;
  aiSystemsUsed: string;
}

export const emptyIntakeData: IntakeData = {
  name: "",
  email: "",
  companyName: "",
  website: "",
  sector: "",
  companySize: "",
  aiUsageLevel: 5,
  aiSystemsUsed: "",
};

export type AppState = "landing" | "intake" | "questionnaire" | "loading" | "result";
