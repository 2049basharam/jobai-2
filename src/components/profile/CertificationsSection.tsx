import React, { useState } from 'react';
import { Award, Plus, Trash2, Edit3, ExternalLink, Calendar, Check, X, AlertCircle } from 'lucide-react';
import type { CandidateProfile, CandidateCertification } from '../../lib/profile';
import { certificationSchema } from '../../lib/validation/profile';

interface Props {
  profile: CandidateProfile;
  onSave: (updated: Partial<CandidateProfile>) => Promise<void>;
}

export const CertificationsSection: React.FC<Props> = ({ profile, onSave }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState<string>('');
  const [issuingOrganization, setIssuingOrganization] = useState<string>('');
  const [issueDate, setIssueDate] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [credentialId, setCredentialId] = useState<string>('');
  const [credentialUrl, setCredentialUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const openAddForm = () => {
    setEditingId(null);
    setName('');
    setIssuingOrganization('');
    setIssueDate('');
    setExpiryDate('');
    setCredentialId('');
    setCredentialUrl('');
    setError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (cert: CandidateCertification) => {
    setEditingId(cert.id);
    setName(cert.name);
    setIssuingOrganization(cert.issuingOrganization);
    setIssueDate(cert.issueDate || '');
    setExpiryDate(cert.expiryDate || '');
    setCredentialId(cert.credentialId || '');
    setCredentialUrl(cert.credentialUrl || '');
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

    const validation = certificationSchema.safeParse({
      name,
      issuingOrganization,
      issueDate,
      expiryDate,
      credentialId,
      credentialUrl,
    });

    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Invalid certification fields');
      return;
    }

    setIsSaving(true);
    try {
      let updatedCerts = [...profile.certifications];
      if (editingId) {
        updatedCerts = updatedCerts.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: validation.data.name,
                issuingOrganization: validation.data.issuingOrganization,
                issueDate: validation.data.issueDate,
                expiryDate: validation.data.expiryDate,
                credentialId: validation.data.credentialId,
                credentialUrl: validation.data.credentialUrl,
              }
            : item
        );
      } else {
        const newItem: CandidateCertification = {
          id: `cert-${Date.now()}`,
          name: validation.data.name,
          issuingOrganization: validation.data.issuingOrganization,
          issueDate: validation.data.issueDate,
          expiryDate: validation.data.expiryDate,
          credentialId: validation.data.credentialId,
          credentialUrl: validation.data.credentialUrl,
        };
        updatedCerts.push(newItem);
      }

      await onSave({ certifications: updatedCerts });
      setIsFormOpen(false);
      setEditingId(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to save certification');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;
    try {
      const updated = profile.certifications.filter((c) => c.id !== id);
      await onSave({ certifications: updated });
    } catch (err: any) {
      alert('Failed to delete certification: ' + err?.message);
    }
  };

  return (
    <div id="certifications" className="w-full brutalist-card bg-white rounded-2xl p-6 sm:p-7 space-y-5 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4 font-mono">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-400 text-slate-950 border border-slate-900">
              <Award className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              [07] CERTIFICATIONS ({profile.certifications.length})
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            // Verified industry certifications & technical credentials
          </p>
        </div>

        {!isFormOpen && (
          <button
            type="button"
            id="add-cert-btn"
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#06B6D4] transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5] text-cyan-400" />
            <span>Add Certification</span>
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
            {editingId ? '// EDIT CERTIFICATION RECORD' : '// NEW CERTIFICATION RECORD'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="cert-name" className="text-xs font-bold text-slate-900 uppercase">
                Certification Name <span className="text-red-500">*</span>
              </label>
              <input
                id="cert-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. AWS Certified Solutions Architect"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="cert-org" className="text-xs font-bold text-slate-900 uppercase">
                Issuing Organization <span className="text-red-500">*</span>
              </label>
              <input
                id="cert-org"
                type="text"
                value={issuingOrganization}
                onChange={(e) => setIssuingOrganization(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Amazon Web Services"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="cert-issueDate" className="text-xs font-bold text-slate-900 uppercase">
                Issue Date
              </label>
              <input
                id="cert-issueDate"
                type="text"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Nov 2023"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="cert-expiryDate" className="text-xs font-bold text-slate-900 uppercase">
                Expiry Date
              </label>
              <input
                id="cert-expiryDate"
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Nov 2026 or No Expiry"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="cert-credentialId" className="text-xs font-bold text-slate-900 uppercase">
                Credential ID
              </label>
              <input
                id="cert-credentialId"
                type="text"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. AWS-12345678"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="cert-credentialUrl" className="text-xs font-bold text-slate-900 uppercase">
                Credential Verification URL
              </label>
              <input
                id="cert-credentialUrl"
                type="url"
                value={credentialUrl}
                onChange={(e) => setCredentialUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="https://credly.com/badges/sample"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              id="save-cert-btn"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#06B6D4] transition-all"
            >
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>{isSaving ? 'Saving...' : 'Save Certification'}</span>
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
      {profile.certifications.length === 0 && !isFormOpen ? (
        <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 text-center font-mono space-y-3">
          <p className="text-xs font-bold text-slate-700 uppercase">// NO CERTIFICATIONS ADDED</p>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Add technical certifications to boost your candidate capability score.
          </p>
          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs border border-slate-900 uppercase shadow-[2px_2px_0px_0px_#0F172A] transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Certification</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
          {profile.certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-xl border-2 border-slate-900 bg-white shadow-[3px_3px_0px_0px_#0F172A] flex flex-col justify-between space-y-2"
            >
              <div className="space-y-1">
                <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-2">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-950 uppercase font-heading">
                      {cert.name}
                    </h4>
                    <p className="text-xs font-bold text-cyan-800">{cert.issuingOrganization}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEditForm(cert)}
                      className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 stroke-[2]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(cert.id)}
                      className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                    </button>
                  </div>
                </div>

                {cert.issueDate && (
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Issued: {cert.issueDate}</span>
                  </p>
                )}

                {cert.credentialId && (
                  <p className="text-[11px] text-slate-600 font-bold">
                    ID: <span className="font-mono bg-slate-100 px-1 rounded">{cert.credentialId}</span>
                  </p>
                )}
              </div>

              {cert.credentialUrl && (
                <div className="pt-2 border-t border-slate-100">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-cyan-700 hover:text-cyan-900 inline-flex items-center gap-1"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5 stroke-[2]" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
