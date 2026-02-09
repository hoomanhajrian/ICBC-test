# Redux State Management Guide

This application uses **Redux Toolkit** for state management with three main slices:

## Store Structure

### 1. Questions Slice (`store/slices/questionsSlice.ts`)
Manages the question bank loaded from JSON.

**State:**
- `allQuestions`: Array of all questions
- `isLoaded`: Boolean indicating if questions are loaded
- `error`: Error message if loading fails

**Actions:**
- `setQuestions(questions)`: Load questions into the store
- `setError(error)`: Set an error message

**Selectors:**
- `selectAllQuestions`: Get all questions
- `selectQuestionsByClass(licenseClass)`: Filter questions by license class
- `selectQuestionsLoaded`: Check if questions are loaded
- `selectQuestionsError`: Get error message

### 2. Test Slice (`store/slices/testSlice.ts`)
Manages the current test session.

**State:**
- `licenseClass`: Current test's license class
- `questions`: Questions for current test
- `currentQuestionIndex`: Index of current question
- `answers`: Array of user answers
- `startTime`: Test start timestamp
- `endTime`: Test end timestamp
- `isCompleted`: Whether test is completed

**Actions:**
- `startTest({ licenseClass, questions })`: Start a new test
- `answerQuestion({ questionId, answer })`: Record an answer
- `nextQuestion()`: Move to next question
- `previousQuestion()`: Move to previous question
- `goToQuestion(index)`: Jump to specific question
- `completeTest()`: Mark test as completed
- `resetTest()`: Reset test state
- `updateQuestionTime({ questionId, timeSpent })`: Track time per question

**Selectors:**
- `selectCurrentTest`: Get entire test state
- `selectCurrentQuestion`: Get current question object
- `selectCurrentAnswer`: Get current question's answer
- `selectProgress`: Get test progress (current, total, percentage)
- `selectTestResults`: Calculate test results
- `selectAnsweredQuestions`: Count answered questions

### 3. Results Slice (`store/slices/resultsSlice.ts`)
Stores historical test results.

**State:**
- `results`: Array of completed test results

**Actions:**
- `addResult(result)`: Add a new test result
- `clearResults()`: Clear all results
- `removeResult(id)`: Remove specific result
- `loadResults(results)`: Load results from storage

**Selectors:**
- `selectAllResults`: Get all results
- `selectResultsByClass(licenseClass)`: Filter results by class
- `selectLatestResult`: Get most recent result
- `selectAverageScore`: Calculate average score
- `selectBestScore`: Get highest score

## Usage Examples

### Loading Questions
```typescript
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setQuestions } from '@/store/slices/questionsSlice';
import { loadQuestions } from '@/lib/questions';

export default function LoadQuestions() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const questions = loadQuestions();
    dispatch(setQuestions(questions));
  }, [dispatch]);
  
  return null;
}
```

### Starting a Test
```typescript
'use client';

import { useAppDispatch } from '@/store/hooks';
import { startTest } from '@/store/slices/testSlice';
import { getRandomQuestions } from '@/lib/questions';

export default function StartTestButton() {
  const dispatch = useAppDispatch();
  
  const handleStartTest = (licenseClass: string) => {
    const questions = getRandomQuestions(licenseClass, 50);
    dispatch(startTest({ 
      licenseClass: licenseClass as any, 
      questions 
    }));
  };
  
  return (
    <button onClick={() => handleStartTest('1')}>
      Start Class 1 Test
    </button>
  );
}
```

### Answering Questions
```typescript
'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { answerQuestion, nextQuestion } from '@/store/slices/testSlice';
import { selectCurrentQuestion, selectCurrentAnswer } from '@/store/slices/testSlice';

export default function QuestionComponent() {
  const dispatch = useAppDispatch();
  const question = useAppSelector(selectCurrentQuestion);
  const answer = useAppSelector(selectCurrentAnswer);
  
  const handleAnswer = (option: string) => {
    if (question) {
      dispatch(answerQuestion({ 
        questionId: question.id, 
        answer: option 
      }));
    }
  };
  
  const handleNext = () => {
    dispatch(nextQuestion());
  };
  
  if (!question) return null;
  
  return (
    <div>
      <h2>{question.question}</h2>
      {question.options.map((option) => (
        <button 
          key={option}
          onClick={() => handleAnswer(option)}
          disabled={answer?.selectedAnswer !== null}
        >
          {option}
        </button>
      ))}
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
```

### Viewing Results
```typescript
'use client';

import { useAppSelector } from '@/store/hooks';
import { selectTestResults } from '@/store/slices/testSlice';

export default function ResultsDisplay() {
  const results = useAppSelector(selectTestResults);
  
  return (
    <div>
      <h2>Test Results</h2>
      <p>Score: {results.score}%</p>
      <p>Correct: {results.correctAnswers} / {results.totalQuestions}</p>
      <p>Time: {Math.floor(results.timeSpent / 60)}m {results.timeSpent % 60}s</p>
      <p>{results.isPassing ? '✅ Passed' : '❌ Failed'}</p>
    </div>
  );
}
```

### Saving Results
```typescript
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addResult } from '@/store/slices/resultsSlice';
import { selectTestResults, selectCurrentTest } from '@/store/slices/testSlice';

export default function SaveResults() {
  const dispatch = useAppDispatch();
  const testState = useAppSelector(selectCurrentTest);
  const results = useAppSelector(selectTestResults);
  
  useEffect(() => {
    if (testState.isCompleted && results.licenseClass) {
      dispatch(addResult({
        id: Date.now().toString(),
        licenseClass: results.licenseClass,
        totalQuestions: results.totalQuestions,
        correctAnswers: results.correctAnswers,
        score: results.score,
        timeSpent: results.timeSpent,
        date: new Date().toISOString(),
        answers: testState.answers,
      }));
    }
  }, [testState.isCompleted, dispatch, testState.answers, results]);
  
  return null;
}
```

## Custom Hooks

Use the typed hooks from `store/hooks.ts`:
- `useAppDispatch()`: Typed version of useDispatch
- `useAppSelector()`: Typed version of useSelector
- `useAppStore()`: Access to the store instance

## Persistence

To persist state across page refreshes, you can add middleware like `redux-persist` or implement localStorage manually in your components.
