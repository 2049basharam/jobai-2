import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Bot, CheckCircle2, MessageSquare, Sparkles, Clock, Send } from 'lucide-react';

export const ApplicationIntelligenceSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-100 border-b-2 border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-slate-950 bg-cyan-400 px-3 py-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
            // SECTION_04: APPLICATION & INTERVIEW COMMAND CENTER
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase font-heading tracking-tight">
            Automated Workflows from Application to Offer
          </h2>
          <p className="text-slate-700 text-base leading-relaxed font-medium">
            Eliminate tedious job application paperwork and enter technical interviews fully prepped with personalized Gemini AI role simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Item 1 */}
          <div className="brutalist-card p-6 rounded-xl space-y-4">
            <div className="w-12 h-12 rounded-lg bg-slate-900 border-2 border-slate-900 flex items-center justify-center text-cyan-400 shadow-[2px_2px_0px_0px_#06B6D4]">
              <Send className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-950 font-heading uppercase tracking-tight">
                Smart Auto-Apply Workflows
              </h3>
              <span className="font-mono text-[10px] font-bold text-slate-500">[WORKFLOW_01]</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Configure target parameters (roles, salary floor, tech stack) and let JobAI submit verified applications directly to recruiter portals.
            </p>
            <div className="pt-2 font-mono text-xs font-bold text-emerald-700 flex items-center gap-1.5 uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" /> [12_APPLICATIONS_PROCESSED]
            </div>
          </div>

          {/* Item 2 */}
          <div className="brutalist-card p-6 rounded-xl space-y-4">
            <div className="w-12 h-12 rounded-lg bg-slate-900 border-2 border-slate-900 flex items-center justify-center text-cyan-400 shadow-[2px_2px_0px_0px_#06B6D4]">
              <Clock className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-950 font-heading uppercase tracking-tight">
                Realtime Command Center
              </h3>
              <span className="font-mono text-[10px] font-bold text-slate-500">[STATUS_SYNC]</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Track status across recruiter screening, technical take-home, onsite interview, and offer stage with automated Supabase status sync.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <Badge variant="brutalist">[SCREENING: 2]</Badge>
              <Badge variant="brutalist-cyan">[INTERVIEW: 1]</Badge>
            </div>
          </div>

          {/* Item 3 */}
          <div className="brutalist-card p-6 rounded-xl space-y-4">
            <div className="w-12 h-12 rounded-lg bg-slate-900 border-2 border-slate-900 flex items-center justify-center text-cyan-400 shadow-[2px_2px_0px_0px_#06B6D4]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-950 font-heading uppercase tracking-tight">
                AI Interview Simulation
              </h3>
              <span className="font-mono text-[10px] font-bold text-slate-500">[GEMINI_MOCK]</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Practice exact system architecture questions asked by target hiring managers with real-time feedback on response depth.
            </p>
            <div className="pt-2 font-mono text-xs font-bold text-cyan-700 flex items-center gap-1.5 uppercase">
              <Sparkles className="w-4 h-4 text-cyan-600 stroke-[2.5]" /> [GEMINI_MOCK_ACTIVE]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
