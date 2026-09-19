import React, { useState } from 'react';
import { FileCode, Code, User, Briefcase, GraduationCap, FolderGit2, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import type { ParsedResumeArtifact } from '../../lib/document';

interface Props {
  artifact: ParsedResumeArtifact | null;
  onOpenApplyModal?: () => void;
}

export const ParsedArtifactPreview: React.FC<Props> = ({ artifact, onOpenApplyModal }) => {
  const [activeTab, setActiveTab] = useState<'structured' | 'raw'>('structured');
  const [copied, setCopied] = useState<boolean>(false);

  if (!artifact) {
    return (
      <div className="p-8 brutalist-card bg-white rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] text-center font-mono space-y-3">
        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center border border-slate-300">
          <FileCode className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          <span>// NO_PARSED_ARTIFACT_SELECTED</span>
        </div>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Select or upload a resume document above to inspect its extracted text stream and structured entity JSON artifact.
        </p>
      </div>
    );
  }

  const sData = artifact.structuredData;

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(artifact.rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="brutalist-card bg-white rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] p-5 font-mono space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-900">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-950 text-cyan-400 flex items-center justify-center border border-slate-900">
            <Sparkles className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span>PARSED_RESUME_ARTIFACT_INSPECTOR</span>
            </h3>
            <div className="text-[10px] text-slate-500 flex items-center gap-2 pt-0.5">
              <span>[PARSER_v{artifact.parserVersion}]</span>
              <span>•</span>
              <span>[{artifact.extractionMethod.toUpperCase()}]</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher & Opt-in Sync Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-300 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('structured')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === 'structured'
                  ? 'bg-slate-950 text-cyan-400 border border-slate-900 shadow-[2px_2px_0px_0px_#06B6D4]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Structured JSON
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('raw')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === 'raw'
                  ? 'bg-slate-950 text-cyan-400 border border-slate-900 shadow-[2px_2px_0px_0px_#06B6D4]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Raw Text Stream
            </button>
          </div>

          {onOpenApplyModal && (
            <button
              type="button"
              id="apply-to-profile-btn"
              onClick={onOpenApplyModal}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 border-2 border-slate-900 font-bold text-xs transition-all shadow-[3px_3px_0px_0px_#0F172A] active:scale-95 flex items-center gap-1.5"
            >
              <span>Apply to Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Structured JSON View */}
      {activeTab === 'structured' && (
        <div className="space-y-6">
          {/* Contact Header Block */}
          <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-900 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
              <User className="w-4 h-4 text-cyan-600" />
              <span>CANDIDATE_CONTACT_IDENTIFIERS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div>
                <span className="text-slate-500">FULL NAME:</span>{' '}
                <span className="font-bold text-slate-900">{sData.contact?.fullName || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-500">EMAIL:</span>{' '}
                <span className="font-bold text-slate-900">{sData.contact?.email || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-500">PHONE:</span>{' '}
                <span className="font-bold text-slate-900">{sData.contact?.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-500">LOCATION:</span>{' '}
                <span className="font-bold text-slate-900">{sData.contact?.location || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          {sData.summary && (
            <div className="p-4 rounded-xl bg-white border-2 border-slate-900 space-y-1">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span>EXECUTIVE_SUMMARY</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pt-1">{sData.summary}</p>
            </div>
          )}

          {/* Skills Array */}
          {sData.skills && sData.skills.length > 0 && (
            <div className="p-4 rounded-xl bg-white border-2 border-slate-900 space-y-2">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                <span>EXTRACTED_TECHNICAL_SKILLS ({sData.skills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {sData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-slate-950 text-cyan-400 border border-slate-900 text-xs font-bold shadow-[2px_2px_0px_0px_#06B6D4]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {sData.experience && sData.experience.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-600" />
                <span>WORK_EXPERIENCE ({sData.experience.length})</span>
              </div>
              <div className="space-y-3">
                {sData.experience.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border-2 border-slate-900 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{exp.position}</h4>
                        <p className="text-xs text-slate-600 font-bold">{exp.company}</p>
                      </div>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded border text-slate-600 font-bold">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-slate-700 pt-1 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {sData.education && sData.education.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-600" />
                <span>ACADEMIC_EDUCATION ({sData.education.length})</span>
              </div>
              <div className="space-y-2">
                {sData.education.map((edu, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-900 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{edu.degree} in {edu.fieldOfStudy}</h4>
                      <p className="text-xs text-slate-600 font-bold">{edu.institution}</p>
                    </div>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border text-slate-600 font-bold">
                      Class of {edu.gradYear}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Raw Text Stream View */}
      {activeTab === 'raw' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">// RAW_EXTRACTED_TEXT_STREAM</span>
            <button
              type="button"
              onClick={handleCopyRaw}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 text-[10px] font-bold text-slate-700 flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Raw Text'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 text-cyan-400 border-2 border-slate-900 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto shadow-[4px_4px_0px_0px_#06B6D4]">
            {artifact.rawText}
          </pre>
        </div>
      )}
    </div>
  );
};
