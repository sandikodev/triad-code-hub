
import React from 'react';

interface QuickActionPillsProps {
  suggestions: string[];
  handleSend: (val: string) => void;
}

export const QuickActionPills: React.FC<QuickActionPillsProps> = ({ suggestions, handleSend }) => {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6 px-2 -mx-2">
      {suggestions.map((suggestion, idx) => (
        <button
          key={idx}
          onClick={() => handleSend(suggestion)}
          className="whitespace-nowrap px-5 py-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-[10px] font-black text-indigo-400/70 hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all uppercase tracking-[0.15em] flex-shrink-0 shadow-sm"
        >
          <span className="flex items-center gap-2">
            <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {suggestion}
          </span>
        </button>
      ))}
    </div>
  );
};
