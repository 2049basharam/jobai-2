import React from 'react';
import { RadialNavMenu } from '../navigation/RadialNavMenu';

interface Props {
  children: React.ReactNode;
  activeRoute?: string;
  className?: string;
}

export const CandidateAppShell: React.FC<Props> = ({ children, activeRoute, className = '' }) => {
  return (
    <div className={`relative min-h-[calc(100vh-4.5rem)] w-full ${className}`}>
      {/* Page Content Container */}
      <div className="w-full">
        {children}
      </div>

      {/* Global Spatial Application Navigator */}
      <RadialNavMenu activeRoute={activeRoute} />
    </div>
  );
};
