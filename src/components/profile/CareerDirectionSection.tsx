import React, { useState } from 'react';
import { Target, Compass, Briefcase, MapPin, Laptop, Edit3, Check, X, AlertCircle } from 'lucide-react';
import type { CandidateProfile } from '../../lib/profile';
import { careerDirectionSchema } from '../../lib/validation/profile';

interface Props {
  profile: CandidateProfile;
  onSave: (updated: Partial<CandidateProfile>) => Promise<void>;
}

export const CareerDirectionSection: React.FC<Props> = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [targetRole, setTargetRole] = useState<string>(profile.primaryTargetRole || '');
  const [goal, setGoal] = useState<string>(profile.careerGoal || 'find_job');
  const [stage, setStage] = useState<string>(profile.careerStage || 'professional');
  const [location, setLocation] = useState<string>(profile.location || '');
  const [workMode, setWorkMode] = useState<CandidateProfile['workMode']>(profile.workMode || 'hybrid');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = careerDirectionSchema.safeParse({
      primaryTargetRole: targetRole,
      careerGoal: goal,
      careerStage: stage,
      location,
      workMode,
    });

    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Invalid career direction settings');
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        primaryTargetRole: validation.data.primaryTargetRole || '',
        careerGoal: validation.data.careerGoal,
        careerStage: validation.data.careerStage,
        location: validation.data.location || '',
        workMode: validation.data.workMode,
      });
      setIsEditing(false);
    } catch (err: any) {
      setError(err?.message || 'Failed to update career direction');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTargetRole(profile.primaryTargetRole || '');
    setGoal(profile.careerGoal || 'find_job');
    setStage(profile.careerStage || 'professional');
    setLocation(profile.location || '');
    setWorkMode(profile.workMode || 'hybrid');
    setError(null);
    setIsEditing(false);
  };

  return (
    <div id="career" className="w-full brutalist-card bg-white rounded-2xl p-6 sm:p-7 space-y-5 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4 font-mono">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-400 text-slate-950 border border-slate-900">
              <Target className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              [02] CAREER DIRECTION & TARGET ROLE
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            // Primary intent, target role vector, location & work mode configuration
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            id="edit-career-btn"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_0px_#0F172A]"
          >
            <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Edit Direction</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-3.5 rounded-xl border-2 border-red-500 bg-red-50 text-red-900 font-mono text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 stroke-[2.5]" />
          <span>{error}</span>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="career-targetRole" className="text-xs font-bold text-slate-900 uppercase">
                Primary Target Role Title
              </label>
              <input
                id="career-targetRole"
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Senior AI Systems Engineer"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="career-goal" className="text-xs font-bold text-slate-900 uppercase">
                Primary Career Goal
              </label>
              <select
                id="career-goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
              >
                <option value="find_job">Find a new job</option>
                <option value="switch_careers">Switch careers / pivot</option>
                <option value="grow_career">Grow in current role</option>
                <option value="explore_opportunities">Explore opportunities passively</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="career-stage" className="text-xs font-bold text-slate-900 uppercase">
                Current Career Stage
              </label>
              <select
                id="career-stage"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
              >
                <option value="student">Student / Recent Graduate</option>
                <option value="early_career">Early Career (1-3 years)</option>
                <option value="professional">Experienced Professional (3+ years)</option>
                <option value="freelancer">Freelancer / Independent Consultant</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="career-location" className="text-xs font-bold text-slate-900 uppercase">
                Preferred Location
              </label>
              <input
                id="career-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. San Francisco, CA or Remote"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="career-workMode" className="text-xs font-bold text-slate-900 uppercase">
                Work Mode Preference
              </label>
              <select
                id="career-workMode"
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as CandidateProfile['workMode'])}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
              >
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-Site</option>
                <option value="open">Open to All Modes</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              id="save-career-btn"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#06B6D4] transition-all"
            >
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>{isSaving ? 'Saving...' : 'Save Direction'}</span>
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#0F172A] transition-all"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
          <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-1 shadow-[2px_2px_0px_0px_#0F172A] md:col-span-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase">// PRIMARY TARGET ROLE</span>
            <p className="text-base font-black text-slate-950 font-heading">
              {profile.primaryTargetRole || 'Not specified (Click Edit Direction)'}
            </p>
          </div>

          <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-1 shadow-[2px_2px_0px_0px_#0F172A]">
            <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <Compass className="w-3 h-3 text-cyan-600" />
              <span>CAREER GOAL VECTOR</span>
            </span>
            <p className="text-xs font-extrabold text-slate-950 uppercase font-heading">
              {goalMap[profile.careerGoal] || 'Target Career Search'}
            </p>
          </div>

          <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-1 shadow-[2px_2px_0px_0px_#0F172A]">
            <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-indigo-600" />
              <span>CAREER STAGE</span>
            </span>
            <p className="text-xs font-extrabold text-slate-950 uppercase font-heading">
              {stageMap[profile.careerStage] || 'Experienced Professional'}
            </p>
          </div>

          <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-1 shadow-[2px_2px_0px_0px_#0F172A]">
            <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>LOCATION PREFERENCE</span>
            </span>
            <p className="text-xs font-bold text-slate-950">
              {profile.location || 'Flexible / Remote'}
            </p>
          </div>

          <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-1 shadow-[2px_2px_0px_0px_#0F172A]">
            <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <Laptop className="w-3 h-3 text-cyan-600" />
              <span>WORK MODE</span>
            </span>
            <p className="text-xs font-bold text-slate-950 uppercase">
              [{profile.workMode || 'hybrid'}]
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
