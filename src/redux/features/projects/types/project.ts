export interface KeyStat {
  value: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface ProjectOverview {
  heading: string;
  description: string;
  stats: KeyStat[];
}

export interface ProjectProcess {
  heading: string;
  description: string;
  steps: ProcessStep[];
  image?: string;
}

export interface Project {
  _id?: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  poster?: string;
  videoUrl?: string;
  summary: string;
  clientBadge?: string;
  roleBadge?: string;
  liveLink?: string;
  overview: ProjectOverview;
  process: ProjectProcess;
  testimonial?: Testimonial;
  isFeatured?: boolean;
  isDeleted?: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export type ProjectPayload = Omit<Project, '_id' | 'createdAt' | 'updatedAt' | 'isDeleted'>;