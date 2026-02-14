import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageType } from '../types';
import { FloatingHeader } from '../components/landing/FloatingHeader';
import { HeroSection } from '../components/landing/HeroSection';
import { ParadigmSection } from '../components/landing/ParadigmSection';
import { PathwaySection } from '../components/landing/PathwaySection';
import { Footer } from '../components/landing/Footer';

const CareerVisionSection: React.FC = () => {
  return (
    <section className="py-40 px-8 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-rose-500 font-black text-[10px] uppercase tracking-[0.4em]">Career Re-Definition</span>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                Bukan Sekadar <br />
                <span className="text-slate-800">Website Builder.</span>
              </h2>
            </div>
            
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Miskonsepsi terbesar adalah menganggap "Web Developer" hanya membuat situs. Web adalah <strong className="text-white">Runtime Lingkungan Global</strong> yang paling masif di planet ini.
            </p>

            <div className="space-y-8">
              {[
                { 
                  title: "Infrastructure Engineer", 
                  desc: "Membangun core browser, networking stack, dan CDN menggunakan Rust/Zig.",
                  icon: "🏗️"
                },
                { 
                  title: "Distributed Systems Architect", 
                  desc: "Merancang sistem yang tidak pernah mati dengan Elixir/OTP untuk jutaan pengguna.",
                  icon: "🌐"
                },
                { 
                  title: "High-Performance WASM Expert", 
                  desc: "Membawa performa desktop/native ke browser melalui WebAssembly.",
                  icon: "🚀"
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:bg-indigo-600/20 group-hover:border-indigo-500/50 transition-all">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    <p className="text-slate-500 text-sm font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-indigo-600/10 blur-[100px] rounded-full"></div>
            <div className="relative p-12 bg-slate-900/40 border border-white/5 rounded-[4rem] space-y-8 backdrop-blur-3xl">
               <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Industry Reality Check</span>
               </div>
               <div className="space-y-6">
                  <div className="p-6 bg-slate-950/50 rounded-3xl border border-white/5">
                     <p className="text-xs text-slate-400 font-mono leading-relaxed">
                       "Dunia membutuhkan orang yang bisa membangun <span className="text-white font-bold">Teknologi Web</span>, bukan hanya yang bisa memakai alat yang sudah ada. Zig, Rust, dan Elixir adalah kunci untuk menjadi <span className="text-indigo-400">Literate Web Architect</span>."
                     </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-6 bg-indigo-600/5 border border-indigo-500/10 rounded-3xl">
                        <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest block mb-2">Peluang Kerja</span>
                        <p className="text-xl font-black text-white">$150k+</p>
                        <p className="text-[10px] text-slate-600 uppercase mt-1">Avg Lead System Architect</p>
                     </div>
                     <div className="p-6 bg-emerald-600/5 border border-emerald-500/10 rounded-3xl">
                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest block mb-2">Skalabilitas</span>
                        <p className="text-xl font-black text-white">Infinite</p>
                        <p className="text-[10px] text-slate-600 uppercase mt-1">Global Infra Demand</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
  const { pathname } = useLocation();

  const heroTexts = [
    { title: "Bukan Mengganti,", subtitle: "Mendefinisikan Ulang." },
    { title: "Evolusi Kode,", subtitle: "Arsitektur Spasial." },
    { title: "Presisi Runtime,", subtitle: "Efisiensi Tanpa Batas." }
  ];

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

  useEffect(() => {
    // Handle Direct Hash / Path navigation for Pricing
    if (pathname === '/pricing') {
      // Delay slightly to ensure component is fully rendered
      setTimeout(() => scrollTo('pricing'), 100);
    }
  }, [pathname]);

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

      <CareerVisionSection />

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