import React, { useState } from 'react';
import { ShieldCheck, Zap, Target, Cpu, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthIntelligenceVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<'profile' | 'skills' | 'goals' | 'intelligence' | 'opportunities'>('intelligence');

  return (
    <div className="w-full h-full bg-slate-950 text-white rounded-2xl border-2 border-slate-900 p-5 sm:p-6 relative overflow-hidden shadow-[6px_6px_0px_0px_#06B6D4] flex flex-col justify-between">
      {/* Background Spatial Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-slate-900 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
            // JOBAI_CORE_GRAPH :: SYS_ACTIVE
          </span>
        </div>
      </div>

      {/* Node Relationship Vector Architecture */}
      <div className="relative z-10 py-3 my-auto">
        <div className="flex flex-col items-center space-y-3 max-w-sm mx-auto">
          {/* LEVEL 1: PROFILE NODE */}
          <button
            type="button"
            onClick={() => setActiveNode('profile')}
            className={`w-44 text-center py-2 px-4 rounded-xl border-2 transition-all font-mono text-xs uppercase font-bold relative ${
              activeNode === 'profile'
                ? 'bg-cyan-400 text-slate-950 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" /> PROFILE NODE
            </span>
          </button>

          {/* SVG CONNECTOR LINES (PROFILE -> SKILLS & GOALS) */}
          <svg className="w-full h-5 stroke-cyan-400/60" viewBox="0 0 200 30" fill="none">
            <path d="M100 0 V 12 H 40 V 30" strokeWidth="2" strokeDasharray="3 3" className="animated-beam" />
            <path d="M100 0 V 12 H 160 V 30" strokeWidth="2" strokeDasharray="3 3" className="animated-beam" />
            <circle cx="100" cy="0" r="3" fill="#06B6D4" />
            <circle cx="40" cy="30" r="3" fill="#06B6D4" />
            <circle cx="160" cy="30" r="3" fill="#06B6D4" />
          </svg>

          {/* LEVEL 2: SKILLS & GOALS NODES */}
          <div className="flex items-center justify-between w-full gap-3">
            <button
              type="button"
              onClick={() => setActiveNode('skills')}
              className={`flex-1 text-center py-1.5 px-3 rounded-xl border-2 transition-all font-mono text-xs uppercase font-bold ${
                activeNode === 'skills'
                  ? 'bg-cyan-400 text-slate-950 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="flex items-center justify-center gap-1">
                <Zap className="w-3 h-3 stroke-[2.5]" /> SKILLS
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveNode('goals')}
              className={`flex-1 text-center py-1.5 px-3 rounded-xl border-2 transition-all font-mono text-xs uppercase font-bold ${
                activeNode === 'goals'
                  ? 'bg-cyan-400 text-slate-950 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="flex items-center justify-center gap-1">
                <Target className="w-3 h-3 stroke-[2.5]" /> GOALS
              </span>
            </button>
          </div>

          {/* SVG CONNECTOR LINES (SKILLS & GOALS -> CAREER INTELLIGENCE) */}
          <svg className="w-full h-5 stroke-indigo-400/60" viewBox="0 0 200 30" fill="none">
            <path d="M40 0 V 18 H 100 V 30" strokeWidth="2" strokeDasharray="3 3" className="animated-beam" />
            <path d="M160 0 V 18 H 100 V 30" strokeWidth="2" strokeDasharray="3 3" className="animated-beam" />
            <circle cx="100" cy="30" r="3" fill="#818CF8" />
          </svg>

          {/* LEVEL 3: CAREER INTELLIGENCE CORE */}
          <button
            type="button"
            onClick={() => setActiveNode('intelligence')}
            className={`w-full text-center py-2.5 px-4 rounded-xl border-2 transition-all font-mono text-xs uppercase font-bold relative ${
              activeNode === 'intelligence'
                ? 'bg-indigo-600 text-white border-slate-900 shadow-[4px_4px_0px_0px_#06B6D4]'
                : 'bg-slate-900 text-slate-200 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-300 stroke-[2.5]" />
              CAREER INTELLIGENCE
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            </span>
          </button>

          {/* SVG CONNECTOR (CAREER INTELLIGENCE -> OPPORTUNITIES) */}
          <svg className="w-5 h-5 stroke-emerald-400/80" viewBox="0 0 20 20" fill="none">
            <path d="M10 0 V 20" strokeWidth="2" strokeDasharray="3 3" className="animated-beam" />
            <circle cx="10" cy="20" r="3" fill="#34D399" />
          </svg>

          {/* LEVEL 4: OPPORTUNITIES TARGET */}
          <button
            type="button"
            onClick={() => setActiveNode('opportunities')}
            className={`w-48 text-center py-2 px-4 rounded-xl border-2 transition-all font-mono text-xs uppercase font-bold ${
              activeNode === 'opportunities'
                ? 'bg-emerald-400 text-slate-950 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 stroke-[2.5]" /> TARGET OPPORTUNITIES
            </span>
          </button>
        </div>
      </div>

      {/* Active Node Detail Context Banner */}
      <div className="relative z-10 bg-slate-900/90 rounded-xl p-3 border-2 border-slate-800 text-xs font-mono">
        <div className="flex items-center justify-between text-cyan-400 font-bold uppercase mb-1">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
            {activeNode === 'profile' && '// NODE: VERIFIED IDENTITY'}
            {activeNode === 'skills' && '// NODE: CAPABILITY VECTOR'}
            {activeNode === 'goals' && '// NODE: TRAJECTORY INTENT'}
            {activeNode === 'intelligence' && '// NODE: SPATIAL MATCH CORE'}
            {activeNode === 'opportunities' && '// NODE: TARGET DISPATCH'}
          </span>
          <span className="text-slate-500">[STATUS: SYNCED]</span>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          {activeNode === 'profile' && 'Immutable developer passport structuring code proof and engineering depth.'}
          {activeNode === 'skills' && 'Continuous skill density indexing mapped against market demand signals.'}
          {activeNode === 'goals' && 'Career direction preferences transformed into semantic search vectors.'}
          {activeNode === 'intelligence' && 'Your professional intelligence lives here. AI calculates true fit.'}
          {activeNode === 'opportunities' && 'High-alignment enterprise positions ready for profile dispatch.'}
        </p>
      </div>
    </div>
  );
};
