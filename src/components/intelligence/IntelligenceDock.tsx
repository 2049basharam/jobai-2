import React, { useState } from 'react';
import { Sparkles, Command, Search, Target, Briefcase, X } from 'lucide-react';

export const IntelligenceDock: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      {isOpen ? (
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-jobai-glow border border-slate-800 w-72 space-y-3 animate-pulse-subtle">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 font-heading">
              <Command className="w-3.5 h-3.5" /> Career Command Dock
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1 text-xs">
            <a
              href="/register"
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" /> Analyze Profile Identity
            </a>
            <a
              href="/register"
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-200 transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Explore Opportunities
            </a>
            <a
              href="/register"
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-200 transition-colors"
            >
              <Target className="w-3.5 h-3.5 text-amber-400" /> Diagnose Skill Gaps
            </a>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-jobai-lg border border-slate-700/80 hover:border-cyan-500/50 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Intelligence Dock</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">
            ⌘ K
          </kbd>
        </button>
      )}
    </div>
  );
};
