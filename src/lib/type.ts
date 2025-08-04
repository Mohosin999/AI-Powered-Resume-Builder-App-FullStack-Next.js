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
  startDate?: string | null;
  endDate?: string | null;
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
