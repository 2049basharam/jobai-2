import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Bookmark,
  AlertCircle,
} from 'lucide-react';
import { OpportunitiesHeader } from './OpportunitiesHeader';
import { OpportunitiesMetrics } from './OpportunitiesMetrics';
import { OpportunityCard } from './OpportunityCard';
import { OpportunityDetailDrawer } from './OpportunityDetailDrawer';
import {
  DEFAULT_OPPORTUNITIES,
  calculateOpportunityAlignment,
  loadSavedOpportunities,
  toggleSaveOpportunity,
  type Opportunity,
  type SavedOpportunity,
  type OpportunityAlignment,
  type WorkMode,
  type ExperienceLevel,
} from '../../lib/opportunities';
import { fetchCandidateProfile, type CandidateProfile } from '../../lib/profile';
import { fetchCandidateSkills, type CandidateSkillRecord } from '../../lib/skills';
import { CandidateAppShell } from '../app/CandidateAppShell';

export const OpportunitiesWorkspace: React.FC = () => {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [skills, setSkills] = useState<CandidateSkillRecord[]>([]);
  const [savedOpportunities, setSavedOpportunities] = useState<SavedOpportunity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('ALL');
  const [selectedExperience, setSelectedExperience] = useState<string>('ALL');
  const [selectedAlignmentGrade, setSelectedAlignmentGrade] = useState<string>('ALL');
  const [savedOnly, setSavedOnly] = useState<boolean>(false);

  // Selected opportunity for detail drawer
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [profResult, skillsResult, savedData] = await Promise.all([
          fetchCandidateProfile(),
          fetchCandidateSkills(),
          loadSavedOpportunities(),
        ]);
        setProfile(profResult.profile);
        setSkills(skillsResult.skills);
        setSavedOpportunities(savedData);
      } catch (err) {
        console.error('Failed to load opportunities workspace data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Compute alignments for all opportunities
  const opportunitiesWithAlignment = useMemo(() => {
    return DEFAULT_OPPORTUNITIES.map((opp) => {
      const alignment = calculateOpportunityAlignment(opp, skills, profile?.projects || []);
      const isSaved = savedOpportunities.some((s) => s.opportunityId === opp.id);
      return {
        opportunity: opp,
        alignment,
        isSaved,
      };
    });
  }, [skills, profile, savedOpportunities]);

  // Filtered Opportunities List
  const filteredOpportunities = useMemo(() => {
    return opportunitiesWithAlignment.filter(({ opportunity, alignment, isSaved }) => {
      // Saved Only Filter
      if (savedOnly && !isSaved) return false;

      // Category Filter
      if (selectedCategory !== 'ALL' && opportunity.roleCategory !== selectedCategory) {
        return false;
      }

      // Work Mode Filter
      if (selectedWorkMode !== 'ALL' && opportunity.workMode !== selectedWorkMode) {
        return false;
      }

      // Experience Level Filter
      if (selectedExperience !== 'ALL' && opportunity.experienceLevel !== selectedExperience) {
        return false;
      }

      // Alignment Grade Filter
      if (selectedAlignmentGrade !== 'ALL' && alignment.alignmentGrade !== selectedAlignmentGrade) {
        return false;
      }

      // Keyword Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = opportunity.title.toLowerCase().includes(query);
        const matchesOrg = opportunity.organization.toLowerCase().includes(query);
        const matchesLoc = opportunity.location.toLowerCase().includes(query);
        const matchesSkill = opportunity.requiredSkills.some((s) => s.toLowerCase().includes(query));
        const matchesDesc = opportunity.description.toLowerCase().includes(query);

        if (!matchesTitle && !matchesOrg && !matchesLoc && !matchesSkill && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [
    opportunitiesWithAlignment,
    savedOnly,
    selectedCategory,
    selectedWorkMode,
    selectedExperience,
    selectedAlignmentGrade,
    searchQuery,
  ]);

  // Save / Unsave Handler
  const handleToggleSave = async (id: string) => {
    const updated = await toggleSaveOpportunity(id);
    setSavedOpportunities(updated);
  };

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedWorkMode('ALL');
    setSelectedExperience('ALL');
    setSelectedAlignmentGrade('ALL');
    setSavedOnly(false);
  };

  // Summary Metrics
  const totalCount = DEFAULT_OPPORTUNITIES.length;
  const highAlignmentCount = opportunitiesWithAlignment.filter(
    (o) => o.alignment.alignmentGrade === 'HIGH_ALIGNMENT'
  ).length;
  const matchedSkillsCount = opportunitiesWithAlignment.reduce(
    (acc, curr) => acc + curr.alignment.matchedRequiredSkills.length,
    0
  );
  const savedCount = savedOpportunities.length;

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory !== 'ALL' ? 1 : 0) +
    (selectedWorkMode !== 'ALL' ? 1 : 0) +
    (selectedExperience !== 'ALL' ? 1 : 0) +
    (selectedAlignmentGrade !== 'ALL' ? 1 : 0) +
    (savedOnly ? 1 : 0);

  const selectedAlignment = useMemo(() => {
    if (!selectedOpportunity) return null;
    return calculateOpportunityAlignment(selectedOpportunity, skills, profile?.projects || []);
  }, [selectedOpportunity, skills, profile]);

  const isSelectedSaved = useMemo(() => {
    if (!selectedOpportunity) return false;
    return savedOpportunities.some((s) => s.opportunityId === selectedOpportunity.id);
  }, [selectedOpportunity, savedOpportunities]);

  return (
    <CandidateAppShell activeRoute="/opportunities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Workspace Header */}
        <OpportunitiesHeader profile={profile} totalOpportunities={totalCount} />

        {/* Workspace Metric Cards */}
        <OpportunitiesMetrics
          totalCount={totalCount}
          highAlignmentCount={highAlignmentCount}
          matchedSkillsCount={matchedSkillsCount}
          savedCount={savedCount}
        />

        {/* Filter Controls Bar */}
        <div className="brutalist-card bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] space-y-4 font-mono">
          {/* Search Input & Reset Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="opportunity-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search opportunities by title, technology, location, or organization..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-900 text-xs text-slate-900 placeholder:text-slate-400 font-sans focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                id="toggle-saved-filter"
                onClick={() => setSavedOnly(!savedOnly)}
                className={`py-2.5 px-4 rounded-xl border-2 border-slate-900 text-xs font-bold flex items-center gap-2 transition-all ${
                  savedOnly
                    ? 'bg-cyan-400 text-slate-950 shadow-[2px_2px_0px_0px_#0F172A]'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${savedOnly ? 'fill-slate-950' : ''}`} />
                <span>SAVED ROLES ({savedCount})</span>
              </button>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  id="reset-filters-btn"
                  onClick={handleResetFilters}
                  className="py-2.5 px-3 rounded-xl border-2 border-slate-900 bg-amber-50 text-amber-950 hover:bg-amber-100 text-xs font-bold flex items-center gap-1.5 transition-all"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET ({activeFilterCount})</span>
                </button>
              )}
            </div>
          </div>

          {/* Categorical Filter Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
            {/* Category */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Role Category</label>
              <select
                id="filter-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 text-slate-900 font-sans bg-white focus:outline-none focus:border-slate-900"
              >
                <option value="ALL">All Categories</option>
                <option value="AI / ML Engineering">AI / ML Engineering</option>
                <option value="Backend Engineering">Backend Engineering</option>
                <option value="Full Stack Engineering">Full Stack Engineering</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Data Engineering">Data Engineering</option>
              </select>
            </div>

            {/* Work Mode */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Work Mode</label>
              <select
                id="filter-workmode"
                value={selectedWorkMode}
                onChange={(e) => setSelectedWorkMode(e.target.value)}
                className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 text-slate-900 font-sans bg-white focus:outline-none focus:border-slate-900"
              >
                <option value="ALL">All Work Modes</option>
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Experience Level</label>
              <select
                id="filter-experience"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 text-slate-900 font-sans bg-white focus:outline-none focus:border-slate-900"
              >
                <option value="ALL">All Levels</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead / Staff</option>
              </select>
            </div>

            {/* Alignment Grade */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Match Alignment</label>
              <select
                id="filter-alignment"
                value={selectedAlignmentGrade}
                onChange={(e) => setSelectedAlignmentGrade(e.target.value)}
                className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 text-slate-900 font-sans bg-white focus:outline-none focus:border-slate-900"
              >
                <option value="ALL">All Alignment Levels</option>
                <option value="HIGH_ALIGNMENT">High Alignment (&ge;70%)</option>
                <option value="MODERATE_ALIGNMENT">Moderate Alignment (40-69%)</option>
                <option value="DEVELOPING_ALIGNMENT">Developing Gap (&lt;40%)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Opportunity Listings Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredOpportunities.map(({ opportunity, alignment, isSaved }) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                alignment={alignment}
                isSaved={isSaved}
                onToggleSave={handleToggleSave}
                onSelect={(opp) => setSelectedOpportunity(opp)}
              />
            ))}
          </div>
        ) : (
          /* Honest Empty Filter Result State */
          <div className="brutalist-card bg-white p-8 sm:p-12 rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] text-center space-y-4 font-mono">
            <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-900 flex items-center justify-center mx-auto text-slate-500">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 font-sans">NO MATCHING OPPORTUNITIES FOUND</h3>
              <p className="text-xs text-slate-600 font-sans max-w-md mx-auto">
                No evaluated opportunities matched your exact filter parameters or search query.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="py-2.5 px-5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-cyan-600 hover:text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4] transition-all inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>CLEAR ALL FILTERS</span>
            </button>
          </div>
        )}

        {/* Opportunity Detail Intelligence Drawer */}
        <OpportunityDetailDrawer
          opportunity={selectedOpportunity}
          alignment={selectedAlignment}
          isSaved={isSelectedSaved}
          profile={profile}
          onClose={() => setSelectedOpportunity(null)}
          onToggleSave={handleToggleSave}
        />
      </div>
    </CandidateAppShell>
  );
};
