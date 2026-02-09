// Question data structure based on the JSON schema
export interface Question {
  id: string;
  chapter: number;
  license_classes: string[];
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

// License class types
export type LicenseClass = "1" | "2" | "3" | "4" | "5" | "Air Brakes";

// Answer state for a single question
export interface Answer {
  questionId: string;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  timeSpent: number; // in seconds
}

// Test session state
export interface TestSession {
  licenseClass: LicenseClass | null;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  startTime: number | null;
  endTime: number | null;
  isCompleted: boolean;
}

// Test results
export interface TestResult {
  id: string;
  licenseClass: LicenseClass;
  totalQuestions: number;
  correctAnswers: number;
  score: number; // percentage
  timeSpent: number; // in seconds
  date: string;
  answers: Answer[];
}
