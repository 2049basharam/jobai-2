import React from 'react';
import { FileText, Calendar, HardDrive, CheckCircle2, Download, Trash2, Eye, Sparkles } from 'lucide-react';
import type { CandidateDocument } from '../../lib/document';

interface Props {
  documents: CandidateDocument[];
  activeDocumentId?: string | null;
  onSelectDocument: (doc: CandidateDocument) => void;
  onDeleteDocument: (docId: string) => void;
}

export const ResumeHistoryTable: React.FC<Props> = ({
  documents,
  activeDocumentId,
  onSelectDocument,
  onDeleteDocument,
}) => {
  if (documents.length === 0) {
    return (
      <div className="p-8 brutalist-card bg-white rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] text-center font-mono space-y-3">
        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center border border-slate-300">
          <FileText className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          <span>// NO_INGESTED_RESUME_DOCUMENTS</span>
        </div>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Upload your resume above to extract source text and create your first parsed artifact.
        </p>
      </div>
    );
  }

  return (
    <div className="brutalist-card bg-white rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] p-5 font-mono space-y-4">
      <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-950 text-cyan-400 flex items-center justify-center border border-slate-900">
            <FileText className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              <span>RESUME_DOCUMENT_HISTORY</span>
            </h3>
            <p className="text-[10px] text-slate-500">
              Source resume files stored in private Supabase bucket
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-cyan-700 bg-cyan-100 px-2.5 py-1 rounded border border-cyan-300">
          [{documents.length} DOCUMENTS]
        </span>
      </div>

      {/* Document Records List */}
      <div className="space-y-3">
        {documents.map((doc) => {
          const isSelected = doc.id === activeDocumentId;
          const formattedSize = (doc.fileSize / (1024 * 1024)).toFixed(2);
          const formattedDate = new Date(doc.uploadedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          return (
            <div
              key={doc.id}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isSelected
                  ? 'bg-cyan-50/70 border-cyan-500 shadow-[3px_3px_0px_0px_#06B6D4]'
                  : 'bg-white border-slate-200/90 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 border-slate-900 font-bold'
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 truncate">
                      {doc.originalFilename}
                    </span>
                    {doc.isActive && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-[9px] font-bold">
                        PRIMARY
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <HardDrive className="w-3 h-3" />
                      {formattedSize} MB
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formattedDate}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 border text-slate-700 font-bold">
                      [{doc.processingStatus}]
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => onSelectDocument(doc)}
                  className={`px-3 py-1.5 rounded-lg border-2 text-xs font-bold transition-all shadow-[2px_2px_0px_0px_#0F172A] flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-950 text-cyan-400 border-slate-900'
                      : 'bg-white text-slate-800 border-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isSelected ? 'Viewing' : 'Inspect'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteDocument(doc.id)}
                  className="p-1.5 rounded-lg border-2 border-slate-900 bg-white hover:bg-red-50 text-slate-600 hover:text-red-700 transition-all shadow-[2px_2px_0px_0px_#0F172A]"
                  title="Delete resume record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
