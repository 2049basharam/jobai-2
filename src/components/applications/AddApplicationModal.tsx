import React, { useState } from 'react';
import { X, Send, AlertCircle, FileText, Sparkles } from 'lucide-react';
import { applicationInputSchema, type CandidateApplication, type ApplicationStage } from '../../lib/applications';
import type { CandidateDocument } from '../../lib/document';

interface Props {
  documents: CandidateDocument[];
  onClose: () => void;
  onSave: (application: CandidateApplication) => void;
}

export const AddApplicationModal: React.FC<Props> = ({ documents, onClose, onSave }) => {
  const [roleTitle, setRoleTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState<'remote' | 'hybrid' | 'onsite'>('hybrid');
  const [stage, setStage] = useState<ApplicationStage>('APPLIED');
  const [appliedDate, setAppliedDate] = useState(new Date().toISOString().split('T')[0]);
  const [applicationUrl, setApplicationUrl] = useState('');
  const [selectedResumeId, setSelectedResumeId] = useState<string>('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = applicationInputSchema.safeParse({
      roleTitle,
      organization,
      location,
      workMode,
      stage,
      appliedDate,
      applicationUrl: applicationUrl.trim(),
      notes,
    });

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    // Find selected resume document name
    const doc = documents.find((d) => d.id === selectedResumeId);

    const now = new Date().toISOString();
    const newApp: CandidateApplication = {
      id: `app-${Date.now()}`,
      userId: 'user-default',
      roleTitle,
      organization,
      location,
      workMode,
      stage,
      appliedDate: new Date(appliedDate).toISOString(),
      applicationUrl: applicationUrl.trim() || undefined,
      submittedResumeId: selectedResumeId || undefined,
      submittedResumeName: doc?.originalFilename || undefined,
      notes: notes.trim() || undefined,
      source: 'MANUALLY_ADDED',
      statusHistory: [
        {
          id: `hist-${Date.now()}`,
          stage,
          changedAt: now,
          notes: `Application manually tracked at stage: ${stage}`,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    onSave(newApp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 font-mono">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0F172A] overflow-hidden max-h-[90vh] flex flex-col justify-between">
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 text-white border-b-2 border-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold tracking-wider">TRACK NEW APPLICATION</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto font-sans text-xs">
          {/* Role Title */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 font-mono">
              Role Title *
            </label>
            <input
              type="text"
              id="input-app-title"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="e.g. Senior AI Systems Engineer"
              className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 focus:outline-none focus:border-cyan-500 font-sans"
              required
            />
            {errors.roleTitle && <p className="text-[10px] text-rose-600 mt-1 font-mono">{errors.roleTitle}</p>}
          </div>

          {/* Organization */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 font-mono">
              Organization / Company *
            </label>
            <input
              type="text"
              id="input-app-org"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. Aptivue Technologies"
              className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 focus:outline-none focus:border-cyan-500 font-sans"
              required
            />
            {errors.organization && <p className="text-[10px] text-rose-600 mt-1 font-mono">{errors.organization}</p>}
          </div>

          {/* Location & Work Mode */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 font-mono">
                Location *
              </label>
              <input
                type="text"
                id="input-app-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru, India"
                className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 focus:outline-none focus:border-cyan-500 font-sans"
                required
              />
              {errors.location && <p className="text-[10px] text-rose-600 mt-1 font-mono">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 font-mono">
                Work Mode *
              </label>
              <select
                id="input-app-workmode"
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 bg-white focus:outline-none focus:border-cyan-500 font-sans"
              >
                <option value="hybrid">Hybrid</option>
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
              </select>
            </div>
          </div>

          {/* Stage & Date Applied */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 font-mono">
                Application Stage *
              </label>
              <select
                id="input-app-stage"
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 bg-white focus:outline-none focus:border-cyan-500 font-sans font-bold"
              >
                <option value="SAVED">Saved</option>
                <option value="APPLIED">Applied</option>
                <option value="SCREENING">Screening</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
                <option value="WITHDRAWN">Withdrawn</option>
                <option value="ACCEPTED">Accepted</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 font-mono">
                Applied Date *
              </label>
              <input
                type="date"
                id="input-app-date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 focus:outline-none focus:border-cyan-500 font-sans"
                required
              />
            </div>
          </div>

          {/* Application URL */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 font-mono">
              Application / Job URL (Optional)
            </label>
            <input
              type="url"
              id="input-app-url"
              value={applicationUrl}
              onChange={(e) => setApplicationUrl(e.target.value)}
              placeholder="https://company.com/careers/role"
              className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 focus:outline-none focus:border-cyan-500 font-sans"
            />
            {errors.applicationUrl && <p className="text-[10px] text-rose-600 mt-1 font-mono">{errors.applicationUrl}</p>}
          </div>

          {/* Submitted Resume Document Select */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 font-mono">
              Attached Resume Version (Optional)
            </label>
            <select
              id="input-app-resume"
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 bg-white focus:outline-none focus:border-cyan-500 font-sans"
            >
              <option value="">No Resume Version Selected</option>
              {documents.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.originalFilename} ({doc.documentType})
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 font-mono">
              Candidate Notes (Private)
            </label>
            <textarea
              id="input-app-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Private notes, recruiter contact names, or follow-up reminders..."
              className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 focus:outline-none focus:border-cyan-500 font-sans h-20 resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2 font-mono">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs"
            >
              CANCEL
            </button>
            <button
              type="submit"
              id="submit-add-app-btn"
              className="py-2 px-5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-cyan-600 hover:text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4] transition-all"
            >
              SAVE APPLICATION
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
