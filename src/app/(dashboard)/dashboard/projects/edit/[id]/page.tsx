'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectForm } from '@/app/(dashboard)/dashboard/components/project/projectForm';
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from '@/redux/features/projects/api/projectApi';

export default function EditProjectPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  // Fetch project using the exact hook from projectApi
  const {
    data: project,
    isLoading: isFetching,
    isError,
    refetch,
  } = useGetProjectByIdQuery(id, { skip: !id });

  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  // Memoize initial values to prevent unnecessary re-renders in ProjectForm
  const initialValues = useMemo(() => {
    if (!project) return undefined;
    return {
      title: project.title,
      slug: project.slug,
      category: project.category,
      summary: project.summary,
      videoUrl: project.videoUrl,
      clientBadge: project.clientBadge,
      roleBadge: project.roleBadge,
      liveLink: project.liveLink,
      isFeatured: project.isFeatured,
      tags: project.tags,
      overview: project.overview,
      process: project.process,
      testimonial: project.testimonial,
      poster: project.poster,
    };
  }, [project]);

  const handleSubmit = async (formData: FormData) => {
    try {
      await updateProject({ id, data: formData }).unwrap();
      toast.success('Project updated successfully!');
      router.push('/dashboard/projects/manage');
    } catch (error) {
      console.error('Update project failed:', error);
      toast.error('Failed to update project. Please try again.');
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-muted-foreground" size={32} />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="m-6 flex items-center justify-between gap-2 rounded-lg bg-destructive/10 p-4 text-sm font-medium text-destructive">
        <span className="flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          Failed to load project details.
        </span>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-sm text-muted-foreground">
          Update the details and content of this portfolio project.
        </p>
      </div>

      <ProjectForm
        mode="edit"
        initialValues={initialValues}
        submitLabel="Save Changes"
        submittingLabel="Saving..."
        isLoading={isUpdating}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </div>
  );
}