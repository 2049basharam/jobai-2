import React, { useState } from 'react';
import { User, Mail, ShieldCheck, Edit3, Check, X, AlertCircle } from 'lucide-react';
import type { CandidateProfile } from '../../lib/profile';
import { profileIdentitySchema } from '../../lib/validation/profile';

interface Props {
  profile: CandidateProfile;
  onSave: (updated: Partial<CandidateProfile>) => Promise<void>;
}

export const IdentitySection: React.FC<Props> = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(profile.fullName || '');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = profileIdentitySchema.safeParse({ fullName });
    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Invalid full name');
      return;
    }

    setIsSaving(true);
    try {
      await onSave({ fullName: validation.data.fullName });
      setIsEditing(false);
    } catch (err: any) {
      setError(err?.message || 'Failed to update identity');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFullName(profile.fullName || '');
    setError(null);
    setIsEditing(false);
  };

  return (
    <div id="identity" className="w-full brutalist-card bg-white rounded-2xl p-6 sm:p-7 space-y-5 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4 font-mono">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-400 text-slate-950 border border-slate-900">
              <User className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              [01] FOUNDATIONAL IDENTITY
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            // Core candidate personal identity & authenticated owner record
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            id="edit-identity-btn"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_0px_#0F172A]"
          >
            <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Edit Identity</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-3.5 rounded-xl border-2 border-red-500 bg-red-50 text-red-900 font-mono text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 stroke-[2.5]" />
          <span>{error}</span>
        </div>
      )}

      {/* Content Form / Read view */}
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4 font-mono">
          <div className="space-y-1">
            <label htmlFor="identity-fullName" className="text-xs font-bold text-slate-900 uppercase">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="identity-fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="e.g. Alex Morgan"
              required
            />
          </div>

          <div className="space-y-1 opacity-75">
            <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-2">
              <span>Email Address</span>
              <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded border border-slate-300">
                AUTH_KEY_LOCKED
              </span>
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-slate-100 text-slate-500 font-sans text-sm cursor-not-allowed"
            />
            <p className="text-[11px] text-slate-500">// Email is managed by Supabase authentication identity</p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              id="save-identity-btn"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#06B6D4] transition-all"
            >
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>{isSaving ? 'Saving...' : 'Save Identity'}</span>
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
          <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-1 shadow-[2px_2px_0px_0px_#0F172A]">
            <span className="text-[10px] font-bold text-slate-500 uppercase">// FULL CANDIDATE NAME</span>
            <p className="text-sm font-extrabold text-slate-950 font-heading">
              {profile.fullName || 'Not specified'}
            </p>
          </div>

          <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-1 shadow-[2px_2px_0px_0px_#0F172A]">
            <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <Mail className="w-3 h-3 text-cyan-600" />
              <span>AUTHENTICATED EMAIL</span>
            </span>
            <p className="text-sm font-extrabold text-slate-950 truncate">
              {profile.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
