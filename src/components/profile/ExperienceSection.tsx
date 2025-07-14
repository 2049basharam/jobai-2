import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Edit3, Calendar, MapPin, Check, X, AlertCircle } from 'lucide-react';
import type { CandidateProfile, CandidateExperience } from '../../lib/profile';
import { experienceSchema } from '../../lib/validation/profile';

interface Props {
  profile: CandidateProfile;
  onSave: (updated: Partial<CandidateProfile>) => Promise<void>;
}

export const ExperienceSection: React.FC<Props> = ({ profile, onSave }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [company, setCompany] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isCurrent, setIsCurrent] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const openAddForm = () => {
    setEditingId(null);
    setCompany('');
    setPosition('');
    setLocation('');
    setStartDate('');
    setEndDate('');
    setIsCurrent(false);
    setDescription('');
    setError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (exp: CandidateExperience) => {
    setEditingId(exp.id);
    setCompany(exp.company);
    setPosition(exp.position);
    setLocation(exp.location || '');
    setStartDate(exp.startDate);
    setEndDate(exp.endDate || '');
    setIsCurrent(exp.isCurrent);
    setDescription(exp.description || '');
    setError(null);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = experienceSchema.safeParse({
      company,
      position,
      location,
      startDate,
      endDate: isCurrent ? '' : endDate,
      isCurrent,
      description,
    });

    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Invalid experience fields');
      return;
    }

    setIsSaving(true);
    try {
      let updatedExperience = [...profile.experience];
      if (editingId) {
        updatedExperience = updatedExperience.map((item) =>
          item.id === editingId
            ? {
                ...item,
                company: validation.data.company,
                position: validation.data.position,
                location: validation.data.location,
                startDate: validation.data.startDate,
                endDate: validation.data.endDate,
                isCurrent: validation.data.isCurrent,
                description: validation.data.description,
              }
            : item
        );
      } else {
        const newItem: CandidateExperience = {
          id: `exp-${Date.now()}`,
          company: validation.data.company,
          position: validation.data.position,
          location: validation.data.location,
          startDate: validation.data.startDate,
          endDate: validation.data.endDate,
          isCurrent: validation.data.isCurrent,
          description: validation.data.description,
        };
        updatedExperience.push(newItem);
      }

      await onSave({ experience: updatedExperience });
      setIsFormOpen(false);
      setEditingId(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to save experience');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) return;
    try {
      const updated = profile.experience.filter((exp) => exp.id !== id);
      await onSave({ experience: updated });
    } catch (err: any) {
      alert('Failed to delete experience: ' + err?.message);
    }
  };

  return (
    <div id="experience" className="w-full brutalist-card bg-white rounded-2xl p-6 sm:p-7 space-y-5 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4 font-mono">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-400 text-slate-950 border border-slate-900">
              <Briefcase className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              [04] WORK EXPERIENCE ({profile.experience.length})
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            // Verified employment history, roles & responsibilities
          </p>
        </div>

        {!isFormOpen && (
          <button
            type="button"
            id="add-experience-btn"
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#06B6D4] transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5] text-cyan-400" />
            <span>Add Experience</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-3.5 rounded-xl border-2 border-red-500 bg-red-50 text-red-900 font-mono text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 stroke-[2.5]" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Drawer / Card */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="p-5 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-4 font-mono shadow-[3px_3px_0px_0px_#0F172A]">
          <h4 className="text-xs font-black uppercase text-slate-950 border-b border-slate-300 pb-2">
            {editingId ? '// EDIT EXPERIENCE RECORD' : '// NEW EXPERIENCE RECORD'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="exp-company" className="text-xs font-bold text-slate-900 uppercase">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                id="exp-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Acme AI Technologies"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="exp-position" className="text-xs font-bold text-slate-900 uppercase">
                Position Title <span className="text-red-500">*</span>
              </label>
              <input
                id="exp-position"
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Senior Software Engineer"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="exp-location" className="text-xs font-bold text-slate-900 uppercase">
                Location
              </label>
              <input
                id="exp-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. San Francisco, CA"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="exp-startDate" className="text-xs font-bold text-slate-900 uppercase">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                id="exp-startDate"
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Jan 2022"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="exp-endDate" className="text-xs font-bold text-slate-900 uppercase">
                End Date
              </label>
              <input
                id="exp-endDate"
                type="text"
                value={endDate}
                disabled={isCurrent}
                onChange={(e) => setEndDate(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-slate-900 font-sans text-sm ${
                  isCurrent ? 'bg-slate-200 border-slate-300 cursor-not-allowed' : 'border-slate-900'
                }`}
                placeholder="e.g. Present or Dec 2024"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                id="exp-isCurrent"
                type="checkbox"
                checked={isCurrent}
                onChange={(e) => setIsCurrent(e.target.checked)}
                className="w-4 h-4 rounded border-2 border-slate-900 text-cyan-600 focus:ring-cyan-500"
              />
              <label htmlFor="exp-isCurrent" className="text-xs font-bold text-slate-900 uppercase">
                Currently work here
              </label>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label htmlFor="exp-description" className="text-xs font-bold text-slate-900 uppercase">
                Responsibilities & Achievements
              </label>
              <textarea
                id="exp-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Key accomplishments, technologies used, engineering impact..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              id="save-exp-btn"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#06B6D4] transition-all"
            >
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>{isSaving ? 'Saving...' : 'Save Record'}</span>
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
      )}

      {/* Experience List / Useful Empty State */}
      {profile.experience.length === 0 && !isFormOpen ? (
        <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 text-center font-mono space-y-3">
          <p className="text-xs font-bold text-slate-700 uppercase">// NO EXPERIENCE ADDED</p>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Add your professional experience so JobAI can understand your career history and trajectory.
          </p>
          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs border border-slate-900 uppercase shadow-[2px_2px_0px_0px_#0F172A] transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Experience</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {profile.experience.map((exp) => (
            <div
              key={exp.id}
              className="p-5 rounded-xl border-2 border-slate-900 bg-white shadow-[3px_3px_0px_0px_#0F172A] space-y-2 relative group"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h4 className="text-base font-extrabold text-slate-950 uppercase font-heading">
                    {exp.position}
                  </h4>
                  <p className="text-xs font-mono font-bold text-cyan-800 flex items-center gap-2 pt-0.5">
                    <span>{exp.company}</span>
                    {exp.location && (
                      <span className="text-slate-500 font-normal flex items-center gap-1">
                        • <MapPin className="w-3 h-3 text-slate-400" /> {exp.location}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate || 'End'}
                    </span>
                  </span>

                  <button
                    type="button"
                    onClick={() => openEditForm(exp)}
                    className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
                    title="Edit Record"
                  >
                    <Edit3 className="w-3.5 h-3.5 stroke-[2]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(exp.id)}
                    className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                  </button>
                </div>
              </div>

              {exp.description && (
                <p className="text-xs font-sans text-slate-700 whitespace-pre-wrap leading-relaxed pt-1">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
