import { Question } from '@/types/test';
import questionsData from '@/data/questions.json';

/**
 * Load questions from the JSON file
 */
export function loadQuestions(): Question[] {
  return questionsData as Question[];
}

/**
 * Get questions filtered by license class
 */
export function getQuestionsByClass(licenseClass: string): Question[] {
  const allQuestions = loadQuestions();
  return allQuestions.filter(q => q.license_classes.includes(licenseClass));
}

/**
 * Get a random subset of questions for a test
 */
export function getRandomQuestions(
  licenseClass: string, 
  count: number
): Question[] {
  const questions = getQuestionsByClass(licenseClass);
  
  // Shuffle array using Fisher-Yates algorithm
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get questions by chapter
 */
export function getQuestionsByChapter(chapter: number): Question[] {
  const allQuestions = loadQuestions();
  return allQuestions.filter(q => q.chapter === chapter);
}

/**
 * Get count of questions per license class
 */
export function getQuestionCounts(): Record<string, number> {
  const allQuestions = loadQuestions();
  const counts: Record<string, number> = {};
  
  allQuestions.forEach(q => {
    q.license_classes.forEach(cls => {
      counts[cls] = (counts[cls] || 0) + 1;
    });
  });
  
  return counts;
}
