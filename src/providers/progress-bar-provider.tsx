'use client';

import NextTopLoader from 'nextjs-toploader';

export function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextTopLoader
        color="#1D3E6B"
        initialPosition={0.08}
        crawlSpeed={200}
        height={4}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px rgba(9, 105, 218, 0.4)"
      />
      {children}
    </>
  );
}
