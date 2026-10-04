'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; 
import { ProjectForm } from '@/app/(dashboard)/dashboard/components/project/projectForm';
import { useCreateProjectMutation } from '@/redux/features/projects/api/projectApi'; // adjust path

export default function AddProjectPage() {
  const router = useRouter();
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const handleSubmit = async (formData: FormData) => {
    try {
      await createProject(formData).unwrap();
      setTimeout(() => {
        toast.success('Project created successfully!');
      }, 500);
      router.push('/dashboard/projects/manage');
    } catch (error) {
      console.error('Create project failed:', error);
      toast.error('Failed to create project. Please try again.');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <ProjectForm
        mode="create"
        submitLabel="Create Project"
        submittingLabel="Creating..."
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </div>
  );
}