# AI-Powered CV Builder

A modern, multi-step CV/Resume builder application built with Next.js, TypeScript, Redux, and AI-SDK. Create professional resumes with the help of AI-powered generation.

## Features

- ✅ **Multi-Step Form**: 7-step guided process for building your resume
- ✅ **Redux State Management**: Persistent state management with Redux Toolkit and Redux Persist
- ✅ **AI-Powered Generation**: Uses Google Gemini AI to generate professional resumes
- ✅ **PDF Export**: Download your resume as a PDF
- ✅ **Responsive Design**: Fully responsive, works on all devices
- ✅ **Smooth Animations**: Beautiful transitions using Framer Motion
- ✅ **Easy Color Customization**: Theme-based color system for quick customization

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit + Redux Persist
- **AI**: AI SDK with Google Gemini
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **PDF Generation**: jsPDF + html2canvas

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Google Gemini API key (free at [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cv-builder
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
# You can use either variable name (both work):
GEMINI_API_KEY=your_gemini_api_key_here
# OR
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

**How to get your Gemini API Key:**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key
5. Paste it in your `.env.local` file

**Important:** 
- Make sure the `.env.local` file is in the root directory (same level as `package.json`)
- Restart your development server after adding the API key
- Never commit `.env.local` to git (it's already in `.gitignore`)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
cv-builder/
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── resume.ts          # Server action for AI resume generation
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout with Redux provider
│   │   └── page.tsx                # Main page with step routing
│   ├── components/
│   │   ├── providers/
│   │   │   └── ReduxProvider.tsx  # Redux provider wrapper
│   │   ├── steps/
│   │   │   ├── Step1PersonalInfo.tsx
│   │   │   ├── Step2CareerSummary.tsx
│   │   │   ├── Step3SkillsExperience.tsx
│   │   │   ├── Step4EducationCertifications.tsx
│   │   │   ├── Step5ContactInfo.tsx
│   │   │   ├── Step6AIGeneration.tsx
│   │   │   └── Step7ReviewDownload.tsx
│   │   ├── NavigationButtons.tsx   # Back/Next navigation
│   │   ├── StepContainer.tsx       # Step wrapper with animations
│   │   └── Stepper.tsx             # Progress indicator
│   └── lib/
│       ├── hooks/
│       │   ├── usePDF.ts           # PDF generation hook
│       │   └── index.ts            # Typed Redux hooks
│       ├── slices/
│       │   └── cvSlice.ts          # Redux slice for CV data
│       ├── store.ts                 # Redux store configuration
│       └── theme.ts                 # Theme/color configuration
└── public/                          # Static assets
```

## Customizing Colors

To change the entire color scheme, edit `src/lib/theme.ts`:

```typescript
export const theme = {
  primary: '#22C55E',        // Change this to your primary color
  primaryHover: '#16A34A',   // Hover state
  // ... other colors
};
```

Then update the color values in your components. All components use Tailwind classes with the color values, so you can also use CSS variables or Tailwind's color system.

## Application Flow

1. **Step 1 - Personal Information**: Name, contact details, address
2. **Step 2 - Career Summary**: Job title and professional summary
3. **Step 3 - Skills & Experience**: Work experience with skills
4. **Step 4 - Education & Certifications**: Academic qualifications and certifications
5. **Step 5 - Contact Information**: LinkedIn, portfolio, social media
6. **Step 6 - AI Resume Generation**: AI generates the resume
7. **Step 7 - Review & Download**: Review and download as PDF

## State Management

All form data is stored in Redux and persisted to localStorage. This means:
- Data persists across page refreshes
- Users can navigate back and forth between steps
- Form data is automatically saved

## AI Resume Generation

The application uses Google Gemini AI to generate professional resumes. The AI:
- Takes all collected information
- Formats it professionally
- Creates a well-structured HTML resume
- Can be downloaded as PDF

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
