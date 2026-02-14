
import React from 'react';
import { LanguageInfo } from '../types';

interface LanguageCardProps {
  info: LanguageInfo;
  onSelect: (id: LanguageInfo['id']) => void;
  isActive: boolean;
}

export const LanguageCard: React.FC<LanguageCardProps> = ({ info, onSelect, isActive }) => {
  const isSoon = info.isComingSoon;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isSoon) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(info.id);
    }
  };

  return (
    <div 
      onClick={() => !isSoon && onSelect(info.id)}
      onKeyDown={handleKeyDown}
      tabIndex={isSoon ? -1 : 0}
      role="button"
      aria-pressed={isActive}
      aria-disabled={isSoon}
      aria-label={isSoon ? `${info.name} segera hadir` : `Pilih jalur belajar ${info.name}`}
      className={`relative group transition-all duration-500 p-6 rounded-2xl border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        isSoon 
          ? 'border-slate-800/50 bg-slate-900/30 cursor-not-allowed opacity-60 grayscale' 
          : isActive 
            ? 'border-indigo-500 bg-slate-800 shadow-lg shadow-indigo-500/20 translate-y-[-4px] cursor-pointer' 
            : 'border-slate-700 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-800 cursor-pointer'
      }`}
    >
      {isSoon && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-white/10 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Coming Soon
          </span>
        </div>
      )}

      <div className={`absolute top-4 right-4 text-4xl opacity-50 transition-opacity ${!isSoon && 'group-hover:opacity-100'}`} aria-hidden="true">
        {info.icon}
      </div>
      
      <div className={`w-12 h-12 rounded-lg ${info.color} flex items-center justify-center mb-4 shadow-inner relative overflow-hidden`} aria-hidden="true">
        <span className="text-2xl font-bold text-white z-10">{info.name[0]}</span>
        {isSoon && <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]"></div>}
      </div>

      <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
        {info.name}
        {isSoon && <span className="text-[10px] text-slate-600 font-mono">#soon</span>}
      </h3>
      
      <p className={`text-sm font-medium mb-3 ${isSoon ? 'text-slate-600' : info.accent}`}>{info.tagline}</p>
      
      <p className="text-slate-400 text-sm leading-relaxed mb-4">
        {info.description}
      </p>

      {!isSoon ? (
        <div className="flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300" aria-hidden="true">
          LEARN MORE
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      ) : (
        <div className="flex items-center text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          Lab Locked
        </div>
      )}

      {/* Premium Tooltip */}
      <div className="premium-tooltip top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-4">
        {isSoon ? `Blueprint ${info.name} Terkunci` : `Pelajari Arsitektur ${info.name}`}
      </div>
    </div>
  );
};
