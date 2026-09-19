import React from 'react';
import { Layers } from 'lucide-react';
import { ApplicationCard } from './ApplicationCard';
import type { CandidateApplication, ApplicationStage } from '../../lib/applications';

interface Props {
  applications: CandidateApplication[];
  onSelectApplication: (app: CandidateApplication) => void;
}

const STAGE_COLUMNS: Array<{ key: ApplicationStage | 'CLOSED'; label: string; stages: ApplicationStage[] }> = [
  { key: 'SAVED', label: 'SAVED', stages: ['SAVED'] },
  { key: 'APPLIED', label: 'APPLIED', stages: ['APPLIED'] },
  { key: 'SCREENING', label: 'SCREENING', stages: ['SCREENING'] },
  { key: 'INTERVIEW', label: 'INTERVIEW', stages: ['INTERVIEW'] },
  { key: 'OFFER', label: 'OFFER', stages: ['OFFER', 'ACCEPTED'] },
  { key: 'CLOSED', label: 'CLOSED / REJECTED', stages: ['REJECTED', 'WITHDRAWN'] },
];

export const ApplicationStageBoard: React.FC<Props> = ({ applications, onSelectApplication }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 font-mono">
      {STAGE_COLUMNS.map((col) => {
        const colApps = applications.filter((app) => col.stages.includes(app.stage));

        return (
          <div
            key={col.key}
            className="brutalist-card bg-slate-100/70 p-3 rounded-2xl border-2 border-slate-900/80 space-y-3 flex flex-col justify-start min-h-[400px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-300 text-xs px-1">
              <span className="font-extrabold text-slate-800 tracking-wider">{col.label}</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-400 text-[10px] font-bold">
                {colApps.length}
              </span>
            </div>

            {/* Column Items */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {colApps.length > 0 ? (
                colApps.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onSelect={onSelectApplication}
                  />
                ))
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-[10px] text-slate-400 font-sans">
                  No applications in {col.label.toLowerCase()}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
