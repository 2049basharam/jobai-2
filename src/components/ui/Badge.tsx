import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'cyan' | 'indigo' | 'slate' | 'emerald' | 'amber' | 'brutalist' | 'brutalist-cyan' | 'brutalist-dark';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'sm',
  icon,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider rounded-md font-bold';

  const variants = {
    primary: 'bg-blue-50 text-blue-800 border-2 border-slate-900 shadow-[1px_1px_0px_0px_#0F172A]',
    cyan: 'bg-cyan-50 text-cyan-900 border-2 border-slate-900 shadow-[1px_1px_0px_0px_#0F172A]',
    indigo: 'bg-indigo-50 text-indigo-900 border-2 border-slate-900 shadow-[1px_1px_0px_0px_#0F172A]',
    slate: 'bg-slate-100 text-slate-800 border-2 border-slate-900 shadow-[1px_1px_0px_0px_#0F172A]',
    emerald: 'bg-emerald-50 text-emerald-900 border-2 border-slate-900 shadow-[1px_1px_0px_0px_#0F172A]',
    amber: 'bg-amber-50 text-amber-900 border-2 border-slate-900 shadow-[1px_1px_0px_0px_#0F172A]',
    brutalist: 'bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#06B6D4]',
    'brutalist-cyan': 'bg-cyan-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]',
    'brutalist-dark': 'bg-slate-950 text-cyan-400 border-2 border-cyan-500/40 shadow-[2px_2px_0px_0px_#06B6D4]',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-xs px-3 py-1 font-semibold',
  };

  return (
    <span
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className="inline-block">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
