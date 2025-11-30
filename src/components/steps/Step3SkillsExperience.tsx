'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addWorkExperience, updateWorkExperience, removeWorkExperience, setCurrentStep } from '@/lib/slices/cvSlice';
import type { WorkExperience } from '@/lib/slices/cvSlice';
import StepContainer from '../StepContainer';
import NavigationButtons from '../NavigationButtons';
import { X, Plus, Upload } from 'lucide-react';

export default function Step3SkillsExperience() {
  const dispatch = useAppDispatch();
  const workExperiences = useAppSelector((state) => state.cv.workExperiences);
  const currentStep = useAppSelector((state) => state.cv.currentStep);

  const [localExperiences, setLocalExperiences] = useState<WorkExperience[]>(
    workExperiences.length > 0
      ? workExperiences
      : [
          {
            id: Date.now().toString(),
            jobTitle: '',
            companyName: '',
            startDate: '',
            endDate: '',
            description: '',
            skills: [],
          },
        ]
  );

  const handleChange = (id: string, field: keyof WorkExperience, value: string | string[]) => {
    setLocalExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      companyName: '',
      startDate: '',
      endDate: '',
      description: '',
      skills: [],
    };
    setLocalExperiences([...localExperiences, newExp]);
  };

  const handleRemoveExperience = (id: string) => {
    if (localExperiences.length > 1) {
      setLocalExperiences(localExperiences.filter((exp) => exp.id !== id));
      dispatch(removeWorkExperience(id));
    }
  };

  const handleSkillAdd = (id: string, skill: string) => {
    if (skill.trim() && !localExperiences.find((exp) => exp.id === id)?.skills.includes(skill.trim())) {
      const exp = localExperiences.find((exp) => exp.id === id);
      if (exp) {
        handleChange(id, 'skills', [...exp.skills, skill.trim()]);
      }
    }
  };

  const handleSkillRemove = (id: string, skillIndex: number) => {
    const exp = localExperiences.find((exp) => exp.id === id);
    if (exp) {
      handleChange(id, 'skills', exp.skills.filter((_, i) => i !== skillIndex));
    }
  };

  const handleNext = () => {
    localExperiences.forEach((exp) => {
      if (workExperiences.find((w) => w.id === exp.id)) {
        dispatch(updateWorkExperience({ id: exp.id, data: exp }));
      } else {
        dispatch(addWorkExperience(exp));
      }
    });
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
    return localExperiences.every(
      (exp) => exp.jobTitle.trim() !== '' && exp.companyName.trim() !== '' && exp.description.trim() !== ''
    );
  };

  return (
    <StepContainer
      title="Your Work Experience & Skills"
      subtitle="Highlight your work experience and skills. The more detail you provide, the better the AI can tailor your resume to match job opportunities."
      actionButton={
        <button className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#1F2937] transition-colors">
          Skip &gt;
        </button>
      }
    >
      <div className="space-y-8">
        {localExperiences.map((experience, index) => (
          <div key={experience.id} className="space-y-6 p-6 border border-[#E5E7EB] rounded-lg">
            {localExperiences.length > 1 && (
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#1F2937]">Work Experience {index + 1}</h3>
                <button
                  onClick={() => handleRemoveExperience(experience.id)}
                  className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Job Title</label>
                <input
                  type="text"
                  value={experience.jobTitle}
                  onChange={(e) => handleChange(experience.id, 'jobTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                  placeholder="e.g., Mid-Level UI/UX Designer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Company Name</label>
                <input
                  type="text"
                  value={experience.companyName}
                  onChange={(e) => handleChange(experience.id, 'companyName', e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                  placeholder="e.g., SM Technology"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Start Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={experience.startDate}
                    onChange={(e) => handleChange(experience.id, 'startDate', e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all pr-[11px]"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">End Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={experience.endDate}
                    onChange={(e) => handleChange(experience.id, 'endDate', e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all pr-[11px]"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">Job Description/Responsibilities</label>
              <textarea
                value={experience.description}
                onChange={(e) => handleChange(experience.id, 'description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all resize-none"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Achievements</label>
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-8 text-center hover:border-[#22C55E] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-[#6B7280] mx-auto mb-2" />
                  <p className="text-sm text-[#1F2937] mb-1">Drop file or browse</p>
                  <p className="text-xs text-[#6B7280] mb-4">Format: .jpeg, .png & Max file size: 25 MB</p>
                  <button className="px-4 py-2 bg-[#F3F4F6] text-[#1F2937] rounded-lg text-sm font-medium hover:bg-[#E5E7EB] transition-colors">
                    Browse Files
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Skills</label>
                <div className="border border-[#E5E7EB] rounded-lg p-3 min-h-[200px]">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-[#DCFCE7] text-[#166534] rounded-full text-sm"
                      >
                        {skill}
                        <button
                          onClick={() => handleSkillRemove(experience.id, skillIndex)}
                          className="hover:text-[#EF4444] transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        handleSkillAdd(experience.id, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="w-full px-2 py-1 border-0 focus:outline-none text-sm"
                    placeholder="Type and press Enter to add skill"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handleAddExperience}
          className="flex items-center gap-2 text-[#22C55E] font-medium hover:text-[#16A34A] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Another Work Experience
        </button>
      </div>

      <NavigationButtons onBack={handleBack} onNext={handleNext} canGoNext={isFormValid()} />
    </StepContainer>
  );
}

