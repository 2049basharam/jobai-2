import React from 'react';
import { Briefcase, ArrowRight, Layers, Sparkles, Building2, ExternalLink } from 'lucide-react';
import type { CandidateUser } from './DashboardShell';

interface Props {
  user: CandidateUser | null;
}

export const OpportunitySpacePreview: React.FC<Props> = ({ user }) => {
  const roleClusters = [
    {
      title: 'Full-Stack AI / ML Systems Engineer',
      demand: '94% MATCH SCORE',
      matchType: 'Primary Vector Match',
      skillsRequired: ['Python', 'FastAPI', 'React', 'TypeScript', 'PyTorch', 'PostgreSQL'],
    },
    {
      title: 'GenAI Application & Agent Developer',
      demand: '91% MATCH SCORE',
      matchType: 'AI Trajectory Cluster',
      skillsRequired: ['Gemini AI', 'Explainable AI', 'NLP', 'REST APIs', 'Supabase'],
    },
    {
      title: 'Backend Microservices & Cloud Engineer',
      demand: '88% MATCH SCORE',
      matchType: 'Infrastructure Vector',
      skillsRequired: ['Node.js', 'Express', 'Docker', 'MongoDB', 'Vercel / Render'],
    },
  ];

  return (
    <div className="w-full h-full brutalist-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-[6px_6px_0px_0px_#0F172A] bg-white">
      {/* Header */}
      <div className="space-y-1 pb-2 border-b-2 border-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-emerald-500 text-slate-950 border border-slate-900">
              <Briefcase className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              OPPORTUNITY SPACE PREVIEW
            </h3>
          </div>
          {/* Active Vector Opportunity Radar */}
          <span className="font-mono text-[10px] font-bold text-slate-950 bg-emerald-400 px-2.5 py-1 border border-slate-900 rounded shadow-[1px_1px_0px_0px_#0F172A]">
            [VECTOR MATCHING :: ACTIVE MATRIX]
          </span>
        </div>
        <p className="text-xs font-mono text-slate-600 font-medium pt-1">
          // High-alignment role clusters matching your configured career direction vector
        </p>
      </div>

      {/* Role Cluster Cards */}
      <div className="space-y-3 my-auto">
        {roleClusters.map((cluster, index) => (
          <div
            key={cluster.title}
            className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 hover:bg-slate-100/80 transition-all space-y-2 shadow-[2px_2px_0px_0px_#0F172A]"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[9px] font-bold text-slate-950 bg-cyan-400 px-1.5 py-0.5 border border-slate-900">
                    CLUSTER_0{index + 1}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-emerald-700">
                    {cluster.demand}
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-950 uppercase font-heading">
                  {cluster.title}
                </h4>
              </div>

              <span className="font-mono text-[10px] font-bold text-slate-600 border border-slate-300 bg-white px-2 py-1 rounded shrink-0">
                {cluster.matchType}
              </span>
            </div>

            {/* Required Skill Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {cluster.skillsRequired.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[10px] font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-900"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Disclaimer */}
      <div className="pt-2 border-t-2 border-slate-900 font-mono text-[11px] font-bold text-slate-500 flex justify-between items-center">
        <span>// ACTIVE_OPPORTUNITY_RADAR</span>
        <span className="text-emerald-700 font-bold">[STATUS: VECTOR MATCHED :: 3 CLUSTERS]</span>
      </div>
    </div>
  );
};
