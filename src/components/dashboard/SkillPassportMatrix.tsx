import React, { useState } from 'react';
import { Zap, Plus, FileText, Code, Database, Cpu, Layers, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface SkillItem {
  name: string;
  category: string;
  verified: boolean;
  evidenceCount: number;
}

export const SkillPassportMatrix: React.FC = () => {
  const defaultSkills: SkillItem[] = [
    { name: 'Python (FastAPI / PyTorch)', category: 'languages', verified: true, evidenceCount: 14 },
    { name: 'React / TypeScript / Astro', category: 'languages', verified: true, evidenceCount: 16 },
    { name: 'Explainable AI & NLP', category: 'ai', verified: true, evidenceCount: 8 },
    { name: 'Computer Vision & ONNX', category: 'ai', verified: true, evidenceCount: 6 },
    { name: 'Node.js & Express APIs', category: 'backend', verified: true, evidenceCount: 10 },
    { name: 'PostgreSQL & Supabase (pgvector)', category: 'database', verified: true, evidenceCount: 11 },
    { name: 'Docker & Microservices', category: 'backend', verified: true, evidenceCount: 9 },
    { name: 'MongoDB & Cloud Deployment', category: 'database', verified: true, evidenceCount: 7 },
  ];

  const [skills] = useState<SkillItem[]>(defaultSkills);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'languages', label: 'Programming' },
    { id: 'ai', label: 'AI / GenAI' },
    { id: 'backend', label: 'Backend & Systems' },
    { id: 'database', label: 'Databases & Infrastructure' },
  ];

  return (
    <div className="w-full h-full brutalist-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-[6px_6px_0px_0px_#0F172A] bg-white">
      {/* Top Card Header */}
      <div className="space-y-1 pb-2 border-b-2 border-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-400 text-slate-950 border border-slate-900">
              <Zap className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading tracking-tight">
              SKILL PASSPORT
            </h3>
          </div>
          <span className="font-mono text-[10px] font-bold text-slate-900 bg-slate-100 px-2.5 py-1 border border-slate-900 rounded">
            CAPABILITY_MATRIX
          </span>
        </div>
        <p className="text-xs font-mono text-slate-600 font-medium pt-1">
          // Verified technical capabilities and semantic code evidence
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg border-2 transition-all font-bold whitespace-nowrap text-xs ${
              selectedCategory === cat.id
                ? 'bg-slate-950 text-white border-slate-900 shadow-[2px_2px_0px_0px_#06B6D4]'
                : 'bg-white text-slate-800 border-slate-900 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Capabilities Content Area */}
      {skills.length === 0 ? (
        /* Honest Empty Capability State */
        <div className="my-auto py-8 p-5 rounded-xl border-2 border-dashed border-slate-900 bg-slate-50/80 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 border-2 border-slate-900 flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#0F172A]">
            <AlertCircle className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="space-y-1 max-w-sm mx-auto">
            <h4 className="text-sm font-black text-slate-950 uppercase font-heading">
              CAPABILITY MAP NOT INITIALIZED
            </h4>
            <p className="text-xs font-mono text-slate-600 leading-relaxed font-medium">
              No verified capabilities added yet. Add your technical skills, projects, or upload a resume to build your capability vector.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 font-mono text-xs">
            <Button
              type="button"
              variant="brutalist-cyan"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5 stroke-[2.5]" />}
              onClick={() => alert('Add skills modal interface initialized.')}
            >
              Add skills
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<Code className="w-3.5 h-3.5 stroke-[2.5]" />}
              onClick={() => alert('Add projects interface initialized.')}
            >
              Add projects
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<FileText className="w-3.5 h-3.5 stroke-[2.5]" />}
              onClick={() => alert('Resume parser interface initialized.')}
            >
              Upload resume
            </Button>
          </div>
        </div>
      ) : (
        /* Populated Skills Matrix (when skills are added) */
        <div className="grid grid-cols-2 gap-3 my-auto">
          {skills.map((skill) => (
            <div key={skill.name} className="p-3 rounded-lg border-2 border-slate-900 bg-white font-mono text-xs flex justify-between items-center shadow-[2px_2px_0px_0px_#0F172A]">
              <span className="font-bold text-slate-900">{skill.name}</span>
              <span className="text-[10px] text-cyan-700 bg-cyan-50 px-2 py-0.5 border border-cyan-300 rounded font-bold">VERIFIED</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer System Tag */}
      <div className="pt-2 border-t-2 border-slate-900 font-mono text-[11px] font-bold text-slate-500 flex justify-between items-center">
        <span>// AUTHORITATIVE_SKILL_VECTOR</span>
        <span className="text-cyan-700 font-bold">[STATUS: 8 VERIFIED CAPABILITIES]</span>
      </div>
    </div>
  );
};
