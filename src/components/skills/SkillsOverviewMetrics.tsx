import React from 'react';
import { Layers, FolderGit2, FileText, CheckCircle2 } from 'lucide-react';
import type { CandidateSkillRecord } from '../../lib/skills';

interface Props {
  skills: CandidateSkillRecord[];
  unreviewedSignalsCount: number;
}

export const SkillsOverviewMetrics: React.FC<Props> = ({ skills, unreviewedSignalsCount }) => {
  const totalCount = skills.length;
  const evidencedCount = skills.filter((s) => s.evidence && s.evidence.length > 0).length;
  const projectEvidenceCount = skills.filter((s) => s.evidenceState === 'PROJECT_EVIDENCE').length;

  const metrics = [
    {
      id: 'total',
      label: 'TOTAL CAPABILITIES',
      value: totalCount,
      subtext: 'Authoritative candidate skills',
      icon: Layers,
      color: 'bg-cyan-400 text-slate-950 border-slate-900',
    },
    {
      id: 'evidenced',
      label: 'EVIDENCED SKILLS',
      value: evidencedCount,
      subtext: 'Supported by concrete proof',
      icon: CheckCircle2,
      color: 'bg-emerald-400 text-slate-950 border-slate-900',
    },
    {
      id: 'projects',
      label: 'PROJECT EVIDENCE',
      value: projectEvidenceCount,
      subtext: 'Backed by codebase repos',
      icon: FolderGit2,
      color: 'bg-indigo-400 text-slate-950 border-slate-900',
    },
    {
      id: 'signals',
      label: 'RESUME SIGNALS',
      value: unreviewedSignalsCount,
      subtext: 'Awaiting candidate review',
      icon: FileText,
      color: unreviewedSignalsCount > 0 ? 'bg-amber-400 text-slate-950 border-slate-900' : 'bg-slate-100 text-slate-700 border-slate-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.id}
            className="brutalist-card rounded-xl p-4 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] flex flex-col justify-between space-y-2 font-mono"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {m.label}
              </span>
              <div className={`p-1.5 rounded border ${m.color}`}>
                <Icon className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-950 font-heading">
                {m.value}
              </span>
              <span className="text-xs font-bold text-slate-600">
                / {totalCount}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-200">
              // {m.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
};
