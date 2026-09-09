export type PageView = 'home' | 'portfolio' | 'services' | 'about' | 'resume' | 'contact' | 'hire';

export type PortfolioCategory = 'All' | 'Graphic Design' | 'Website Design';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Graphic Design' | 'Website Design';
  year: string;
  client: string;
  thumbnail: string;
  featuredImage: string;
  mockupType?: string;
  shortDescription: string;
  overview: string;
  challenge: string;
  strategy: string;
  process: string[];
  solution: string;
  results: { label: string; value: string }[];
  tags: string[];
  gallery: string[];
  liveUrl?: string;
}

export interface Service {
  number: string;
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tools: string[];
  icon: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  details: string;
  deliverable: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  highlight: string;
  projectType: string;
  rating: number;
}

export interface ResumeExperience {
  period: string;
  role: string;
  company: string;
  type: string;
  description: string;
  achievements: string[];
}

export interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
}
