import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'glass' | 'bordered' | 'ai';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'surface',
  hoverEffect = false,
  className,
  ...props
}) => {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-200';

  const variants = {
    surface: 'bg-white border border-slate-200/80 shadow-jobai-card',
    glass: 'bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-jobai-sm',
    bordered: 'bg-slate-50/50 border border-slate-200',
    ai: 'bg-gradient-to-b from-white to-slate-50/80 border border-indigo-100 shadow-jobai-glow/30 relative overflow-hidden',
  };

  const hoverStyles = hoverEffect
    ? 'hover:border-indigo-200 hover:shadow-jobai-md hover:-translate-y-0.5'
    : '';

  return (
    <div
      className={clsx(baseStyles, variants[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
};
