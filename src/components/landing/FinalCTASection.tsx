import React from 'react';
import { ArrowRight, Sparkles, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t-2 border-slate-900">
      {/* Background Subtle Spatial Grid */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-slate-950 bg-cyan-400 px-3.5 py-1.5 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]">
          // SYSTEM_ACCESS: START YOUR CAREER EVOLUTION
        </div>

        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-heading leading-tight">
          Ready to Reinvent Your Professional Journey?
        </h2>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
          Join thousands of software engineers using JobAI to unlock higher-tier opportunities through verified skill graphs and AI matching.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a href="/register">
            <Button variant="brutalist-cyan" size="lg" rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}>
              Create Candidate Account
            </Button>
          </a>
          <a href="/login">
            <Button variant="secondary" size="lg" className="bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-800 shadow-[3px_3px_0px_0px_#06B6D4]">
              Candidate Login
            </Button>
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs font-mono font-bold text-slate-400 pt-6 border-t-2 border-slate-900 max-w-lg mx-auto uppercase">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 stroke-[2.5]" /> [FREE_FOREVER_TIER]
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-cyan-400 stroke-[2.5]" /> [SOC2_DATA_SECURITY]
          </span>
        </div>
      </div>
    </section>
  );
};
