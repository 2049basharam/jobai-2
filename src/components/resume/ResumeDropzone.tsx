import React, { useState, useRef } from 'react';
import { FileUp, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import { validateClientFile, MAX_FILE_SIZE, ALLOWED_EXTENSIONS } from '../../lib/validation/document';

interface Props {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
}

export const ResumeDropzone: React.FC<Props> = ({ onFileSelect, isProcessing = false }) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setValidationError(null);
    const err = validateClientFile(file);
    if (err) {
      setValidationError(err.message);
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isProcessing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isProcessing) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Dropzone Container */}
      <div
        id="resume-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={`w-full p-8 rounded-2xl border-2 transition-all cursor-pointer select-none font-mono relative overflow-hidden ${
          isDragOver
            ? 'bg-cyan-50 border-cyan-500 shadow-[6px_6px_0px_0px_#06B6D4] scale-[1.01]'
            : isProcessing
            ? 'bg-slate-50 border-slate-300 opacity-60 cursor-not-allowed'
            : 'bg-white border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] hover:border-cyan-600 hover:shadow-[6px_6px_0px_0px_#06B6D4]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleInputChange}
          className="hidden"
          id="resume-file-input"
        />

        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 text-cyan-400 flex items-center justify-center border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4]">
            <FileUp className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              <span>DRAG_AND_DROP_RESUME_SOURCE_DOCUMENT</span>
            </h3>
            <p className="text-xs text-slate-600 font-mono">
              Click or drag your resume file here to trigger document ingestion
            </p>
          </div>

          {/* Supported Format Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-[10px] font-bold text-slate-700">
              PDF (.pdf)
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-[10px] font-bold text-slate-700">
              Word (.docx)
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-[10px] font-bold text-slate-700">
              Text (.txt)
            </span>
            <span className="px-2.5 py-1 rounded bg-cyan-100 text-cyan-900 border border-cyan-300 text-[10px] font-bold">
              MAX 5MB
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-200 w-full justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
            <span>Authoritative profile protection active :: Zero automatic overwrites</span>
          </div>
        </div>
      </div>

      {/* Client Validation Error Banner */}
      {validationError && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-900 border-2 border-red-700 font-mono text-xs font-bold shadow-[3px_3px_0px_0px_#B91C1C]">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>[VALIDATION_ERROR]: {validationError}</span>
        </div>
      )}
    </div>
  );
};
