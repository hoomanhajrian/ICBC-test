'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setQuestions, selectAllQuestions, selectQuestionsLoaded } from '@/store/slices/questionsSlice';
import { startTest } from '@/store/slices/testSlice';
import { loadQuestions, getQuestionCounts, getQuestionsByClass } from '@/lib/questions';
import { LicenseClass } from '@/types/test';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const allQuestions = useAppSelector(selectAllQuestions);
  const isLoaded = useAppSelector(selectQuestionsLoaded);

  useEffect(() => {
    if (!isLoaded) {
      const questions = loadQuestions();
      dispatch(setQuestions(questions));
    }
  }, [dispatch, isLoaded]);

  const questionCounts = getQuestionCounts();

  const handleStartTest = (licenseClass: LicenseClass) => {
    // Get all questions for the selected license class
    const questions = getQuestionsByClass(licenseClass);
    
    if (questions.length === 0) {
      alert('No questions available for this license class.');
      return;
    }

    // Start the test
    dispatch(startTest({
      licenseClass,
      questions,
    }));

    // Navigate to test page
    router.push('/test');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Image 
                src="/logo.png" 
                alt="ICBC Logo" 
                width={80} 
                height={80}
                priority
                className="object-contain sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px]"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
              ICBC Driver License
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4 sm:mb-6 px-2">
              Practice Test
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Prepare for your ICBC driver's license exam with comprehensive practice tests.
              Study for Class 1-5 licenses and Air Brakes endorsement with questions based on official ICBC manuals.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl flex-shrink-0">⚠️</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
                  Practice Test Disclaimer
                </h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                  <strong>This is for practice purposes only and is NOT an official ICBC test.</strong>
                </p>
                <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1 list-disc list-inside">
                  <li>Questions are AI-generated based on ICBC manuals</li>
                  <li>Actual exam questions and answers may differ</li>
                  <li>Not affiliated with or endorsed by ICBC</li>
                </ul>
                <button
                  onClick={() => router.push('/about')}
                  className="mt-3 text-sm text-yellow-900 dark:text-yellow-300 underline hover:text-yellow-700 dark:hover:text-yellow-100 font-medium"
                >
                  Learn more about this project →
                </button>
              </div>
            </div>
          </div>

          {/* License Class Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Select Your Test
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { class: '1', name: 'Class 1', desc: 'Semi-trailer trucks and combinations' },
                { class: '2', name: 'Class 2', desc: 'Buses and special vehicles' },
                { class: '3', name: 'Class 3', desc: 'Trucks with more than two axles' },
                { class: '4', name: 'Class 4', desc: 'Taxis, ambulances, and small buses' },
                { class: '5', name: 'Class 5', desc: 'Passenger vehicles (cars, small trucks, vans)' },
                { class: 'Air Brakes', name: 'Air Brakes', desc: 'Air brake endorsement' },
              ].map((item) => (
                <button
                  key={item.class}
                  onClick={() => handleStartTest(item.class as LicenseClass)}
                  className="p-4 sm:p-6 text-left bg-gradient-to-br from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!isLoaded || (questionCounts[item.class] || 0) === 0}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <h4 className="text-lg sm:text-xl font-bold">{item.name}</h4>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm font-semibold inline-block w-fit">
                      {questionCounts[item.class] || 0} Questions
                    </span>
                  </div>
                  <p className="text-indigo-100 text-xs sm:text-sm">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Study Materials */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mt-4 sm:mt-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              📚 Study Materials
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
              Download the official ICBC manuals to prepare for your test:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="/driver-full.pdf"
                download="ICBC-Class-5-Driver-Manual.pdf"
                className="flex-1 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-100 text-center font-medium text-sm sm:text-base"
              >
                📄 Download Class 5 Driver Manual
              </a>
              <a
                href="/drive_commercial_veh_full.pdf"
                download="ICBC-Commercial-Vehicle-Manual.pdf"
                className="flex-1 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-100 text-center font-medium text-sm sm:text-base"
              >
                📄 Download Commercial Vehicle Manual
              </a>
            </div>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-6">
            <button
              onClick={() => router.push('/about')}
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium"
            >
              About This Project & Disclaimer →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
