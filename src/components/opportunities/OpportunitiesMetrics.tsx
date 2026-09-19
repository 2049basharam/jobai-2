import React from 'react';
import { Target, CheckCircle2, Bookmark, Flame } from 'lucide-react';

interface Props {
  totalCount: number;
  highAlignmentCount: number;
  matchedSkillsCount: number;
  savedCount: number;
}

export const OpportunitiesMetrics: React.FC<Props> = ({
  totalCount,
  highAlignmentCount,
  matchedSkillsCount,
  savedCount,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 font-mono">
      {/* Metric 1 */}
      <div className="brutalist-card bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] space-y-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[10px] font-bold uppercase tracking-wider">Total Evaluated</span>
          <Target className="w-4 h-4 text-cyan-600" />
        </div>
        <div className="text-2xl font-black text-slate-900">{totalCount}</div>
        <div className="text-[10px] text-slate-500">Illustrative preview catalog</div>
      </div>

      {/* Metric 2 */}
      <div className="brutalist-card bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] space-y-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">High Alignment</span>
          <Flame className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-black text-emerald-600">{highAlignmentCount}</div>
        <div className="text-[10px] text-emerald-700 font-bold">&ge;70% Deterministic Match</div>
      </div>

      {/* Metric 3 */}
      <div className="brutalist-card bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] space-y-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800">Capability Signals</span>
          <CheckCircle2 className="w-4 h-4 text-cyan-600" />
        </div>
        <div className="text-2xl font-black text-cyan-700">{matchedSkillsCount}</div>
        <div className="text-[10px] text-cyan-800">Skill Passport overlaps</div>
      </div>

      {/* Metric 4 */}
      <div className="brutalist-card bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] space-y-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Saved Roles</span>
          <Bookmark className="w-4 h-4 text-slate-700" />
        </div>
        <div className="text-2xl font-black text-slate-900">{savedCount}</div>
        <div className="text-[10px] text-slate-500">Bookmarked opportunities</div>
      </div>
    </div>
  );
};
