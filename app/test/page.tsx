'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectCurrentTest,
  selectCurrentQuestion,
  selectCurrentAnswer,
  selectProgress,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  completeTest,
  resetTest,
} from '@/store/slices/testSlice';

export default function TestPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const test = useAppSelector(selectCurrentTest);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const currentAnswer = useAppSelector(selectCurrentAnswer);
  const progress = useAppSelector(selectProgress);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    // If no test is active, redirect to home
    if (!test.licenseClass || test.questions.length === 0) {
      router.push('/');
    }
  }, [test.licenseClass, test.questions.length, router]);

  useEffect(() => {
    // Reset selected option when question changes
    setSelectedOption(currentAnswer?.selectedAnswer || null);
  }, [test.currentQuestionIndex, currentAnswer]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const handleSelectAnswer = (answer: string) => {
    setSelectedOption(answer);
    dispatch(answerQuestion({
      questionId: currentQuestion.id,
      answer: answer,
    }));
  };

  const handleNext = () => {
    if (test.currentQuestionIndex < test.questions.length - 1) {
      dispatch(nextQuestion());
    }
  };

  const handlePrevious = () => {
    if (test.currentQuestionIndex > 0) {
      dispatch(previousQuestion());
    }
  };

  const handleSubmitTest = () => {
    dispatch(completeTest());
    router.push('/results');
  };

  const isLastQuestion = test.currentQuestionIndex === test.questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-t-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Class {test.licenseClass} Practice Test
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Question {progress.current} of {progress.total}
                </p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to exit the test? Your progress will be lost.')) {
                    dispatch(resetTest());
                    router.push('/');
                  }
                }}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 font-medium"
              >
                Exit Test
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-gray-800 shadow-lg p-8 mb-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedOption === option
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                        selectedOption === option
                          ? 'border-indigo-600 bg-indigo-600'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {selectedOption === option && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-gray-100">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={test.currentQuestionIndex === 0}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  {test.answers.filter(a => a.selectedAnswer !== null).length}
                </span>
                {' / '}
                {test.questions.length} answered
              </div>

              {isLastQuestion ? (
                <button
                  onClick={handleSubmitTest}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
