
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageType } from '../../types';

interface FloatingHeaderProps {
  scrolled: boolean;
  activeRoadmap: LanguageType;
  scrollTo: (id: string) => void;
}

export const FloatingHeader: React.FC<FloatingHeaderProps> = ({ scrolled, activeRoadmap, scrollTo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleNavClick = (id: string) => {
    if (isHome) {
      scrollTo(id);
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out px-4 md:px-12 py-6 ${
      scrolled ? 'translate-y-2' : 'translate-y-0'
    }`}>
      <div className={`mx-auto max-w-7xl flex items-center justify-between px-8 py-3 rounded-2xl border transition-all duration-700 ${
        scrolled 
          ? 'bg-slate-950/60 border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="relative">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-sm shadow-lg shadow-indigo-500/20 transform group-hover:rotate-12 transition-transform duration-500">T</div>
            <div className="absolute -inset-1 bg-indigo-500/20 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-black text-lg tracking-tighter leading-none">TriadHub</span>
            <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-[0.3em] leading-none mt-1 text-left">Architecture Lab</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
          {[
            { label: 'Visi', id: 'visi' },
            { label: 'Paradigma', id: 'paradigma' },
            { label: 'Lab', id: 'lab' }
          ].map((item) => (
            <button 
              key={item.label}
              onClick={() => handleNavClick(item.id)} 
              className="relative text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-[0.2em] transition-colors group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
          
          <div className="relative group">
            <button 
              onClick={() => navigate('/blueprints')}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${location.pathname === '/blueprints' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
            >
              Blueprints
            </button>
            <div className="premium-tooltip">Katalog Arsitektur Sistem</div>
          </div>

          <div className="relative group">
            <button 
              onClick={() => navigate('/setup')}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${location.pathname === '/setup' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
            >
              Setup Env
            </button>
            <div className="premium-tooltip">Konfigurasi Dev Environment Lokal</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <button 
              onClick={() => navigate(`/lab/${activeRoadmap.toLowerCase()}`)}
              className="px-6 py-2.5 rounded-xl bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl active:scale-95"
            >
              Akses Lab
            </button>
            <div className="premium-tooltip">Buka Lab Interaktif Sekarang</div>
          </div>
        </div>
      </div>
    </nav>
  );
};