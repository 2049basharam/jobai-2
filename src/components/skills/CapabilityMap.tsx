import React from 'react';
import type { CandidateSkillRecord, SkillCategory } from '../../lib/skills';

interface Props {
  skills: CandidateSkillRecord[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectSkill: (skill: CandidateSkillRecord) => void;
}

export const CapabilityMap: React.FC<Props> = ({
  skills,
  selectedCategory,
  onSelectCategory,
  onSelectSkill,
}) => {
  const categoriesList: SkillCategory[] = [
    'AI / Machine Learning',
    'Backend Engineering',
    'Frontend Engineering',
    'Data & Databases',
    'DevOps & Cloud',
    'Testing & Quality',
    'Tools & Platforms',
  ];

  return (
    <div className="w-full brutalist-card rounded-2xl p-6 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] space-y-4 font-mono">
      <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-base font-extrabold text-slate-950 uppercase font-heading tracking-tight flex items-center gap-2">
            CAPABILITY TAXONOMY MAP
          </h3>
          <p className="text-xs text-slate-600">
            // Structured capability breakdown by technical domain
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`px-3 py-1 rounded text-xs font-bold border transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-950 text-cyan-400 border-slate-900 shadow-[2px_2px_0px_0px_#06B6D4]'
              : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
          }`}
        >
          SHOW ALL ({skills.length})
        </button>
      </div>

      {/* Category Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesList.map((cat) => {
          const categorySkills = skills.filter((s) => s.category === cat);
          const isSelected = selectedCategory === cat;

          return (
            <div
              key={cat}
              className={`p-4 rounded-xl border-2 transition-all space-y-3 ${
                isSelected
                  ? 'bg-cyan-50/80 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4]'
                  : 'bg-slate-50/60 border-slate-900 hover:bg-slate-100/70 shadow-[2px_2px_0px_0px_#0F172A]'
              }`}
            >
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className="text-left font-extrabold text-xs text-slate-950 uppercase tracking-wide hover:text-cyan-700"
                >
                  {cat}
                </button>
                <span className="text-[10px] font-bold text-slate-900 bg-white px-2 py-0.5 border border-slate-900 rounded">
                  {categorySkills.length} SKILLS
                </span>
              </div>

              {/* Skill Pill Items */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {categorySkills.length === 0 ? (
                  <span className="text-[11px] text-slate-400 italic">No skills added in domain</span>
                ) : (
                  categorySkills.map((sk) => (
                    <button
                      key={sk.id}
                      type="button"
                      onClick={() => onSelectSkill(sk)}
                      className={`text-[11px] font-bold px-2 py-1 rounded border transition-all text-left flex items-center gap-1.5 ${
                        sk.evidenceState === 'PROJECT_EVIDENCE'
                          ? 'bg-white text-slate-900 border-slate-900 hover:bg-cyan-100'
                          : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <span>{sk.name}</span>
                      <span className="text-[9px] text-cyan-700 bg-cyan-50 px-1 border border-cyan-200 rounded">
                        {sk.evidence.length}E
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
