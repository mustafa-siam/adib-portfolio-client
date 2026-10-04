import React from 'react';

const DashboardPageHeading = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
      <p className="text-gray-600 dark:text-slate-400 mt-2">{subTitle}</p>
    </div>
  );
};

export default DashboardPageHeading;
