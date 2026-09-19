import React from 'react';
import { clsx } from 'clsx';
import { Check, Sparkles, Activity } from 'lucide-react';

export type AIPulseState = 'idle' | 'understanding' | 'mapping' | 'completed';

export interface AIPulseProps {
  state?: AIPulseState;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AIPulse: React.FC<AIPulseProps> = ({
  state = 'idle',
  label,
  size = 'md',
  className,
}) => {
  const displayLabel =
    label ||
    (state === 'idle'
      ? 'Intelligence Ready'
      : state === 'understanding'
      ? 'Understanding candidate profile'
      : state === 'mapping'
      ? 'Mapping candidate skills to market signals'
      : 'Career intelligence updated');

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-xs px-3 py-1.5 gap-2 font-medium',
    lg: 'text-sm px-4 py-2 gap-2.5 font-medium',
  };

  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-full border transition-all duration-300 select-none shadow-jobai-sm',
        state === 'idle' && 'bg-slate-900 text-slate-100 border-slate-700/80',
        (state === 'understanding' || state === 'mapping') &&
          'bg-slate-900 text-cyan-300 border-cyan-500/40 glow-cyan-sm',
        state === 'completed' &&
          'bg-emerald-950 text-emerald-300 border-emerald-500/40',
        sizeClasses[size],
        className
      )}
    >
      {/* Icon Indicator */}
      {state === 'idle' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </span>
      )}

      {(state === 'understanding' || state === 'mapping') && (
        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
          <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
        </span>
      )}

      {state === 'completed' && (
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <Check className="w-2.5 h-2.5 stroke-[3]" />
        </span>
      )}

      <span className="tracking-wide">{displayLabel}</span>
    </div>
  );
};
