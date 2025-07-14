export interface ResumePayload {
  id?: string; // for update
  title: string;
  personalDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    jobTitle: string;
    socialLink?: string;
  };
  summary?: {
    content: string;
  };
  experiences?: {
    jobTitle: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description: string;
  }[];
  projects?: {
    name: string;
    description: string;
    url?: string;
    startDate?: string;
    endDate?: string;
  }[];
  educations?: {
    institution: string;
    degree: string;
    field?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
  }[];
  skills?: {
    name: string;
  }[];
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle: string;
  socialLink?: string;
}
