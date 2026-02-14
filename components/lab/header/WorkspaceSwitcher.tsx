
import React from 'react';
import { LanguageType } from '../../../types';
import { LANGUAGES } from '../../../constants';

interface WorkspaceSwitcherProps {
  currentLang: LanguageType;
  handleLangChange: (id: LanguageType) => void;
}

export const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({ currentLang, handleLangChange }) => {
  return (
    <nav className="flex items-center gap-3" aria-label="Pemilihan Bahasa Pemrograman">
      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest" id="workspace-label">Workspace:</span>
      <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800" role="group" aria-labelledby="workspace-label">
        {LANGUAGES.map(l => (
          <div key={l.id} className="relative group">
            <button
              onClick={() => handleLangChange(l.id as LanguageType)}
              aria-pressed={currentLang === l.id}
              className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                currentLang === l.id 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {l.name}
            </button>
            <div className="premium-tooltip">Ganti ke {l.name}</div>
          </div>
        ))}
      </div>
    </nav>
  );
};
