'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentTest, resetTest } from '@/store/slices/testSlice';

export default function ReviewPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const test = useAppSelector(selectCurrentTest);

  useEffect(() => {
    // If test is not completed, redirect to home
    if (!test.isCompleted) {
      router.push('/');
    }
  }, [test.isCompleted, router]);

  if (!test.isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const handleBackToResults = () => {
    router.push('/results');
  };

  const handleStartNew = () => {
    dispatch(resetTest());
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Review Your Answers
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Class {test.licenseClass} - {test.questions.length} Questions
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleBackToResults}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Back to Results
                </button>
                <button
                  onClick={handleStartNew}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  New Test
                </button>
              </div>
            </div>
          </div>

          {/* Questions Review */}
          <div className="space-y-6">
            {test.questions.map((question, qIndex) => {
              const answer = test.answers.find(a => a.questionId === question.id);
              const userAnswer = answer?.selectedAnswer;
              const correctAnswer = question.correct_answer;
              const isCorrect = answer?.isCorrect === true;

              return (
                <div
                  key={question.id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 ${
                    isCorrect
                      ? 'border-green-500'
                      : userAnswer !== null
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                          Question {qIndex + 1}
                        </span>
                        {userAnswer === null && (
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                            Not Answered
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {question.chapter}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {question.question}
                      </h3>
                    </div>
                    <div className="ml-4">
                      {isCorrect ? (
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : userAnswer !== null ? (
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400">—</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, index) => {
                      const isUserAnswer = userAnswer === option;
                      const isCorrectOption = correctAnswer === option;

                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-2 ${
                            isCorrectOption
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : isUserAnswer && !isCorrect
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="mr-3 mt-0.5">
                              {isCorrectOption && (
                                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                              {isUserAnswer && !isCorrect && (
                                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`${
                                isCorrectOption
                                  ? 'text-green-900 dark:text-green-100 font-medium'
                                  : isUserAnswer && !isCorrect
                                  ? 'text-red-900 dark:text-red-100'
                                  : 'text-gray-900 dark:text-gray-100'
                              }`}>
                                {option}
                              </p>
                              {isUserAnswer && !isCorrect && (
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                  Your answer
                                </p>
                              )}
                              {isCorrectOption && (
                                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                                  Correct answer
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
                      Explanation
                    </h4>
                    <p className="text-indigo-800 dark:text-indigo-200 text-sm">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-6">
            <div className="flex justify-center gap-4">
              <button
                onClick={handleBackToResults}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Back to Results
              </button>
              <button
                onClick={handleStartNew}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Take Another Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
