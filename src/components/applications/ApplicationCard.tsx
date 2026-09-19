import React from 'react';
import {
  Building2,
  MapPin,
  Calendar,
  FileText,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import type { CandidateApplication, ApplicationStage } from '../../lib/applications';

interface Props {
  application: CandidateApplication;
  onSelect: (app: CandidateApplication) => void;
}

export const ApplicationCard: React.FC<Props> = ({ application, onSelect }) => {
  const getStageBadgeStyle = (stage: ApplicationStage) => {
    switch (stage) {
      case 'SAVED':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'APPLIED':
        return 'bg-cyan-100 text-cyan-950 border-cyan-400';
      case 'SCREENING':
        return 'bg-sky-100 text-sky-950 border-sky-400';
      case 'INTERVIEW':
        return 'bg-indigo-100 text-indigo-950 border-indigo-400';
      case 'OFFER':
      case 'ACCEPTED':
        return 'bg-emerald-100 text-emerald-950 border-emerald-400';
      case 'REJECTED':
      case 'WITHDRAWN':
        return 'bg-rose-100 text-rose-950 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const formattedDate = new Date(application.appliedDate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      onClick={() => onSelect(application)}
      className="brutalist-card bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] hover:shadow-[6px_6px_0px_0px_#06B6D4] transition-all flex flex-col justify-between gap-3 font-mono cursor-pointer group"
    >
      {/* Header Badges */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 text-[10px]">
          <span className={`px-2 py-0.5 rounded font-extrabold uppercase border ${getStageBadgeStyle(application.stage)}`}>
            {application.stage}
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-300">
            [{application.source}]
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 font-sans group-hover:text-cyan-700 transition-colors leading-snug">
          {application.roleTitle}
        </h3>

        <div className="flex items-center gap-3 text-xs text-slate-600 font-sans flex-wrap">
          <span className="flex items-center gap-1 font-bold text-slate-800">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            {application.organization}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {application.location}
          </span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-sans">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {formattedDate}
          </span>

          {application.submittedResumeName ? (
            <span className="flex items-center gap-1 text-slate-700 font-bold font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              <FileText className="w-3 h-3 text-cyan-600" />
              RESUME ATTACHED
            </span>
          ) : (
            <span className="text-[10px] text-slate-400 font-mono">No resume attached</span>
          )}
        </div>

        {/* Command Center CTA */}
        <button
          type="button"
          className="w-full py-2 px-3 rounded-lg bg-slate-900 text-white font-bold text-[11px] hover:bg-cyan-600 hover:text-slate-950 border border-slate-900 transition-all flex items-center justify-center gap-1 mt-1 group-hover:translate-x-0.5"
        >
          <span>OPEN COMMAND CENTER</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
