import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, LicenseClass } from '@/types/test';

interface QuestionsState {
  allQuestions: Question[];
  isLoaded: boolean;
  error: string | null;
}

const initialState: QuestionsState = {
  allQuestions: [],
  isLoaded: false,
  error: null,
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.allQuestions = action.payload;
      state.isLoaded = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoaded = false;
    },
  },
});

export const { setQuestions, setError } = questionsSlice.actions;

// Selectors
export const selectAllQuestions = (state: { questions: QuestionsState }) => 
  state.questions.allQuestions;

export const selectQuestionsByClass = (licenseClass: LicenseClass) => 
  (state: { questions: QuestionsState }) => 
    state.questions.allQuestions.filter(q => 
      q.license_classes.includes(licenseClass)
    );

export const selectQuestionsLoaded = (state: { questions: QuestionsState }) => 
  state.questions.isLoaded;

export const selectQuestionsError = (state: { questions: QuestionsState }) => 
  state.questions.error;

export default questionsSlice.reducer;
