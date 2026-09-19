import React, { useState } from 'react';
import { Sparkles, ArrowRight, Cpu, Check, Compass, Terminal } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const CareerIntentInput: React.FC = () => {
  const [intentText, setIntentText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [intentBreakdown, setIntentBreakdown] = useState<null | {
    direction: string;
    domain: string;
    capabilities: string[];
    targetRoles: string[];
  }>(null);

  const sampleIntents = [
    'Senior AI Systems Engineer',
    'FastAPI & Microservices Architect',
    'Distributed Systems & Vector DB Engineer',
  ];

  const handleSelectSample = (sample: string) => {
    setIntentText(sample);
    processAnalysis(sample);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intentText.trim()) return;
    processAnalysis(intentText);
  };

  const processAnalysis = (text: string) => {
    setIsAnalyzing(true);
    setIntentBreakdown(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setIntentBreakdown({
        direction: text.includes('AI') ? 'AI Infrastructure Engineering' : 'Backend Platform Architecture',
        domain: 'Enterprise Cloud Systems',
        capabilities: ['Async I/O', 'Supabase Vector Indexing', 'API Gateway Design'],
        targetRoles: ['Staff AI Engineer', 'Principal Cloud Architect'],
      });
    }, 350);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      {/* Intent Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-white rounded-xl p-2 shadow-[4px_4px_0px_0px_#0F172A] border-2 border-slate-900 focus-within:ring-2 focus-within:ring-cyan-400 transition-all">
          <div className="p-2 text-slate-900 font-mono text-xs font-bold shrink-0">
            [PROMPT] &gt;
          </div>
          <input
            type="text"
            value={intentText}
            onChange={(e) => setIntentText(e.target.value)}
            placeholder="What do you want your career to become? (e.g. Staff AI Systems Architect)..."
            className="w-full bg-transparent px-2 py-2 text-xs sm:text-sm text-slate-950 placeholder:text-slate-500 focus:outline-none font-bold font-mono"
          />
          <button
            type="submit"
            disabled={isAnalyzing}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider shrink-0 transition-all border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] active:translate-x-[1px] active:translate-y-[1px]"
          >
            {isAnalyzing ? (
              <span>[ANALYZING...]</span>
            ) : (
              <>
                <span>ANALYZE</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Suggestion Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-700">
        <span className="font-bold text-slate-900 flex items-center gap-1 uppercase">
          <Terminal className="w-3.5 h-3.5 text-indigo-700" /> // PROMPTS:
        </span>
        {sampleIntents.map((sample, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSelectSample(sample)}
            className="px-2.5 py-1 rounded-md bg-white hover:bg-cyan-400 hover:text-slate-950 text-slate-900 border-2 border-slate-900 text-[11px] font-mono font-bold shadow-[2px_2px_0px_0px_#0F172A] active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            {sample}
          </button>
        ))}
      </div>

      {/* Demonstration Intent Sequence Card */}
      {intentBreakdown && (
        <div className="bg-slate-950 text-white rounded-xl p-4 sm:p-5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#06B6D4] space-y-3">
          <div className="flex items-center justify-between text-xs border-b-2 border-slate-800 pb-2">
            <span className="font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 font-mono">
              <Cpu className="w-4 h-4 text-cyan-400" /> [INTENT_VECTOR_ANALYSIS]
            </span>
            <Badge variant="brutalist-cyan" size="sm">
              DEMO_INTELLIGENCE
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-slate-900 p-3 rounded-lg border-2 border-slate-800">
              <p className="text-[10px] uppercase font-bold text-slate-400">// DIRECTION</p>
              <p className="font-bold text-white mt-0.5">{intentBreakdown.direction}</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border-2 border-slate-800">
              <p className="text-[10px] uppercase font-bold text-slate-400">// DOMAIN</p>
              <p className="font-bold text-white mt-0.5">{intentBreakdown.domain}</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border-2 border-slate-800">
              <p className="text-[10px] uppercase font-bold text-slate-400">// MATCH_ROLE</p>
              <p className="font-bold text-emerald-400 mt-0.5">{intentBreakdown.targetRoles[0]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
