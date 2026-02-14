import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageType } from '../../types';
import { Logo } from '../Logo';

interface FloatingHeaderProps {
  scrolled: boolean;
  activeRoadmap: LanguageType;
  scrollTo: (id: string) => void;
}

export const FloatingHeader: React.FC<FloatingHeaderProps> = ({ scrolled, activeRoadmap, scrollTo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/pricing';

  const handleNavClick = (id: string) => {
    if (id === 'pricing') {
      if (isHome) {
        scrollTo('pricing');
      } else {
        navigate('/pricing');
      }
      return;
    }

    if (isHome && id !== 'vision' && id !== 'blueprints' && id !== 'setup') {
      scrollTo(id);
    } else {
      navigate(id === 'vision' ? '/vision' : id === 'blueprints' ? '/blueprints' : id === 'setup' ? '/setup' : '/');
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
          <Logo size="md" />
          <div className="flex flex-col text-left">
            <span className="font-black text-lg tracking-tighter leading-none">TriadHub</span>
            <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-[0.3em] leading-none mt-1 text-left">Architecture Lab</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
          {[
            { label: 'Visi 2030', id: 'vision' },
            { label: 'Blueprints', id: 'blueprints' },
            { label: 'Pricing', id: 'pricing' },
            { label: 'Setup Env', id: 'setup' }
          ].map((item) => (
            <button 
              key={item.label}
              onClick={() => handleNavClick(item.id)} 
              data-tooltip={`Buka ${item.label}`}
              className={`relative text-[10px] font-bold uppercase tracking-[0.2em] transition-all group ${
                (location.pathname.includes(item.id) || (item.id === 'pricing' && location.pathname === '/pricing')) ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-indigo-500 transition-all duration-300 ${ (location.pathname.includes(item.id) || (item.id === 'pricing' && location.pathname === '/pricing')) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <button 
              onClick={() => navigate(`/lab/${activeRoadmap.toLowerCase()}`)}
              data-tooltip="Buka Lab Interaktif Sekarang"
              className="px-6 py-2.5 rounded-xl bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl active:scale-95"
            >
              Akses Lab
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};