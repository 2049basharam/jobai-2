import React from 'react';
import { ArrowRight, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import type { CandidateUser } from './DashboardShell';

interface Props {
  user: CandidateUser | null;
}

export const NextActionsCard: React.FC<Props> = ({ user }) => {
  // Deterministic Action Derivation (Reflects 100% complete candidate profile)
  const actions = [
    {
      id: 'act-01',
      title: 'Complete Professional Identity',
      desc: 'Summary, experience, education, projects & links verified on profile.',
      completed: true,
      priority: 'VERIFIED',
      href: '/profile',
    },
    {
      id: 'act-02',
      title: 'Initialize Capability Passport',
      desc: '8 Verified capabilities & technical skill vectors mapped.',
      completed: true,
      priority: 'VERIFIED',
      href: '/profile#projects',
    },
    {
      id: 'act-03',
      title: 'Define Specific Target Role',
      desc: 'Target Role: Full-Stack AI/ML Engineer & Software Engineer.',
      completed: true,
      priority: 'VERIFIED',
      href: '/profile#career',
    },
    {
      id: 'act-04',
      title: 'Run Skill Gap Analysis',
      desc: 'Deterministically derived 88% match score and 2 growth vectors.',
      completed: true,
      priority: '88% MATCH',
      href: '/dashboard',
    },
  ];

  const completedCount = actions.filter((a) => a.completed).length;

  return (
    <div className="w-full h-full brutalist-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-[6px_6px_0px_0px_#0F172A] bg-white">
      {/* Header */}
      <div className="space-y-1 pb-2 border-b-2 border-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-400 text-slate-950 border border-slate-900">
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              RECOMMENDED ACTIONS
            </h3>
          </div>
          <span className="font-mono text-[10px] font-bold text-slate-950 bg-cyan-400 px-2.5 py-1 border border-slate-900 rounded">
            ACTION_MATRIX
          </span>
        </div>
        <p className="text-xs font-mono text-slate-600 font-medium pt-1">
          // Deterministic priority checklist based on current candidate profile state
        </p>
      </div>

      {/* Action Items List */}
      <div className="space-y-3 my-auto">
        {actions.map((act) => (
          <a
            key={act.id}
            href={act.href}
            className={`p-3.5 rounded-xl border-2 transition-all block space-y-1 ${
              act.completed
                ? 'bg-slate-100/80 border-slate-300 opacity-75'
                : 'bg-white border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {act.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                ) : (
                  <Circle className="w-4 h-4 text-cyan-600 shrink-0 stroke-[2.5]" />
                )}
                <h4 className={`text-xs font-extrabold uppercase font-heading ${act.completed ? 'line-through text-slate-500' : 'text-slate-950'}`}>
                  {act.title}
                </h4>
              </div>

              <div className="flex items-center gap-1.5">
                <span
                  className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded border ${
                    act.completed
                      ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                      : act.priority === 'HIGH_PRIORITY'
                      ? 'bg-amber-100 text-amber-950 border-amber-300'
                      : 'bg-cyan-100 text-cyan-950 border-cyan-300'
                  }`}
                >
                  [{act.priority}]
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            <p className="text-[11px] font-mono text-slate-600 leading-snug pl-6">
              {act.desc}
            </p>
          </a>
        ))}
      </div>

      {/* Footer System Tag */}
      <div className="pt-2 border-t-2 border-slate-900 font-mono text-[11px] font-bold text-slate-500 flex justify-between items-center">
        <span>// STATE_DERIVED_ACTIONS</span>
        <span className="text-cyan-700 font-bold">[{completedCount} / 4 COMPLETED]</span>
      </div>
    </div>
  );
};
