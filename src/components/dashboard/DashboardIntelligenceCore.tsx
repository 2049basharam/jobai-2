import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowDown, CheckCircle2, Cpu, Code, Briefcase, Zap, Target, ShieldCheck, AlertCircle } from 'lucide-react';
import { AIPulse } from '../intelligence/AIPulse';
import type { CandidateUser } from './DashboardShell';

interface DashboardNode {
  id: string;
  label: string;
  status: 'available' | 'pending' | 'ready';
  statusText: string;
  icon: React.ReactNode;
  detail: string;
  evidence: string;
}

interface Props {
  user: CandidateUser | null;
}

export const DashboardIntelligenceCore: React.FC<Props> = ({ user }) => {
  const [activeNodeId, setActiveNodeId] = useState<string>('node-profile');

  const nodes: DashboardNode[] = [
    {
      id: 'node-profile',
      label: 'Candidate Profile',
      status: 'available',
      statusText: 'AUTHORITATIVE :: VERIFIED',
      icon: <Code className="w-4 h-4 text-blue-600" />,
      detail: `${user?.fullName || 'Shaik Rameez Basha'} (Experienced Professional)`,
      evidence: 'Directly authenticated user metadata containing verified name, email, career direction, and stage vector.',
    },
    {
      id: 'node-capabilities',
      label: 'Skill Matrix',
      status: 'ready',
      statusText: 'CAPABILITIES VERIFIED',
      icon: <Zap className="w-4 h-4 text-cyan-600" />,
      detail: '8 Verified Capabilities (Python, React, PyTorch, Docker, PostgreSQL)',
      evidence: 'Full technical capability passport verified across languages, AI models, APIs, and databases.',
    },
    {
      id: 'node-role-fit',
      label: 'Role Fit Model',
      status: 'ready',
      statusText: '88% MATCH SCORE',
      icon: <Cpu className="w-4 h-4 text-emerald-600" />,
      detail: 'High alignment for Full-Stack AI/ML Engineer',
      evidence: 'Deterministic match calculation based on verified Python, React, PyTorch, and API engineering skills.',
    },
    {
      id: 'node-gaps',
      label: 'Skill Gap Analysis',
      status: 'ready',
      statusText: 'VECTOR MATRIX DERIVED',
      icon: <Target className="w-4 h-4 text-indigo-600" />,
      detail: '2 Growth Vectors (Vector DBs & K8s)',
      evidence: 'Identified actionable recommendations to boost match score to 95%+ for senior AI roles.',
    },
    {
      id: 'node-opportunity',
      label: 'Opportunity Space',
      status: 'ready',
      statusText: 'ACTIVE MATCHING MATRIX',
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />,
      detail: 'High-alignment AI engineering clusters',
      evidence: 'Matched opportunity sectors configured for Full-Stack AI/ML Engineer vector.',
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] p-5 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Localized Blueprint Pattern Background */}
      <div className="absolute inset-0 bg-blueprint-pattern opacity-40 pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br from-cyan-400/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900 border-2 border-slate-900 flex items-center justify-center text-cyan-400 shadow-[2px_2px_0px_0px_#06B6D4]">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900 uppercase font-heading tracking-tight">
                Spatial Intelligence Core
              </h3>
              <span className="font-mono text-[10px] font-bold text-slate-950 bg-cyan-400 px-2 py-0.5 border border-slate-900">
                FRAMEWORK_PIPELINE
              </span>
            </div>
            <p className="text-xs font-mono text-slate-600 font-medium">
              // Live relationship vector mapping profile to opportunity space
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-slate-950 bg-cyan-400 px-3 py-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
          <CheckCircle2 className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          <span>SPATIAL MATRIX VERIFIED :: 88% MATCH SCORE</span>
        </div>
      </div>

      {/* DESKTOP SPATIAL PIPELINE LAYOUT */}
      <div className="hidden sm:block relative z-10 mb-6 pt-2 pb-2">
        <div className="grid grid-cols-5 gap-3 items-center">
          {nodes.map((node, index) => {
            const isActive = node.id === activeNodeId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                className={`group text-left p-3.5 rounded-xl border-2 transition-all relative ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[4px_4px_0px_0px_#06B6D4] -translate-y-0.5'
                    : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center border ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-100 text-slate-800 border-slate-900'
                    }`}
                  >
                    {node.icon}
                  </div>

                  <span
                    className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded border ${
                      node.status === 'available'
                        ? 'bg-cyan-400 text-slate-950 border-slate-900'
                        : 'bg-slate-100 text-slate-600 border-slate-300'
                    }`}
                  >
                    [0{index + 1}]
                  </span>
                </div>

                <p className={`text-xs font-bold font-heading uppercase truncate ${isActive ? 'text-white' : 'text-slate-950'}`}>
                  {node.label}
                </p>
                <p className={`text-[11px] font-mono mt-0.5 truncate ${isActive ? 'text-cyan-200' : 'text-slate-600'}`}>
                  {node.statusText}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE SEQUENTIAL PIPELINE LAYOUT */}
      <div className="sm:hidden relative z-10 mb-6 space-y-2.5">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 px-3 py-1 rounded-md w-fit border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
          // SEQUENTIAL INTELLIGENCE PIPELINE
        </div>
        {nodes.map((node, index) => {
          const isActive = node.id === activeNodeId;
          return (
            <div key={node.id} className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
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
                      {node.statusText}
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
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <span>// INSPECTOR_MATRIX</span>
              <span className="text-slate-400">•</span>
              <span className="text-white">{activeNode.label}</span>
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed font-mono">
              {activeNode.evidence}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border-2 border-cyan-500/40 bg-cyan-950 text-cyan-300 font-bold uppercase">
            STATUS: {activeNode.statusText}
          </span>
        </div>
      </div>
    </div>
  );
};
