import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  LayoutGrid,
  List,
  RotateCcw,
  Plus,
  AlertCircle,
  Filter,
} from 'lucide-react';
import { ApplicationsHeader } from './ApplicationsHeader';
import { ApplicationsMetrics } from './ApplicationsMetrics';
import { ApplicationStageBoard } from './ApplicationStageBoard';
import { ApplicationCard } from './ApplicationCard';
import { AddApplicationModal } from './AddApplicationModal';
import { ApplicationDetailDrawer } from './ApplicationDetailDrawer';
import {
  loadCandidateApplications,
  saveCandidateApplication,
  updateApplicationStage,
  deleteCandidateApplication,
  type CandidateApplication,
  type ApplicationStage,
} from '../../lib/applications';
import { fetchCandidateProfile, type CandidateProfile } from '../../lib/profile';
import { fetchCandidateDocuments, type CandidateDocument } from '../../lib/document';
import { fetchCandidateSkills, type CandidateSkillRecord } from '../../lib/skills';
import { CandidateAppShell } from '../app/CandidateAppShell';

export const ApplicationsWorkspace: React.FC = () => {
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [documents, setDocuments] = useState<CandidateDocument[]>([]);
  const [skills, setSkills] = useState<CandidateSkillRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters & View Mode
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'BOARD' | 'LIST'>('BOARD');

  // Modal & Drawer State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] = useState<CandidateApplication | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [appsData, profResult, docsData, skillsResult] = await Promise.all([
          loadCandidateApplications(),
          fetchCandidateProfile(),
          fetchCandidateDocuments(),
          fetchCandidateSkills(),
        ]);
        setApplications(appsData);
        setProfile(profResult.profile);
        setDocuments(docsData);
        setSkills(skillsResult.skills);
      } catch (err) {
        console.error('Failed to load applications workspace data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtered Applications List
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // Stage Filter
      if (selectedStage !== 'ALL' && app.stage !== selectedStage) {
        return false;
      }

      // Keyword Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = app.roleTitle.toLowerCase().includes(q);
        const matchesOrg = app.organization.toLowerCase().includes(q);
        const matchesLoc = app.location.toLowerCase().includes(q);
        const matchesStage = app.stage.toLowerCase().includes(q);
        const matchesNotes = (app.notes || '').toLowerCase().includes(q);

        if (!matchesTitle && !matchesOrg && !matchesLoc && !matchesStage && !matchesNotes) {
          return false;
        }
      }

      return true;
    });
  }, [applications, selectedStage, searchQuery]);

  // Handle Application Save
  const handleSaveApp = async (app: CandidateApplication) => {
    const updated = await saveCandidateApplication(app);
    setApplications(updated);
    if (selectedApplication?.id === app.id) {
      setSelectedApplication(app);
    }
  };

  // Handle Stage Transition
  const handleUpdateStage = async (appId: string, newStage: ApplicationStage, notes?: string) => {
    const updated = await updateApplicationStage(appId, newStage, notes);
    setApplications(updated);
    const updatedItem = updated.find((a) => a.id === appId);
    if (updatedItem) {
      setSelectedApplication(updatedItem);
    }
  };

  // Handle Application Delete
  const handleDeleteApp = async (appId: string) => {
    const updated = await deleteCandidateApplication(appId);
    setApplications(updated);
    if (selectedApplication?.id === appId) {
      setSelectedApplication(null);
    }
  };

  // Metric Counters
  const totalCount = applications.length;
  const savedCount = applications.filter((a) => a.stage === 'SAVED').length;
  const appliedCount = applications.filter((a) => a.stage === 'APPLIED').length;
  const screeningCount = applications.filter((a) => a.stage === 'SCREENING').length;
  const interviewCount = applications.filter((a) => a.stage === 'INTERVIEW').length;
  const offerCount = applications.filter((a) => a.stage === 'OFFER' || a.stage === 'ACCEPTED').length;
  const activeCount = appliedCount + screeningCount + interviewCount;

  return (
    <CandidateAppShell activeRoute="/applications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <ApplicationsHeader
          profile={profile}
          totalApplications={totalCount}
          activeCount={activeCount}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Metrics Overview */}
        <ApplicationsMetrics
          totalCount={totalCount}
          savedCount={savedCount}
          appliedCount={appliedCount}
          screeningCount={screeningCount}
          interviewCount={interviewCount}
          offerCount={offerCount}
        />

        {/* Filter Controls Bar */}
        <div className="brutalist-card bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] space-y-4 font-mono">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="application-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search applications by role title, organization, or notes..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-900 text-xs text-slate-900 placeholder:text-slate-400 font-sans focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            {/* Stage Selector & View Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                id="filter-app-stage"
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="py-2.5 px-3 rounded-xl border-2 border-slate-900 text-xs text-slate-900 font-sans bg-white focus:outline-none font-bold"
              >
                <option value="ALL">All Stages ({totalCount})</option>
                <option value="SAVED">Saved ({savedCount})</option>
                <option value="APPLIED">Applied ({appliedCount})</option>
                <option value="SCREENING">Screening ({screeningCount})</option>
                <option value="INTERVIEW">Interview ({interviewCount})</option>
                <option value="OFFER">Offers ({offerCount})</option>
              </select>

              {/* View Mode Toggle Buttons */}
              <div className="flex items-center rounded-xl border-2 border-slate-900 bg-slate-100 p-0.5">
                <button
                  type="button"
                  id="view-mode-board"
                  onClick={() => setViewMode('BOARD')}
                  className={`p-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'BOARD' ? 'bg-slate-900 text-cyan-400' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Stage Board View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  id="view-mode-list"
                  onClick={() => setViewMode('LIST')}
                  className={`p-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'LIST' ? 'bg-slate-900 text-cyan-400' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Grid/List Card View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {(searchQuery || selectedStage !== 'ALL') && (
                <button
                  type="button"
                  id="reset-app-filters-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStage('ALL');
                  }}
                  className="py-2.5 px-3 rounded-xl border-2 border-slate-900 bg-amber-50 text-amber-950 text-xs font-bold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Application Workspace Content */}
        {filteredApplications.length > 0 ? (
          viewMode === 'BOARD' ? (
            <ApplicationStageBoard
              applications={filteredApplications}
              onSelectApplication={(app) => setSelectedApplication(app)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredApplications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onSelect={(selected) => setSelectedApplication(selected)}
                />
              ))}
            </div>
          )
        ) : (
          /* Honest Empty State */
          <div className="brutalist-card bg-white p-8 sm:p-12 rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] text-center space-y-4 font-mono">
            <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-900 flex items-center justify-center mx-auto text-slate-500">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 font-sans">NO APPLICATIONS FOUND</h3>
              <p className="text-xs text-slate-600 font-sans max-w-md mx-auto">
                {applications.length === 0
                  ? "You haven't tracked any applications yet. Add your first pursuit or save roles from Opportunity Radar."
                  : 'No applications match your active search filter parameter.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="py-2.5 px-5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-cyan-600 hover:text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4] transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>TRACK YOUR FIRST APPLICATION</span>
            </button>
          </div>
        )}

        {/* Modal for adding a new application */}
        {isAddModalOpen && (
          <AddApplicationModal
            documents={documents}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleSaveApp}
          />
        )}

        {/* Application Detail Drawer (Command Center) */}
        <ApplicationDetailDrawer
          application={selectedApplication}
          documents={documents}
          profile={profile}
          skills={skills}
          onClose={() => setSelectedApplication(null)}
          onUpdateStage={handleUpdateStage}
          onSaveApplication={handleSaveApp}
          onDeleteApplication={handleDeleteApp}
        />
      </div>
    </CandidateAppShell>
  );
};
