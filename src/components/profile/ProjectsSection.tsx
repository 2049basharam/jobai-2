import React, { useState } from 'react';
import { FolderGit2, Plus, Trash2, Edit3, ExternalLink, Github, Check, X, AlertCircle } from 'lucide-react';
import type { CandidateProfile, CandidateProject } from '../../lib/profile';
import { projectSchema } from '../../lib/validation/profile';

interface Props {
  profile: CandidateProfile;
  onSave: (updated: Partial<CandidateProfile>) => Promise<void>;
}

export const ProjectsSection: React.FC<Props> = ({ profile, onSave }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [projectUrl, setProjectUrl] = useState<string>('');
  const [githubUrl, setGithubUrl] = useState<string>('');
  const [techInput, setTechInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const openAddForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setRole('');
    setProjectUrl('');
    setGithubUrl('');
    setTechInput('');
    setError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (proj: CandidateProject) => {
    setEditingId(proj.id);
    setTitle(proj.title);
    setDescription(proj.description || '');
    setRole(proj.role || '');
    setProjectUrl(proj.projectUrl || '');
    setGithubUrl(proj.githubUrl || '');
    setTechInput((proj.technologies || []).join(', '));
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

    const techArray = techInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const validation = projectSchema.safeParse({
      title,
      description,
      role,
      projectUrl,
      githubUrl,
      technologies: techArray,
    });

    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Invalid project fields');
      return;
    }

    setIsSaving(true);
    try {
      let updatedProjects = [...profile.projects];
      if (editingId) {
        updatedProjects = updatedProjects.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: validation.data.title,
                description: validation.data.description,
                role: validation.data.role,
                projectUrl: validation.data.projectUrl,
                githubUrl: validation.data.githubUrl,
                technologies: validation.data.technologies,
              }
            : item
        );
      } else {
        const newItem: CandidateProject = {
          id: `proj-${Date.now()}`,
          title: validation.data.title,
          description: validation.data.description,
          role: validation.data.role,
          projectUrl: validation.data.projectUrl,
          githubUrl: validation.data.githubUrl,
          technologies: validation.data.technologies,
        };
        updatedProjects.push(newItem);
      }

      await onSave({ projects: updatedProjects });
      setIsFormOpen(false);
      setEditingId(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project entry?')) return;
    try {
      const updated = profile.projects.filter((p) => p.id !== id);
      await onSave({ projects: updated });
    } catch (err: any) {
      alert('Failed to delete project: ' + err?.message);
    }
  };

  return (
    <div id="projects" className="w-full brutalist-card bg-white rounded-2xl p-6 sm:p-7 space-y-5 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4 font-mono">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-400 text-slate-950 border border-slate-900">
              <FolderGit2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              [06] PROJECTS & REPOSITORIES ({profile.projects.length})
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            // Technical projects, architecture samples & repositories
          </p>
        </div>

        {!isFormOpen && (
          <button
            type="button"
            id="add-project-btn"
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#06B6D4] transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5] text-cyan-400" />
            <span>Add Project</span>
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
            {editingId ? '// EDIT PROJECT RECORD' : '// NEW PROJECT RECORD'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="proj-title" className="text-xs font-bold text-slate-900 uppercase">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                id="proj-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Distributed LLM Inference Engine"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="proj-role" className="text-xs font-bold text-slate-900 uppercase">
                Your Role
              </label>
              <input
                id="proj-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Lead Architect / Creator"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="proj-tech" className="text-xs font-bold text-slate-900 uppercase">
                Technologies (comma-separated)
              </label>
              <input
                id="proj-tech"
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Python, PyTorch, CUDA, FastAPI, Docker"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="proj-url" className="text-xs font-bold text-slate-900 uppercase">
                Live Demo URL
              </label>
              <input
                id="proj-url"
                type="url"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="proj-githubUrl" className="text-xs font-bold text-slate-900 uppercase">
                GitHub Repository URL
              </label>
              <input
                id="proj-githubUrl"
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label htmlFor="proj-desc" className="text-xs font-bold text-slate-900 uppercase">
                Project Overview & Impact
              </label>
              <textarea
                id="proj-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Key architecture details, features, performance benchmarks..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              id="save-proj-btn"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#06B6D4] transition-all"
            >
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>{isSaving ? 'Saving...' : 'Save Project'}</span>
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
      {profile.projects.length === 0 && !isFormOpen ? (
        <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 text-center font-mono space-y-3">
          <p className="text-xs font-bold text-slate-700 uppercase">// NO PROJECTS ADDED</p>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Add technical projects or repositories to showcase your practical execution capability.
          </p>
          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs border border-slate-900 uppercase shadow-[2px_2px_0px_0px_#0F172A] transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Project</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.projects.map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-xl border-2 border-slate-900 bg-white shadow-[3px_3px_0px_0px_#0F172A] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-2 font-mono">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-950 uppercase font-heading">
                      {proj.title}
                    </h4>
                    {proj.role && <p className="text-xs text-cyan-800 font-bold">{proj.role}</p>}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEditForm(proj)}
                      className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 stroke-[2]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                    </button>
                  </div>
                </div>

                {proj.description && (
                  <p className="text-xs font-sans text-slate-700 leading-relaxed">{proj.description}</p>
                )}

                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Links */}
              {(proj.projectUrl || proj.githubUrl) && (
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100 font-mono text-xs font-bold">
                  {proj.projectUrl && (
                    <a
                      href={proj.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-700 hover:text-cyan-900 inline-flex items-center gap-1"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2]" />
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-800 hover:text-slate-950 inline-flex items-center gap-1"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
