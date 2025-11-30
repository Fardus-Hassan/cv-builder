'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setCurrentStep, setGeneratedResume } from '@/lib/slices/cvSlice';
import { generateResume } from '@/app/actions/resume';
import StepContainer from '../StepContainer';
import NavigationButtons from '../NavigationButtons';
import { motion } from 'framer-motion';

export default function Step6AIGeneration() {
  const dispatch = useAppDispatch();
  const cvData = useAppSelector((state) => state.cv);
  const currentStep = useAppSelector((state) => state.cv.currentStep);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    setError(null);
    // Clear previous generated resume to allow regeneration
    dispatch(setGeneratedResume(''));

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const resumeData = {
        personalInfo: cvData.personalInfo,
        careerSummary: cvData.careerSummary,
        workExperiences: cvData.workExperiences,
        educations: cvData.educations,
        certifications: cvData.certifications,
        contactInfo: cvData.contactInfo,
      };

      let generated = await generateResume(resumeData);
      
      // Clean HTML - remove markdown code blocks and extra text
      generated = generated
        .replace(/```html\s*/g, '')
        .replace(/```\s*/g, '')
        .replace(/^html\s*/gim, '')
        .trim();
      
      // Extract only the HTML content (remove any markdown wrapper)
      if (generated.includes('<html>') || generated.includes('<body>') || generated.includes('<div')) {
        // Extract HTML content
        const htmlMatch = generated.match(/(<html[\s\S]*<\/html>)|(<body[\s\S]*<\/body>)|(<div[\s\S]*<\/div>)/i);
        if (htmlMatch) {
          generated = htmlMatch[0];
        }
      }
      
      
      clearInterval(progressInterval);
      setProgress(100);
      dispatch(setGeneratedResume(generated));

      // Move to next step after a short delay
      setTimeout(() => {
        dispatch(setCurrentStep(7));
      }, 500);
    } catch (err) {
      clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : 'Failed to generate resume');
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  return (
    <StepContainer
      title="AI Resume Magic"
      subtitle="Now, let's turn all the information you've provided into a professional resume! Our AI will generate a polished version that showcases your strengths and matches industry standards."
    >
      <div className="flex flex-col items-center justify-center py-12">
        {error ? (
          <div className="text-center">
            <p className="text-[#EF4444] mb-6 text-base">{error}</p>
            <button
              onClick={handleGenerate}
              className="px-8 py-4 bg-[#22C55E] text-white rounded-lg font-medium text-lg hover:bg-[#16A34A] transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : isGenerating ? (
          <>
            <p className="text-[#6B7280] text-lg mb-6">AI is refining your resume...</p>
            <div className="w-full max-w-md mb-8">
              <div className="h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#22C55E] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={handleGenerate}
            className="px-8 py-4 bg-[#22C55E] text-white rounded-lg font-medium text-lg hover:bg-[#16A34A] transition-colors shadow-lg hover:shadow-xl"
          >
            Generate Resume
          </button>
        )}
      </div>

      <NavigationButtons onBack={handleBack} onNext={() => {}} canGoNext={false} />
    </StepContainer>
  );
}

