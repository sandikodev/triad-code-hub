
import React from 'react';
import { Blueprint } from '../../types';

interface BlueprintCardProps {
  bp: Blueprint;
}

export const BlueprintCard: React.FC<BlueprintCardProps> = ({ bp }) => {
  return (
    <div className="group relative bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 overflow-hidden transition-all hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-600/10 transition-all"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-2">
            {bp.languages.map(l => (
              <span key={l} className="px-3 py-1 bg-slate-950 border border-white/10 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest">{l}</span>
            ))}
          </div>
          <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
            {bp.difficulty} Level
          </span>
        </div>

        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors leading-tight">{bp.title}</h3>
        <p className="text-slate-500 text-sm font-light leading-relaxed mb-10 flex-1">
          {bp.description}
        </p>

        <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8 mb-8">
          {bp.stats.map(s => (
            <div key={s.label} className="space-y-1">
              <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{s.label}</p>
              <p className="text-xs font-bold text-slate-300">{s.value}</p>
            </div>
          ))}
        </div>

        <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all active:scale-95 group/btn flex items-center justify-center gap-4">
          Analisis Arsitektur
          <svg className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
