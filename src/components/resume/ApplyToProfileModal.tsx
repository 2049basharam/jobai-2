import React, { useState } from 'react';
import { ShieldCheck, Check, X, ArrowRight, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import type { ParsedResumeArtifact } from '../../lib/document';
import { applyArtifactToProfile } from '../../lib/document';

interface Props {
  artifact: ParsedResumeArtifact;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ApplyToProfileModal: React.FC<Props> = ({ artifact, isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;

  const [selectedFields, setSelectedFields] = useState({
    fullName: true,
    summary: true,
    experience: true,
    education: true,
  });
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const sData = artifact.structuredData;

  const handleToggle = (key: keyof typeof selectedFields) => {
    setSelectedFields((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApply = async () => {
    setIsApplying(true);
    setFeedback(null);
    try {
      const res = await applyArtifactToProfile(artifact, selectedFields);
      if (res.success) {
        setFeedback('Authoritative profile records updated successfully!');
        setTimeout(() => {
          setIsApplying(false);
          onSuccess();
          onClose();
        }, 1500);
      } else {
        setFeedback('Failed to apply updates to profile');
        setIsApplying(false);
      }
    } catch (err: any) {
      setFeedback(err?.message || 'Error updating profile');
      setIsApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 font-mono select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl brutalist-card bg-white rounded-2xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_#0F172A] p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b-2 border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                <span>AUTHORITATIVE_PROFILE_DIFF_REVIEW</span>
              </h3>
              <p className="text-xs text-slate-500">
                Select which parsed resume sections to import into your authoritative profile
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border-2 border-slate-900 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all shadow-[2px_2px_0px_0px_#0F172A]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security Guardrail Warning */}
        <div className="p-3.5 rounded-xl bg-cyan-50 border-2 border-cyan-400 text-cyan-950 text-xs flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-cyan-700 shrink-0" />
          <span>
            <strong>Zero Automatic Overwrites:</strong> Fields are updated only for items checked below. Unchecked fields remain completely untouched.
          </span>
        </div>

        {/* Field Selection Checklist & Diff Previews */}
        <div className="space-y-4">
          {/* Full Name */}
          {sData.contact?.fullName && (
            <label className="flex items-start gap-3 p-3.5 rounded-xl border-2 border-slate-900 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={selectedFields.fullName}
                onChange={() => handleToggle('fullName')}
                className="mt-1 w-4 h-4 rounded border-slate-900 text-cyan-600 focus:ring-cyan-500"
              />
              <div className="space-y-0.5 text-xs">
                <span className="font-bold text-slate-900 uppercase">FULL NAME</span>
                <p className="text-slate-600">Import: <strong className="text-slate-900">{sData.contact.fullName}</strong></p>
              </div>
            </label>
          )}

          {/* Executive Summary */}
          {sData.summary && (
            <label className="flex items-start gap-3 p-3.5 rounded-xl border-2 border-slate-900 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={selectedFields.summary}
                onChange={() => handleToggle('summary')}
                className="mt-1 w-4 h-4 rounded border-slate-900 text-cyan-600 focus:ring-cyan-500"
              />
              <div className="space-y-0.5 text-xs">
                <span className="font-bold text-slate-900 uppercase">EXECUTIVE SUMMARY</span>
                <p className="text-slate-600 line-clamp-2">{sData.summary}</p>
              </div>
            </label>
          )}

          {/* Work Experience */}
          {sData.experience && sData.experience.length > 0 && (
            <label className="flex items-start gap-3 p-3.5 rounded-xl border-2 border-slate-900 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={selectedFields.experience}
                onChange={() => handleToggle('experience')}
                className="mt-1 w-4 h-4 rounded border-slate-900 text-cyan-600 focus:ring-cyan-500"
              />
              <div className="space-y-0.5 text-xs">
                <span className="font-bold text-slate-900 uppercase">WORK EXPERIENCE ({sData.experience.length} Entries)</span>
                <p className="text-slate-600">Import work history entries into `/profile#experience`</p>
              </div>
            </label>
          )}

          {/* Education */}
          {sData.education && sData.education.length > 0 && (
            <label className="flex items-start gap-3 p-3.5 rounded-xl border-2 border-slate-900 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={selectedFields.education}
                onChange={() => handleToggle('education')}
                className="mt-1 w-4 h-4 rounded border-slate-900 text-cyan-600 focus:ring-cyan-500"
              />
              <div className="space-y-0.5 text-xs">
                <span className="font-bold text-slate-900 uppercase">ACADEMIC EDUCATION ({sData.education.length} Entries)</span>
                <p className="text-slate-600">Import degree records into `/profile#education`</p>
              </div>
            </label>
          )}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-950 border-2 border-emerald-700 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-slate-900">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-900 font-bold text-xs transition-all shadow-[3px_3px_0px_0px_#0F172A]"
          >
            Cancel
          </button>
          <button
            type="button"
            id="confirm-apply-profile-btn"
            disabled={isApplying}
            onClick={handleApply}
            className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-cyan-400 border-2 border-slate-900 font-bold text-xs transition-all shadow-[3px_3px_0px_0px_#06B6D4] active:scale-95 flex items-center gap-2 disabled:opacity-50"
          >
            {isApplying ? <Loader2 className="w-4 h-4 animate-spin text-cyan-400" /> : <ShieldCheck className="w-4 h-4" />}
            <span>Commit Selected Fields to Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
