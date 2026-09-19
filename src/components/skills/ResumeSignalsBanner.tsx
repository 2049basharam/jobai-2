import React from 'react';
import { FileText, Plus } from 'lucide-react';

interface Props {
  unreviewedSkills: string[];
  onImportSkill: (skillName: string) => void;
}

export const ResumeSignalsBanner: React.FC<Props> = ({ unreviewedSkills, onImportSkill }) => {
  if (!unreviewedSkills || unreviewedSkills.length === 0) return null;

  return (
    <div className="w-full brutalist-card rounded-2xl p-4 sm:p-5 bg-amber-50 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] font-mono space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-300 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-amber-400 text-slate-950 border border-slate-900">
            <FileText className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-xs font-black text-slate-950 uppercase font-heading">
            UNREVIEWED RESUME SKILL SIGNALS ({unreviewedSkills.length})
          </span>
        </div>

        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 border border-amber-400 rounded">
          REQUIRES CANDIDATE APPROVAL
        </span>
      </div>

      <p className="text-xs text-slate-700 leading-relaxed font-medium">
        // The document ingestion engine detected potential capabilities in your resume. Select signals below to add them to your authoritative Digital Skill Passport as <strong className="text-slate-950">DOCUMENTED</strong> skills.
      </p>

      <div className="flex flex-wrap gap-2 pt-1">
        {unreviewedSkills.map((sk) => (
          <button
            key={sk}
            type="button"
            onClick={() => onImportSkill(sk)}
            className="text-xs font-bold px-2.5 py-1 rounded bg-white text-slate-900 border-2 border-slate-900 hover:bg-cyan-400 transition-all shadow-[2px_2px_0px_0px_#0F172A] flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
            <span>{sk}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
