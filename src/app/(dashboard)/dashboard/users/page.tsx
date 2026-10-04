'use client';
import { Button } from '@/components/ui/button';
import { Trash2, User, UserPlus, UserRoundCog } from 'lucide-react';
import { toast } from 'sonner';
import { useGetAllUsersQuery, useUpdateUserPermissionsMutation } from '@/redux/features/users/api/userApi';
import { useState } from 'react';
import { Action, DataTable, TablePagination, TableProvider, TableToolbar } from '@/providers/TableProvider';
import { useDialog } from '@/providers/DialogProvider';
import { AddUserForm } from '../permissions/components/AddUser';
import { ExportDialog } from '../components/shared/ExportExclFile';
import { formatDate } from '@/lib/formatDate';
import { UserProfileView } from '../permissions/components/userProfileView';
import FetchError from '../components/shared/FetchError';
import DashboardPageHeading from '../components/shared/dashboardPageHeading';
import { columns } from '../permissions/components/tableColumn';
import { filterConfigs } from '../permissions/components/filterConfigs';
const Permissions = () => {
  const { showDialog, hideDialog } = useDialog();

  // Backend-driven states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  // API hooks
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery({
    ...filters,
    ignoreRole: 'user',
    search: search || undefined,
    page: page,
    limit: limit,
  });
  const [updateUserRole] = useUpdateUserPermissionsMutation();

  // Add User Dialog
  const handleAddUser = () => {
    showDialog({
      title: 'Add New User',
      description: 'Fill in the details below to add a new user.',
      size: 'default',
      content: (
        <AddUserForm
          onClose={() => {
            hideDialog();
            refetch();
          }}
        />
      ),
      showFooter: false,
    });
  };

  // Edit User Dialog
  const handleEditUser = (row: any) => {
    showDialog({
      title: 'Edit User Permissions',
      description: `Update permissions for ${row.email}`,
      size: 'default',
      content: (
        <AddUserForm
          onClose={() => {
            hideDialog();
            refetch();
          }}
          defaultValues={{
            email: row.email,
            role: row.role,
          }}
          isEditMode={true}
        />
      ),
      showFooter: false,
    });
  };

  // Bulk Remove Permissions
  const handleBulkRemovePermissions = (selectedIds: (string | number)[], userData: any[]) => {
    const selectedUsers = userData.filter((user) => selectedIds.includes(user.id));
    const userEmails = selectedUsers.map((user) => user.email);
    const userNames = selectedUsers.map((user) => user.name);

    showDialog({
      title: 'Remove Multiple Permissions',
      description: (
        <div className="space-y-3">
          <p>
            Are you sure you want to remove permissions for the following {selectedUsers.length}{' '}
            user(s)?
          </p>
          <div className="max-h-48 overflow-y-auto bg-muted/50 p-3 rounded-md">
            <ul className="space-y-1 text-sm">
              {userNames.map((name, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span className="font-medium">{name}</span>
                  <span className="text-muted-foreground">({userEmails[idx]})</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-destructive font-medium">This action cannot be undone.</p>
        </div>
      ),
      size: 'default',
      content: null,
      confirmText: `Remove ${selectedUsers.length} Permission${
        selectedUsers.length > 1 ? 's' : ''
      }`,
      cancelText: 'Cancel',
      confirmButtonClassName: 'cursor-pointer btn-danger',
      cancelButtonClassName: 'cursor-pointer',
      onConfirm: async () => {
        try {
          const updatePromises = userEmails.map((email) =>
            updateUserRole({
              email: email,
              newRole: 'user',
            }).unwrap()
          );

          await Promise.all(updatePromises);

          hideDialog();
          setSelectedRows([]);
          refetch();
          toast.success(`Successfully removed permissions for ${selectedUsers.length} user(s).`);
        } catch (error: any) {
          hideDialog();
          console.error('Failed to update user roles:', error);
          toast.error(error?.data?.message || 'An error occurred while updating user roles.');
        }
      },
      variant: 'destructive',
    });
  };

  // ========== EXPORT DIALOG HANDLER ==========
  const handleExportClick = () => {
    showDialog({
      title: 'Export Users to Excel',
      description: 'Configure your export settings below',
      size: 'default',
      content: (
        <ExportDialog
          apiEndpoint="/users/export"
          entityName="User"
          entityNamePlural="Users"
          filterFields={[
            {
              id: 'role',
              label: 'Filter by Role',
              type: 'select',
              options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Moderator', value: 'moderator' },
                { label: 'Teacher', value: 'teacher' },
                { label: 'Staff', value: 'staff' },
              ],
            },
          ]}
          additionalOptions={{ ignoreRole: 'user' }}
          currentFilters={filters}
          currentSearch={search}
          onClose={hideDialog}
        />
      ),
      showFooter: false,
    });
  };

  // Transform data for table
  const userData =
    data?.data?.users?.map((user: any, index: number) => ({
      id: user?._id || user?.id,
      serialNo: (page - 1) * limit + index + 1,
      avatar: user?.imageUrl,
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
      role: user?.role,
      status: user?.status || 'active',
      joined: formatDate(user?.createdAt),
      edited: formatDate(user?.updatedAt),
    })) || [];

  // Metadata from backend
  const metadata = {
    total: data?.data?.meta?.total || 0,
    page: data?.data?.meta?.page || 1,
    limit: data?.data?.meta?.limit || limit,
    totalPages: data?.data?.meta?.totalPages || 1,
  };

  const actions: Action[] = [
    {
      label: 'View Profile',
      icon: <User className="h-4 w-4" />,
      onClick: (row) => {
        showDialog({
          title: 'User Profile',
          description: 'View detailed user information',
          size: 'default',
          content: (
            <UserProfileView
              user={row}
              onClose={() => {
                hideDialog();
              }}
            />
          ),
          showFooter: false,
        });
      },
    },
    {
      label: 'Edit Permissions',
      icon: <UserRoundCog className="h-4 w-4" />,
      onClick: (row) => {
        handleEditUser(row);
      },
    },
    {
      label: 'Remove Permission',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (row) => {
        showDialog({
          title: 'Remove Permission',
          description: `Are you sure you want to remove permission for ${row.email}? This action cannot be undone.`,
          size: 'sm',
          content: null,
          confirmText: 'Remove',
          cancelText: 'Cancel',
          confirmButtonClassName: 'cursor-pointer btn-danger',
          cancelButtonClassName: 'cursor-pointer ',
          onConfirm: async () => {
            try {
              await updateUserRole({
                email: row?.email,
                newRole: 'user',
              }).unwrap();
              hideDialog();
              refetch();
              toast.success('User role updated successfully.');
            } catch (error: any) {
              hideDialog();
              console.error('Failed to update user role:', error);
              toast.error(error?.data?.message || 'An error occurred while updating user role.');
            }
          },
          variant: 'destructive',
        });
      },
      variant: 'destructive',
    },
  ];

  if (isError) return <FetchError refetch={refetch} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DashboardPageHeading
          title="User Permissions"
          subTitle="Manage user roles and access permissions"
        />
        <div className="flex items-center gap-3">
          {selectedRows.length > 0 && (
            <Button
              onClick={() => handleBulkRemovePermissions(selectedRows, userData)}
              variant="destructive"
              className="cursor-pointer btn-danger"
            >
              <Trash2 className="h-4 w-4" />
              Remove {selectedRows.length} Permission
              {selectedRows.length > 1 ? 's' : ''}
            </Button>
          )}
          <Button onClick={handleAddUser} className="btn btn-primary cursor-pointer">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Table with Export Button */}
      <TableProvider
        columns={columns}
        data={userData}
        enableRowSelection={true}
        enableMultiSelect={true}
        enablePagination={true}
        itemsPerPage={limit}
        actions={actions}
        emptyMessage="No users found"
        isLoading={isLoading}
        backendPagination={true}
        totalItems={metadata.total}
        currentPage={page}
        totalPages={metadata.totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        onItemsPerPageChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
        onSearchChange={(searchTerm) => {
          setSearch(searchTerm);
          setPage(1);
        }}
        searchValue={search}
        filterConfigs={filterConfigs}
        filters={filters}
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setPage(1);
        }}
        onSelectionChange={(selectedIds) => {
          setSelectedRows(selectedIds);
        }}
      >
        <TableToolbar
          placeholder="Search users..."
          showFilters={true}
          onExportClick={handleExportClick}
        />
        <DataTable />
        <TablePagination />
      </TableProvider>
    </div>
  );
};

export default Permissions;
