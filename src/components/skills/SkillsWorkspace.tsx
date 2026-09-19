import React, { useState, useEffect } from 'react';
import { Plus, AlertCircle, Filter, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { CandidateAppShell } from '../app/CandidateAppShell';
import { SkillsHeader } from './SkillsHeader';
import { SkillsOverviewMetrics } from './SkillsOverviewMetrics';
import { CapabilityMap } from './CapabilityMap';
import { SkillRecordCard } from './SkillRecordCard';
import { SkillDetailDrawer } from './SkillDetailDrawer';
import { AddEditSkillModal } from './AddEditSkillModal';
import { ResumeSignalsBanner } from './ResumeSignalsBanner';
import {
  type CandidateSkillRecord,
  fetchCandidateSkills,
  saveCandidateSkill,
  deleteCandidateSkill,
  getUnreviewedResumeSignals,
} from '../../lib/skills';
import { fetchCandidateProfile } from '../../lib/profile';

export const SkillsWorkspace: React.FC = () => {
  const [skills, setSkills] = useState<CandidateSkillRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [candidateName, setCandidateName] = useState<string>('Shaik Rameez Basha');
  const [targetRole, setTargetRole] = useState<string>('Full-Stack AI/ML Engineer');
  const [userId, setUserId] = useState<string>('demo-candidate-01');

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<CandidateSkillRecord | null>(null);
  const [editingSkill, setEditingSkill] = useState<CandidateSkillRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [unreviewedSignals, setUnreviewedSignals] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      const [skillsRes, profileRes] = await Promise.all([
        fetchCandidateSkills(),
        fetchCandidateProfile(),
      ]);

      if (isMounted) {
        if (skillsRes.skills) {
          setSkills(skillsRes.skills);
        }
        if (profileRes.profile) {
          setCandidateName(profileRes.profile.fullName || 'Shaik Rameez Basha');
          setTargetRole(profileRes.profile.primaryTargetRole || 'Full-Stack AI/ML Engineer');
          setUserId(profileRes.profile.userId || 'demo-candidate-01');
        }

        const signals = getUnreviewedResumeSignals(skillsRes.skills || []);
        setUnreviewedSignals(signals);
        setIsLoading(false);
      }
    }
    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSaveSkill = async (skillToSave: CandidateSkillRecord) => {
    const res = await saveCandidateSkill(skillToSave);
    if (res.success) {
      const updatedList = skills.some((s) => s.id === skillToSave.id)
        ? skills.map((s) => (s.id === skillToSave.id ? skillToSave : s))
        : [skillToSave, ...skills];

      setSkills(updatedList);
      setUnreviewedSignals(getUnreviewedResumeSignals(updatedList));

      if (selectedSkill && selectedSkill.id === skillToSave.id) {
        setSelectedSkill(skillToSave);
      }
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    const res = await deleteCandidateSkill(skillId, userId);
    if (res.success) {
      const filtered = skills.filter((s) => s.id !== skillId);
      setSkills(filtered);
      setUnreviewedSignals(getUnreviewedResumeSignals(filtered));
      if (selectedSkill?.id === skillId) {
        setSelectedSkill(null);
      }
    }
  };

  const handleImportResumeSignal = (skillName: string) => {
    const now = new Date().toISOString();
    const importedSkill: CandidateSkillRecord = {
      id: `skill-${Date.now()}`,
      userId,
      name: skillName,
      canonicalId: skillName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      category: 'Backend Engineering',
      description: `Capability signal extracted from resume and confirmed by ${candidateName}.`,
      evidenceState: 'DOCUMENTED',
      evidence: [
        {
          id: `ev-res-${Date.now()}`,
          sourceType: 'RESUME',
          title: 'Parsed Technical Resume Document',
          description: 'Documented technical capability extracted from ingested resume.',
          demonstratedDate: '2026',
          verified: false,
          verifierName: 'Candidate Review & Approval',
        },
      ],
      firstDemonstrated: '2024',
      lastDemonstrated: '2026',
      relatedSkills: [],
      createdAt: now,
      updatedAt: now,
    };

    handleSaveSkill(importedSkill);
  };

  // Filter skills list
  const filteredSkills = skills.filter((sk) => {
    const matchesCat = selectedCategory === 'all' || sk.category === selectedCategory;
    const matchesState = selectedState === 'all' || sk.evidenceState === selectedState;
    return matchesCat && matchesState;
  });

  if (isLoading) {
    return (
      <CandidateAppShell activeRoute="/skills">
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-3 font-mono">
          <Loader2 className="w-8 h-8 text-cyan-600 animate-spin stroke-[2.5]" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            LOADING_DIGITAL_SKILL_PASSPORT...
          </span>
        </div>
      </CandidateAppShell>
    );
  }

  return (
    <CandidateAppShell activeRoute="/skills">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 font-mono">
        {/* 1. Passport Header */}
        <SkillsHeader
          candidateName={candidateName}
          targetRole={targetRole}
          skills={skills}
        />

        {/* 2. Capability Overview Metrics */}
        <SkillsOverviewMetrics
          skills={skills}
          unreviewedSignalsCount={unreviewedSignals.length}
        />

        {/* 3. Resume Signals Review Banner */}
        <ResumeSignalsBanner
          unreviewedSkills={unreviewedSignals}
          onImportSkill={handleImportResumeSignal}
        />

        {/* 4. Interactive Capability Map */}
        <CapabilityMap
          skills={skills}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onSelectSkill={(sk) => setSelectedSkill(sk)}
        />

        {/* 5. Main Skill Records Section */}
        <div className="w-full brutalist-card rounded-2xl p-6 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] space-y-5">
          {/* Filter Bar & Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-950 uppercase font-heading tracking-tight flex items-center gap-2">
                AUTHORITATIVE SKILL RECORDS ({filteredSkills.length})
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                // Evidence-backed technical capability records owned by {candidateName}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Filter Dropdown */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-slate-900 bg-slate-50 text-xs font-bold text-slate-900">
                <Filter className="w-3.5 h-3.5 text-cyan-700 stroke-[2.5]" />
                <span>EVIDENCE:</span>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="bg-transparent font-mono text-xs font-bold outline-none cursor-pointer"
                >
                  <option value="all">ALL STATES</option>
                  <option value="PROJECT_EVIDENCE">PROJECT EVIDENCE</option>
                  <option value="DOCUMENTED">DOCUMENTED</option>
                  <option value="SELF_DECLARED">SELF DECLARED</option>
                  <option value="ASSESSED">ASSESSED</option>
                </select>
              </div>

              <Button
                type="button"
                variant="brutalist-cyan"
                size="sm"
                leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
                onClick={() => {
                  setEditingSkill(null);
                  setIsAddModalOpen(true);
                }}
              >
                Add Skill Record
              </Button>
            </div>
          </div>

          {/* Skill Records Grid */}
          {filteredSkills.length === 0 ? (
            <div className="py-12 p-6 rounded-xl border-2 border-dashed border-slate-900 bg-slate-50/80 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 border-2 border-slate-900 flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#0F172A]">
                <AlertCircle className="w-6 h-6 stroke-[2.5]" />
              </div>

              <div className="space-y-1 max-w-md mx-auto">
                <h4 className="text-sm font-black text-slate-950 uppercase font-heading">
                  CAPABILITY PASSPORT NOT INITIALIZED
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Your professional capabilities will appear here as you add skills and supporting evidence.
                </p>
              </div>

              <Button
                type="button"
                variant="brutalist-cyan"
                size="sm"
                leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
                onClick={() => {
                  setEditingSkill(null);
                  setIsAddModalOpen(true);
                }}
              >
                Add Your First Skill
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSkills.map((sk) => (
                <SkillRecordCard
                  key={sk.id}
                  skill={sk}
                  onSelect={(selected) => setSelectedSkill(selected)}
                />
              ))}
            </div>
          )}

          {/* Footer Disclaimer */}
          <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 font-bold flex justify-between items-center">
            <span>// DIGITAL_SKILL_PASSPORT_AUTHENTICATED</span>
            <span className="text-cyan-700">[STATUS: {skills.length} VERIFIED REPOSITORIES & EVIDENCE]</span>
          </div>
        </div>

        {/* 6. Detail Drawer */}
        <SkillDetailDrawer
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onEdit={(sk) => {
            setEditingSkill(sk);
            setIsAddModalOpen(true);
          }}
          onDelete={(id) => handleDeleteSkill(id)}
        />

        {/* 7. Add / Edit Modal */}
        <AddEditSkillModal
          isOpen={isAddModalOpen}
          editingSkill={editingSkill}
          onClose={() => setIsAddModalOpen(false)}
          onSave={(sk) => handleSaveSkill(sk)}
        />
      </div>
    </CandidateAppShell>
  );
};

