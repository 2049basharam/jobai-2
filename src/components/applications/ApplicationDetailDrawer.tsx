import React, { useState } from 'react';
import {
  X,
  Building2,
  MapPin,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileEdit,
  History,
  BookOpen,
  Send,
  Trash2,
} from 'lucide-react';
import type { CandidateApplication, ApplicationStage } from '../../lib/applications';
import type { CandidateDocument } from '../../lib/document';
import type { CandidateProfile } from '../../lib/profile';
import type { CandidateSkillRecord } from '../../lib/skills';
import {
  generateCoverLetterDraftForApplication,
  generateInterviewPrepForApplication,
} from '../../lib/applications';

interface Props {
  application: CandidateApplication | null;
  documents: CandidateDocument[];
  profile: CandidateProfile | null;
  skills: CandidateSkillRecord[];
  onClose: () => void;
  onUpdateStage: (appId: string, newStage: ApplicationStage, notes?: string) => void;
  onSaveApplication: (app: CandidateApplication) => void;
  onDeleteApplication: (appId: string) => void;
}

export const ApplicationDetailDrawer: React.FC<Props> = ({
  application,
  documents,
  profile,
  skills,
  onClose,
  onUpdateStage,
  onSaveApplication,
  onDeleteApplication,
}) => {
  if (!application) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'prep' | 'history'>('overview');
  const [transitionNotes, setTransitionNotes] = useState('');
  const [editingNotes, setEditingNotes] = useState(application.notes || '');

  // Handle Stage Transition
  const handleStageChange = (newStage: ApplicationStage) => {
    if (newStage === application.stage) return;
    onUpdateStage(application.id, newStage, transitionNotes || `Stage changed to ${newStage}`);
    setTransitionNotes('');
  };

  // Handle Cover Letter Generation
  const handleGenerateCoverLetter = () => {
    const draft = generateCoverLetterDraftForApplication(application, profile);
    const updated: CandidateApplication = {
      ...application,
      coverLetter: draft,
      updatedAt: new Date().toISOString(),
    };
    onSaveApplication(updated);
  };

  // Toggle Cover Letter Approval
  const handleToggleCoverLetterApproval = () => {
    if (!application.coverLetter) return;
    const updated: CandidateApplication = {
      ...application,
      coverLetter: {
        ...application.coverLetter,
        isCandidateApproved: !application.coverLetter.isCandidateApproved,
        updatedAt: new Date().toISOString(),
      },
    };
    onSaveApplication(updated);
  };

  // Handle Interview Prep Generation
  const handleGenerateInterviewPrep = () => {
    const prep = generateInterviewPrepForApplication(application, skills);
    const updated: CandidateApplication = {
      ...application,
      interviewPrep: prep,
      updatedAt: new Date().toISOString(),
    };
    onSaveApplication(updated);
  };

  // Save Candidate Notes
  const handleSaveNotes = () => {
    const updated: CandidateApplication = {
      ...application,
      notes: editingNotes,
      updatedAt: new Date().toISOString(),
    };
    onSaveApplication(updated);
  };

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
              <span>APPLICATION_COMMAND_CENTER</span>
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
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold border border-slate-700">
                  [{application.source}]
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-400 text-slate-950 font-bold uppercase">
                  {application.workMode}
                </span>
              </div>

              {/* Dynamic Stage Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-bold">STAGE:</span>
                <select
                  id="drawer-stage-selector"
                  value={application.stage}
                  onChange={(e) => handleStageChange(e.target.value as ApplicationStage)}
                  className="px-2.5 py-1 rounded bg-cyan-400 text-slate-950 font-black text-xs border border-slate-900 cursor-pointer focus:outline-none"
                >
                  <option value="SAVED">SAVED</option>
                  <option value="APPLIED">APPLIED</option>
                  <option value="SCREENING">SCREENING</option>
                  <option value="INTERVIEW">INTERVIEW</option>
                  <option value="OFFER">OFFER</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="WITHDRAWN">WITHDRAWN</option>
                  <option value="ACCEPTED">ACCEPTED</option>
                </select>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-white font-sans leading-tight">
              {application.roleTitle}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-300 font-sans flex-wrap">
              <span className="flex items-center gap-1 font-bold text-cyan-300">
                <Building2 className="w-3.5 h-3.5" />
                {application.organization}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {application.location}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                Applied {new Date(application.appliedDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Drawer Navigation Tabs */}
          <div className="flex items-center gap-2 border-t border-slate-800 pt-3 text-xs flex-wrap">
            <button
              type="button"
              id="tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'overview' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              OVERVIEW
            </button>
            <button
              type="button"
              id="tab-submissions"
              onClick={() => setActiveTab('submissions')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'submissions' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              SUBMISSIONS & COVER LETTER
            </button>
            <button
              type="button"
              id="tab-prep"
              onClick={() => setActiveTab('prep')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'prep' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              INTERVIEW PREP
            </button>
            <button
              type="button"
              id="tab-history"
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'history' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              AUDIT HISTORY ({application.statusHistory?.length || 0})
            </button>
          </div>
        </div>

        {/* Drawer Body Tab Contents */}
        <div className="p-6 space-y-6 font-sans">
          {/* TAB 1: OVERVIEW & NOTES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Application Info Card */}
              <div className="brutalist-card bg-slate-50 p-5 rounded-xl border-2 border-slate-900 space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold uppercase text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600" />
                    PURSUIT PROVENANCE
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold text-[10px]">
                    ID: {application.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                  <div>
                    <span className="font-mono text-slate-500 uppercase text-[10px] block">Role Title</span>
                    <span className="font-bold text-slate-900">{application.roleTitle}</span>
                  </div>
                  <div>
                    <span className="font-mono text-slate-500 uppercase text-[10px] block">Organization</span>
                    <span className="font-bold text-slate-900">{application.organization}</span>
                  </div>
                  <div>
                    <span className="font-mono text-slate-500 uppercase text-[10px] block">Current Stage</span>
                    <span className="font-bold text-cyan-700">{application.stage}</span>
                  </div>
                  <div>
                    <span className="font-mono text-slate-500 uppercase text-[10px] block">Applied Date</span>
                    <span className="font-bold text-slate-900">{new Date(application.appliedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {application.applicationUrl && (
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-600">External Application Destination:</span>
                    <a
                      href={application.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-slate-900 text-white hover:bg-cyan-600 hover:text-slate-950 rounded text-xs font-mono font-bold flex items-center gap-1 transition-all"
                    >
                      <span>OPEN URL</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Private Candidate Notes Editor */}
              <div className="space-y-2 font-mono">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                    <FileEdit className="w-4 h-4 text-cyan-600" />
                    PRIVATE CANDIDATE NOTES
                  </label>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="px-2.5 py-1 bg-slate-900 text-cyan-400 hover:bg-slate-800 rounded text-[10px] font-bold"
                  >
                    SAVE NOTES
                  </button>
                </div>

                <textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Record interview notes, recruiter contacts, technical details..."
                  className="w-full h-32 p-3 rounded-xl border-2 border-slate-900 font-sans text-xs focus:outline-none focus:border-cyan-500 resize-none bg-slate-50"
                />
              </div>
            </div>
          )}

          {/* TAB 2: SUBMISSIONS & COVER LETTER */}
          {activeTab === 'submissions' && (
            <div className="space-y-6">
              {/* Submitted Resume Version Reference */}
              <div className="brutalist-card bg-slate-50 p-5 rounded-xl border-2 border-slate-900 space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold uppercase text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-cyan-600" />
                    ATTACHED RESUME VERSION
                  </span>
                  {application.submittedResumeName && (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 font-bold text-[10px] border border-emerald-300">
                      SUBMITTED
                    </span>
                  )}
                </div>

                {application.submittedResumeName ? (
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-300 text-xs">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 block font-mono">{application.submittedResumeName}</span>
                      <span className="text-[10px] text-slate-500 font-sans">Associated document artifact from /resume</span>
                    </div>
                    <a
                      href="/resume"
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-mono text-[10px] font-bold"
                    >
                      VIEW IN /RESUME
                    </a>
                  </div>
                ) : (
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-500">
                    No resume version is currently attached to this application record.
                  </div>
                )}
              </div>

              {/* Cover Letter Generator & Approval Workflow */}
              <div className="brutalist-card bg-white p-5 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] space-y-4 font-mono">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-600" />
                    <span className="text-xs font-bold uppercase text-slate-800">
                      COVER LETTER DRAFT
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleGenerateCoverLetter}
                    className="px-3 py-1.5 bg-slate-900 text-cyan-400 hover:bg-slate-800 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>GENERATE DRAFT</span>
                  </button>
                </div>

                {application.coverLetter ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-sans">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-950 font-bold font-mono border border-amber-300">
                        [AI_GENERATED_DRAFT]
                      </span>

                      <button
                        type="button"
                        onClick={handleToggleCoverLetterApproval}
                        className={`px-3 py-1 rounded-lg text-xs font-bold font-mono border transition-all flex items-center gap-1.5 ${
                          application.coverLetter.isCandidateApproved
                            ? 'bg-emerald-100 text-emerald-950 border-emerald-400'
                            : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${application.coverLetter.isCandidateApproved ? 'text-emerald-600' : ''}`} />
                        <span>
                          {application.coverLetter.isCandidateApproved ? 'CANDIDATE APPROVED' : 'APPROVE DRAFT'}
                        </span>
                      </button>
                    </div>

                    <textarea
                      value={application.coverLetter.content}
                      onChange={(e) => {
                        const updated: CandidateApplication = {
                          ...application,
                          coverLetter: {
                            ...application.coverLetter!,
                            content: e.target.value,
                            updatedAt: new Date().toISOString(),
                          },
                        };
                        onSaveApplication(updated);
                      }}
                      className="w-full h-48 p-3 rounded-xl border-2 border-slate-900 font-sans text-xs focus:outline-none focus:border-cyan-500 leading-relaxed bg-slate-50"
                    />
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 font-sans">
                    No cover letter draft generated yet. Click Generate Draft to build a tailored cover letter draft based on candidate skills and role requirements.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: INTERVIEW PREPARATION */}
          {activeTab === 'prep' && (
            <div className="space-y-6 font-mono">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                  STRUCTURED INTERVIEW PREPARATION
                </span>

                <button
                  type="button"
                  onClick={handleGenerateInterviewPrep}
                  className="px-3 py-1.5 bg-slate-900 text-cyan-400 hover:bg-slate-800 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>GENERATE PREP MATRIX</span>
                </button>
              </div>

              {application.interviewPrep && application.interviewPrep.length > 0 ? (
                <div className="space-y-4">
                  {application.interviewPrep.map((section) => (
                    <div
                      key={section.id}
                      className="p-4 bg-slate-50 rounded-xl border-2 border-slate-900 space-y-2"
                    >
                      <span className="text-xs font-bold uppercase text-cyan-800 block">
                        {section.category}
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700 font-sans list-disc list-inside">
                        {section.items.map((item, i) => (
                          <li key={i} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 font-sans text-center space-y-2">
                  <p>No interview preparation matrix generated yet.</p>
                  <button
                    type="button"
                    onClick={handleGenerateInterviewPrep}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl font-mono text-xs font-bold inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>BUILD PREPARATION MATRIX</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AUDIT & STATUS HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4 font-mono">
              <span className="text-xs font-bold uppercase text-slate-800 flex items-center gap-1.5">
                <History className="w-4 h-4 text-cyan-600" />
                AUDITABLE STATUS TRANSITION TIMELINE
              </span>

              {application.statusHistory && application.statusHistory.length > 0 ? (
                <div className="space-y-3 relative pl-4 border-l-2 border-slate-300">
                  {application.statusHistory.map((item) => (
                    <div key={item.id} className="relative space-y-1 font-sans text-xs">
                      <div className="w-3 h-3 rounded-full bg-slate-900 border-2 border-cyan-400 absolute -left-[23px] top-0.5" />
                      <div className="flex items-center justify-between font-mono">
                        <span className="font-bold text-slate-900 uppercase px-2 py-0.5 bg-slate-100 rounded border border-slate-300 text-[10px]">
                          {item.stage}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(item.changedAt).toLocaleString()}
                        </span>
                      </div>
                      {item.notes && <p className="text-slate-700 text-xs pt-0.5">{item.notes}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 font-sans">No status transitions recorded yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 bg-slate-50 border-t-2 border-slate-900 flex items-center justify-between font-mono sticky bottom-0 z-20">
          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to delete this application record?')) {
                onDeleteApplication(application.id);
                onClose();
              }
            }}
            className="py-2.5 px-4 rounded-xl bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-300 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>DELETE RECORD</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs"
          >
            CLOSE COMMAND CENTER
          </button>
        </div>
      </div>
    </div>
  );
};
