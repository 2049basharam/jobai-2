import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowDown, CheckCircle2, TrendingUp, Cpu, Database, Code, Briefcase, Zap, Target, ShieldCheck } from 'lucide-react';
import { AIPulse } from './AIPulse';

interface CoreNode {
  id: string;
  label: string;
  category: 'profile' | 'understanding' | 'role_fit' | 'gaps' | 'opportunity';
  icon: React.ReactNode;
  detail: string;
  evidence: string;
}

export const IntelligenceCore: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('node-role');

  const nodes: CoreNode[] = [
    {
      id: 'node-profile',
      label: 'Candidate Profile',
      category: 'profile',
      icon: <Code className="w-4 h-4 text-blue-600" />,
      detail: 'Python 3.12 • FastAPI Architecture',
      evidence: 'Core technical foundation mapped from verified code repositories and project history.',
    },
    {
      id: 'node-understanding',
      label: 'Skill Matrix',
      category: 'understanding',
      icon: <Zap className="w-4 h-4 text-indigo-600" />,
      detail: 'REST APIs • Async Microservices',
      evidence: 'High semantic density identified across system architecture capabilities.',
    },
    {
      id: 'node-role',
      label: 'Role Fit Model',
      category: 'role_fit',
      icon: <Cpu className="w-4 h-4 text-purple-600" />,
      detail: 'AI Platform Engineering',
      evidence: 'Calculated 94% profile alignment with senior enterprise AI infrastructure requirements.',
    },
    {
      id: 'node-gaps',
      label: 'Skill Gap Analysis',
      category: 'gaps',
      icon: <Target className="w-4 h-4 text-amber-600" />,
      detail: 'Vector Indexing (pgvector)',
      evidence: 'Identified single learning objective to unlock target salary tier.',
    },
    {
      id: 'node-opportunity',
      label: 'Target Opportunity',
      category: 'opportunity',
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />,
      detail: 'Staff AI Systems Architect',
      evidence: 'High-priority match ready for candidate profile dispatch.',
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[2];

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] p-5 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Subtle Spatial Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br from-cyan-400/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900 border-2 border-slate-900 flex items-center justify-center text-cyan-400 shadow-[2px_2px_0px_0px_#06B6D4]">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-black text-slate-900 uppercase font-heading tracking-tight">
                Spatial Intelligence Core
              </h4>
              <span className="font-mono text-[10px] font-bold text-slate-950 bg-cyan-400 px-1.5 py-0.5 border border-slate-900">
                v2.4_LIVE
              </span>
            </div>
            <p className="text-xs font-mono text-slate-600 font-medium">
              // Live relationship vector mapping identity to opportunity
            </p>
          </div>
        </div>

        <AIPulse state="mapping" label="MAPPING_ACTIVE :: 94% ALIGNMENT" size="sm" />
      </div>

      {/* DESKTOP / TABLET SPATIAL RADIAL LAYOUT (1024px + / 768px) */}
      <div className="hidden sm:block relative z-10 mb-8 pt-4 pb-2">
        <div className="grid grid-cols-5 gap-3 items-center">
          {nodes.map((node, index) => {
            const isActive = node.id === activeNodeId;
            return (
              <React.Fragment key={node.id}>
                {/* Node Card */}
                <button
                  onClick={() => setActiveNodeId(node.id)}
                  className={`group relative text-left p-3.5 rounded-xl border-2 transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-[4px_4px_0px_0px_#06B6D4] translate-y-[-2px]'
                      : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] hover:shadow-[4px_4px_0px_0px_#0F172A]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center border ${
                        isActive
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                          : 'bg-slate-100 text-slate-800 border-slate-900 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                      }`}
                    >
                      {node.icon}
                    </div>

                    <span
                      className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded border ${
                        isActive
                          ? 'bg-cyan-400 text-slate-950 border-slate-900'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      [0{index + 1}]
                    </span>
                  </div>

                  <p
                    className={`text-xs font-bold font-heading uppercase truncate ${
                      isActive ? 'text-white' : 'text-slate-950'
                    }`}
                  >
                    {node.label}
                  </p>
                  <p
                    className={`text-[11px] font-mono mt-0.5 truncate ${
                      isActive ? 'text-cyan-200' : 'text-slate-600'
                    }`}
                  >
                    {node.detail}
                  </p>

                  {/* Active Indicator Pulse */}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* MOBILE SEQUENTIAL PIPELINE LAYOUT (Under 640px) */}
      <div className="sm:hidden relative z-10 mb-6 space-y-2.5">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 px-3 py-1 rounded-md w-fit border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
          // SEQUENTIAL INTELLIGENCE PIPELINE
        </div>
        {nodes.map((node, index) => {
          const isActive = node.id === activeNodeId;
          return (
            <div key={node.id} className="space-y-2">
              <button
                onClick={() => setActiveNodeId(node.id)}
                className={`w-full text-left p-3.5 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4]'
                    : 'bg-white text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border ${
                      isActive ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40' : 'bg-slate-100 text-slate-800 border-slate-900'
                    }`}
                  >
                    {node.icon}
                  </div>
                  <div className="flex-grow">
                    <p className={`text-xs font-bold uppercase font-heading ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {node.label}
                    </p>
                    <p className={`text-[11px] font-mono ${isActive ? 'text-cyan-200' : 'text-slate-600'}`}>
                      {node.detail}
                    </p>
                  </div>
                </div>
              </button>

              {index < nodes.length - 1 && (
                <div className="flex justify-center text-slate-900 py-0.5">
                  <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Node Detail Context Banner */}
      <div className="relative z-10 bg-slate-950 text-white rounded-xl p-4 lg:p-5 flex flex-wrap items-center justify-between gap-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#06B6D4]">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-400 text-slate-950 border border-slate-900 mt-0.5 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <span>// EVIDENCE_MATRIX</span>
              <span className="text-slate-400">•</span>
              <span className="text-white">{activeNode.label}</span>
            </h5>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed font-mono">
              {activeNode.evidence}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-emerald-300 bg-emerald-950 px-3 py-1.5 rounded-md border-2 border-emerald-500/40 shadow-[2px_2px_0px_0px_#059669]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> [ALIGNMENT_VERIFIED]
          </span>
        </div>
      </div>
    </div>
  );
};
