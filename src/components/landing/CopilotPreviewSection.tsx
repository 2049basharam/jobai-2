import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Bot, Sparkles, Send, ArrowRight, User } from 'lucide-react';
import { AIPulse } from '../intelligence/AIPulse';

export const CopilotPreviewSection: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! I'm your JobAI Career Copilot. I've analyzed your backend skills. Based on current market data, shifting your target from Backend Engineer to AI Systems Architect increases average offer comp by 32%. Would you like me to map your skill gap?",
    },
    {
      role: 'user',
      text: 'Yes! What is the single most critical gap for Senior AI Architect roles?',
    },
    {
      role: 'assistant',
      text: 'The primary gap identified is "Vector Database Indexing & HNSW Search Tuning" in pgvector. You already master PostgreSQL and FastAPI, so learning vector indexing will take ~10 hours.',
    },
  ]);

  const [inputVal, setInputVal] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: inputVal },
      {
        role: 'assistant',
        text: 'Great query! To unlock full AI Copilot advice and tailor your trajectory, complete your profile registration.',
      },
    ]);
    setInputVal('');
  };

  return (
    <section id="copilot" className="py-20 bg-white border-t-2 border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-slate-950 bg-cyan-400 px-3 py-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
              // SECTION_05: AI CAREER COPILOT
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase font-heading tracking-tight">
              Your 24/7 Strategic Career Advisor
            </h2>

            <p className="text-slate-700 text-base leading-relaxed font-medium">
              Ask questions about salary negotiation, resume positioning, target roles, or code architecture prep. JobAI Copilot delivers instant context-aware intelligence.
            </p>

            <div className="space-y-3 pt-2 font-mono text-xs font-bold text-slate-900">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-cyan-400 border border-slate-900"></span> [CONTEXTUAL_MEMORY_ACTIVE]
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-indigo-600 border border-slate-900"></span> [REALTIME_SALARY_BENCHMARKS]
              </div>
            </div>

            <div className="pt-2">
              <a href="/register">
                <Button variant="brutalist-cyan" size="lg" rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}>
                  Try Copilot Full Access
                </Button>
              </a>
            </div>
          </div>

          {/* Right Interactive Preview Shell */}
          <div className="lg:col-span-7">
            <div className="brutalist-card-dark p-0 rounded-xl overflow-hidden border-2 border-slate-900 shadow-[6px_6px_0px_0px_#06B6D4]">
              {/* Copilot Header Bar */}
              <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b-2 border-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-400 text-slate-950 flex items-center justify-center border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
                    <Bot className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      JOBAI // COPILOT_V2_TERMINAL
                    </h4>
                    <p className="text-[10px] font-mono text-cyan-400">[GEMINI_2.5_FLASH_ONLINE]</p>
                  </div>
                </div>

                <AIPulse state="idle" label="COPILOT_READY" size="sm" />
              </div>

              {/* Chat Message Window */}
              <div className="p-6 space-y-4 max-h-[340px] overflow-y-auto bg-slate-900 font-mono text-xs">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-md bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 border border-slate-900 font-bold">
                        <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}

                    <div
                      className={`max-w-md p-3.5 rounded-lg text-xs leading-relaxed border-2 ${
                        msg.role === 'user'
                          ? 'bg-cyan-400 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] font-bold'
                          : 'bg-slate-950 text-slate-200 border-slate-800 shadow-[2px_2px_0px_0px_#06B6D4]'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-md bg-slate-200 text-slate-950 flex items-center justify-center shrink-0 border border-slate-900 font-bold">
                        <User className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-4 bg-slate-950 border-t-2 border-slate-900 flex items-center gap-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="[COMMAND] &gt; Ask Copilot about your career trajectory..."
                  className="w-full bg-slate-900 border-2 border-slate-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shrink-0 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
