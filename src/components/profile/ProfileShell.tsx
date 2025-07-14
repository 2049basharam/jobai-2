import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  fetchCandidateProfile,
  saveCandidateProfile,
  calculateProfileReadiness,
  type CandidateProfile,
  type ProfileReadinessResult,
} from '../../lib/profile';
import { CandidateAppShell } from '../app/CandidateAppShell';
import { ProfileHeader } from './ProfileHeader';
import { ProfileReadinessGauge } from './ProfileReadinessGauge';
import { IdentitySection } from './IdentitySection';
import { CareerDirectionSection } from './CareerDirectionSection';
import { SummarySection } from './SummarySection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { ProjectsSection } from './ProjectsSection';
import { CertificationsSection } from './CertificationsSection';
import { LinksSection } from './LinksSection';
import { Loader2 } from 'lucide-react';

export const ProfileShell: React.FC = () => {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [readiness, setReadiness] = useState<ProfileReadinessResult>(calculateProfileReadiness(null));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const { profile: loadedProf } = await fetchCandidateProfile();
        if (isMounted && loadedProf) {
          setProfile(loadedProf);
          setReadiness(calculateProfileReadiness(loadedProf));
          setIsLoading(false);
        }
      } catch (err) {
        console.error('[JobAI ProfileShell] Error loading profile:', err);
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateSection = async (updatedFields: Partial<CandidateProfile>) => {
    if (!profile) return;

    const merged: CandidateProfile = {
      ...profile,
      ...updatedFields,
    };

    setProfile(merged);
    const newReadiness = calculateProfileReadiness(merged);
    setReadiness(newReadiness);

    const result = await saveCandidateProfile(merged);
    if (result.success) {
      setSaveFeedback('Profile state persisted to authoritative record');
      setTimeout(() => setSaveFeedback(null), 3000);
    } else {
      console.warn('[JobAI Profile] Persistent save warning:', result.error);
    }
  };

  return (
    <CandidateAppShell activeRoute="/profile">
      {isLoading ? (
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 py-20 font-mono text-xs">
          <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
          <div className="text-slate-900 font-bold uppercase tracking-wider">
            <span>// LOADING_PROFESSIONAL_IDENTITY_WORKSPACE</span>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 relative">
          {/* Save feedback banner */}
          {saveFeedback && (
            <div className="fixed top-20 right-6 z-50 px-4 py-2 rounded-xl bg-slate-950 text-cyan-400 border-2 border-cyan-400 font-mono text-xs font-bold shadow-[4px_4px_0px_0px_#06B6D4] animate-in fade-in duration-200">
              <span>// {saveFeedback}</span>
            </div>
          )}

          {/* Workspace Header */}
          <ProfileHeader profile={profile} readinessScore={readiness.score} />

          {/* Deterministic Readiness Gauge */}
          <ProfileReadinessGauge readiness={readiness} />

          {/* Profile Sections Container */}
          <div className="space-y-8">
            {profile && <IdentitySection profile={profile} onSave={handleUpdateSection} />}
            {profile && <CareerDirectionSection profile={profile} onSave={handleUpdateSection} />}
            {profile && <SummarySection profile={profile} onSave={handleUpdateSection} />}
            {profile && <ExperienceSection profile={profile} onSave={handleUpdateSection} />}
            {profile && <EducationSection profile={profile} onSave={handleUpdateSection} />}
            {profile && <ProjectsSection profile={profile} onSave={handleUpdateSection} />}
            {profile && <CertificationsSection profile={profile} onSave={handleUpdateSection} />}
            {profile && <LinksSection profile={profile} onSave={handleUpdateSection} />}
          </div>
        </div>
      )}
    </CandidateAppShell>
  );
};
