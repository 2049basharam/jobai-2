import React, { useState } from 'react';
import { GraduationCap, Plus, Trash2, Edit3, Calendar, Check, X, AlertCircle } from 'lucide-react';
import type { CandidateProfile, CandidateEducation } from '../../lib/profile';
import { educationSchema } from '../../lib/validation/profile';

interface Props {
  profile: CandidateProfile;
  onSave: (updated: Partial<CandidateProfile>) => Promise<void>;
}

export const EducationSection: React.FC<Props> = ({ profile, onSave }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [institution, setInstitution] = useState<string>('');
  const [degree, setDegree] = useState<string>('');
  const [fieldOfStudy, setFieldOfStudy] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isCurrent, setIsCurrent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const openAddForm = () => {
    setEditingId(null);
    setInstitution('');
    setDegree('');
    setFieldOfStudy('');
    setStartDate('');
    setEndDate('');
    setIsCurrent(false);
    setError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (edu: CandidateEducation) => {
    setEditingId(edu.id);
    setInstitution(edu.institution);
    setDegree(edu.degree);
    setFieldOfStudy(edu.fieldOfStudy || '');
    setStartDate(edu.startDate || '');
    setEndDate(edu.endDate || '');
    setIsCurrent(edu.isCurrent);
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

    const validation = educationSchema.safeParse({
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate: isCurrent ? '' : endDate,
      isCurrent,
    });

    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Invalid education fields');
      return;
    }

    setIsSaving(true);
    try {
      let updatedEducation = [...profile.education];
      if (editingId) {
        updatedEducation = updatedEducation.map((item) =>
          item.id === editingId
            ? {
                ...item,
                institution: validation.data.institution,
                degree: validation.data.degree,
                fieldOfStudy: validation.data.fieldOfStudy,
                startDate: validation.data.startDate,
                endDate: validation.data.endDate,
                isCurrent: validation.data.isCurrent,
              }
            : item
        );
      } else {
        const newItem: CandidateEducation = {
          id: `edu-${Date.now()}`,
          institution: validation.data.institution,
          degree: validation.data.degree,
          fieldOfStudy: validation.data.fieldOfStudy,
          startDate: validation.data.startDate,
          endDate: validation.data.endDate,
          isCurrent: validation.data.isCurrent,
        };
        updatedEducation.push(newItem);
      }

      await onSave({ education: updatedEducation });
      setIsFormOpen(false);
      setEditingId(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to save education');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;
    try {
      const updated = profile.education.filter((edu) => edu.id !== id);
      await onSave({ education: updated });
    } catch (err: any) {
      alert('Failed to delete education: ' + err?.message);
    }
  };

  return (
    <div id="education" className="w-full brutalist-card bg-white rounded-2xl p-6 sm:p-7 space-y-5 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4 font-mono">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-400 text-slate-950 border border-slate-900">
              <GraduationCap className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              [05] EDUCATION & ACADEMIC DEGREES ({profile.education.length})
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            // Verified degrees, certifications & academic foundations
          </p>
        </div>

        {!isFormOpen && (
          <button
            type="button"
            id="add-education-btn"
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#06B6D4] transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5] text-cyan-400" />
            <span>Add Education</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-3.5 rounded-xl border-2 border-red-500 bg-red-50 text-red-900 font-mono text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 stroke-[2.5]" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="p-5 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-4 font-mono shadow-[3px_3px_0px_0px_#0F172A]">
          <h4 className="text-xs font-black uppercase text-slate-950 border-b border-slate-300 pb-2">
            {editingId ? '// EDIT EDUCATION RECORD' : '// NEW EDUCATION RECORD'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="edu-institution" className="text-xs font-bold text-slate-900 uppercase">
                Institution / University <span className="text-red-500">*</span>
              </label>
              <input
                id="edu-institution"
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Stanford University"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="edu-degree" className="text-xs font-bold text-slate-900 uppercase">
                Degree / Qualification <span className="text-red-500">*</span>
              </label>
              <input
                id="edu-degree"
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Bachelor of Science"
                required
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label htmlFor="edu-fieldOfStudy" className="text-xs font-bold text-slate-900 uppercase">
                Field of Study / Major
              </label>
              <input
                id="edu-fieldOfStudy"
                type="text"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Computer Science & Artificial Intelligence"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="edu-startDate" className="text-xs font-bold text-slate-900 uppercase">
                Start Year
              </label>
              <input
                id="edu-startDate"
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. 2018"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="edu-endDate" className="text-xs font-bold text-slate-900 uppercase">
                End Year
              </label>
              <input
                id="edu-endDate"
                type="text"
                value={endDate}
                disabled={isCurrent}
                onChange={(e) => setEndDate(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-slate-900 font-sans text-sm ${
                  isCurrent ? 'bg-slate-200 border-slate-300 cursor-not-allowed' : 'border-slate-900'
                }`}
                placeholder="e.g. 2022"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              id="save-edu-btn"
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

      {/* List */}
      {profile.education.length === 0 && !isFormOpen ? (
        <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 text-center font-mono space-y-3">
          <p className="text-xs font-bold text-slate-700 uppercase">// NO EDUCATION ADDED</p>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Add your degree or academic history so JobAI can verify your background.
          </p>
          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs border border-slate-900 uppercase shadow-[2px_2px_0px_0px_#0F172A] transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Education</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 font-mono">
          {profile.education.map((edu) => (
            <div
              key={edu.id}
              className="p-5 rounded-xl border-2 border-slate-900 bg-white shadow-[3px_3px_0px_0px_#0F172A] flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-slate-950 uppercase font-heading">
                  {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                </h4>
                <p className="text-xs font-bold text-indigo-800">{edu.institution}</p>
                {(edu.startDate || edu.endDate) && (
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>
                      {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}
                    </span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => openEditForm(edu)}
                  className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 stroke-[2]" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(edu.id)}
                  className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
