
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroText {
  title: string;
  subtitle: string;
}

interface HeroSectionProps {
  heroTexts: HeroText[];
  heroTextIdx: number;
  scrollTo: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroTexts, heroTextIdx, scrollTo }) => {
  const navigate = useNavigate();

  return (
    <section id="visi" className="relative min-h-screen pt-32 pb-20 px-8 flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[150px] -z-10 rounded-full"></div>
      
      <div className="max-w-6xl w-full space-y-12 md:space-y-16 relative z-10">
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-indigo-500/50"></div>
          <span className="inline-block px-4 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[9px] font-black tracking-[0.6em] uppercase text-indigo-400">
            Future Systems Architect
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-indigo-500/50"></div>
        </div>
        
        <div className="relative w-full h-[240px] md:h-[380px] flex items-center justify-center">
          {heroTexts.map((text, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 flex flex-col justify-center transition-all duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] ${
                idx === heroTextIdx 
                  ? 'opacity-100 scale-100 blur-0 pointer-events-auto' 
                  : 'opacity-0 scale-105 blur-2xl pointer-events-none'
              }`}
            >
              <h1 className="text-5xl md:text-[8.5rem] font-black tracking-tighter leading-[0.8] text-white">
                <span className={`block transition-all duration-[1500ms] delay-100 transform ${idx === heroTextIdx ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-12 opacity-0 blur-lg'}`}>
                  {text.title}
                </span>
                <span className={`italic font-serif text-indigo-500/90 font-normal block mt-4 md:mt-8 text-4xl md:text-[6.5rem] transition-all duration-[1500ms] delay-[400ms] transform ${idx === heroTextIdx ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-16 opacity-0 blur-lg'}`}>
                  {text.subtitle}
                </span>
              </h1>
            </div>
          ))}
        </div>

        <div className={`transition-all duration-1000 delay-[600ms] transform ${heroTextIdx % 2 === 0 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'}`}>
          <p className="text-base md:text-xl text-slate-500 leading-relaxed font-light max-w-2xl mx-auto">
            Membedah arsitektur di balik Zig, Elixir, dan Rust untuk membangun pondasi komputasi yang presisi, terukur, dan tak lekang oleh zaman.
          </p>
        </div>

        <div className="pt-8 flex flex-wrap justify-center gap-6">
          <div className="relative group">
            <button 
              onClick={() => scrollTo('lab')}
              className="relative px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/30"
            >
              <span className="relative z-10">Mulai Eksplorasi</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <div className="premium-tooltip">Jelajahi Kurikulum Masteri</div>
          </div>
          
          <div className="relative group">
            <button 
              onClick={() => navigate('/setup')}
              className="px-12 py-5 bg-slate-900 border border-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-3 border-white/5"
            >
              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              Setup Workspace
            </button>
            <div className="premium-tooltip">Konfigurasi Nix & IDE</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 cursor-pointer" onClick={() => scrollTo('paradigma')}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7m14-8l-7 7-7-7"/></svg>
      </div>
    </section>
  );
};
