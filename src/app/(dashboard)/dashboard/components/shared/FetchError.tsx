import { Button } from '@/components/ui/button';
import React from 'react';

const FetchError = ({ refetch }: { refetch: any }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-red-600 mb-4">Failed to load data</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    </div>
  );
};

export default FetchError;
