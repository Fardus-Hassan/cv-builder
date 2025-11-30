'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateCareerSummary, setCurrentStep } from '@/lib/slices/cvSlice';
import StepContainer from '../StepContainer';
import NavigationButtons from '../NavigationButtons';

export default function Step2CareerSummary() {
  const dispatch = useAppDispatch();
  const careerSummary = useAppSelector((state) => state.cv.careerSummary);
  const currentStep = useAppSelector((state) => state.cv.currentStep);

  const handleChange = (field: keyof typeof careerSummary, value: string) => {
    dispatch(updateCareerSummary({ [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 7) {
      dispatch(setCurrentStep(currentStep + 1));
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const isFormValid = () => {
    return careerSummary.jobTitle.trim() !== '' && careerSummary.summary.trim() !== '';
  };

  return (
    <StepContainer
      title="Your Career Overview"
      subtitle="A strong career summary will make a lasting impression on recruiters. Let's create a summary that highlights your experience and goals."
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Job Title</label>
          <div className="relative">
            <input
              type="text"
              value={careerSummary.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all pr-10"
              placeholder="Enter your most recent or current job title"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Career Summary</label>
          <textarea
            value={careerSummary.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all resize-none"
            placeholder="An experienced marketing professional with over 5 years of expertise in digital marketing, specializing in SEO, social media strategies, and content creation."
          />
        </div>
      </div>

      <NavigationButtons onBack={handleBack} onNext={handleNext} canGoNext={isFormValid()} />
    </StepContainer>
  );
}

