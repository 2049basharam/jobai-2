import React from 'react';
import { Target, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { CandidateProfile } from '../../lib/profile';

interface Props {
  profile: CandidateProfile | null;
  totalOpportunities: number;
}

export const OpportunitiesHeader: React.FC<Props> = ({ profile, totalOpportunities }) => {
  const targetRole = profile?.primaryTargetRole || 'AI / ML & Backend Engineering';
  const careerStage = profile?.careerStage || 'Senior Engineering';
  const workMode = profile?.workMode ? profile.workMode.toUpperCase() : 'REMOTE / HYBRID';

  return (
    <div className="space-y-4 font-mono">
      {/* Top Banner: Provenance & Data Source Integrity */}
      <div className="brutalist-card bg-amber-50 border-2 border-slate-900 p-3 sm:p-4 rounded-xl shadow-[4px_4px_0px_0px_#0F172A] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 mt-0.5 border border-slate-900">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">DATA SOURCE STATUS</span>
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 text-[10px] font-bold border border-amber-400">
                [ILLUSTRATIVE_OPPORTUNITY_PREVIEW]
              </span>
            </div>
            <p className="text-xs text-amber-900/90 mt-1 font-sans">
              Live enterprise job provider APIs are currently unconfigured. Illustrative role signals are displayed for discovery & capability alignment evaluation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <span className="text-[10px] font-bold text-slate-600 bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            PROVENANCE_VERIFIED
          </span>
        </div>
      </div>

      {/* Trajectory Header Card */}
      <div className="brutalist-card bg-slate-950 text-white p-6 rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_#06B6D4] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md bg-cyan-400 text-slate-950 text-xs font-bold tracking-wider">
              WORKSPACE :: OPPORTUNITY_INTELLIGENCE
            </span>
            <span className="text-slate-400 text-xs font-mono flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              {totalOpportunities} ACTIVE SIGNALS
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
            Opportunity Intelligence Radar
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Discover technical roles matched deterministically against your authoritative Digital Skill Passport, project evidence artifacts, and trajectory preferences.
          </p>

          {/* Candidate Trajectory Context Bar */}
          <div className="pt-2 flex items-center gap-4 text-xs flex-wrap border-t border-slate-800 text-slate-300">
            <div>
              <span className="text-slate-500 uppercase">Target Direction:</span>{' '}
              <span className="text-cyan-300 font-bold">{targetRole}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase">Stage:</span>{' '}
              <span className="text-white font-bold">{careerStage}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase">Work Mode:</span>{' '}
              <span className="text-cyan-400 font-bold">{workMode}</span>
            </div>
          </div>
        </div>

        {/* Action / Vector Identity Badge */}
        <div className="shrink-0 z-10 hidden lg:block">
          <div className="w-24 h-24 rounded-2xl bg-slate-900 border-2 border-cyan-400/50 flex flex-col items-center justify-center p-3 text-center shadow-lg">
            <Target className="w-8 h-8 text-cyan-400 mb-1" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">OPPORTUNITY</span>
            <span className="text-[11px] text-cyan-300 font-bold">RADAR v2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
