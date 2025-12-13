export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface ContactInfo {
  email: string;
  instagram: string;
  tiktok: string;
  github: string;
  telegram: string;
  location: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  projects: Project[];
  experience: Experience[];
  contact: ContactInfo;
}