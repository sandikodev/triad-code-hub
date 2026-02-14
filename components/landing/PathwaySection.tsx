import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageType } from '../../types';
import { LANGUAGES } from '../../constants';
import { LanguageCard } from '../LanguageCard';
import { Roadmap } from '../Roadmap';

interface PathwaySectionProps {
  activeRoadmap: LanguageType;
  setActiveRoadmap: (id: LanguageType) => void;
}

export const PathwaySection: React.FC<PathwaySectionProps> = ({ activeRoadmap, setActiveRoadmap }) => {
  const navigate = useNavigate();

  return (
    <section id="lab" className="py-40 px-8 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="space-y-4">
            <span className="text-indigo-500 font-black text-[10px] uppercase tracking-[0.4em]">Laboratorium Arsitektur</span>
            <h2 className="text-5xl font-black tracking-tighter text-left">Pilih Jalur Masteri</h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm font-light leading-relaxed text-left">
            Setiap bahasa menawarkan paradigma unik. Pilih salah satu untuk mulai membangun blueprint masa depan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {LANGUAGES.map((lang) => (
            <LanguageCard 
              key={lang.id} 
              info={lang} 
              onSelect={(id) => setActiveRoadmap(id as LanguageType)} 
              isActive={activeRoadmap === lang.id}
            />
          ))}
        </div>
        
        <div className="bg-slate-900/20 border border-white/5 rounded-[3rem] p-10 md:p-16 backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-indigo-600/10"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">Curated Path</span>
              </div>
              <h3 className="text-4xl font-bold text-left">Langkah Masteri {activeRoadmap}</h3>
            </div>
            <div className="relative">
              <button 
                onClick={() => navigate(`/lab/${activeRoadmap.toLowerCase()}`)}
                data-tooltip={`Buka Lab Interaktif ${activeRoadmap}`}
                data-tooltip-label="Akses Cepat"
                className="px-8 py-4 bg-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center gap-4 shadow-2xl shadow-indigo-500/20 active:scale-95"
              >
                Eksplorasi di Lab
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <Roadmap language={activeRoadmap} />
        </div>
      </div>
    </section>
  );
};