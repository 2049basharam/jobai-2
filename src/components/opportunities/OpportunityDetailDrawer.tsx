import React from 'react';
import {
  X,
  Building2,
  MapPin,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  ExternalLink,
  Boxes,
  FolderGit2,
  Sparkles,
} from 'lucide-react';
import type { Opportunity, OpportunityAlignment } from '../../lib/opportunities';
import type { CandidateProfile } from '../../lib/profile';

interface Props {
  opportunity: Opportunity | null;
  alignment: OpportunityAlignment | null;
  isSaved: boolean;
  profile: CandidateProfile | null;
  onClose: () => void;
  onToggleSave: (id: string) => void;
}

export const OpportunityDetailDrawer: React.FC<Props> = ({
  opportunity,
  alignment,
  isSaved,
  profile,
  onClose,
  onToggleSave,
}) => {
  if (!opportunity || !alignment) return null;

  // Find candidate projects supporting this opportunity
  const supportingProjects = profile?.projects.filter((p) => {
    const pTechs = p.technologies.map((t) => t.toLowerCase().trim());
    return opportunity.requiredSkills.some((req) => pTechs.includes(req.toLowerCase().trim()));
  }) || [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 font-mono">
      {/* Drawer Overlay Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Drawer Container */}
      <div className="relative w-full max-w-2xl bg-white h-full border-l-4 border-slate-900 shadow-2xl overflow-y-auto flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 bg-slate-950 text-white border-b-2 border-slate-900 space-y-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>OPPORTUNITY_INTELLIGENCE_RECORD</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-[10px]">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold border border-slate-700">
                [{opportunity.sourceLabel}]
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-400 text-slate-950 font-bold uppercase">
                {opportunity.workMode}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-white font-bold uppercase border border-slate-700">
                {opportunity.experienceLevel}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-white font-sans leading-tight">
              {opportunity.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-300 font-sans flex-wrap">
              <span className="flex items-center gap-1 font-bold text-cyan-300">
                <Building2 className="w-3.5 h-3.5" />
                {opportunity.organization}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {opportunity.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                {opportunity.employmentType}
              </span>
            </div>
          </div>
        </div>

        {/* Drawer Body Content */}
        <div className="p-6 space-y-6 font-sans">
          {/* Section 1: Deterministic Alignment Analysis */}
          <div className="brutalist-card bg-slate-50 p-5 rounded-xl border-2 border-slate-900 space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold uppercase text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                DETERMINISTIC ALIGNMENT MODEL
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 text-cyan-400 font-extrabold text-xs">
                {alignment.alignmentIndex}% MATCH
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {alignment.explanation}
            </p>

            {/* Matched Required Skills */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                MATCHED REQUIRED CAPABILITIES ({alignment.matchedRequiredSkills.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {alignment.matchedRequiredSkills.length > 0 ? (
                  alignment.matchedRequiredSkills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-950 font-mono text-xs font-bold border border-emerald-300 flex items-center gap-1"
                    >
                      ✓ {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 font-mono">No direct required skill matches.</span>
                )}
              </div>
            </div>

            {/* Missing Required Skills (Gaps) */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-bold text-amber-800 uppercase flex items-center gap-1 font-mono">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                CAPABILITY GAPS TO ACQUIRE ({alignment.missingRequiredSkills.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {alignment.missingRequiredSkills.length > 0 ? (
                  alignment.missingRequiredSkills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-950 font-mono text-xs font-bold border border-amber-300 flex items-center gap-1"
                    >
                      △ {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-700 font-mono font-bold">100% required skills matched!</span>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Supporting Project Evidence */}
          <div className="space-y-3 font-mono">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-cyan-600" />
              SUPPORTING CANDIDATE PROJECTS ({supportingProjects.length})
            </h4>

            {supportingProjects.length > 0 ? (
              <div className="space-y-2">
                {supportingProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3 bg-white rounded-xl border border-slate-300 space-y-1 font-sans text-xs"
                  >
                    <div className="flex items-center justify-between font-mono font-bold text-slate-900">
                      <span>{proj.title}</span>
                      {proj.role && <span className="text-[10px] text-cyan-700">{proj.role}</span>}
                    </div>
                    {proj.description && <p className="text-slate-600">{proj.description}</p>}
                    <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px]">
                      {proj.technologies.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 font-sans">
                No matching projects in your candidate profile currently list the required technologies for this role.
              </div>
            )}
          </div>

          {/* Section 3: Full Role Description & Responsibilities */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              ROLE OVERVIEW & RESPONSIBILITIES
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{opportunity.description}</p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-800 font-mono uppercase">Key Responsibilities:</span>
              <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                {opportunity.responsibilities.map((resp, i) => (
                  <li key={i} className="leading-relaxed">
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 bg-slate-50 border-t-2 border-slate-900 space-y-3 font-mono sticky bottom-0 z-20">
          <div className="flex items-center gap-3">
            {/* Save Opportunity Toggle */}
            <button
              type="button"
              onClick={() => onToggleSave(opportunity.id)}
              className={`py-3 px-4 rounded-xl border-2 border-slate-900 font-bold text-xs flex items-center gap-2 transition-all ${
                isSaved
                  ? 'bg-cyan-400 text-slate-950 shadow-[3px_3px_0px_0px_#0F172A]'
                  : 'bg-white text-slate-900 hover:bg-slate-100 shadow-[3px_3px_0px_0px_#0F172A]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-slate-950' : ''}`} />
              <span>{isSaved ? 'SAVED' : 'SAVE ROLE'}</span>
            </button>

            {/* Skill Passport Navigation Link */}
            <a
              href="/skills"
              className="py-3 px-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Boxes className="w-4 h-4 text-cyan-600" />
              <span>UPDATE SKILL PASSPORT</span>
            </a>

            {/* External Application Button */}
            {opportunity.sourceUrl ? (
              <a
                href={opportunity.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-slate-900 text-white hover:bg-cyan-600 hover:text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4] font-bold text-xs flex items-center gap-2 transition-all ml-auto"
              >
                <span>APPLY EXTERNALLY</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="py-3 px-4 rounded-xl bg-slate-200 text-slate-500 border-2 border-slate-400 font-bold text-xs flex items-center gap-2 cursor-not-allowed ml-auto"
                title="External application link unavailable for illustrative preview"
              >
                <span>ILLUSTRATIVE PREVIEW</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
