import baseApi from '@/redux/baseApi';
import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import { Project } from '../types/project';
import { API_ENDPOINTS, CACHE_TAGS } from '@/lib/constants';
import { ApiResponse } from '@/redux/api';

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => {
    const typedBuilder = builder as EndpointBuilder<any, any, any>;

    return {
      getProjects: typedBuilder.query<Project[], void>({
        query: () => ({
          url: API_ENDPOINTS.PROJECTS,
          method: 'GET',
        }),
        transformResponse: (response: ApiResponse<Project[]>) => response.data,
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ _id }) => ({ type: CACHE_TAGS.PROJECTS, id: _id })),
                { type: CACHE_TAGS.PROJECTS, id: 'LIST' },
              ]
            : [{ type: CACHE_TAGS.PROJECTS, id: 'LIST' }],
      }),

      getTrashedProjects: typedBuilder.query<Project[], void>({
        query: () => ({
          url: API_ENDPOINTS.PROJECTS_TRASH,
          method: 'GET',
        }),
        transformResponse: (response: ApiResponse<Project[]>) => response.data,
        providesTags: [{ type: CACHE_TAGS.PROJECTS, id: 'TRASH' }],
      }),

      getProjectBySlug: typedBuilder.query<Project, string>({
        query: (slug: string) => ({
          url: API_ENDPOINTS.PROJECT_BY_SLUG(slug),
          method: 'GET',
        }),
        transformResponse: (response: ApiResponse<Project>) => response.data,
        providesTags: (result, error, slug) => [{ type: CACHE_TAGS.PROJECTS, id: slug }],
      }),

      getProjectById: typedBuilder.query<Project, string>({
        query: (id: string) => ({
          url: API_ENDPOINTS.PROJECT_BY_ID(id),
          method: 'GET',
        }),
        transformResponse: (response: ApiResponse<Project>) => response.data,
        providesTags: (result, error, id) => [{ type: CACHE_TAGS.PROJECTS, id }],
      }),

      createProject: typedBuilder.mutation<Project, FormData>({
        query: (formData: FormData) => ({
          url: API_ENDPOINTS.PROJECT_CREATE,
          method: 'POST',
          body: formData,
        }),
        transformResponse: (response: ApiResponse<Project>) => response.data,
        invalidatesTags: [{ type: CACHE_TAGS.PROJECTS, id: 'LIST' }],
      }),

      updateProject: typedBuilder.mutation<Project, { id: string; data: FormData }>({
        query: ({ id, data }) => ({
          url: API_ENDPOINTS.PROJECT_UPDATE(id),
          method: 'PATCH',
          body: data,
        }),
        transformResponse: (response: ApiResponse<Project>) => response.data,
        invalidatesTags: (result, error, { id }) => [
          { type: CACHE_TAGS.PROJECTS, id },
          { type: CACHE_TAGS.PROJECTS, id: 'LIST' },
        ],
      }),

      deleteProject: typedBuilder.mutation<Project, string>({
        query: (id: string) => ({
          url: API_ENDPOINTS.PROJECT_DELETE(id),
          method: 'DELETE',
        }),
        transformResponse: (response: ApiResponse<Project>) => response.data,
        invalidatesTags: [
          { type: CACHE_TAGS.PROJECTS, id: 'LIST' },
          { type: CACHE_TAGS.PROJECTS, id: 'TRASH' },
        ],
      }),

      restoreProject: typedBuilder.mutation<Project, string>({
        query: (id: string) => ({
          url: API_ENDPOINTS.PROJECT_RESTORE(id),
          method: 'PATCH',
        }),
        transformResponse: (response: ApiResponse<Project>) => response.data,
        invalidatesTags: [
          { type: CACHE_TAGS.PROJECTS, id: 'LIST' },
          { type: CACHE_TAGS.PROJECTS, id: 'TRASH' },
        ],
      }),

      permanentDeleteProject: typedBuilder.mutation<Project, string>({
        query: (id: string) => ({
          url: API_ENDPOINTS.PROJECT_PERMANENT_DELETE(id),
          method: 'DELETE',
        }),
        transformResponse: (response: ApiResponse<Project>) => response.data,
        invalidatesTags: [{ type: CACHE_TAGS.PROJECTS, id: 'TRASH' }],
      }),
    };
  },
});

export const {
  useGetProjectsQuery,
  useGetTrashedProjectsQuery,
  useGetProjectBySlugQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useRestoreProjectMutation,
  usePermanentDeleteProjectMutation,
} = projectApi;

export default projectApi;