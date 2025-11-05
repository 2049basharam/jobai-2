import React, { useState } from 'react';
import { Sparkles, Terminal, Send, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { analyzeCareerProfile } from '../../lib/ai/gemini';
import type { CareerInsightResult } from '../../lib/ai/gemini';

export const CopilotCommandBar: React.FC = () => {
  const [commandInput, setCommandInput] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<CareerInsightResult | null>(null);

  const quickCommands = [
    { label: 'Improve Profile', query: 'What are the top 3 ways to improve my profile density?' },
    { label: 'Target Skills', query: 'Identify key skills needed for Senior AI Engineer.' },
    { label: 'Analyze Skill Gaps', query: 'Analyze missing requirements between Python and PyTorch.' },
  ];

  const handleRunCommand = async (queryToRun?: string) => {
    const activeQuery = queryToRun || commandInput || 'Analyze career trajectory for Senior Engineer';
    setCommandInput(activeQuery);
    setIsAnalyzing(true);

    try {
      // Call Gemini AI abstraction layer (returns fallback if client unavailable)
      const result = await analyzeCareerProfile(['Python', 'FastAPI', 'System Architecture'], 'Senior AI Engineer');
      setAiResult(result);
    } catch (err) {
      console.warn('[Copilot Command Bar] AI error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full brutalist-card rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#06B6D4] bg-slate-950 text-white border-2 border-slate-900 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
            // COPILOT_COMMAND_SURFACE :: SYS_INTELLIGENCE
          </span>
        </div>
        <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">
          [AI PROVIDER: GEMINI_READY]
        </span>
      </div>

      {/* Quick Command Chips */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="text-slate-400 text-[11px] font-bold uppercase mr-1">// QUICK COMMANDS:</span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd.label}
            type="button"
            onClick={() => handleRunCommand(cmd.query)}
            className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold uppercase text-[11px] transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{cmd.label}</span>
          </button>
        ))}
      </div>

      {/* Command Bar Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRunCommand();
        }}
        className="flex items-center gap-2"
      >
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
            <Terminal className="w-4 h-4 stroke-[2.5]" />
          </div>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Type a career intelligence query (e.g., Analyze career trajectory)..."
            className="w-full bg-slate-900 text-white placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-800 focus:border-cyan-400 focus:outline-none font-mono text-xs transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] hover:bg-cyan-300 disabled:opacity-50 shrink-0"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Execute</span>
              <Send className="w-3.5 h-3.5 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      {/* AI Analysis Output Surface */}
      {aiResult && (
        <div className="p-4 rounded-xl bg-slate-900 border-2 border-cyan-500/40 space-y-3 font-mono text-xs text-slate-200">
          <div className="flex items-center justify-between text-cyan-400 font-bold uppercase border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              // ANALYSIS_COMPLETE :: MATCH {aiResult.matchScore}%
            </span>
            <span className="text-slate-400 text-[10px]">[SOURCE: GEMINI_PROVIDER]</span>
          </div>

          <div className="space-y-1">
            <p className="text-emerald-300 font-bold">// RECOMMENDED TRAJECTORY:</p>
            <p className="text-white text-xs leading-relaxed">{aiResult.recommendedTrajectory}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div>
              <p className="text-cyan-400 font-bold mb-1">// STRONG MATCHES:</p>
              <div className="flex flex-wrap gap-1">
                {aiResult.strongMatches.map((m) => (
                  <span key={m} className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px]">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-amber-400 font-bold mb-1">// GROWTH GAPS:</p>
              <div className="flex flex-wrap gap-1">
                {aiResult.growthGaps.map((g) => (
                  <span key={g} className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 text-[10px]">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
