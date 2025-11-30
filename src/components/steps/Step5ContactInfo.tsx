'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateContactInfo, setCurrentStep } from '@/lib/slices/cvSlice';
import StepContainer from '../StepContainer';
import NavigationButtons from '../NavigationButtons';
import { Plus, X } from 'lucide-react';

const socialMediaPlatforms = ['Facebook', 'Twitter', 'Instagram', 'GitHub', 'Behance', 'Dribbble', 'Other'];

export default function Step5ContactInfo() {
  const dispatch = useAppDispatch();
  const contactInfo = useAppSelector((state) => state.cv.contactInfo);
  const currentStep = useAppSelector((state) => state.cv.currentStep);

  const [localSocialMedia, setLocalSocialMedia] = useState(
    contactInfo.socialMedia.length > 0
      ? contactInfo.socialMedia
      : [{ platform: 'Facebook', url: '' }]
  );

  const handleChange = (field: keyof typeof contactInfo, value: string) => {
    dispatch(updateContactInfo({ [field]: value }));
  };

  const handleSocialMediaChange = (index: number, field: 'platform' | 'url', value: string) => {
    const updated = [...localSocialMedia];
    updated[index] = { ...updated[index], [field]: value };
    setLocalSocialMedia(updated);
    dispatch(updateContactInfo({ socialMedia: updated }));
  };

  const handleAddSocialMedia = () => {
    setLocalSocialMedia([...localSocialMedia, { platform: 'Facebook', url: '' }]);
  };

  const handleRemoveSocialMedia = (index: number) => {
    if (localSocialMedia.length > 1) {
      const updated = localSocialMedia.filter((_, i) => i !== index);
      setLocalSocialMedia(updated);
      dispatch(updateContactInfo({ socialMedia: updated }));
    }
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

  return (
    <StepContainer
      title="Your Contact Information"
      subtitle="Include additional contact details and social media links to showcase your professional presence."
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">LinkedIn Profile</label>
          <input
            type="url"
            value={contactInfo.linkedIn}
            onChange={(e) => handleChange('linkedIn', e.target.value)}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
            placeholder="Enter your LinkedIn profile URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Personal Website/Portfolio</label>
          <input
            type="url"
            value={contactInfo.portfolio}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
            placeholder="Enter your personal website or portfolio URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Other Social Media</label>
          <div className="space-y-4">
            {localSocialMedia.map((social, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    value={social.platform}
                    onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all appearance-none bg-white"
                  >
                    {socialMediaPlatforms.map((platform) => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                    className="flex-1 px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                    placeholder="Enter other social media profiles (optional)"
                  />
                  {localSocialMedia.length > 1 && (
                    <button
                      onClick={() => handleRemoveSocialMedia(index)}
                      className="px-3 text-[#EF4444] hover:text-[#DC2626] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={handleAddSocialMedia}
              className="flex items-center gap-2 text-[#22C55E] font-medium hover:text-[#16A34A] transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Another Social Media
            </button>
          </div>
        </div>
      </div>

      <NavigationButtons onBack={handleBack} onNext={handleNext} />
    </StepContainer>
  );
}

