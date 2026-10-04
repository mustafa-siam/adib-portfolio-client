'use client';

import { AlertDialogProvider } from '@/providers/AlertDialogProvider';
import { DialogProvider } from '@/providers/DialogProvider';
import { ProgressBarProvider } from '@/providers/progress-bar-provider';
import ProtectedRoute from '@/providers/ProtectedRoute';
import { useTheme } from 'next-themes';
import DashboardSidebar from './components/sidebar/dashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme } = useTheme();

  return (
    <ProgressBarProvider>
      <ProtectedRoute allowedRoles={['admin']}>
        <AlertDialogProvider>
          <DialogProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
              <DashboardSidebar>
                <div className="h-full overflow-y-auto">{children}</div>
              </DashboardSidebar>

              {/* Gradient - Always on bottom */}
              <div
                className={`fixed bottom-0 left-0 right-0 h-[200px] pointer-events-none bg-gradient-to-t z-10 ${
                  theme === 'dark'
                    ? 'opacity-10 from-[#6da9e9] via-[#020618] to-[#020618]'
                    : 'opacity-25 from-[#7eb1e9] via-[#ffffff] to-[#ffffff]'
                }`}
              />
            </div>
          </DialogProvider>
        </AlertDialogProvider>
      </ProtectedRoute>
    </ProgressBarProvider>
  );
}
