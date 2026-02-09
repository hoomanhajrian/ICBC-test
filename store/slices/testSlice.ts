import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TestSession, Answer, LicenseClass, Question } from '@/types/test';

const initialState: TestSession = {
  licenseClass: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  startTime: null,
  endTime: null,
  isCompleted: false,
};

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    startTest: (state, action: PayloadAction<{ licenseClass: LicenseClass; questions: Question[] }>) => {
      state.licenseClass = action.payload.licenseClass;
      // Shuffle both the question order and answer options for each question
      const shuffledQuestions = shuffleArray(action.payload.questions);
      state.questions = shuffledQuestions.map(q => ({
        ...q,
        options: shuffleArray(q.options),
      }));
      state.currentQuestionIndex = 0;
      state.answers = shuffledQuestions.map(q => ({
        questionId: q.id,
        selectedAnswer: null,
        isCorrect: null,
        timeSpent: 0,
      }));
      state.startTime = Date.now();
      state.endTime = null;
      state.isCompleted = false;
    },
    
    answerQuestion: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      const answerIndex = state.answers.findIndex(a => a.questionId === action.payload.questionId);
      if (answerIndex !== -1) {
        const question = state.questions.find(q => q.id === action.payload.questionId);
        state.answers[answerIndex].selectedAnswer = action.payload.answer;
        state.answers[answerIndex].isCorrect = 
          question ? action.payload.answer === question.correct_answer : null;
      }
    },
    
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    
    goToQuestion: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.questions.length) {
        state.currentQuestionIndex = action.payload;
      }
    },
    
    completeTest: (state) => {
      state.isCompleted = true;
      state.endTime = Date.now();
    },
    
    resetTest: (state) => {
      return initialState;
    },
    
    updateQuestionTime: (state, action: PayloadAction<{ questionId: string; timeSpent: number }>) => {
      const answerIndex = state.answers.findIndex(a => a.questionId === action.payload.questionId);
      if (answerIndex !== -1) {
        state.answers[answerIndex].timeSpent = action.payload.timeSpent;
      }
    },
  },
});

export const {
  startTest,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  goToQuestion,
  completeTest,
  resetTest,
  updateQuestionTime,
} = testSlice.actions;

// Selectors
export const selectCurrentTest = (state: { test: TestSession }) => state.test;

export const selectCurrentQuestion = (state: { test: TestSession }) => {
  const { questions, currentQuestionIndex } = state.test;
  return questions[currentQuestionIndex] || null;
};

export const selectCurrentAnswer = (state: { test: TestSession }) => {
  const { answers, currentQuestionIndex, questions } = state.test;
  const currentQuestion = questions[currentQuestionIndex];
  return currentQuestion 
    ? answers.find(a => a.questionId === currentQuestion.id) || null
    : null;
};

export const selectProgress = (state: { test: TestSession }) => {
  const { questions, currentQuestionIndex } = state.test;
  return {
    current: currentQuestionIndex + 1,
    total: questions.length,
    percentage: questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0,
  };
};

export const selectTestResults = (state: { test: TestSession }) => {
  const { answers, questions, startTime, endTime, licenseClass } = state.test;
  const answeredQuestions = answers.filter(a => a.selectedAnswer !== null);
  const correctAnswers = answers.filter(a => a.isCorrect === true).length;
  const totalQuestions = questions.length;
  const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const timeSpent = startTime && endTime ? Math.floor((endTime - startTime) / 1000) : 0;

  return {
    licenseClass,
    totalQuestions,
    correctAnswers,
    answeredQuestions: answeredQuestions.length,
    score: Math.round(score * 100) / 100,
    timeSpent,
    isPassing: score >= 80, // Assuming 80% is passing
  };
};

export const selectAnsweredQuestions = (state: { test: TestSession }) => {
  return state.test.answers.filter(a => a.selectedAnswer !== null).length;
};

export default testSlice.reducer;
