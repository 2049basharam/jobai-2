import React from 'react';
import {
  Building2,
  MapPin,
  Bookmark,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import type { Opportunity, OpportunityAlignment } from '../../lib/opportunities';

interface Props {
  opportunity: Opportunity;
  alignment: OpportunityAlignment;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (opportunity: Opportunity) => void;
}

export const OpportunityCard: React.FC<Props> = ({
  opportunity,
  alignment,
  isSaved,
  onToggleSave,
  onSelect,
}) => {
  const getAlignmentBadgeStyle = () => {
    if (alignment.alignmentGrade === 'HIGH_ALIGNMENT') {
      return 'bg-emerald-100 text-emerald-950 border-emerald-400';
    }
    if (alignment.alignmentGrade === 'MODERATE_ALIGNMENT') {
      return 'bg-cyan-100 text-cyan-950 border-cyan-400';
    }
    return 'bg-amber-100 text-amber-950 border-amber-400';
  };

  return (
    <div className="brutalist-card bg-white p-5 rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] hover:shadow-[8px_8px_0px_0px_#06B6D4] transition-all flex flex-col justify-between gap-4 font-mono group">
      {/* Card Header: Title & Save Toggle */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap text-[10px]">
              {/* Provenance Badge */}
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-300">
                [{opportunity.sourceLabel}]
              </span>

              {/* Work Mode Badge */}
              <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-900 font-bold uppercase border border-cyan-200">
                {opportunity.workMode}
              </span>

              {/* Experience Badge */}
              <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-800 font-bold uppercase border border-slate-200">
                {opportunity.experienceLevel}
              </span>
            </div>

            <h3 
              onClick={() => onSelect(opportunity)}
              className="text-lg font-bold text-slate-900 font-sans group-hover:text-cyan-700 cursor-pointer transition-colors leading-snug"
            >
              {opportunity.title}
            </h3>

            <div className="flex items-center gap-3 text-xs text-slate-600 font-sans flex-wrap">
              <span className="flex items-center gap-1 font-bold text-slate-800">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                {opportunity.organization}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {opportunity.location}
              </span>
            </div>
          </div>

          {/* Save Opportunity Bookmark Button */}
          <button
            type="button"
            id={`save-opp-${opportunity.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(opportunity.id);
            }}
            className={`w-9 h-9 min-w-[36px] min-h-[36px] rounded-xl border-2 border-slate-900 flex items-center justify-center shrink-0 z-10 transition-all ${
              isSaved
                ? 'bg-cyan-400 text-slate-950 shadow-[2px_2px_0px_0px_#0F172A]'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
            title={isSaved ? 'Unsave Opportunity' : 'Save Opportunity'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-slate-950' : ''}`} />
          </button>
        </div>

        {/* Deterministic Alignment Index Indicator */}
        <div className={`p-3 rounded-xl border-2 ${getAlignmentBadgeStyle()} flex items-center justify-between gap-2 text-xs`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <div>
              <span className="font-extrabold uppercase">DETERMINISTIC ALIGNMENT: {alignment.alignmentIndex}% MATCH</span>
              <span className="block text-[10px] opacity-80 font-sans">
                Matches {alignment.matchedRequiredSkills.length} of {opportunity.requiredSkills.length} required skills
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/70 border border-slate-900/20">
            {alignment.alignmentGrade.replace('_', ' ')}
          </span>
        </div>

        {/* Description Snippet */}
        <p className="text-xs text-slate-600 font-sans line-clamp-2 leading-relaxed">
          {opportunity.description}
        </p>
      </div>

      {/* Skills Overlap & Action Footer */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        {/* Required Skills Overlap Badges */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-between">
            <span>REQUIREMENTS OVERLAP</span>
            <span>{alignment.supportingProjectCount} PROJECT EVIDENCE ARTIFACTS</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {/* Matched Required Skills */}
            {alignment.matchedRequiredSkills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-900 text-[11px] font-bold border border-emerald-300 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {skill}
              </span>
            ))}

            {/* Missing Required Skills */}
            {alignment.missingRequiredSkills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 text-[11px] font-bold border border-amber-300 flex items-center gap-1 opacity-80"
              >
                <AlertCircle className="w-3 h-3 text-amber-600" />
                {skill} (GAP)
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => onSelect(opportunity)}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-cyan-600 hover:text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4] transition-all flex items-center justify-center gap-2 group-hover:translate-x-0.5"
        >
          <span>ANALYZE ALIGNMENT & EVIDENCE</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
