import React from 'react';
import { ArrowLeft, User, LogOut, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import type { CandidateProfile } from '../../lib/profile';
import { supabase } from '../../lib/supabase';

interface Props {
  profile: CandidateProfile | null;
  readinessScore: number;
}

export const ProfileHeader: React.FC<Props> = ({ profile, readinessScore }) => {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/login';
    } catch (_) {
      window.location.href = '/login';
    }
  };

  return (
    <div className="w-full space-y-4 font-mono">
      {/* Navigation & Session Sub-Header */}
      <div className="flex flex-wrap items-center justify-end gap-4 pb-4 border-b-2 border-slate-900/10">

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 text-white border-2 border-slate-900 text-xs font-mono shadow-[2px_2px_0px_0px_#06B6D4]">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold">{profile?.fullName || 'Candidate Profile'}</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-slate-900 bg-white hover:bg-red-50 text-slate-900 hover:text-red-700 text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_0px_#0F172A]"
          >
            <LogOut className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Header Card */}
      <div className="brutalist-card bg-white rounded-2xl p-6 sm:p-7 space-y-4 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2.5 py-1 border border-cyan-300 rounded w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 stroke-[2.5]" />
              <span>// AUTHORITATIVE_PROFESSIONAL_IDENTITY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading tracking-tight pt-1">
              Professional Identity Workspace
            </h1>
            <p className="text-xs font-mono text-slate-600 font-medium">
              Your authoritative professional profile foundation powering future JobAI intelligence layers.
            </p>
          </div>

          {/* Readiness Score Badge */}
          <div className="bg-slate-950 text-white p-3.5 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4] font-mono text-xs space-y-1 text-right">
            <div className="flex items-center justify-end gap-1.5 text-cyan-400 font-bold uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
              <span>PROFILE READINESS</span>
            </div>
            <p className="text-slate-300 text-sm font-black">
              [{readinessScore}% COMPLETE]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
