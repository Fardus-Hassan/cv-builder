'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updatePersonalInfo, setCurrentStep } from '@/lib/slices/cvSlice';
import StepContainer from '../StepContainer';
import NavigationButtons from '../NavigationButtons';

const countries = [
  'Bangladesh',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'India',
  'Germany',
  'France',
  'Other',
];

export default function Step1PersonalInfo() {
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector((state) => state.cv.personalInfo);
  const currentStep = useAppSelector((state) => state.cv.currentStep);

  const handleChange = (field: keyof typeof personalInfo, value: string) => {
    dispatch(updatePersonalInfo({ [field]: value }));
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
    return (
      personalInfo.firstName.trim() !== '' &&
      personalInfo.lastName.trim() !== '' &&
      personalInfo.emailAddress.trim() !== '' &&
      personalInfo.phoneNumber.trim() !== ''
    );
  };

  return (
    <StepContainer
      title="Tell Us About Yourself"
      subtitle="Fill in your personal details so we can tailor your resume perfectly to your career goals."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">First Name</label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Last Name</label>
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Phone Number</label>
            <input
              type="tel"
              value={personalInfo.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
              placeholder="+880 1567808747"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Email Address</label>
            <input
              type="email"
              value={personalInfo.emailAddress}
              onChange={(e) => handleChange('emailAddress', e.target.value)}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Country/Region</label>
          <div className="relative">
            <select
              value={personalInfo.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all appearance-none bg-white"
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Address</label>
          <input
            type="text"
            value={personalInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
            placeholder="Enter your address"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">City</label>
            <input
              type="text"
              value={personalInfo.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
              placeholder="Enter your city"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">State</label>
            <input
              type="text"
              value={personalInfo.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
              placeholder="Enter your state"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">ZIP Code</label>
            <input
              type="text"
              value={personalInfo.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
              placeholder="Enter ZIP code"
            />
          </div>
        </div>
      </div>

      <NavigationButtons onBack={handleBack} onNext={handleNext} canGoBack={false} canGoNext={isFormValid()} />
    </StepContainer>
  );
}

