import { Project } from "@/redux/features/projects/types/project";

export interface ProjectFormValues {
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
  overview: {
    heading: string;
    description: string;
    stats: Array<{ value: string; label: string }>;
  };
  process: {
    heading: string;
    description: string;
    steps: Array<{ number: string; title: string; description: string }>;
    image?: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  isFeatured: boolean;
}

export const createEmptyProjectFormValues = (): ProjectFormValues => ({
  slug: '',
  title: '',
  category: '',
  tags: [],
  poster: '',
  videoUrl: '',
  summary: '',
  clientBadge: '',
  roleBadge: '',
  liveLink: '',
  overview: {
    heading: '',
    description: '',
    stats: [],
  },
  process: {
    heading: '',
    description: '',
    steps: [],
    image: '',
  },
  testimonial: {
    quote: '',
    author: '',
    role: '',
    avatar: '',
  },
  isFeatured: false,
});

export const mapProjectToFormValues = (project: Project): ProjectFormValues => ({
  slug: project.slug ?? '',
  title: project.title ?? '',
  category: project.category ?? '',
  tags: project.tags ?? [],
  poster: project.poster ?? '',
  videoUrl: project.videoUrl ?? '',
  summary: project.summary ?? '',
  clientBadge: project.clientBadge ?? '',
  roleBadge: project.roleBadge ?? '',
  liveLink: project.liveLink ?? '',
  overview: {
    heading: project.overview?.heading ?? '',
    description: project.overview?.description ?? '',
    stats: project.overview?.stats ?? [],
  },
  process: {
    heading: project.process?.heading ?? '',
    description: project.process?.description ?? '',
    steps: project.process?.steps ?? [],
    image: project.process?.image ?? '',
  },
  testimonial: project.testimonial
    ? {
        quote: project.testimonial.quote ?? '',
        author: project.testimonial.author ?? '',
        role: project.testimonial.role ?? '',
        avatar: project.testimonial.avatar ?? '',
      }
    : {
        quote: '',
        author: '',
        role: '',
        avatar: '',
      },
  isFeatured: Boolean(project.isFeatured),
});