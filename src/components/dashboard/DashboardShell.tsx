import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { CandidateIdentityHeader } from './CandidateIdentityHeader';
import { DashboardIntelligenceCore } from './DashboardIntelligenceCore';
import { SkillPassportMatrix } from './SkillPassportMatrix';
import { SkillGapIntelligence } from './SkillGapIntelligence';
import { OpportunitySpacePreview } from './OpportunitySpacePreview';
import { NextActionsCard } from './NextActionsCard';
import { CopilotCommandBar } from './CopilotCommandBar';
import { CandidateAppShell } from '../app/CandidateAppShell';
import { Sparkles, LogOut, Loader2, User as UserIcon } from 'lucide-react';

export interface CandidateUser {
  id: string;
  email: string;
  fullName: string;
  careerGoal: string;
  careerStage: string;
}

export const DashboardShell: React.FC = () => {
  const [user, setUser] = useState<CandidateUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          // Fallback demo candidate for unauthenticated preview or redirect
          const demoUser: CandidateUser = {
            id: 'demo-candidate-01',
            email: 'shaikbasharam20@gmail.com',
            fullName: 'Shaik Rameez Basha',
            careerGoal: 'find_job',
            careerStage: 'professional',
          };
          if (isMounted) {
            setUser(demoUser);
            setIsLoading(false);
          }
          return;
        }

        const userMeta = session.user.user_metadata || {};
        const activeUser: CandidateUser = {
          id: session.user.id,
          email: session.user.email || 'shaikbasharam20@gmail.com',
          fullName: userMeta.full_name || userMeta.fullName || 'Shaik Rameez Basha',
          careerGoal: userMeta.career_goal || userMeta.careerGoal || 'find_job',
          careerStage: userMeta.career_stage || userMeta.careerStage || 'professional',
        };

        if (isMounted) {
          setUser(activeUser);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('[JobAI Dashboard] Error loading session:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && isMounted) {
        const userMeta = session.user.user_metadata || {};
        setUser({
          id: session.user.id,
          email: session.user.email || 'candidate@jobai.io',
          fullName: userMeta.full_name || userMeta.fullName || 'Alex Morgan',
          careerGoal: userMeta.career_goal || userMeta.careerGoal || 'find_job',
          careerStage: userMeta.career_stage || userMeta.careerStage || 'professional',
        });
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/login';
    } catch (err) {
      window.location.href = '/login';
    }
  };

  return (
    <CandidateAppShell activeRoute="/dashboard">
      {isLoading ? (
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 py-20 font-mono text-xs">
          <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
          <div className="text-slate-900 font-bold uppercase tracking-wider flex items-center gap-2">
            <span>// INITIALIZING_CANDIDATE_WORKSPACE</span>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Top Session Bar & Sub-Header */}
        <div className="flex flex-wrap items-center justify-end gap-4 pb-4 border-b-2 border-slate-900/10 font-mono">

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white border-2 border-slate-900 text-xs font-mono shadow-[2px_2px_0px_0px_#06B6D4]">
              <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold">{user?.fullName || 'Alex Morgan'}</span>
            </div>

            <button
              id="dashboard-logout-btn"
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-slate-900 bg-white hover:bg-red-50 text-slate-900 hover:text-red-700 text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_0px_#0F172A]"
            >
              <LogOut className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 1. Core Primary Surface: Candidate Identity Header */}
        <CandidateIdentityHeader user={user} />

        {/* 2. Core Primary Surface: Spatial Intelligence Core */}
        <DashboardIntelligenceCore user={user} />

        {/* 3. Secondary Dual Surface: Skill Passport & Skill Gap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-6 w-full flex flex-col">
            <SkillPassportMatrix />
          </div>
          <div className="lg:col-span-6 w-full flex flex-col">
            <SkillGapIntelligence user={user} />
          </div>
        </div>

        {/* 4. Supporting Dual Surface: Opportunity Space Preview & Next Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 w-full flex flex-col">
            <OpportunitySpacePreview user={user} />
          </div>
          <div className="lg:col-span-5 w-full flex flex-col">
            <NextActionsCard user={user} />
          </div>
        </div>

        {/* 5. Persistent Copilot Intelligence Command Surface */}
        <CopilotCommandBar />
      </div>
      )}
    </CandidateAppShell>
  );
};
