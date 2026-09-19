import React from 'react';
import { Send, Clock, PhoneCall, Award, Layers } from 'lucide-react';

interface Props {
  totalCount: number;
  savedCount: number;
  appliedCount: number;
  screeningCount: number;
  interviewCount: number;
  offerCount: number;
}

export const ApplicationsMetrics: React.FC<Props> = ({
  totalCount,
  savedCount,
  appliedCount,
  screeningCount,
  interviewCount,
  offerCount,
}) => {
  const activeCount = appliedCount + screeningCount + interviewCount;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 font-mono">
      {/* Metric 1: Total */}
      <div className="brutalist-card bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] space-y-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[10px] font-bold uppercase tracking-wider">Total Pursuits</span>
          <Layers className="w-4 h-4 text-slate-700" />
        </div>
        <div className="text-2xl font-black text-slate-900">{totalCount}</div>
        <div className="text-[10px] text-slate-500">{savedCount} saved in pipeline</div>
      </div>

      {/* Metric 2: Applied */}
      <div className="brutalist-card bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] space-y-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800">Submitted</span>
          <Send className="w-4 h-4 text-cyan-600" />
        </div>
        <div className="text-2xl font-black text-cyan-700">{appliedCount}</div>
        <div className="text-[10px] text-cyan-800">Awaiting recruiter response</div>
      </div>

      {/* Metric 3: Screening */}
      <div className="brutalist-card bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] space-y-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800">Screening</span>
          <PhoneCall className="w-4 h-4 text-sky-600" />
        </div>
        <div className="text-2xl font-black text-sky-700">{screeningCount}</div>
        <div className="text-[10px] text-sky-800">Recruiter call in progress</div>
      </div>

      {/* Metric 4: Interview */}
      <div className="brutalist-card bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] space-y-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800">Interviews</span>
          <Clock className="w-4 h-4 text-indigo-600" />
        </div>
        <div className="text-2xl font-black text-indigo-700">{interviewCount}</div>
        <div className="text-[10px] text-indigo-800">Technical rounds scheduled</div>
      </div>

      {/* Metric 5: Offers */}
      <div className="brutalist-card bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] space-y-1 col-span-2 md:col-span-1">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Offers</span>
          <Award className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-black text-emerald-600">{offerCount}</div>
        <div className="text-[10px] text-emerald-700 font-bold">Offer stage reached</div>
      </div>
    </div>
  );
};
