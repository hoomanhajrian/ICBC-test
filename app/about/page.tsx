'use client';

import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
            <button
              onClick={() => router.push('/')}
              className="mb-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
            >
              ← Back to Home
            </button>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About This Project
            </h1>
            
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              {/* Open Source */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  🌟 Open Source Project
                </h2>
                <p className="leading-relaxed">
                  This is an open-source practice test application designed to help aspiring drivers 
                  prepare for their ICBC knowledge exams. The project is freely available for anyone 
                  to use, study, and contribute to.
                </p>
              </section>

              {/* AI-Generated Content */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  🤖 AI-Generated Questions
                </h2>
                <p className="leading-relaxed mb-3">
                  The practice questions in this application were generated using artificial intelligence (AI) 
                  technology based on official ICBC driver manuals. While we strive for accuracy, please note:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Questions are AI-generated and may not reflect actual ICBC exam questions</li>
                  <li>Answer explanations are created by AI and should be verified with official materials</li>
                  <li>The actual ICBC exam may have different question formats and content</li>
                  <li>Always refer to the official ICBC driver's manual as your primary study resource</li>
                </ul>
              </section>

              {/* Disclaimer */}
              <section className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
                  ⚠️ Important Disclaimer
                </h2>
                <p className="leading-relaxed text-yellow-800 dark:text-yellow-200 mb-3">
                  <strong>This is NOT an official ICBC practice test.</strong> This application is:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-yellow-800 dark:text-yellow-200">
                  <li>For educational and practice purposes only</li>
                  <li>Not affiliated with or endorsed by ICBC</li>
                  <li>Not a substitute for official ICBC study materials</li>
                  <li>Not guaranteed to reflect actual exam content or difficulty</li>
                </ul>
                <p className="leading-relaxed text-yellow-800 dark:text-yellow-200 mt-3">
                  <strong>We strongly recommend</strong> studying the official ICBC driver's manual and 
                  using official ICBC practice tests before taking your actual knowledge exam.
                </p>
              </section>

              {/* Technology */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  💻 Technology Stack
                </h2>
                <p className="leading-relaxed mb-3">
                  This project is built with modern web technologies:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Next.js 16</strong> - React framework with App Router</li>
                  <li><strong>TypeScript</strong> - Type-safe development</li>
                  <li><strong>Redux Toolkit</strong> - State management</li>
                  <li><strong>Tailwind CSS</strong> - Styling and responsive design</li>
                  <li><strong>AI Technology</strong> - Question generation from official manuals</li>
                </ul>
              </section>

              {/* Study Resources */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  📚 Official Study Resources
                </h2>
                <p className="leading-relaxed mb-3">
                  For the most accurate and up-to-date information, please consult:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <a 
                      href="https://www.icbc.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Official ICBC Website
                    </a>
                  </li>
                  <li>Official ICBC Driver's Manual (downloadable from the homepage)</li>
                  <li>Official ICBC Commercial Vehicle Manual (downloadable from the homepage)</li>
                  <li>ICBC-approved driver training programs</li>
                </ul>
              </section>

              {/* Contributing */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  🤝 Contributing
                </h2>
                <p className="leading-relaxed mb-3">
                  As an open-source project, we welcome contributions from the community. 
                  If you find errors, have suggestions for improvements, or want to add features, 
                  please feel free to contribute to the project.
                </p>
                <p className="leading-relaxed">
                  <a 
                    href="https://github.com/hoomanhajrian/ICBC-test" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    🔗 View on GitHub and Contribute
                  </a>
                </p>
              </section>

              {/* Developer */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  👨‍💻 Developer
                </h2>
                <p className="leading-relaxed">
                  Developed by{' '}
                  <a 
                    href="https://hh-portfolio.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Hoomi
                  </a>
                  . Visit the portfolio to see more projects and get in touch.
                </p>
              </section>

              {/* Contact/Support */}
              <section className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-indigo-900 dark:text-indigo-300 mb-3">
                  💡 Good Luck!
                </h2>
                <p className="leading-relaxed text-indigo-800 dark:text-indigo-200">
                  We hope this practice test helps you prepare for your ICBC knowledge exam. 
                  Remember to study thoroughly, understand the concepts, and always drive safely. 
                  Best wishes on your journey to becoming a licensed driver!
                </p>
              </section>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Return to Practice Tests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
