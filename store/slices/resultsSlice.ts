import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TestResult } from '@/types/test';

interface ResultsState {
  results: TestResult[];
}

const initialState: ResultsState = {
  results: [],
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<TestResult>) => {
      state.results.push(action.payload);
      // Keep only the last 50 results
      if (state.results.length > 50) {
        state.results = state.results.slice(-50);
      }
    },
    
    clearResults: (state) => {
      state.results = [];
    },
    
    removeResult: (state, action: PayloadAction<string>) => {
      state.results = state.results.filter(r => r.id !== action.payload);
    },
    
    loadResults: (state, action: PayloadAction<TestResult[]>) => {
      state.results = action.payload;
    },
  },
});

export const { addResult, clearResults, removeResult, loadResults } = resultsSlice.actions;

// Selectors
export const selectAllResults = (state: { results: ResultsState }) => 
  state.results.results;

export const selectResultsByClass = (licenseClass: string) => 
  (state: { results: ResultsState }) => 
    state.results.results.filter(r => r.licenseClass === licenseClass);

export const selectLatestResult = (state: { results: ResultsState }) => {
  const results = state.results.results;
  return results.length > 0 ? results[results.length - 1] : null;
};

export const selectAverageScore = (state: { results: ResultsState }) => {
  const results = state.results.results;
  if (results.length === 0) return 0;
  const totalScore = results.reduce((sum, result) => sum + result.score, 0);
  return Math.round((totalScore / results.length) * 100) / 100;
};

export const selectBestScore = (state: { results: ResultsState }) => {
  const results = state.results.results;
  if (results.length === 0) return 0;
  return Math.max(...results.map(r => r.score));
};

export default resultsSlice.reducer;
