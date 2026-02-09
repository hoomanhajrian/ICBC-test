# ICBC Commercial Driver Practice Test

A Next.js application for practicing ICBC commercial driver licensing tests with comprehensive questions for Class 1, 2, 3, 4, and Air Brakes endorsement.

## Features

- ✅ **120 Practice Questions** - Comprehensive question bank from the official ICBC manual
- 🎯 **Class-Based Tests** - Questions organized by license class (1, 2, 3, 4, Air Brakes)
- 🔄 **Redux State Management** - Robust state management with Redux Toolkit
- 📊 **Results Tracking** - Track your test history and scores
- 🌙 **Dark Mode Support** - Built-in dark mode
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Next.js 16** - Built with the latest Next.js App Router

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS 4
- **React:** 19.2.3

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ICBC-test
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ICBC-test/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with Redux provider
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── store/                 # Redux store configuration
│   ├── index.ts          # Store setup
│   ├── hooks.ts          # Typed Redux hooks
│   ├── StoreProvider.tsx # Redux provider component
│   └── slices/           # Redux slices
│       ├── questionsSlice.ts  # Questions state
│       ├── testSlice.ts       # Current test state
│       └── resultsSlice.ts    # Results history
├── data/                  # Question bank
│   └── questions.json    # 120 practice questions
├── types/                 # TypeScript types
│   ├── test.ts          # Test-related types
│   └── ...
├── lib/                   # Utility functions
│   ├── questions.ts      # Question helpers
│   └── storage.ts        # LocalStorage utilities
└── docs/                  # Documentation
    └── REDUX_GUIDE.md    # Redux implementation guide
```

## Redux State Management

The application uses Redux Toolkit with three main slices:

### Questions Slice
Manages the question bank loaded from JSON.

### Test Slice
Manages the current test session including:
- Current question
- User answers
- Progress tracking
- Time tracking

### Results Slice
Stores historical test results for progress tracking.

See [docs/REDUX_GUIDE.md](docs/REDUX_GUIDE.md) for detailed implementation guide.

## Question Bank

The question bank includes 120 questions mapped to license classes according to the ICBC "Licence study chart":

- **Class 1:** 120 questions covering all chapters
- **Class 2:** 100 questions
- **Class 3:** 100 questions  
- **Class 4:** 100 questions
- **Air Brakes:** 49 questions (air brake-specific)

Questions cover:
- General Knowledge (See-Think-Do, stopping distances, signs)
- Class Specifics (passenger safety, heavy truck handling)
- Technical Specs (air brake components, S-cam adjustment)
- Regulations (Hours of Service, trip inspections)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the terms specified in the LICENSE file.

## Acknowledgments

- Questions based on the official ICBC "Driving Commercial Vehicles" manual
- Built with [Next.js](https://nextjs.org/)
- State management with [Redux Toolkit](https://redux-toolkit.js.org/)

