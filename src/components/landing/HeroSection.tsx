import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { AIPulse } from '../intelligence/AIPulse';
import { IntelligenceCore } from '../intelligence/IntelligenceCore';
import { CareerIntentInput } from '../intelligence/CareerIntentInput';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
      {/* Background Gradient & Light Spots */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-100/60 via-cyan-50/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Chip */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-lg bg-slate-900 text-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4]">
            <AIPulse state="idle" label="SYS // JOBAI_CORE" size="sm" />
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
              [ NEXT-GEN CAREER OS ] <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </span>
          </div>
        </div>

        {/* Hero Headline & Description */}
        <div className="text-center max-w-4xl mx-auto space-y-5 mb-10">
          <div className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] mb-2">
            // SPATIAL CAREER INTELLIGENCE PLATFORM
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 uppercase leading-[1.05] font-heading">
            YOUR CAREER, <br className="hidden sm:inline" />
            <span className="text-gradient-primary">INTELLIGENTLY EVOLVED.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto">
            Build your verified skill passport. Understand your real trajectory. Discover precision alignment with spatial AI career modeling.
          </p>

          {/* Future-Tech Intent Bar */}
          <div className="pt-2">
            <CareerIntentInput />
          </div>

          {/* Key Value Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-bold text-slate-700 pt-2 uppercase">
            <span className="flex items-center gap-1 bg-emerald-50 px-2.5 py-1 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0F172A]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> [PASSPORT_VERIFIED]
            </span>
            <span className="flex items-center gap-1 bg-indigo-50 px-2.5 py-1 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0F172A]">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> [SUPABASE_AUTH_SECURE]
            </span>
            <span className="flex items-center gap-1 bg-cyan-50 px-2.5 py-1 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0F172A]">
              <Zap className="w-3.5 h-3.5 text-cyan-600" /> [GEMINI_AI_POWERED]
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="/register">
              <Button variant="brutalist-cyan" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Opportunities
              </Button>
            </a>
            <a href="/register">
              <Button variant="outline" size="lg">
                Build Skill Passport
              </Button>
            </a>
          </div>
        </div>

        {/* Signature Intelligence Core Visualization */}
        <div className="mt-8 max-w-5xl mx-auto">
          <IntelligenceCore />
        </div>
      </div>
    </section>
  );
};
