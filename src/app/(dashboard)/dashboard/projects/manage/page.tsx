'use client';

import Link from 'next/link';
import { Plus, Loader2, Trash2, Edit, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from '@/redux/features/projects/api/projectApi';

export default function ManageProjectsPage() {
  const { data: projects = [], isLoading, isError, refetch } = useGetProjectsQuery();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Move this project to trash?')) return;

    try {
      // invalidatesTags refetches the list automatically
      await deleteProject(id).unwrap();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project.');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Projects</h1>
          <p className="text-sm text-muted-foreground">
            View, edit, or delete existing portfolio projects.
          </p>
        </div>
        <Button render={<Link href="/dashboard/projects/add" />}>
          <Plus size={16} className="mr-2" /> Add Project
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-muted-foreground" size={24} />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-between gap-2 rounded-lg bg-destructive/10 p-4 text-sm font-medium text-destructive">
          <span className="flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            Failed to load projects.
          </span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No projects found.</p>
          <Button
            render={<Link href="/dashboard/projects/add" />}
            variant="outline"
            className="mt-4"
          >
            Create Your First Project
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border bg-card">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Featured</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {projects.map((project) => (
                  <tr key={project._id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{project.title}</td>
                    <td className="p-4 align-middle">{project.category}</td>
                    <td className="p-4 align-middle">
                      {project.isFeatured ? (
                        <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600">
                          Featured
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">Standard</span>
                      )}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          render={<Link href={`/dashboard/projects/edit/${project._id}`} />}
                          variant="ghost"
                          size="icon"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isDeleting}
                          onClick={() => handleDelete(project._id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}