import React from 'react';
import { CheckCircle2, AlertCircle, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import type { ProfileReadinessResult } from '../../lib/profile';

interface Props {
  readiness: ProfileReadinessResult;
}

export const ProfileReadinessGauge: React.FC<Props> = ({ readiness }) => {
  const { score, completedCategories, totalCategories, missingItems } = readiness;

  return (
    <div id="readiness-gauge" className="w-full brutalist-card bg-white rounded-2xl p-6 sm:p-7 space-y-5 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A]">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-400 text-slate-950 border border-slate-900">
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              PROFILE READINESS MATRIX
            </h3>
          </div>
          <p className="text-xs font-mono text-slate-600 font-medium">
            // Deterministic 100-point profile completeness algorithm (No AI estimation)
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-slate-950 text-white font-bold border border-slate-900">
            [{completedCategories} / {totalCategories} SECTORS VERIFIED]
          </span>
          <span
            className={`px-3 py-1.5 rounded-lg font-bold border ${
              score === 100
                ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                : 'bg-cyan-100 text-cyan-950 border-cyan-300'
            }`}
          >
            {score}% COMPLETE
          </span>
        </div>
      </div>

      {/* Visual Progress Meter Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center font-mono text-xs font-bold text-slate-700">
          <span>PROGRESS_VECTOR</span>
          <span>{score} / 100 PTS</span>
        </div>
        <div className="w-full h-4 bg-slate-100 rounded-full border-2 border-slate-900 p-0.5 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Missing Items Checklist */}
      {missingItems.length > 0 ? (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-slate-950">
            <AlertCircle className="w-4 h-4 text-amber-500 stroke-[2.5]" />
            <span>ACTION_REQUIRED :: COMPLETE MISSING SECTORS ({missingItems.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {missingItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.anchor}`}
                className="p-3 rounded-xl border-2 border-slate-900 bg-slate-50 hover:bg-cyan-50 hover:border-cyan-600 transition-all flex items-center justify-between group shadow-[2px_2px_0px_0px_#0F172A]"
              >
                <div className="space-y-0.5 font-mono">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                      item.priority === 'HIGH'
                        ? 'bg-amber-100 text-amber-950 border-amber-300'
                        : 'bg-slate-200 text-slate-800 border-slate-300'
                    }`}
                  >
                    [{item.priority}]
                  </span>
                  <p className="text-xs font-bold text-slate-950 pt-1">{item.label}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 flex items-center gap-3 font-mono text-xs text-emerald-950">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 stroke-[2.5]" />
          <div>
            <p className="font-bold">ALL 7 PROFILE SECTORS VERIFIED</p>
            <p className="text-[11px] text-emerald-800">Your professional identity foundation is 100% complete.</p>
          </div>
        </div>
      )}
    </div>
  );
};
