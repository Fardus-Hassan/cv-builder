'use client';

import { useAppSelector } from '@/lib/hooks';
import { Check } from 'lucide-react';

const steps = [
  { number: '01', label: 'Personal Information' },
  { number: '02', label: 'Career Summary' },
  { number: '03', label: 'Skills & Experience' },
  { number: '04', label: 'Education & Certifications' },
  { number: '05', label: 'Contact Information' },
  { number: '06', label: 'AI Resume Generation' },
  { number: '07', label: 'Review & Download' },
];

export default function Stepper() {
  const currentStep = useAppSelector((state) => state.cv.currentStep);

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-8 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="relative flex items-start justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;

            return (
              <div 
                key={stepNumber} 
                className="flex flex-col items-center relative min-w-0" 
                style={{ flex: index < steps.length - 1 ? 1 : 'none' }}
              >
                {/* Step Circle */}
                <div
                  className={`relative z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 flex-shrink-0 ${
                    isActive
                      ? 'bg-green-500 border-green-500'
                      : isCompleted
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
                  ) : (
                    <span 
                      className={`text-xs sm:text-sm font-semibold ${
                        isActive ? 'text-white' : 'text-gray-300'
                      }`}
                    >
                      {step.number}
                    </span>
                  )}
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute top-5 sm:top-6 left-1/2 h-0.5 transition-all duration-300 hidden sm:block"
                    style={{
                      width: 'calc(100% - 24px)',
                      marginLeft: '12px',
                      backgroundColor: isCompleted ? '#22C55E' : '#E5E7EB',
                    }}
                  />
                )}

                {/* Step Label */}
                <span
                  className={`mt-2  sm:mt-3 text-[10px] xs:text-xs sm:text-sm font-medium text-center transition-colors duration-300 max-w-[80px] sm:max-w-[120px] leading-tight ${
                    isActive || isCompleted ? 'text-gray-900' : 'text-gray-300'
                  }`}
                >
                  <span className="hidden md:inline">{step.label}</span>
                  <span className="md:hidden">{step.number}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}