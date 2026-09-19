import React from 'react';
import { Badge } from '../ui/Badge';
import { CareerSignalCard } from '../intelligence/CareerSignalCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const OpportunityDiscoverySection: React.FC = () => {
  const signalData = [
    {
      title: 'Senior AI Systems Engineer',
      category: 'Target Role Signal',
      matchPercentage: 94,
      evidence: [
        'Strong Python 3.12 & FastAPI backend alignment',
        'Proven REST & Async microservice experience',
        'High semantic overlap with AI Gateway design',
      ],
      gaps: ['Kubernetes Cluster Ops', 'pgvector Indexing'],
    },
    {
      title: 'Principal Backend Architect',
      category: 'High Vector Match',
      matchPercentage: 91,
      evidence: [
        'Expert PostgreSQL & Supabase database skills',
        'Clean microservice architecture focus',
      ],
      gaps: ['Distributed Tracing (OpenTelemetry)'],
    },
  ];

  return (
    <section id="discovery" className="py-20 bg-slate-100 border-b-2 border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-slate-950 bg-cyan-400 px-3 py-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
              // SECTION_02: SEMANTIC OPPORTUNITY RADAR
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase font-heading tracking-tight">
              Intelligent Opportunity Radar
            </h2>
            <p className="text-slate-700 text-base leading-relaxed font-medium">
              No shallow keyword matching. JobAI uses Supabase pgvector embeddings to calculate true semantic compatibility between your skill profile and enterprise roles.
            </p>
          </div>

          <a
            href="/register"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-950 bg-white hover:bg-cyan-400 px-4 py-2.5 rounded-lg border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] active:translate-x-[1px] active:translate-y-[1px] uppercase tracking-wider group shrink-0 transition-all"
          >
            <span>[EXPLORE_RADAR_SCOPE]</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Signal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {signalData.map((item, idx) => (
            <CareerSignalCard
              key={idx}
              title={item.title}
              category={item.category}
              matchPercentage={item.matchPercentage}
              evidence={item.evidence}
              gaps={item.gaps}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
