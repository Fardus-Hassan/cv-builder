'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addEducation, updateEducation, removeEducation, addCertification, updateCertification, removeCertification, setCurrentStep } from '@/lib/slices/cvSlice';
import type { Education, Certification } from '@/lib/slices/cvSlice';
import StepContainer from '../StepContainer';
import NavigationButtons from '../NavigationButtons';
import { X, Plus, Upload } from 'lucide-react';

export default function Step4EducationCertifications() {
  const dispatch = useAppDispatch();
  const educations = useAppSelector((state) => state.cv.educations);
  const currentStep = useAppSelector((state) => state.cv.currentStep);
  const [activeTab, setActiveTab] = useState<'education' | 'certifications'>('education');

  const [localEducations, setLocalEducations] = useState<Education[]>(
    educations.length > 0
      ? educations
      : [
          {
            id: Date.now().toString(),
            degree: '',
            institution: '',
            major: '',
            startDate: '',
            endDate: '',
          },
        ]
  );

  const handleChange = (id: string, field: keyof Education, value: string) => {
    setLocalEducations((prev) => prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)));
  };

  const handleAddEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      major: '',
      startDate: '',
      endDate: '',
    };
    setLocalEducations([...localEducations, newEdu]);
  };

  const handleRemoveEducation = (id: string) => {
    if (localEducations.length > 1) {
      setLocalEducations(localEducations.filter((edu) => edu.id !== id));
      dispatch(removeEducation(id));
    }
  };

  const handleNext = () => {
    localEducations.forEach((edu) => {
      if (educations.find((e) => e.id === edu.id)) {
        dispatch(updateEducation({ id: edu.id, data: edu }));
      } else {
        dispatch(addEducation(edu));
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
    return localEducations.every(
      (edu) => edu.degree.trim() !== '' && edu.institution.trim() !== '' && edu.major.trim() !== ''
    );
  };

  return (
    <StepContainer
      title={activeTab === 'education' ? 'Your Educational Background' : 'Your Certifications'}
      subtitle="Provide your academic qualifications and any relevant certifications to strengthen your resume."
      actionButton={
        <button
          onClick={() => setActiveTab(activeTab === 'education' ? 'certifications' : 'education')}
          className="px-4 py-2 bg-[#1F2937] text-white rounded-lg text-sm font-medium hover:bg-[#374151] transition-colors"
        >
          {activeTab === 'education' ? 'Certifications' : 'Education'}
        </button>
      }
    >
      {activeTab === 'education' ? (
        <div className="space-y-8">
          {localEducations.map((education, index) => (
            <div key={education.id} className="space-y-6 p-6 border border-[#E5E7EB] rounded-lg">
              {localEducations.length > 1 && (
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[#1F2937]">Education {index + 1}</h3>
                  <button
                    onClick={() => handleRemoveEducation(education.id)}
                    className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Your Degree</label>
                <input
                  type="text"
                  value={education.degree}
                  onChange={(e) => handleChange(education.id, 'degree', e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                  placeholder="e.g., Bachelor's, Master's"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Institution Name</label>
                <input
                  type="text"
                  value={education.institution}
                  onChange={(e) => handleChange(education.id, 'institution', e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                  placeholder="e.g., Dhaka University"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Major</label>
                <input
                  type="text"
                  value={education.major}
                  onChange={(e) => handleChange(education.id, 'major', e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                  placeholder="e.g., Electronic and Communication Engineering"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={education.startDate}
                      onChange={(e) => handleChange(education.id, 'startDate', e.target.value)}
                      className="w-full px-4  py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all pr-[11px]"
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
                      value={education.endDate}
                      onChange={(e) => handleChange(education.id, 'endDate', e.target.value)}
                      className="w-full px-4 pr-[11px] py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
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
            </div>
          ))}

          <button
            onClick={handleAddEducation}
            className="flex items-center gap-2 text-[#22C55E] font-medium hover:text-[#16A34A] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Another Degree
          </button>
        </div>
      ) : (
        <Step4Certifications onNext={handleNext} />
      )}

      {activeTab === 'education' && (
        <NavigationButtons onBack={handleBack} onNext={handleNext} canGoNext={isFormValid()} />
      )}
    </StepContainer>
  );
}

function Step4Certifications({ onNext }: { onNext: () => void }) {
  const dispatch = useAppDispatch();
  const certifications = useAppSelector((state) => state.cv.certifications);
  const currentStep = useAppSelector((state) => state.cv.currentStep);
  const [localCertifications, setLocalCertifications] = useState(
    certifications.length > 0
      ? certifications
      : [
          {
            id: Date.now().toString(),
            title: '',
            organization: '',
            issueDate: '',
            expiryDate: '',
          },
        ]
  );

  const handleChange = (id: string, field: string, value: string) => {
    setLocalCertifications((prev) =>
      prev.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert))
    );
  };

  const handleAddCertification = () => {
    setLocalCertifications([
      ...localCertifications,
      {
        id: Date.now().toString(),
        title: '',
        organization: '',
        issueDate: '',
        expiryDate: '',
      },
    ]);
  };

  const handleRemoveCertification = (id: string) => {
    if (localCertifications.length > 1) {
      setLocalCertifications(localCertifications.filter((cert) => cert.id !== id));
      dispatch(removeCertification(id));
    }
  };

  const handleSaveAndNext = () => {
    localCertifications.forEach((cert) => {
      if (certifications.find((c) => c.id === cert.id)) {
        dispatch(updateCertification({ id: cert.id, data: cert }));
      } else {
        dispatch(addCertification(cert));
      }
    });
    onNext();
  };

  const handleBack = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const isFormValid = () => {
    return localCertifications.every((cert) => cert.title.trim() !== '' && cert.organization.trim() !== '');
  };

  return (
    <div className="space-y-8">
      {localCertifications.map((cert, index) => (
        <div key={cert.id} className="space-y-6 p-6 border border-[#E5E7EB] rounded-lg">
          {localCertifications.length > 1 && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#1F2937]">Certification {index + 1}</h3>
              <button
                onClick={() => handleRemoveCertification(cert.id)}
                className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Certification Title</label>
            <input
              type="text"
              value={cert.title}
              onChange={(e) => handleChange(cert.id, 'title', e.target.value)}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
              placeholder="e.g., High BNCC"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Issuing Organization</label>
            <input
              type="text"
              value={cert.organization}
              onChange={(e) => handleChange(cert.id, 'organization', e.target.value)}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
              placeholder="e.g., Dhaka University"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">Issue Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={cert.issueDate}
                  onChange={(e) => handleChange(cert.id, 'issueDate', e.target.value)}
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
              <label className="block text-sm font-medium text-[#1F2937] mb-2">Expiry Date (if applicable)</label>
              <div className="relative">
                <input
                  type="date"
                  value={cert.expiryDate}
                  onChange={(e) => handleChange(cert.id, 'expiryDate', e.target.value)}
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
        </div>
      ))}

      <button
        onClick={handleAddCertification}
        className="flex items-center gap-2 text-[#22C55E] font-medium hover:text-[#16A34A] transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Another Certification
      </button>

      <NavigationButtons onBack={handleBack} onNext={handleSaveAndNext} canGoNext={isFormValid()} />
    </div>
  );
}

