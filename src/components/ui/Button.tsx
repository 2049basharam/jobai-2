import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'ai' | 'brutalist' | 'brutalist-cyan';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl active:scale-[0.98] font-heading';

  const variants = {
    primary:
      'bg-jobai-primary hover:bg-jobai-primary-hover text-white shadow-jobai-sm focus:ring-jobai-primary/40 border border-indigo-900/20',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] focus:ring-slate-400',
    outline:
      'bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] focus:ring-jobai-primary/30',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-800 focus:ring-slate-300 font-medium',
    ai: 'bg-gradient-to-r from-jobai-accent via-indigo-600 to-jobai-cyan hover:opacity-95 text-white shadow-[3px_3px_0px_0px_#0F172A] focus:ring-jobai-cyan/50 border-2 border-slate-900',
    brutalist:
      'bg-slate-900 text-white font-mono text-xs uppercase tracking-widest border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#06B6D4] active:translate-x-[1px] active:translate-y-[1px]',
    'brutalist-cyan':
      'bg-cyan-400 text-slate-950 font-mono text-xs uppercase tracking-widest border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#0F172A] active:translate-x-[1px] active:translate-y-[1px]',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2.5 gap-2 h-10',
    lg: 'text-base px-6 py-3.5 gap-2.5 h-12',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
