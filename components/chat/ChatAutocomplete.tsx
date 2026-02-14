
import React from 'react';

interface ChatAutocompleteProps {
  filteredSuggestions: string[];
  handleSend: (val: string) => void;
}

export const ChatAutocomplete: React.FC<ChatAutocompleteProps> = ({ filteredSuggestions, handleSend }) => {
  if (filteredSuggestions.length === 0) return null;

  return (
    <div className="absolute bottom-full left-8 right-8 mb-4 bg-[#0c0e1a]/95 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn z-[100]">
      <div className="px-4 py-3 bg-slate-900/50 border-b border-white/5 flex items-center justify-between">
        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">Saran Architectural Link</span>
        <span className="text-[8px] text-slate-600 font-mono">Select to ask</span>
      </div>
      <div className="flex flex-col">
        {filteredSuggestions.map((suggestion, sIdx) => (
          <button
            key={sIdx}
            onClick={() => handleSend(suggestion)}
            className="w-full text-left px-5 py-4 text-xs text-slate-300 hover:text-white hover:bg-indigo-600/10 transition-all border-b border-white/5 last:border-0 group/sugg"
          >
            <span className="flex items-center gap-3">
              <svg className="w-3 h-3 text-indigo-500 group-hover/sugg:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {suggestion}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
