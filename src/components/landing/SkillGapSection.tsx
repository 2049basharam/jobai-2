import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Target, BookOpen, ChevronRight, TrendingUp } from 'lucide-react';

export const SkillGapSection: React.FC = () => {
  const skillBreakdown = [
    { name: 'Python Systems Architecture', score: 98, status: 'Mastered' },
    { name: 'FastAPI / Async I/O', score: 92, status: 'Mastered' },
    { name: 'Supabase & Vector Embeddings', score: 85, status: 'Proficient' },
    { name: 'Kubernetes Cluster Operations', score: 45, status: 'Growth Gap' },
  ];

  return (
    <section id="skill-gap" className="py-20 bg-white border-t-2 border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-slate-950 bg-cyan-400 px-3 py-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
              // SECTION_03: SKILL-GAP DIAGNOSIS
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase font-heading tracking-tight">
              Know Exactly Which Capabilities to Develop Next
            </h2>

            <p className="text-slate-700 text-base leading-relaxed font-medium">
              JobAI compares your profile against enterprise career transitions to pinpoint the exact 1-2 capabilities standing between you and your target title.
            </p>

            <div className="space-y-3 pt-2 font-mono text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-slate-900 text-cyan-400 border-2 border-slate-900 flex items-center justify-center shrink-0 font-bold text-xs shadow-[2px_2px_0px_0px_#06B6D4]">
                  01
                </div>
                <p className="text-slate-900 font-bold">
                  // Continuous gap diagnosis updated with industry hiring trends.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-slate-900 text-cyan-400 border-2 border-slate-900 flex items-center justify-center shrink-0 font-bold text-xs shadow-[2px_2px_0px_0px_#06B6D4]">
                  02
                </div>
                <p className="text-slate-900 font-bold">
                  // Targeted learning paths curated specifically for senior roles.
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="lg:col-span-7">
            <div className="brutalist-card p-6 lg:p-8 rounded-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-950 font-heading uppercase tracking-tight">
                    Trajectory Model: Lead AI Architect
                  </h3>
                  <p className="text-xs font-mono text-slate-600 font-medium">
                    // Calculated readiness: 84% Complete (Demonstration Dataset)
                  </p>
                </div>
                <Badge variant="brutalist-cyan" size="md" icon={<TrendingUp className="w-3.5 h-3.5" />}>
                  TARGET_GROWTH
                </Badge>
              </div>

              {/* Progress Indicators */}
              <div className="space-y-5 font-mono">
                {skillBreakdown.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-950">{skill.name}</span>
                      <span className="font-extrabold text-slate-900">[{skill.score}%]</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-md border-2 border-slate-900 overflow-hidden shadow-[1px_1px_0px_0px_#0F172A]">
                      <div
                        className={`h-full transition-all duration-500 ${
                          skill.score >= 80 ? 'bg-cyan-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Banner */}
              <div className="bg-slate-950 text-white rounded-lg p-4 flex items-center justify-between gap-4 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4]">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-cyan-400 shrink-0 stroke-[2.5]" />
                  <div>
                    <p className="text-xs font-mono font-bold text-cyan-400 uppercase">// RECOMMENDED_MODULE</p>
                    <p className="text-xs text-slate-200 font-medium mt-0.5">
                      Kubernetes Production Operations for FastAPI Microservices
                    </p>
                  </div>
                </div>
                <a
                  href="/register"
                  className="px-4 py-2 rounded-md bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-mono font-bold uppercase shrink-0 transition-colors border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] active:translate-x-[1px] active:translate-y-[1px] inline-flex items-center gap-1"
                >
                  <span>START</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
