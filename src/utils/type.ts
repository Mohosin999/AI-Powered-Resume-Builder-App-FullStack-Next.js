export type PersonalDetails = {
  resumeId: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  socialLink: string;
};

export type Summary = {
  id: string;
  resumeId: string;
  content: string;
};

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string | null;
  repoUrl?: string | null;
  caseStudyUrl?: string | null;
  createdAt?: Date | null;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string | null;
  startDate: string;
  endDate?: string | null;
  current: boolean;
}

export interface Skill {
  id: string;
  name: string;
}
