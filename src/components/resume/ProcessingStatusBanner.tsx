import React from 'react';
import { Loader2, CheckCircle2, AlertTriangle, Cpu, Database, FileText } from 'lucide-react';
import type { DocumentProcessingStatus } from '../../lib/document';

interface Props {
  status: DocumentProcessingStatus;
  statusMessage?: string | null;
}

export const ProcessingStatusBanner: React.FC<Props> = ({ status, statusMessage }) => {
  if (status === 'UPLOADED') return null;

  const isFailed = status === 'FAILED';
  const isExtracted = status === 'EXTRACTED';

  const getStatusColor = () => {
    if (isFailed) return 'bg-red-50 text-red-900 border-red-700 shadow-[4px_4px_0px_0px_#B91C1C]';
    if (isExtracted) return 'bg-emerald-50 text-emerald-950 border-emerald-700 shadow-[4px_4px_0px_0px_#047857]';
    return 'bg-slate-950 text-cyan-400 border-slate-900 shadow-[4px_4px_0px_0px_#06B6D4]';
  };

  const steps: { key: DocumentProcessingStatus; label: string }[] = [
    { key: 'VALIDATING', label: 'Validate Format' },
    { key: 'STORED', label: 'Store Document' },
    { key: 'EXTRACTING', label: 'Extract Entities' },
    { key: 'EXTRACTED', label: 'Artifact Ready' },
  ];

  return (
    <div className={`p-4 rounded-2xl border-2 font-mono text-xs transition-all ${getStatusColor()}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {isExtracted ? (
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : isFailed ? (
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-cyan-400 text-slate-950 flex items-center justify-center font-bold">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          )}

          <div>
            <div className="font-bold uppercase tracking-wider flex items-center gap-2 text-sm">
              <span>STATUS: [{status}]</span>
            </div>
            <p className="text-xs opacity-90">
              {statusMessage || 'Processing document through extraction pipeline...'}
            </p>
          </div>
        </div>

        {/* State Machine Step Indicators */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {steps.map((s, idx) => {
            const isCurrent = status === s.key;
            const isPassed =
              (status === 'STORED' && idx === 0) ||
              (status === 'EXTRACTING' && idx <= 1) ||
              (status === 'EXTRACTED' && idx <= 3);

            return (
              <div
                key={s.key}
                className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                  isCurrent
                    ? 'bg-cyan-400 text-slate-950 border-slate-900 font-extrabold'
                    : isPassed
                    ? 'bg-slate-800 text-slate-200 border-slate-700'
                    : 'bg-slate-900/40 text-slate-500 border-slate-800'
                }`}
              >
                {s.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
