import React from 'react';
import { Target, ArrowRight, CheckCircle2, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import type { CandidateUser } from './DashboardShell';

interface Props {
  user: CandidateUser | null;
}

export const SkillGapIntelligence: React.FC<Props> = ({ user }) => {
  const goalMap: Record<string, string> = {
    find_job: 'Senior AI Platform Engineer',
    switch_careers: 'Full-Stack AI Developer',
    grow_career: 'Staff AI Systems Architect',
    explore_opportunities: 'Enterprise Infrastructure Specialist',
  };

  const targetRole = goalMap[user?.careerGoal || 'find_job'] || 'AI Systems Engineer';

  return (
    <div className="w-full h-full brutalist-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-[6px_6px_0px_0px_#0F172A] bg-white">
      {/* Card Header */}
      <div className="space-y-1 pb-2 border-b-2 border-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-indigo-600 text-white border border-slate-900">
              <Target className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              SKILL GAP INTELLIGENCE
            </h3>
          </div>
          <span className="font-mono text-[10px] font-bold text-indigo-950 bg-indigo-100 px-2.5 py-1 border border-indigo-300 rounded">
            GAP_ANALYSIS
          </span>
        </div>
        <p className="text-xs font-mono text-slate-600 font-medium pt-1">
          // Pipeline: Current Capabilities → Target Role Requirements → Missing Gaps → Actions
        </p>
      </div>

      {/* Target Pipeline Architecture Indicator */}
      <div className="p-3 bg-slate-900 text-white rounded-xl border-2 border-slate-900 font-mono text-xs flex items-center justify-between shadow-[2px_2px_0px_0px_#06B6D4]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
          <span className="text-slate-300">// TARGET_ROLE:</span>
          <span className="font-bold text-cyan-300 uppercase">FULL-STACK AI/ML ENGINEER</span>
        </div>
        <span className="text-[10px] text-cyan-950 font-bold uppercase border border-cyan-400 px-2 py-0.5 rounded bg-cyan-400">
          88% MATCH SCORE
        </span>
      </div>

      {/* Active Derived Skill Gap Matrix */}
      <div className="my-auto p-4 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-3 shadow-[2px_2px_0px_0px_#0F172A] font-mono">
        <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 pb-2">
          <span className="text-slate-900 uppercase">// HIGH_ALIGNMENT_CAPABILITIES</span>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">4 MATCHED</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2 rounded bg-white border border-slate-300 text-slate-800 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Python & FastAPI APIs</span>
          </div>
          <div className="p-2 rounded bg-white border border-slate-300 text-slate-800 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>React & TypeScript UI</span>
          </div>
          <div className="p-2 rounded bg-white border border-slate-300 text-slate-800 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>PyTorch & NLP Modeling</span>
          </div>
          <div className="p-2 rounded bg-white border border-slate-300 text-slate-800 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>PostgreSQL & Supabase</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200 space-y-1.5">
          <div className="text-[10px] font-bold text-amber-900 uppercase">// GROWTH_VECTOR_RECOMMENDATIONS</div>
          <div className="p-2 rounded bg-amber-50 border border-amber-300 text-amber-950 text-[11px] font-medium flex items-center justify-between">
            <span>• Distributed Vector Search at Scale (pgvector / Qdrant)</span>
            <span className="text-[9px] font-bold bg-amber-200 px-1.5 py-0.5 rounded border border-amber-400">HIGH IMPACT</span>
          </div>
        </div>
      </div>

      {/* Footer System Tag */}
      <div className="pt-2 border-t-2 border-slate-900 font-mono text-[11px] font-bold text-slate-500 flex justify-between items-center">
        <span>// DERIVED_GAP_MATRIX</span>
        <span className="text-cyan-700 font-bold">[STATUS: ANALYSIS ACTIVE :: 88% MATCH]</span>
      </div>
    </div>
  );
};
