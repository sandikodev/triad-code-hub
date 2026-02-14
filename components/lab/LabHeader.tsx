
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageType } from '../../types';
import { LANGUAGES } from '../../constants';

interface LabHeaderProps {
  currentLang: LanguageType;
  handleLangChange: (id: LanguageType) => void;
}

export const LabHeader: React.FC<LabHeaderProps> = ({ currentLang, handleLangChange }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <button 
            onClick={() => navigate('/')}
            aria-label="Kembali ke Beranda"
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="premium-tooltip">Keluar dari Lab</div>
        </div>
        <div className="h-6 w-[1px] bg-slate-800" aria-hidden="true"></div>
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
      </div>
      <div className="flex items-center gap-4">
         <div className="relative group">
           <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full cursor-help" role="status" aria-label="Status AI: Aktif">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">AI Link: Active</span>
           </div>
           <div className="premium-tooltip">Koneksi ke Gemini 3 Pro Stabil</div>
         </div>
      </div>
    </header>
  );
};
