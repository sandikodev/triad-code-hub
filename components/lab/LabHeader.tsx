import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageType } from '../../types';
import { WorkspaceSwitcher } from './header/WorkspaceSwitcher';
import { AIStatusIndicator } from './header/AIStatusIndicator';

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
            data-tooltip="Keluar dari Lab"
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="h-6 w-[1px] bg-slate-800" aria-hidden="true"></div>
        
        <WorkspaceSwitcher currentLang={currentLang} handleLangChange={handleLangChange} />
      </div>

      <AIStatusIndicator />
    </header>
  );
};