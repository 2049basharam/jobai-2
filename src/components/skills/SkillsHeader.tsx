import React from 'react';
import { Boxes, ShieldCheck, ArrowUpRight } from 'lucide-react';
import type { CandidateSkillRecord } from '../../lib/skills';

interface Props {
  candidateName: string;
  targetRole: string;
  skills: CandidateSkillRecord[];
}

export const SkillsHeader: React.FC<Props> = ({ candidateName, targetRole, skills }) => {
  const evidencedCount = skills.filter((s) => s.evidence && s.evidence.length > 0).length;

  return (
    <div className="w-full brutalist-card rounded-2xl p-6 sm:p-7 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title & Identity Vector */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-slate-950 bg-cyan-400 px-2.5 py-1 border border-slate-900 rounded shadow-[1px_1px_0px_0px_#0F172A]">
              [DIGITAL_SKILL_PASSPORT]
            </span>
            <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-300 rounded flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              AUTHENTICATED_EVIDENCE_SYSTEM
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading tracking-tight flex items-center gap-2">
            <Boxes className="w-7 h-7 text-cyan-600 stroke-[2.5]" />
            Digital Skill Passport
          </h1>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-600">
            <span className="font-bold text-slate-900">{candidateName}</span>
            <span>•</span>
            <span className="text-slate-700 font-semibold">{targetRole}</span>
          </div>
        </div>

        {/* Right Status Badge & Context Link */}
        <div className="flex flex-col items-start md:items-end gap-2 shrink-0 font-mono">
          <div className="p-3 rounded-xl border-2 border-slate-900 bg-slate-950 text-white shadow-[3px_3px_0px_0px_#06B6D4] space-y-0.5 text-right">
            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
              PASSPORT_STATUS
            </div>
            <div className="text-sm font-extrabold text-white">
              [{evidencedCount} / {skills.length} EVIDENCED CAPABILITIES]
            </div>
          </div>

          <a
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-900 underline decoration-cyan-400 underline-offset-4 transition-colors"
          >
            <span>EXPLORE CAREER GAPS</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </div>
  );
};
