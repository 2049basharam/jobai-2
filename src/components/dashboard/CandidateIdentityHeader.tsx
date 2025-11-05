import React from 'react';
import { User, Mail, Compass, Briefcase, CheckCircle2, ShieldCheck, Edit3 } from 'lucide-react';
import type { CandidateUser } from './DashboardShell';

interface Props {
  user: CandidateUser | null;
}

export const CandidateIdentityHeader: React.FC<Props> = ({ user }) => {
  const goalMap: Record<string, string> = {
    find_job: 'Target Active Job Search Vector',
    switch_careers: 'Career Transition to AI / Engineering',
    grow_career: 'Senior Promotion & Trajectory Mapping',
    explore_opportunities: 'Passive Opportunity Radar Enabled',
  };

  const stageMap: Record<string, string> = {
    student: 'Student / Foundational Skill Graph',
    early_career: 'Early Career Engineer (1-3 yrs)',
    professional: 'Experienced Professional (3+ yrs)',
    freelancer: 'Independent Consultant / Specialist',
  };

  // Deterministic 4-field foundational verification check
  const hasName = Boolean(user?.fullName);
  const hasEmail = Boolean(user?.email);
  const hasGoal = Boolean(user?.careerGoal);
  const hasStage = Boolean(user?.careerStage);

  const completedFields = [hasName, hasEmail, hasGoal, hasStage].filter(Boolean).length;
  const totalFields = 4;

  return (
    <div className="w-full brutalist-card rounded-2xl p-6 sm:p-7 space-y-6 shadow-[6px_6px_0px_0px_#0F172A] relative overflow-hidden bg-white">
      {/* Background Dots Pattern & Ambient Accent */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-slate-900 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-1 border border-cyan-300 rounded w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 stroke-[2.5]" />
            <span>// AUTHORITATIVE_CANDIDATE_IDENTITY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading tracking-tight pt-1">
            {user?.fullName || 'Candidate Profile'}
          </h1>
          <p className="text-xs font-mono text-slate-600 font-medium flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>{user?.email || 'candidate@jobai.io'}</span>
          </p>
        </div>

        {/* Deterministic Foundational Profile Completion & Edit Profile Link Button */}
        <div className="flex flex-col items-end gap-2 font-mono">
          <div className="bg-slate-950 text-white p-3 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4] text-xs space-y-0.5 text-right">
            <div className="flex items-center justify-end gap-1.5 text-cyan-400 font-bold uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
              <span>FOUNDATION PROFILE</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              [{completedFields} / {totalFields} Foundational Fields Verified]
            </p>
          </div>

          <a
            href="/profile"
            id="dashboard-edit-profile-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-slate-900 bg-cyan-400 hover:bg-cyan-500 text-slate-950 text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_0px_#0F172A]"
          >
            <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Edit Professional Identity</span>
          </a>
        </div>
      </div>

      {/* Identity Vectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Career Direction Vector */}
        <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 flex items-start gap-3 shadow-[2px_2px_0px_0px_#0F172A]">
          <div className="p-2 rounded-lg bg-cyan-400 text-slate-950 border border-slate-900 shrink-0">
            <Compass className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="space-y-0.5">
            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">// CAREER DIRECTION VECTOR</span>
            <h4 className="text-xs font-extrabold text-slate-950 uppercase font-heading">
              {goalMap[user?.careerGoal || 'find_job'] || 'Target Career Search'}
            </h4>
            <p className="text-[11px] font-mono text-slate-600">
              Primary intent configured during profile onboarding.
            </p>
          </div>
        </div>

        {/* Career Experience Stage Vector */}
        <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 flex items-start gap-3 shadow-[2px_2px_0px_0px_#0F172A]">
          <div className="p-2 rounded-lg bg-indigo-600 text-white border border-slate-900 shrink-0">
            <Briefcase className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="space-y-0.5">
            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">// EXPERIENCE LEVEL STAGE</span>
            <h4 className="text-xs font-extrabold text-slate-950 uppercase font-heading">
              {stageMap[user?.careerStage || 'professional'] || 'Experienced Professional'}
            </h4>
            <p className="text-[11px] font-mono text-slate-600">
              Verified career stage baseline for opportunity matching.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
