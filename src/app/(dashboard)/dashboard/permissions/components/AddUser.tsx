'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateUserPermissionsMutation } from '@/redux/features/users/api/userApi';
import { Mail, Shield, Plus, X, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useModal } from '@/providers/AlertDialogProvider';

interface AddUserFormProps {
  onClose: () => void;
  defaultValues?: {
    email?: string;
    role?: string;
  };
  isEditMode?: boolean;
}

export const AddUserForm = ({ onClose, defaultValues, isEditMode = false }: AddUserFormProps) => {
  const [updateUserRole, { isLoading }] = useUpdateUserPermissionsMutation();
  const { showModal, hideModal } = useModal();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: defaultValues?.email || '',
      role: defaultValues?.role || '',
    },
  });

  // Set default values when in edit mode
  useEffect(() => {
    if (isEditMode && defaultValues) {
      if (defaultValues.email) setValue('email', defaultValues.email);
      if (defaultValues.role) setValue('role', defaultValues.role);
    }
  }, [isEditMode, defaultValues, setValue]);

  const role = watch('role');

  const onSubmit = async (data: any) => {
    // Show modal first and wait for confirmation
    showModal({
      title: isEditMode ? 'Update User Role' : 'Add User Role',
      description: isEditMode
        ? `Are you sure you want to update the role of ${data.email} to ${data.role}?`
        : `Are you sure you want to assign the ${data.role} role to ${data.email}?`,
      variant: 'warning',
      showCancel: true,
      closeOnConfirm: false,
      cancelButtonClassName: 'cursor-pointer',
      confirmButtonClassName: 'btn-primary cursor-pointer',

      onConfirm: async () => {
        try {
          // Update the role after confirmation
          await updateUserRole({
            email: data.email,
            newRole: data.role,
          }).unwrap();

          hideModal();
          toast.success(
            isEditMode ? 'User role updated successfully.' : 'User role assigned successfully.'
          );
          onClose();
        } catch (error: any) {
          hideModal();
          console.error('Failed to update user role:', error);
          toast.error(error?.data?.message || 'An error occurred while updating user role.');
        }
      },
      onCancel: () => {
        hideModal();
        onClose();
        toast.info('User permission update canceled.');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {role && (
        <div className="py-2 px-3 rounded-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-medium">
                Selected: <span className="capitalize">{role}</span>
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Form Fields */}
      <div className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            disabled={isEditMode} // Disable email field in edit mode
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email',
              },
            })}
            className={`transition-all ${
              errors.email
                ? 'border-red-500 focus-visible:ring-red-500'
                : 'focus-visible:ring-blue-500'
            } ${isEditMode ? 'bg-muted cursor-not-allowed' : ''}`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
              <span className="text-sm">⚠</span> {errors.email.message}
            </p>
          )}
        </div>

        {/* Role Field */}
        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium flex items-center gap-2">
            <Shield className="w-4 h-4 text-muted-foreground" />
            Role & Permissions
          </Label>
          <Controller
            name="role"
            control={control}
            rules={{ required: 'Please select a role' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={`transition-all ${
                    errors.role
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : 'focus-visible:ring-blue-500'
                  }`}
                >
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Admin</span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="teacher">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Teacher</span>
                      </div>
                    </div>
                  </SelectItem>

                  <SelectItem value="moderator">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Moderator</span>
                      </div>
                    </div>
                  </SelectItem>

                  <SelectItem value="staff">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Staff</span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="user">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">User</span>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
              <span className="text-sm">⚠</span> {errors.role.message}
            </p>
          )}
        </div>

        {/* Selected Role Preview */}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting || isLoading}
          className="flex-1 h-11 cursor-pointer gap-2 hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="flex-1 h-11 gap-2 cursor-pointer btn btn-primary"
        >
          {isSubmitting || isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {isEditMode ? 'Updating...' : 'Preparing...'}
            </>
          ) : (
            <>
              {isEditMode ? (
                <>
                  <Save className="w-4 h-4" />
                  Update User
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add User
                </>
              )}
            </>
          )}
        </Button>
      </div>

      {/* Info Footer */}
      <div className="pt-2 text-center">
        <p className="text-xs text-muted-foreground">
          {isEditMode
            ? 'Changes will be applied immediately after confirmation.'
            : "Details will be sent to the user's email address."}
        </p>
      </div>
    </form>
  );
};
