export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // USERS
  USERS: '/users',
  USER_BY_ID: (id: string) => `/users/${id}`,

  // PROJECTS
  PROJECTS: '/projects',
  PROJECTS_TRASH: '/projects/trash',
  PROJECT_CREATE: '/projects/create',
  PROJECT_BY_SLUG: (slug: string) => `/projects/${slug}`,
  PROJECT_BY_ID: (id: string) => `/projects/id/${id}`,
  PROJECT_UPDATE: (id: string) => `/projects/id/${id}`,
  PROJECT_DELETE: (id: string) => `/projects/id/${id}`,
  PROJECT_RESTORE: (id: string) => `/projects/id/${id}/restore`,
  PROJECT_PERMANENT_DELETE: (id: string) => `/projects/id/${id}/permanent`,
} as const;

export const CACHE_TAGS = {
  USERS: 'Users',
  PROJECTS: 'Projects',
} as const;