
import { ClerkProvider } from '@clerk/nextjs';
import ReduxWrapper from '@/redux/ReduxWrapper';
import '../globals.css';
import { Toaster } from 'sonner';
import ClerkAuthProvider from '@/providers/ClerkAuthProvider';

interface DashboardGroupLayoutProps {
  children: React.ReactNode;
}

export default function DashboardGroupLayout({ children }: DashboardGroupLayoutProps) {
  return (
    <ReduxWrapper>
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <ClerkAuthProvider>
          <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                {children}
                <Toaster position="top-center" />
            </body>
          </html>
        </ClerkAuthProvider>
      </ClerkProvider>
    </ReduxWrapper>
  );
}