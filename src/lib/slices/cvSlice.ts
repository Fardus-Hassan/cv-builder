import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  profilePicture: string; // Base64 image data
}

export interface CareerSummary {
  jobTitle: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements?: string[];
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  major: string;
  startDate: string;
  endDate: string;
  achievements?: string[];
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
}

export interface ContactInfo {
  linkedIn: string;
  portfolio: string;
  socialMedia: {
    platform: string;
    url: string;
  }[];
}

export interface CVState {
  currentStep: number;
  personalInfo: PersonalInfo;
  careerSummary: CareerSummary;
  workExperiences: WorkExperience[];
  educations: Education[];
  certifications: Certification[];
  contactInfo: ContactInfo;
  generatedResume: string | null;
}

const initialState: CVState = {
  currentStep: 1,
  personalInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    profilePicture: '',
  },
  careerSummary: {
    jobTitle: '',
    summary: '',
  },
  workExperiences: [],
  educations: [],
  certifications: [],
  contactInfo: {
    linkedIn: '',
    portfolio: '',
    socialMedia: [],
  },
  generatedResume: null,
};

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateCareerSummary: (state, action: PayloadAction<Partial<CareerSummary>>) => {
      state.careerSummary = { ...state.careerSummary, ...action.payload };
    },
    addWorkExperience: (state, action: PayloadAction<WorkExperience>) => {
      state.workExperiences.push(action.payload);
    },
    updateWorkExperience: (state, action: PayloadAction<{ id: string; data: Partial<WorkExperience> }>) => {
      const index = state.workExperiences.findIndex((exp) => exp.id === action.payload.id);
      if (index !== -1) {
        state.workExperiences[index] = { ...state.workExperiences[index], ...action.payload.data };
      }
    },
    removeWorkExperience: (state, action: PayloadAction<string>) => {
      state.workExperiences = state.workExperiences.filter((exp) => exp.id !== action.payload);
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.educations.push(action.payload);
    },
    updateEducation: (state, action: PayloadAction<{ id: string; data: Partial<Education> }>) => {
      const index = state.educations.findIndex((edu) => edu.id === action.payload.id);
      if (index !== -1) {
        state.educations[index] = { ...state.educations[index], ...action.payload.data };
      }
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      state.educations = state.educations.filter((edu) => edu.id !== action.payload);
    },
    addCertification: (state, action: PayloadAction<Certification>) => {
      state.certifications.push(action.payload);
    },
    updateCertification: (state, action: PayloadAction<{ id: string; data: Partial<Certification> }>) => {
      const index = state.certifications.findIndex((cert) => cert.id === action.payload.id);
      if (index !== -1) {
        state.certifications[index] = { ...state.certifications[index], ...action.payload.data };
      }
    },
    removeCertification: (state, action: PayloadAction<string>) => {
      state.certifications = state.certifications.filter((cert) => cert.id !== action.payload);
    },
    updateContactInfo: (state, action: PayloadAction<Partial<ContactInfo>>) => {
      state.contactInfo = { ...state.contactInfo, ...action.payload };
    },
    setGeneratedResume: (state, action: PayloadAction<string>) => {
      state.generatedResume = action.payload;
    },
    resetCV: (state) => {
      return initialState;
    },
  },
});

export const {
  setCurrentStep,
  updatePersonalInfo,
  updateCareerSummary,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addCertification,
  updateCertification,
  removeCertification,
  updateContactInfo,
  setGeneratedResume,
  resetCV,
} = cvSlice.actions;

export default cvSlice.reducer;

