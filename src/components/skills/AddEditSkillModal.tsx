import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import {
  type CandidateSkillRecord,
  type SkillCategory,
  type EvidenceState,
  skillInputSchema,
} from '../../lib/skills';

interface Props {
  isOpen: boolean;
  editingSkill: CandidateSkillRecord | null;
  onClose: () => void;
  onSave: (skill: CandidateSkillRecord) => void;
}

export const AddEditSkillModal: React.FC<Props> = ({
  isOpen,
  editingSkill,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<SkillCategory>('AI / Machine Learning');
  const [description, setDescription] = useState<string>('');
  const [evidenceState, setEvidenceState] = useState<EvidenceState>('SELF_DECLARED');
  const [firstDemonstrated, setFirstDemonstrated] = useState<string>('2024');
  const [lastDemonstrated, setLastDemonstrated] = useState<string>('2026');
  const [evidenceTitle, setEvidenceTitle] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (editingSkill) {
      setName(editingSkill.name);
      setCategory(editingSkill.category);
      setDescription(editingSkill.description || '');
      setEvidenceState(editingSkill.evidenceState);
      setFirstDemonstrated(editingSkill.firstDemonstrated || '2024');
      setLastDemonstrated(editingSkill.lastDemonstrated || '2026');
      setEvidenceTitle(editingSkill.evidence[0]?.title || '');
    } else {
      setName('');
      setCategory('AI / Machine Learning');
      setDescription('');
      setEvidenceState('SELF_DECLARED');
      setFirstDemonstrated('2024');
      setLastDemonstrated('2026');
      setEvidenceTitle('');
    }
    setErrorMsg(null);
  }, [editingSkill, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validationResult = skillInputSchema.safeParse({
      name,
      category,
      description,
      evidenceState,
      firstDemonstrated,
      lastDemonstrated,
    });

    if (!validationResult.success) {
      setErrorMsg(validationResult.error.errors[0]?.message || 'Invalid skill input');
      return;
    }

    const now = new Date().toISOString();
    const existingEvidence = editingSkill?.evidence || [];
    let updatedEvidence = [...existingEvidence];

    if (evidenceTitle.trim().length > 0) {
      if (updatedEvidence.length > 0) {
        updatedEvidence[0] = { ...updatedEvidence[0], title: evidenceTitle };
      } else {
        updatedEvidence.push({
          id: `ev-${Date.now()}`,
          sourceType: 'PROJECT',
          title: evidenceTitle,
          description: 'Candidate provided evidence project or paper.',
          demonstratedDate: lastDemonstrated,
          verified: false,
          verifierName: 'Candidate Self-Reported',
        });
      }
    }

    const skillRecord: CandidateSkillRecord = {
      id: editingSkill?.id || `skill-${Date.now()}`,
      userId: editingSkill?.userId || 'demo-candidate-01',
      name: name.trim(),
      canonicalId: name.trim().toLowerCase().replace(/[^a-z0-9]/g, '-'),
      category,
      description: description.trim(),
      evidenceState,
      evidence: updatedEvidence,
      firstDemonstrated,
      lastDemonstrated,
      relatedSkills: editingSkill?.relatedSkills || [],
      createdAt: editingSkill?.createdAt || now,
      updatedAt: now,
    };

    onSave(skillRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white brutalist-card rounded-2xl p-6 border-2 border-slate-900 shadow-[8px_8px_0px_0px_#0F172A] space-y-4 font-mono">
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
          <h3 className="text-lg font-black text-slate-950 uppercase font-heading">
            {editingSkill ? 'Edit Skill Record' : 'Add New Skill Record'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded bg-slate-100 border border-slate-300 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="font-extrabold text-slate-900 uppercase">Skill Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. PyTorch, FastAPI, Docker"
              required
              className="w-full px-3 py-2 border-2 border-slate-900 rounded-lg bg-white font-mono text-xs focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-extrabold text-slate-900 uppercase">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SkillCategory)}
              className="w-full px-3 py-2 border-2 border-slate-900 rounded-lg bg-white font-mono text-xs focus:ring-2 focus:ring-cyan-400 outline-none"
            >
              <option value="AI / Machine Learning">AI / Machine Learning</option>
              <option value="Backend Engineering">Backend Engineering</option>
              <option value="Frontend Engineering">Frontend Engineering</option>
              <option value="Data & Databases">Data & Databases</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
              <option value="Testing & Quality">Testing & Quality</option>
              <option value="Tools & Platforms">Tools & Platforms</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-extrabold text-slate-900 uppercase">Evidence State</label>
            <select
              value={evidenceState}
              onChange={(e) => setEvidenceState(e.target.value as EvidenceState)}
              className="w-full px-3 py-2 border-2 border-slate-900 rounded-lg bg-white font-mono text-xs focus:ring-2 focus:ring-cyan-400 outline-none"
            >
              <option value="SELF_DECLARED">SELF DECLARED</option>
              <option value="DOCUMENTED">DOCUMENTED</option>
              <option value="PROJECT_EVIDENCE">PROJECT EVIDENCE</option>
              <option value="ASSESSED">ASSESSED</option>
              <option value="CREDENTIALLED">CREDENTIALLED</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">First Demonstrated</label>
              <input
                type="text"
                value={firstDemonstrated}
                onChange={(e) => setFirstDemonstrated(e.target.value)}
                placeholder="2024"
                className="w-full px-3 py-1.5 border border-slate-900 rounded bg-white text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Latest Demonstrated</label>
              <input
                type="text"
                value={lastDemonstrated}
                onChange={(e) => setLastDemonstrated(e.target.value)}
                placeholder="2026"
                className="w-full px-3 py-1.5 border border-slate-900 rounded bg-white text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800">Supporting Project / Evidence Title</label>
            <input
              type="text"
              value={evidenceTitle}
              onChange={(e) => setEvidenceTitle(e.target.value)}
              placeholder="e.g. JobAI Candidate Platform V2"
              className="w-full px-3 py-1.5 border border-slate-900 rounded bg-white text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe experience and application context..."
              rows={2}
              className="w-full px-3 py-2 border border-slate-900 rounded-lg bg-white text-xs font-mono outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="brutalist-cyan"
              size="sm"
              leftIcon={<Save className="w-3.5 h-3.5 stroke-[2.5]" />}
            >
              Save Skill Record
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
