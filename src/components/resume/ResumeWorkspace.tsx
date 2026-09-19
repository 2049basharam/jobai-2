import React, { useState, useEffect } from 'react';
import { CandidateAppShell } from '../app/CandidateAppShell';
import { ResumeDropzone } from './ResumeDropzone';
import { ProcessingStatusBanner } from './ProcessingStatusBanner';
import { ResumeHistoryTable } from './ResumeHistoryTable';
import { ParsedArtifactPreview } from './ParsedArtifactPreview';
import { ApplyToProfileModal } from './ApplyToProfileModal';
import {
  fetchCandidateDocuments,
  uploadAndIngestResume,
  fetchParsedArtifact,
  type CandidateDocument,
  type ParsedResumeArtifact,
  type DocumentProcessingStatus,
} from '../../lib/document';
import { FileUp, FileText, Sparkles, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';

export const ResumeWorkspace: React.FC = () => {
  const [documents, setDocuments] = useState<CandidateDocument[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<CandidateDocument | null>(null);
  const [activeArtifact, setActiveArtifact] = useState<ParsedResumeArtifact | null>(null);
  const [processingStatus, setProcessingStatus] = useState<DocumentProcessingStatus>('UPLOADED');
  const [processingMsg, setProcessingMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoadingDocs, setIsLoadingDocs] = useState<boolean>(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);

  // Initial load of documents
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const docs = await fetchCandidateDocuments();
        if (isMounted) {
          setDocuments(docs);
          if (docs.length > 0) {
            setSelectedDoc(docs[0]);
            const art = await fetchParsedArtifact(docs[0].id);
            setActiveArtifact(art);
          }
          setIsLoadingDocs(false);
        }
      } catch (err) {
        console.error('[JobAI ResumeWorkspace] Error loading documents:', err);
        if (isMounted) setIsLoadingDocs(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setProcessingStatus('VALIDATING');
    setProcessingMsg('Validating document format and magic byte headers...');

    const res = await uploadAndIngestResume(file, (status, msg) => {
      setProcessingStatus(status);
      setProcessingMsg(msg || null);
    });

    if (res.success && res.document && res.artifact) {
      setDocuments((prev) => [res.document!, ...prev.filter((d) => d.id !== res.document!.id)]);
      setSelectedDoc(res.document);
      setActiveArtifact(res.artifact);
    }

    setIsProcessing(false);
  };

  const handleSelectDocument = async (doc: CandidateDocument) => {
    setSelectedDoc(doc);
    const art = await fetchParsedArtifact(doc.id);
    setActiveArtifact(art);
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    if (selectedDoc?.id === docId) {
      const remaining = documents.filter((d) => d.id !== docId);
      if (remaining.length > 0) {
        setSelectedDoc(remaining[0]);
        fetchParsedArtifact(remaining[0].id).then(setActiveArtifact);
      } else {
        setSelectedDoc(null);
        setActiveArtifact(null);
      }
    }
  };

  const handleProfileSyncSuccess = () => {
    // Feedback handling when authoritative profile is updated
  };

  return (
    <CandidateAppShell activeRoute="/resume">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 relative">
        {/* Top Session Bar & Sub-Header */}
        <div className="flex flex-wrap items-center justify-end gap-4 pb-4 border-b-2 border-slate-900/10 font-mono">

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white border-2 border-slate-900 text-xs font-mono shadow-[2px_2px_0px_0px_#06B6D4]">
              <FileUp className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold">Resume Workspace</span>
            </div>
          </div>
        </div>

        {/* Workspace Header Card */}
        <div className="brutalist-card bg-white rounded-2xl p-6 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <a
                href="/dashboard"
                className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-bold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>/dashboard</span>
              </a>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-cyan-700 font-bold">// WORKSPACE_03</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-cyan-400 flex items-center justify-center border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4]">
                <FileUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  RESUME_UPLOAD_AND_DOCUMENT_INGESTION
                </h1>
                <p className="text-xs text-slate-600">
                  Ingest source resume files, execute deterministic text extraction, and inspect parsed artifacts
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 text-cyan-400 border-2 border-slate-900 text-xs font-bold shadow-[3px_3px_0px_0px_#06B6D4] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>AUTHORITATIVE_DATA_ISOLATED</span>
            </div>
          </div>
        </div>

        {/* Processing Status Banner */}
        <ProcessingStatusBanner status={processingStatus} statusMessage={processingMsg} />

        {/* Upload Dropzone */}
        <ResumeDropzone onFileSelect={handleFileSelect} isProcessing={isProcessing} />

        {/* Workspace Dual Surface: History Table & Parsed Artifact Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 w-full">
            {isLoadingDocs ? (
              <div className="p-8 brutalist-card bg-white rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] text-center font-mono">
                <Loader2 className="w-6 h-6 text-cyan-500 animate-spin mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-700 uppercase">// LOADING_INGESTED_DOCUMENTS</span>
              </div>
            ) : (
              <ResumeHistoryTable
                documents={documents}
                activeDocumentId={selectedDoc?.id}
                onSelectDocument={handleSelectDocument}
                onDeleteDocument={handleDeleteDocument}
              />
            )}
          </div>

          <div className="lg:col-span-7 w-full">
            <ParsedArtifactPreview
              artifact={activeArtifact}
              onOpenApplyModal={() => setIsApplyModalOpen(true)}
            />
          </div>
        </div>

        {/* Opt-in Authoritative Profile Sync Modal */}
        {activeArtifact && (
          <ApplyToProfileModal
            artifact={activeArtifact}
            isOpen={isApplyModalOpen}
            onClose={() => setIsApplyModalOpen(false)}
            onSuccess={handleProfileSyncSuccess}
          />
        )}
      </div>
    </CandidateAppShell>
  );
};
