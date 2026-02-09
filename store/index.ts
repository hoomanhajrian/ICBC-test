import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './slices/questionsSlice';
import testReducer from './slices/testSlice';
import resultsReducer from './slices/resultsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      questions: questionsReducer,
      test: testReducer,
      results: resultsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['test/startTest', 'test/completeTest'],
          // Ignore these field paths in all actions
          ignoredActionPaths: ['payload.timestamp'],
          // Ignore these paths in the state
          ignoredPaths: ['test.startTime', 'test.endTime'],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
