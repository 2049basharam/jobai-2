import React from 'react';
import { Send, Plus, Sparkles, ShieldCheck, Layers } from 'lucide-react';
import type { CandidateProfile } from '../../lib/profile';

interface Props {
  profile: CandidateProfile | null;
  totalApplications: number;
  activeCount: number;
  onOpenAddModal: () => void;
}

export const ApplicationsHeader: React.FC<Props> = ({
  profile,
  totalApplications,
  activeCount,
  onOpenAddModal,
}) => {
  const targetRole = profile?.primaryTargetRole || 'AI / ML & Backend Systems';

  return (
    <div className="space-y-4 font-mono">
      {/* Top Banner: Spatial Command Center */}
      <div className="brutalist-card bg-slate-950 text-white p-6 rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_#06B6D4] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md bg-cyan-400 text-slate-950 text-xs font-bold tracking-wider">
              WORKSPACE :: APPLICATION_LIFECYCLE
            </span>
            <span className="text-slate-400 text-xs font-mono flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              {activeCount} ACTIVE PURSUITS
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
            Application Command Center
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Track opportunities pursued, audit status stage transitions, attach submitted resume versions, generate candidate-approved cover letter drafts, and prepare for interviews.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs flex-wrap border-t border-slate-800 text-slate-300">
            <div>
              <span className="text-slate-500 uppercase">Target Role:</span>{' '}
              <span className="text-cyan-300 font-bold">{targetRole}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase">Total Tracked:</span>{' '}
              <span className="text-white font-bold">{totalApplications} Applications</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 z-10 self-stretch sm:self-auto flex items-center gap-3">
          <button
            type="button"
            id="add-application-btn"
            onClick={onOpenAddModal}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#FFFFFF] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>TRACK NEW APPLICATION</span>
          </button>
        </div>
      </div>
    </div>
  );
};
