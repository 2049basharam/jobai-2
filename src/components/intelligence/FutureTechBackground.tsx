import React from 'react';

export const FutureTechBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Atmospheric Soft Light Spots */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-gradient-to-b from-indigo-100/50 via-cyan-50/30 to-transparent blur-3xl" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl" />
      <div className="absolute top-2/3 -right-20 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl" />
    </div>
  );
};
