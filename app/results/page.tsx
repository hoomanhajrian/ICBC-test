'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentTest, selectTestResults, resetTest } from '@/store/slices/testSlice';
import { addResult } from '@/store/slices/resultsSlice';

export default function ResultsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const test = useAppSelector(selectCurrentTest);
  const results = useAppSelector(selectTestResults);
  const resultsSaved = useRef(false);

  useEffect(() => {
    // If test is not completed, redirect to home
    if (!test.isCompleted) {
      router.push('/');
      return;
    }

    // Save results to history only once
    if (!resultsSaved.current) {
      resultsSaved.current = true;
      dispatch(addResult({
        id: `test-${Date.now()}`,
        licenseClass: results.licenseClass!,
        totalQuestions: results.totalQuestions,
        correctAnswers: results.correctAnswers,
        score: results.score,
        timeSpent: results.timeSpent,
        date: new Date().toISOString(),
        answers: test.answers,
      }));
    }
  }, [test.isCompleted, router, dispatch, results, test.answers]);

  if (!test.isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const handleTryAgain = () => {
    dispatch(resetTest());
    router.push('/');
  };

  const handleReview = () => {
    router.push('/review');
  };

  const isPassing = results.score >= 80;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Results Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-6">
            {/* Pass/Fail Header */}
            <div className={`text-center mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl ${
              isPassing
                ? 'bg-green-100 dark:bg-green-900/30'
                : 'bg-red-100 dark:bg-red-900/30'
            }`}>
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
                {isPassing ? '🎉' : '📚'}
              </div>
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${
                isPassing
                  ? 'text-green-700 dark:text-green-400'
                  : 'text-red-700 dark:text-red-400'
              }`}>
                {isPassing ? 'Congratulations!' : 'Keep Practicing!'}
              </h1>
              <p className={`text-sm sm:text-base lg:text-lg ${
                isPassing
                  ? 'text-green-600 dark:text-green-300'
                  : 'text-red-600 dark:text-red-300'
              }`}>
                {isPassing
                  ? 'You passed the test!'
                  : 'You need 80% to pass. Try again!'}
              </p>
            </div>

            {/* Score */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-block">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-indigo-600 dark:text-indigo-400">
                  {results.score}%
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mt-2">
                  Your Score
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {results.correctAnswers}/{results.totalQuestions}
                </div>
                <div className="text-gray-600 dark:text-gray-300 mt-2">
                  Correct Answers
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {Math.floor(results.timeSpent / 60)}:{(results.timeSpent % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-gray-600 dark:text-gray-300 mt-2">
                  Time Taken
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  Class {results.licenseClass}
                </div>
                <div className="text-gray-600 dark:text-gray-300 mt-2">
                  License Class
                </div>
              </div>
            </div>

            {/* Performance Breakdown */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Performance
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Correct</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {results.correctAnswers} ({((results.correctAnswers / results.totalQuestions) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(results.correctAnswers / results.totalQuestions) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Incorrect</span>
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      {results.totalQuestions - results.correctAnswers} ({(((results.totalQuestions - results.correctAnswers) / results.totalQuestions) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${((results.totalQuestions - results.correctAnswers) / results.totalQuestions) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Summary */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Questions Overview
              </h3>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-3">
                {test.questions.map((question, index) => {
                  const answer = test.answers.find(a => a.questionId === question.id);
                  const isCorrect = answer?.isCorrect === true;
                  const isAnswered = answer?.selectedAnswer !== null;
                  
                  return (
                    <div
                      key={question.id}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm font-semibold ${
                        isCorrect
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-2 border-green-500'
                          : isAnswered
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-2 border-red-500'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-2 border-gray-300 dark:border-gray-600'
                      }`}
                      title={`Question ${index + 1}: ${isCorrect ? 'Correct' : isAnswered ? 'Incorrect' : 'Not answered'}`}
                    >
                      {index + 1}
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">Correct</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">Incorrect</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">Not answered</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleReview}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <span>📋</span>
                View Detailed Review
              </button>
              <button
                onClick={handleTryAgain}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
              >
                Take Another Test
              </button>
            </div>
          </div>

          {/* Call to Action for Review */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl p-4 sm:p-6 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📋</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
                  Review All Questions & Answers
                </h3>
                <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-3">
                  See detailed explanations for each question, your answers, and the correct answers to learn from your mistakes.
                </p>
                <button
                  onClick={handleReview}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm"
                >
                  Go to Detailed Review →
                </button>
              </div>
            </div>
          </div>

          {/* Tips */}
          {!isPassing && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
                💡 Study Tips
              </h3>
              <ul className="text-yellow-800 dark:text-yellow-400 space-y-2 text-sm">
                <li>• Review the questions you got wrong in the review section</li>
                <li>• Focus on chapters where you had the most incorrect answers</li>
                <li>• Read the ICBC driver's manual thoroughly</li>
                <li>• Take more practice tests to build confidence</li>
                <li>• You need at least 80% to pass the actual test</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
