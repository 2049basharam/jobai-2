import React, { useState } from 'react';
import { FileText, Edit3, Check, X, AlertCircle } from 'lucide-react';
import type { CandidateProfile } from '../../lib/profile';
import { professionalSummarySchema } from '../../lib/validation/profile';

interface Props {
  profile: CandidateProfile;
  onSave: (updated: Partial<CandidateProfile>) => Promise<void>;
}

export const SummarySection: React.FC<Props> = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>(profile.professionalSummary || '');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = professionalSummarySchema.safeParse({ professionalSummary: summary });
    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Invalid summary');
      return;
    }

    setIsSaving(true);
    try {
      await onSave({ professionalSummary: validation.data.professionalSummary });
      setIsEditing(false);
    } catch (err: any) {
      setError(err?.message || 'Failed to update summary');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setSummary(profile.professionalSummary || '');
    setError(null);
    setIsEditing(false);
  };

  return (
    <div id="summary" className="w-full brutalist-card bg-white rounded-2xl p-6 sm:p-7 space-y-5 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4 font-mono">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-400 text-slate-950 border border-slate-900">
              <FileText className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              [03] PROFESSIONAL SUMMARY
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            // High-impact candidate career overview and technical background synthesis
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            id="edit-summary-btn"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_0px_#0F172A]"
          >
            <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Edit Summary</span>
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
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold text-slate-900 uppercase">
              <label htmlFor="summary-text">Professional Summary</label>
              <span className="text-slate-500 text-[11px] font-normal">
                {summary.length} / 2000 chars
              </span>
            </div>
            <textarea
              id="summary-text"
              rows={5}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Write a brief professional summary describing your core technical experience, key achievements, and career focus..."
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              id="save-summary-btn"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#06B6D4] transition-all"
            >
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>{isSaving ? 'Saving...' : 'Save Summary'}</span>
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
        <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 font-sans text-sm text-slate-800 leading-relaxed shadow-[2px_2px_0px_0px_#0F172A]">
          {profile.professionalSummary && profile.professionalSummary.trim().length > 0 ? (
            <p className="whitespace-pre-wrap">{profile.professionalSummary}</p>
          ) : (
            <div className="font-mono text-xs space-y-2 py-2">
              <span className="text-slate-400 uppercase font-bold">// NO SUMMARY ADDED YET</span>
              <p className="text-slate-600">
                Add your professional summary so JobAI can understand your career narrative and technical background.
              </p>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded bg-cyan-400 text-slate-950 font-bold text-xs border border-slate-900 uppercase"
              >
                + Add Professional Summary
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
