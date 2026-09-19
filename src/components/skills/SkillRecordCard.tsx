import React from 'react';
import { FolderGit2, ChevronRight } from 'lucide-react';
import type { CandidateSkillRecord, EvidenceState } from '../../lib/skills';

interface Props {
  skill: CandidateSkillRecord;
  onSelect: (skill: CandidateSkillRecord) => void;
}

export const SkillRecordCard: React.FC<Props> = ({ skill, onSelect }) => {
  const getBadgeStyle = (state: EvidenceState) => {
    switch (state) {
      case 'PROJECT_EVIDENCE':
        return 'bg-cyan-400 text-slate-950 border-slate-900 shadow-[1px_1px_0px_0px_#0F172A]';
      case 'DOCUMENTED':
        return 'bg-emerald-400 text-slate-950 border-slate-900';
      case 'ASSESSED':
        return 'bg-indigo-400 text-slate-950 border-slate-900';
      case 'CREDENTIALLED':
        return 'bg-amber-400 text-slate-950 border-slate-900';
      case 'EMPLOYER_VERIFIED':
        return 'bg-purple-400 text-slate-950 border-slate-900';
      default:
        return 'bg-slate-200 text-slate-800 border-slate-400';
    }
  };

  return (
    <div
      onClick={() => onSelect(skill)}
      className="brutalist-card rounded-xl p-4 bg-white border-2 border-slate-900 hover:bg-slate-50 transition-all cursor-pointer shadow-[3px_3px_0px_0px_#0F172A] hover:shadow-[5px_5px_0px_0px_#06B6D4] space-y-3 font-mono flex flex-col justify-between"
    >
      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-base font-extrabold text-slate-950 font-heading">
            {skill.name}
          </h4>
          <span className={`text-[10px] font-bold px-2 py-0.5 border rounded uppercase ${getBadgeStyle(skill.evidenceState)}`}>
            {skill.evidenceState.replace('_', ' ')}
          </span>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2">
          {skill.description || 'Candidate capability record.'}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 border border-slate-300 rounded flex items-center gap-1">
            <FolderGit2 className="w-3 h-3 text-cyan-600" />
            {skill.evidence.length} EVIDENCE ITEMS
          </span>
          {skill.lastDemonstrated && (
            <span className="text-[10px] font-bold text-slate-500">
              LATEST: {skill.lastDemonstrated}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-cyan-700 font-bold text-[11px]">
          <span>EVIDENCE</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};
