
import React, { useState, useEffect } from 'react';
import { FloatingHeader } from '../components/landing/FloatingHeader';
import { Footer } from '../components/landing/Footer';
import { LanguageType } from '../types';

const FuturePage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const layers = [
    {
      title: "Neural Signal Layer",
      subtitle: "Brain-Computer Interface (BCI)",
      description: "Lapisan decoding sinyal biologis mentah menjadi perintah komputasi. Membutuhkan determinisme mutlak dan latency <1ms.",
      tech: ["Mojo", "Julia", "Rust", "CUDA"],
      color: "border-rose-500/50 shadow-rose-500/10"
    },
    {
      title: "Realtime Compute Layer",
      subtitle: "The Engine Room",
      description: "Manajemen memori manual dan sistem aktor terdistribusi untuk sinkronisasi dunia spasial tanpa jitter.",
      tech: ["Zig", "Rust", "Gleam", "Pony"],
      color: "border-amber-500/50 shadow-amber-500/10"
    },
    {
      title: "Spatial Runtime Layer",
      subtitle: "Universal Simulation",
      description: "Rendering universal yang mengonvergensi pipeline GPU antara browser (WebXR) dan native hardware.",
      tech: ["WGSL", "C++", "Carbon", "WGSL"],
      color: "border-indigo-500/50 shadow-indigo-500/10"
    },
    {
      title: "Experience Layer",
      subtitle: "Cognitive Interface",
      description: "UI yang tidak lagi berupa piksel 2D, melainkan simulasi berkelanjutan yang bereaksi terhadap feedback biologis.",
      tech: ["SwiftUI", "RealityKit", "Haskell"],
      color: "border-emerald-500/50 shadow-emerald-500/10"
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen selection:bg-indigo-500/30 overflow-x-hidden">
      <FloatingHeader 
        scrolled={scrolled} 
        activeRoadmap={LanguageType.RUST} 
        scrollTo={() => {}} 
      />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl animate-fadeIn">
            <span className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em]">Strategic Roadmap 2026-2035</span>
          </div>
          <h1 className="text-6xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.8] animate-fadeIn">
            Architecting <br />
            <span className="text-slate-800">The Neural Era.</span>
          </h1>
          <p className="text-slate-500 text-xl font-light leading-relaxed max-w-3xl mx-auto animate-fadeIn" style={{animationDelay: '0.2s'}}>
            Mengapa kita belajar Zig, Elixir, dan Rust hari ini? Karena dunia sedang bergeser dari "Aplikasi" menuju "Simulasi Berkelanjutan" dan "Interaksi Biologis".
          </p>
        </div>
      </section>

      {/* The Layers Section */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white tracking-tight">The Future System Stack</h2>
              <p className="text-slate-500 font-light">Setiap lapisan arsitektur masa depan membutuhkan paradigma bahasa yang berbeda. Hover lapisan untuk melihat detail teknisnya.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              {layers.map((layer, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setActiveLayer(idx)}
                  className={`p-8 rounded-[2rem] border transition-all duration-500 cursor-crosshair group relative overflow-hidden ${
                    activeLayer === idx ? `${layer.color} bg-white/[0.03] scale-[1.02]` : 'border-white/5 bg-transparent opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-1">Layer 0{4-idx}</span>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{layer.title}</h3>
                    </div>
                    <div className="text-[10px] font-mono text-indigo-500 font-bold tracking-tighter">{layer.subtitle}</div>
                  </div>
                  
                  {activeLayer === idx && (
                    <div className="animate-fadeIn mt-6 space-y-6">
                      <p className="text-sm text-slate-400 leading-relaxed font-light">{layer.description}</p>
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {layer.tech.map(t => (
                          <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-slate-300 uppercase tracking-widest">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Visual Visualization (Conceptual Grid) */}
          <div className="hidden lg:flex flex-col items-center justify-center relative min-h-[600px]">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_70%)]"></div>
             <div className="relative w-full aspect-square border border-white/5 rounded-full flex items-center justify-center p-20 animate-spin-slow">
                <div className="w-full h-full border border-indigo-500/20 rounded-full border-dashed"></div>
             </div>
             <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
                <div className="text-center space-y-4 animate-fadeIn">
                   <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] mb-4">Core Philosophy</div>
                   <div className="text-4xl font-black text-white italic font-serif">"Continuous <br/>Simulation"</div>
                   <div className="text-[10px] text-slate-600 font-mono mt-4">REPLACING REQUEST / RESPONSE</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Paradigm Shift Table */}
      <section className="py-40 px-8 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white">The Evolutionary Shift</h2>
            <p className="text-slate-500">Bagaimana peran arsitek sistem berubah di setiap dekade.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { era: "Web Era", tech: "REST / CRUD", model: "Request / Response", icon: "🌐" },
              { era: "Mobile Era", tech: "Apps / Cloud", model: "Event Driven", icon: "📱" },
              { era: "AI Era", tech: "LLM / Agents", model: "Probabilistic", icon: "🤖" },
              { era: "XR Era", tech: "OpenXR / Spacial", model: "Continuous Sim", icon: "🕶️" },
              { era: "BCI Era", tech: "Neural Link", model: "Biological Loops", icon: "🧠" }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-slate-900/40 border border-white/5 rounded-3xl space-y-6 hover:border-indigo-500/30 transition-all group">
                <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                <div>
                   <h4 className="text-white font-bold mb-1">{item.era}</h4>
                   <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">{item.tech}</p>
                </div>
                <div className="pt-4 border-t border-white/5">
                   <span className="text-[9px] text-slate-600 font-mono uppercase">Model:</span>
                   <p className="text-xs text-slate-400 mt-1">{item.model}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion CTA */}
      <section className="py-40 px-8 text-center max-w-4xl mx-auto space-y-12">
        <h2 className="text-5xl font-black text-white tracking-tighter">Ready to become <br/> a Future Architect?</h2>
        <p className="text-slate-500 text-lg font-light leading-relaxed">
          The Triad (Zig, Elixir, Rust) bukan hanya bahasa pemrograman. Mereka adalah alat bertahan hidup untuk membangun sistem yang tidak akan hancur oleh kompleksitas era spasial dan neural.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <button onClick={() => window.location.href='#/blueprints'} className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-95">
            Eksplorasi Blueprints
          </button>
          <button onClick={() => window.location.href='#/lab/rust'} className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all active:scale-95">
            Mulai Belajar
          </button>
        </div>
      </section>

      <Footer />
      <style>{`
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FuturePage;
