
import React, { useState, useEffect } from 'react';
import { LanguageType } from '../types';
import { FloatingHeader } from '../components/landing/FloatingHeader';
import { HeroSection } from '../components/landing/HeroSection';
import { ParadigmSection } from '../components/landing/ParadigmSection';
import { PathwaySection } from '../components/landing/PathwaySection';
import { Footer } from '../components/landing/Footer';

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-40 px-8 relative bg-white/[0.01]">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-4">
           <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em]">Investment Plan</span>
           <h2 className="text-5xl font-black text-white tracking-tighter">Choose Your Architect Level.</h2>
           <p className="text-slate-500 text-lg font-light max-w-xl mx-auto">Tentukan kedalaman masteri Anda. Dari pondasi sistem hingga teknologi neural paling canggih.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="p-12 rounded-[3rem] border border-white/5 bg-slate-900/30 space-y-10 group hover:border-white/10 transition-all">
             <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Standard Architect</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed">Pondasi sempurna untuk insinyur sistem modern.</p>
             </div>
             <div className="text-4xl font-black text-white">$0 <span className="text-sm font-light text-slate-600">/ lifetime</span></div>
             <ul className="space-y-4">
               {[
                 "Akses Lab The Triad (Zig, Elixir, Rust)",
                 "Blueprint Senior-level",
                 "AI Mentor (Gemini Flash)",
                 "Community Roadmaps"
               ].map(item => (
                 <li key={item} className="flex items-center gap-3 text-xs text-slate-400">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                    {item}
                 </li>
               ))}
             </ul>
             <button className="w-full py-5 rounded-2xl border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">Mulai Gratis</button>
          </div>

          {/* Pro Tier */}
          <div className="p-12 rounded-[3rem] border border-amber-500/20 bg-amber-500/5 space-y-10 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-2xl shadow-amber-500/5">
             <div className="absolute top-0 right-0 px-6 py-2 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-bl-3xl">Most Advanced</div>
             <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Architect Pro</h4>
                <p className="text-slate-400 text-sm font-light leading-relaxed">Untuk pemimpin teknis yang membangun masa depan.</p>
             </div>
             <div className="text-4xl font-black text-white">$29 <span className="text-sm font-light text-slate-600">/ month</span></div>
             <ul className="space-y-4">
               {[
                 "Semua Akses Bahasa Satelit (Mojo, Carbon, Gleam)",
                 "Exclusive Lead-level Blueprints",
                 "Priority AI Reasoning (Gemini 3 Pro)",
                 "Neural Sync & Private Cloud Provisioning",
                 "Akses BCI & Spatial Compute Modules"
               ].map(item => (
                 <li key={item} className="flex items-center gap-3 text-xs text-slate-300">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                    {item}
                 </li>
               ))}
             </ul>
             <button className="w-full py-5 rounded-2xl bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 active:scale-95">Dapatkan Akses Pro</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const LandingPage: React.FC = () => {
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
      const offset = 80;
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
      <FloatingHeader 
        scrolled={scrolled} 
        activeRoadmap={activeRoadmap} 
        scrollTo={scrollTo} 
      />

      <HeroSection 
        heroTexts={heroTexts} 
        heroTextIdx={heroTextIdx} 
        scrollTo={scrollTo} 
      />

      <ParadigmSection />

      <PathwaySection 
        activeRoadmap={activeRoadmap} 
        setActiveRoadmap={setActiveRoadmap} 
      />

      <PricingSection />

      <Footer />
    </div>
  );
};

export default LandingPage;
