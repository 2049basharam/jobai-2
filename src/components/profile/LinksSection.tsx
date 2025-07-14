import React, { useState } from 'react';
import { Link2, Plus, Trash2, Edit3, ExternalLink, Github, Linkedin, Globe, Twitter, Check, X, AlertCircle } from 'lucide-react';
import type { CandidateProfile, CandidateLink } from '../../lib/profile';
import { linkSchema } from '../../lib/validation/profile';

interface Props {
  profile: CandidateProfile;
  onSave: (updated: Partial<CandidateProfile>) => Promise<void>;
}

export const LinksSection: React.FC<Props> = ({ profile, onSave }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [label, setLabel] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [type, setType] = useState<CandidateLink['type']>('github');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const openAddForm = () => {
    setEditingId(null);
    setLabel('');
    setUrl('');
    setType('github');
    setError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (link: CandidateLink) => {
    setEditingId(link.id);
    setLabel(link.label);
    setUrl(link.url);
    setType(link.type || 'other');
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

    const validation = linkSchema.safeParse({ label, url, type });
    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Invalid link fields');
      return;
    }

    setIsSaving(true);
    try {
      let updatedLinks = [...profile.links];
      if (editingId) {
        updatedLinks = updatedLinks.map((item) =>
          item.id === editingId
            ? {
                ...item,
                label: validation.data.label,
                url: validation.data.url,
                type: validation.data.type,
              }
            : item
        );
      } else {
        const newItem: CandidateLink = {
          id: `link-${Date.now()}`,
          label: validation.data.label,
          url: validation.data.url,
          type: validation.data.type,
        };
        updatedLinks.push(newItem);
      }

      await onSave({ links: updatedLinks });
      setIsFormOpen(false);
      setEditingId(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to save link');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    try {
      const updated = profile.links.filter((l) => l.id !== id);
      await onSave({ links: updated });
    } catch (err: any) {
      alert('Failed to delete link: ' + err?.message);
    }
  };

  const renderLinkIcon = (linkType: CandidateLink['type']) => {
    switch (linkType) {
      case 'github':
        return <Github className="w-4 h-4 text-slate-900" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-blue-600" />;
      case 'portfolio':
        return <Globe className="w-4 h-4 text-cyan-600" />;
      case 'twitter':
        return <Twitter className="w-4 h-4 text-sky-500" />;
      default:
        return <Link2 className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div id="links" className="w-full brutalist-card bg-white rounded-2xl p-6 sm:p-7 space-y-5 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4 font-mono">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-400 text-slate-950 border border-slate-900">
              <Link2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              [08] PROFESSIONAL LINKS & SOCIAL RADAR ({profile.links.length})
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            // GitHub, LinkedIn, Portfolio, Technical Blogs & Social profiles
          </p>
        </div>

        {!isFormOpen && (
          <button
            type="button"
            id="add-link-btn"
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#06B6D4] transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5] text-cyan-400" />
            <span>Add Link</span>
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
        <form noValidate onSubmit={handleSubmit} className="p-5 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-4 font-mono shadow-[3px_3px_0px_0px_#0F172A]">
          <h4 className="text-xs font-black uppercase text-slate-950 border-b border-slate-300 pb-2">
            {editingId ? '// EDIT LINK RECORD' : '// NEW LINK RECORD'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="link-label" className="text-xs font-bold text-slate-900 uppercase">
                Label / Platform Name <span className="text-red-500">*</span>
              </label>
              <input
                id="link-label"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. GitHub Profile"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="link-type" className="text-xs font-bold text-slate-900 uppercase">
                Link Type Category
              </label>
              <select
                id="link-type"
                value={type}
                onChange={(e) => setType(e.target.value as CandidateLink['type'])}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
              >
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="portfolio">Personal Portfolio</option>
                <option value="twitter">X / Twitter</option>
                <option value="other">Other Link</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label htmlFor="link-url" className="text-xs font-bold text-slate-900 uppercase">
                URL Address <span className="text-red-500">*</span>
              </label>
              <input
                id="link-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="https://github.com/yourusername"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              id="save-link-btn"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#06B6D4] transition-all"
            >
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>{isSaving ? 'Saving...' : 'Save Link'}</span>
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
      {profile.links.length === 0 && !isFormOpen ? (
        <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 text-center font-mono space-y-3">
          <p className="text-xs font-bold text-slate-700 uppercase">// NO LINKS ADDED</p>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Add your GitHub, LinkedIn, or Portfolio URLs so recruiters and JobAI can verify your professional presence.
          </p>
          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs border border-slate-900 uppercase shadow-[2px_2px_0px_0px_#0F172A] transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Link</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono">
          {profile.links.map((link) => (
            <div
              key={link.id}
              className="p-4 rounded-xl border-2 border-slate-900 bg-white shadow-[3px_3px_0px_0px_#0F172A] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 shrink-0">
                  {renderLinkIcon(link.type)}
                </div>
                <div className="truncate">
                  <h4 className="text-xs font-bold text-slate-950 uppercase truncate font-heading">
                    {link.label}
                  </h4>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-cyan-700 hover:text-cyan-900 truncate block flex items-center gap-1"
                  >
                    <span className="truncate">{link.url.replace(/^https?:\/\//, '')}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => openEditForm(link)}
                  className="p-1 rounded border border-slate-300 hover:bg-slate-100 text-slate-700"
                >
                  <Edit3 className="w-3.5 h-3.5 stroke-[2]" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(link.id)}
                  className="p-1 rounded border border-red-200 hover:bg-red-50 text-red-600"
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
