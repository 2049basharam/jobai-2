import React from 'react';
import { X, FolderGit2, Trash2, Edit3, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import type { CandidateSkillRecord } from '../../lib/skills';

interface Props {
  skill: CandidateSkillRecord | null;
  onClose: () => void;
  onEdit: (skill: CandidateSkillRecord) => void;
  onDelete: (skillId: string) => void;
}

export const SkillDetailDrawer: React.FC<Props> = ({ skill, onClose, onEdit, onDelete }) => {
  if (!skill) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white h-full border-l-2 border-slate-900 shadow-2xl p-6 overflow-y-auto space-y-6 font-mono flex flex-col justify-between">
        {/* Top Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-slate-950 bg-cyan-400 px-2.5 py-1 border border-slate-900 rounded shadow-[1px_1px_0px_0px_#0F172A]">
                CAPABILITY_RECORD
              </span>
              <span className="text-xs font-bold text-slate-600">
                // ID: {skill.canonicalId}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border-2 border-slate-900 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold transition-all"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Skill Name & Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-2xl font-black text-slate-950 uppercase font-heading">
                {skill.name}
              </h2>
              <span className="text-xs font-bold px-2.5 py-1 border border-slate-900 rounded bg-cyan-400 text-slate-950 uppercase">
                {skill.evidenceState.replace('_', ' ')}
              </span>
            </div>

            <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 border border-slate-300 rounded inline-block">
              DOMAIN: {skill.category}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium pt-1">
              {skill.description || 'No detailed description provided.'}
            </p>
          </div>

          {/* Temporal Demonstrations */}
          <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-600" />
              <span>FIRST DEMONSTRATED: {skill.firstDemonstrated || 'N/A'}</span>
            </div>
            <div>
              <span>RECENT DEMONSTRATION: {skill.lastDemonstrated || 'N/A'}</span>
            </div>
          </div>

          {/* Evidence Timeline Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1">
              <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-wider flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4 text-cyan-600" />
                AUTHENTICATED EVIDENCE TIMELINE ({skill.evidence.length})
              </h3>
              <span className="text-[10px] font-bold text-slate-500">
                [SOURCE TRACEABILITY]
              </span>
            </div>

            {skill.evidence.length === 0 ? (
              <div className="p-4 rounded-lg border-2 border-dashed border-slate-300 text-center text-xs text-slate-500">
                No supporting evidence items attached. Click edit to add evidence references.
              </div>
            ) : (
              <div className="space-y-2.5">
                {skill.evidence.map((ev, idx) => (
                  <div
                    key={ev.id || idx}
                    className="p-3.5 rounded-xl border-2 border-slate-900 bg-white shadow-[2px_2px_0px_0px_#0F172A] space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-900 text-cyan-400 border border-slate-900 rounded">
                          SOURCE: {ev.sourceType}
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-950 font-heading pt-1">
                          {ev.title}
                        </h4>
                      </div>

                      {ev.linkUrl && (
                        <a
                          href={ev.linkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    {ev.description && (
                      <p className="text-[11px] text-slate-600 leading-normal">
                        {ev.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>VERIFIER: {ev.verifierName || 'Candidate Record'}</span>
                      {ev.demonstratedDate && <span>DEMONSTRATED: {ev.demonstratedDate}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Related Capabilities */}
          {skill.relatedSkills && skill.relatedSkills.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <h3 className="text-xs font-extrabold text-slate-950 uppercase">
                RELATED CAPABILITIES
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skill.relatedSkills.map((rel) => (
                  <span
                    key={rel}
                    className="text-[10px] font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded border border-slate-300"
                  >
                    {rel}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t-2 border-slate-900 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-600" />}
            onClick={() => onDelete(skill.id)}
          >
            Delete Skill
          </Button>

          <Button
            type="button"
            variant="brutalist-cyan"
            size="sm"
            leftIcon={<Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />}
            onClick={() => onEdit(skill)}
          >
            Edit Skill Record
          </Button>
        </div>
      </div>
    </div>
  );
};
