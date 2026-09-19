import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

export interface CareerSignalCardProps {
  title: string;
  category: string;
  matchPercentage?: number;
  evidence: string[];
  gaps?: string[];
  trajectoryAction?: string;
  actionUrl?: string;
}

export const CareerSignalCard: React.FC<CareerSignalCardProps> = ({
  title,
  category,
  matchPercentage = 94,
  evidence,
  gaps = [],
  trajectoryAction = 'View Trajectory Evidence',
  actionUrl = '/register',
}) => {
  return (
    <div className="brutalist-card p-6 rounded-xl relative overflow-hidden space-y-4">
      {/* Top Signal Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge variant="brutalist-cyan" size="sm" icon={<Sparkles className="w-3 h-3" />}>
            {category}
          </Badge>
          <h3 className="text-xl font-extrabold text-slate-950 font-heading uppercase tracking-tight mt-2">
            {title}
          </h3>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-400 text-slate-950 border-2 border-slate-900 text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#0F172A] shrink-0">
          <ShieldCheck className="w-4 h-4 text-slate-950 stroke-[2.5]" /> [{matchPercentage}% MATCH]
        </div>
      </div>

      {/* Embedded Evidence Chain: Profile → Role → Evidence */}
      <div className="bg-slate-900 text-white rounded-lg p-4 space-y-3 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4]">
        <h4 className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
          // EVIDENCE_VECTOR:
        </h4>
        <ul className="space-y-2 font-mono text-xs">
          {evidence.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[2.5]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {gaps.length > 0 && (
          <div className="pt-2 border-t-2 border-slate-800">
            <h4 className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" /> // TARGET_GROWTH_GAP:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {gaps.map((gap, gIdx) => (
                <Badge key={gIdx} variant="amber" size="sm">
                  {gap}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">[DEMO_SIGNAL_ACTIVE]</span>
        <a
          href={actionUrl}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-950 hover:text-indigo-600 uppercase tracking-wider group"
        >
          <span>[{trajectoryAction}]</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
        </a>
      </div>
    </div>
  );
};
