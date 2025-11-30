'use client';

import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setCurrentStep } from '@/lib/slices/cvSlice';
import StepContainer from '../StepContainer';
import { Download, Search } from 'lucide-react';
import { usePDF } from '@/lib/hooks/usePDF';

export default function Step7ReviewDownload() {
  const dispatch = useAppDispatch();
  const cvData = useAppSelector((state) => state.cv);
  const resumeRef = useRef<HTMLDivElement>(null);
  const { generatePDF, isGenerating } = usePDF();

  const handleDownload = async () => {
    if (resumeRef.current) {
      await generatePDF(resumeRef.current, `${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}_Resume.pdf`);
    }
  };

  const handleBack = () => {
    dispatch(setCurrentStep(6));
  };

  return (
    <div className="w-full">
      <StepContainer
        title="Review Your AI-Generated Resume"
        subtitle="Take a moment to review your resume. You can make changes and regenerate if needed. When you're ready, download it and start applying!"
      >
        <div className="mb-2"></div>
      </StepContainer>

      {/* A4 Resume Container */}
      <div className="flex justify-center overflow-x-auto py-2">
        <div
          ref={resumeRef}
          className="bg-white shadow-2xl"
          style={{
            width: '210mm',
            height: '297mm',
            // padding: '15mm',
            boxSizing: 'border-box',
            flexShrink: 0,
            border: '1px solid #E5E7EB',
          }}
        >
          {cvData.generatedResume ? (
            <div
              className="resume-content"
              style={{
                width: '100%',
                height: '100%',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
              }}
              dangerouslySetInnerHTML={{ __html: cvData.generatedResume }}
            />
          ) : (
            <div className="text-center py-12 text-[#6B7280]">
              <p>Resume is being generated...</p>
            </div>
          )}
        </div>
      </div>

      <StepContainer title="" subtitle="">
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <button
            onClick={handleDownload}
            disabled={isGenerating || !cvData.generatedResume}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F3F4F6] text-[#1F2937] rounded-lg font-medium hover:bg-[#E5E7EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            {isGenerating ? 'Generating PDF...' : 'Download Resume'}
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#22C55E] text-white rounded-lg font-medium hover:bg-[#16A34A] transition-colors">
            <Search className="w-5 h-5" />
            Find Your Favorite Job
          </button>
        </div>

        <div className="flex items-center justify-start mt-8 pt-8 border-t border-[#E5E7EB]">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 bg-[#F3F4F6] text-[#1F2937] rounded-lg font-medium hover:bg-[#E5E7EB] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      </StepContainer>
    </div>
  );
}
