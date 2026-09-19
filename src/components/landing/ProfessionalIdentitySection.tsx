import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ShieldCheck, Award, FileText, Sparkles, CheckCircle2, Code, Database, Zap } from 'lucide-react';

export const ProfessionalIdentitySection: React.FC = () => {
  return (
    <section id="intelligence" className="py-20 bg-white border-y-2 border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-slate-950 bg-cyan-400 px-3 py-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
            // SECTION_01: VERIFIED PROFESSIONAL IDENTITY
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase font-heading tracking-tight">
            Capabilities, Digitally Verified & Modeled
          </h2>
          <p className="text-slate-700 text-base leading-relaxed font-medium">
            Move beyond static PDF resumes. JobAI creates an immutable capability passport that structures your real architecture and engineering depth.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="brutalist-card p-6 space-y-4 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-slate-900 border-2 border-slate-900 flex items-center justify-center text-cyan-400 shadow-[2px_2px_0px_0px_#06B6D4]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-950 font-heading uppercase tracking-tight">
                Dynamic Skill Passport
              </h3>
              <span className="font-mono text-[10px] font-bold text-slate-500">[PASSPORT_01]</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Structures verified technical capabilities, architecture experience, and repository proof into a live passport.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <Badge variant="brutalist" icon={<Code className="w-3 h-3" />}>Python 3.12</Badge>
              <Badge variant="brutalist-cyan" icon={<Zap className="w-3 h-3" />}>FastAPI Async</Badge>
              <Badge variant="emerald" icon={<Database className="w-3 h-3" />}>PostgreSQL</Badge>
            </div>
          </div>

          {/* Card 2 */}
          <div className="brutalist-card p-6 space-y-4 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-slate-900 border-2 border-slate-900 flex items-center justify-center text-cyan-400 shadow-[2px_2px_0px_0px_#06B6D4]">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-950 font-heading uppercase tracking-tight">
                Resume Intelligence Parsing
              </h3>
              <span className="font-mono text-[10px] font-bold text-slate-500">[GEMINI_PARSER]</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Google Gemini AI extracts impact metrics, technical density, and architecture roles with zero manual formatting.
            </p>
            <div className="pt-2 space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" /> Executive summary generation
              </div>
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" /> Automatic impact metric highlight
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="brutalist-card p-6 space-y-4 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-slate-900 border-2 border-slate-900 flex items-center justify-center text-cyan-400 shadow-[2px_2px_0px_0px_#06B6D4]">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-950 font-heading uppercase tracking-tight">
                Verified Achievement Proofs
              </h3>
              <span className="font-mono text-[10px] font-bold text-slate-500">[GIT_PROOF]</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Connect code repositories, certifications, and system benchmarks directly to hiring managers.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase px-3 py-1.5 rounded-md bg-slate-950 text-emerald-400 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#059669]">
                [GIT_VERIFICATION_ACTIVE]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
