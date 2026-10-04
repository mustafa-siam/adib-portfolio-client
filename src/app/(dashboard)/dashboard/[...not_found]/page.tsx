'use client';
import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DashboardNotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-[calc(100vh-170px)] items-center justify-center p-4  ">
      <div className="mx-auto max-w-md text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-primary-500 p-6 shadow-lg shadow-[#1D3E6B]/20 dark:shadow-blue-600/30">
            <FileQuestion className="h-16 w-16 text-white" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="mb-2 text-7xl font-bold text-primary-500 ">404</h1>

        {/* Title */}
        <h2 className="mb-3 text-2xl font-semibold text-primary-500 ">Page Not Found</h2>

        {/* Description */}
        <p className="mb-8 text-primary-500">
          Sorry, we could not find the page you are looking for. The page might have been removed or
          the URL might be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" className="gap-2 bg-primary-600 text-neutral-200" onClick={() => router.push('/dashboard')}>
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="gap-2 cursor-pointer border-[#1D3E6B] text-[#1D3E6B] hover:bg-[#1D3E6B]/10 dark:border-blue-600 dark:text-blue-500 dark:hover:bg-blue-600/10"
            onClick={() => router.back()}
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </span>
          </Button>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-600 dark:text-gray-500">
          Need help?{' '}
          <Link
            href="/dashboard"
            className="text-[#1D3E6B] dark:text-blue-500 hover:underline font-medium"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
