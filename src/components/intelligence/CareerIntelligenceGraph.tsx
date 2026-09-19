import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, Cpu, Database, Code, Briefcase, Zap } from 'lucide-react';
import { AIPulse } from './AIPulse';

interface GraphNode {
  id: string;
  label: string;
  category: 'skill' | 'framework' | 'domain' | 'target' | 'opportunity';
  icon: React.ReactNode;
  level: string;
  matchScore?: number;
  active?: boolean;
}

export const CareerIntelligenceGraph: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('node-ai');

  const nodes: GraphNode[] = [
    {
      id: 'node-python',
      label: 'Python 3.12',
      category: 'skill',
      icon: <Code className="w-4 h-4 text-blue-600" />,
      level: 'Core Skill • 98%',
    },
    {
      id: 'node-fastapi',
      label: 'FastAPI / Async',
      category: 'framework',
      icon: <Zap className="w-4 h-4 text-indigo-600" />,
      level: 'Framework • Advanced',
    },
    {
      id: 'node-backend',
      label: 'Backend Architecture',
      category: 'domain',
      icon: <Database className="w-4 h-4 text-cyan-600" />,
      level: 'Domain Mastery',
    },
    {
      id: 'node-ai',
      label: 'AI Systems Engineering',
      category: 'target',
      icon: <Cpu className="w-4 h-4 text-purple-600" />,
      level: 'Target Trajectory',
      active: true,
    },
    {
      id: 'node-opportunity',
      label: 'Staff AI Engineer',
      category: 'opportunity',
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />,
      level: 'Opportunity Match',
      matchScore: 96,
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[3];

  return (
    <div className="w-full bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-jobai-lg p-6 lg:p-8 relative overflow-hidden">
      {/* Background Subtle Spatial Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br from-cyan-400/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-jobai-sm">
            <Sparkles className="w-5 h-5 animate-pulse-subtle" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 font-heading">
              Spatial Career Graph
            </h4>
            <p className="text-xs text-slate-500">
              Live intelligence mapping candidate skills to opportunities
            </p>
          </div>
        </div>

        <AIPulse state="mapping" label="Graph Active • 96% Match" size="sm" />
      </div>

      {/* Node Path Diagram - Responsive Flow */}
      <div className="relative z-10 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-2 items-center">
          {nodes.map((node, index) => {
            const isActive = node.id === activeNodeId;
            return (
              <React.Fragment key={node.id}>
                {/* Node Card */}
                <button
                  onClick={() => setActiveNodeId(node.id)}
                  className={`group relative text-left p-4 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-800 shadow-jobai-glow ring-2 ring-cyan-400/30 translate-y-[-2px]'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/90 shadow-jobai-sm hover:border-indigo-300'
                  }`}
                >
                  {/* Top Category Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                      }`}
                    >
                      {node.icon}
                    </div>

                    {node.matchScore && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        {node.matchScore}% Match
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs font-bold font-heading truncate ${
                      isActive ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {node.label}
                  </p>
                  <p
                    className={`text-[11px] mt-0.5 font-medium truncate ${
                      isActive ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {node.level}
                  </p>

                  {/* Active Indicator Pulse */}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                  )}
                </button>

                {/* Connector Arrow for Desktop */}
                {index < nodes.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center text-slate-300">
                    <ArrowRight className="w-4 h-4 animate-pulse text-indigo-400" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Node Detail Insights Footer Banner */}
      <div className="relative z-10 bg-slate-900 text-white rounded-2xl p-4 lg:p-5 flex flex-wrap items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 mt-0.5">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Intelligence Node Analysis — {activeNode.label}
            </h5>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              High semantic correlation identified between candidate's backend mastery and AI platform engineering requirements.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> 0 Skill Gaps to Junior AI Role
          </span>
        </div>
      </div>
    </div>
  );
};
