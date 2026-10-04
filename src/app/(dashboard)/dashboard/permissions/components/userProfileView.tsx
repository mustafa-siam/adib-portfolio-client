'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Calendar, Shield, Activity, User as UserIcon, X } from 'lucide-react';

interface UserProfileViewProps {
  user: {
    id: string;
    avatar?: string;
    name: string;
    email: string;
    role: string;
    status: string;
    joined: string;
    edited: string;
  };
  onClose: () => void;
}

export const UserProfileView = ({ user, onClose }: UserProfileViewProps) => {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Role color mapping
  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      teacher: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      moderator: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      staff: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      user: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    };
    return colors[role.toLowerCase()] || colors.user;
  };

  // Status color mapping
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      suspended: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status.toLowerCase()] || colors.active;
  };

  return (
    <div className="space-y-4 max-h-[85vh] overflow-y-auto px-1">
      {/* Header with Avatar */}
      <div className="flex flex-col items-center space-y-3">
        <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <div className="text-center space-y-1.5">
          <h3 className="text-xl font-bold">{user.name}</h3>
          <div className="flex items-center justify-center gap-2">
            <Badge className={getRoleColor(user.role)}>
              <Shield className="w-3 h-3 mr-1" />
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
            <Badge className={getStatusColor(user.status)}>
              <Activity className="w-3 h-3 mr-1" />
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* User Details */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-tight">
          User Information
        </h4>

        {/* Email */}
        <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
          <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-sm font-semibold truncate">{user.email}</p>
          </div>
        </div>

        {/* User ID */}
        <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
          <UserIcon className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground">User ID</p>
            <p className="text-sm font-mono truncate">{user.id}</p>
          </div>
        </div>

        {/* Joined Date */}
        <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
          <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Joined Date</p>
            <p className="text-sm font-semibold">{user.joined}</p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
          <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
            <p className="text-sm font-semibold">{user.edited}</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1 h-11 cursor-pointer gap-2 hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
          Close
        </Button>
      </div>
    </div>
  );
};
