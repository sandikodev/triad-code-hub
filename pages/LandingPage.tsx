
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageType } from '../types';
import { LANGUAGES } from '../constants';
import { LanguageCard } from '../components/LanguageCard';
import { Roadmap } from '../components/Roadmap';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeRoadmap, setActiveRoadmap] = useState<LanguageType>(LanguageType.ZIG);
  const [heroTextIdx, setHeroTextIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const heroTexts = [
    { title: "Bukan Mengganti,", subtitle: "Mendefinisikan Ulang." },
    { title: "Evolusi Kode,", subtitle: "Arsitektur Spasial." },
    { title: "Presisi Runtime,", subtitle: "Efisiensi Tanpa Batas." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTextIdx((prev) => (prev + 1) % heroTexts.length);
    }, 5000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="animate-fadeIn selection:bg-indigo-500/30 bg-slate-950">
      {/* Floating Header */}
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
                onClick={() => scrollTo(item.id)} 
                className="relative text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-[0.2em] transition-colors group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
            <div className="relative group">
              <button 
                onClick={() => navigate('/setup')}
                className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-[0.2em] transition-all hover:tracking-[0.3em]"
              >
                Setup Env
              </button>
              <div className="premium-tooltip bottom-full left-1/2 -translate-x-1/2 mb-4">Konfigurasi Dev Environment Lokal</div>
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
              <div className="premium-tooltip top-full left-1/2 -translate-x-1/2 mt-4">Buka Lab Interaktif Sekarang</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
          
          {/* Enhanced Text Animation Container with Stable Height */}
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
              <div className="premium-tooltip top-full left-1/2 -translate-x-1/2 mt-4">Jelajahi Kurikulum Masteri</div>
            </div>
            
            <div className="relative group">
              <button 
                onClick={() => navigate('/setup')}
                className="px-12 py-5 bg-slate-900 border border-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-3 border-white/5"
              >
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                Setup Workspace
              </button>
              <div className="premium-tooltip top-full left-1/2 -translate-x-1/2 mt-4">Konfigurasi Nix & IDE</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 cursor-pointer" onClick={() => scrollTo('paradigma')}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7m14-8l-7 7-7-7"/></svg>
        </div>
      </section>

      {/* Paradigm Section */}
      <section id="paradigma" className="py-20 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { label: "Stability", value: "Memory Safety by Design", desc: "Rust menjamin keamanan tanpa garbage collector melalui model ownership dan borrowing." },
            { label: "Scalability", value: "Lightweight Concurrency", desc: "Elixir memanfaatkan BEAM VM untuk jutaan proses terisolasi yang fault-tolerant." },
            { label: "Precision", value: "No Hidden Control Flow", desc: "Zig memberikan kontrol mutlak atas memori dengan kesederhanaan yang tak tertandingi." }
          ].map((item, i) => (
            <div key={i} className="space-y-4 p-8 bg-slate-900/40 rounded-3xl border border-white/5 hover:border-indigo-500/20 transition-all group">
              <span className="text-indigo-500 font-black text-[9px] uppercase tracking-[0.4em]">{item.label}</span>
              <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors text-left">{item.value}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-left">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pathway Section */}
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
              <div className="relative group">
                <button 
                  onClick={() => navigate(`/lab/${activeRoadmap.toLowerCase()}`)}
                  className="px-8 py-4 bg-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center gap-4 shadow-2xl shadow-indigo-500/20"
                >
                  Eksplorasi di Lab
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="premium-tooltip bottom-full left-1/2 -translate-x-1/2 mb-4">Masuk ke Lab {activeRoadmap}</div>
              </div>
            </div>
            <Roadmap language={activeRoadmap} />
          </div>
        </div>
      </section>

      <footer className="py-24 px-8 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-2xl">T</div>
             <div className="flex flex-col items-start text-left">
               <span className="font-black text-2xl tracking-tighter">TriadHub</span>
               <span className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">Engineering Excellence</span>
             </div>
          </div>
          <div className="flex gap-10 mb-12">
            {['Twitter', 'GitHub', 'Discord', 'Docs'].map(link => (
              <a key={link} href="#" className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors">{link}</a>
            ))}
          </div>
          <p className="text-slate-700 text-[10px] font-medium tracking-widest text-center uppercase">
            Designed for the future of decentralized and spatial systems. <br />
            © 2025 TriadHub Architectural Lab.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
