'use client';

import { AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/lib/hooks';
import Stepper from '@/components/Stepper';
import Step1PersonalInfo from '@/components/steps/Step1PersonalInfo';
import Step2CareerSummary from '@/components/steps/Step2CareerSummary';
import Step3SkillsExperience from '@/components/steps/Step3SkillsExperience';
import Step4EducationCertifications from '@/components/steps/Step4EducationCertifications';
import Step5ContactInfo from '@/components/steps/Step5ContactInfo';
import Step6AIGeneration from '@/components/steps/Step6AIGeneration';
import Step7ReviewDownload from '@/components/steps/Step7ReviewDownload';

export default function BuilderPage() {
  const currentStep = useAppSelector((state) => state.cv.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo key="step1" />;
      case 2:
        return <Step2CareerSummary key="step2" />;
      case 3:
        return <Step3SkillsExperience key="step3" />;
      case 4:
        return <Step4EducationCertifications key="step4" />;
      case 5:
        return <Step5ContactInfo key="step5" />;
      case 6:
        return <Step6AIGeneration key="step6" />;
      case 7:
        return <Step7ReviewDownload key="step7" />;
      default:
        return <Step1PersonalInfo key="step1" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Stepper />
      <div className="pb-12">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>
    </div>
  );
}

