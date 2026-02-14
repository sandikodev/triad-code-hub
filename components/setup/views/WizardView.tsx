
import React from 'react';

interface WizardViewProps {
  selLangs: string[];
  setSelLangs: React.Dispatch<React.SetStateAction<string[]>>;
  targetOS: 'linux' | 'macos';
  setTargetOS: (os: 'linux' | 'macos') => void;
  includeTools: boolean;
  setIncludeTools: (val: boolean) => void;
  generatedCommand: string;
  copyToClipboard: (text: string) => void;
}

export const WizardView: React.FC<WizardViewProps> = ({ 
  selLangs, setSelLangs, targetOS, setTargetOS, includeTools, setIncludeTools, generatedCommand, copyToClipboard 
}) => {
  const toggleLang = (lang: string) => {
    setSelLangs(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  };

  const languages = [
    { id: 'zig', name: 'Zig', tip: 'Low-level precision' },
    { id: 'rust', name: 'Rust', tip: 'Safe systems' },
    { id: 'elixir', name: 'Elixir', tip: 'BEAM Distributed' },
    { id: 'nim', name: 'Nim', tip: 'Pythonic speed' }
  ];

  return (
    <div className="animate-fadeIn p-8 md:p-12 flex flex-col gap-12">
      <div className="flex flex-col xl:flex-row gap-12">
        {/* Left Control Column */}
        <div className="flex-1 space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white leading-none tracking-tighter">Lab <br /><span className="text-indigo-500">Configuration.</span></h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md font-light">Mendefinisikan node runtime dan tooling yang akan diinjeksikan ke dalam lab arsitektural lokal Anda.</p>
          </div>

          <div className="space-y-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-10">
            {/* Lang Selection */}
            <div className="space-y-6">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] block">Select Core Nodes</label>
              <div className="grid grid-cols-2 gap-4">
                {languages.map(l => (
                  <button 
                    key={l.id}
                    onClick={() => toggleLang(l.id)} 
                    className={`p-6 rounded-3xl border transition-all duration-500 text-left group relative overflow-hidden ${
                      selLangs.includes(l.id) 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-2xl shadow-indigo-600/30' 
                        : 'bg-slate-900/50 border-white/5 text-slate-500 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <div className="relative z-10 flex flex-col gap-1">
                      <span className="text-xs font-black uppercase tracking-widest">{l.name}</span>
                      <span className={`text-[9px] font-medium transition-colors ${selLangs.includes(l.id) ? 'text-indigo-200' : 'text-slate-600'}`}>{l.tip}</span>
                    </div>
                    {selLangs.includes(l.id) && (
                      <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Target & Tools */}
            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] block">Target OS</label>
                <div className="flex bg-slate-950 p-1 rounded-2xl border border-white/5">
                  <button onClick={() => setTargetOS('linux')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${targetOS === 'linux' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-600 hover:text-slate-400'}`}>Linux</button>
                  <button onClick={() => setTargetOS('macos')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${targetOS === 'macos' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-600 hover:text-slate-400'}`}>macOS</button>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] block">Tooling Injection</label>
                <button 
                  onClick={() => setIncludeTools(!includeTools)} 
                  className={`w-full py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${
                    includeTools 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-slate-950 border-white/5 text-slate-600'
                  }`}
                >
                  LSP Server: {includeTools ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Column */}
        <div className="w-full xl:w-80 flex flex-col gap-6">
           <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-[2.5rem] p-8 space-y-6">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Deployment Plan</span>
              <div className="space-y-4">
                {selLangs.map(l => (
                  <div key={l} className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">{l} runtime</span>
                        <span className="text-[8px] text-slate-500 font-mono tracking-tighter">stable-latest</span>
                     </div>
                  </div>
                ))}
                {includeTools && (
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                     <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global LSP Injection</span>
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-white/5">
                 <p className="text-[9px] text-slate-600 leading-relaxed font-light italic">"Blueprints generate deterministic Nix environments tailored for {targetOS} targets."</p>
              </div>
           </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-[#050814] border border-white/5 rounded-[3rem] p-10 relative group overflow-hidden shadow-2xl transition-all hover:border-white/10">
         <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 w-full space-y-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-500/10 rounded-lg"><svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Auto-Provisioning Command</span>
              </div>
              <div className="bg-slate-950/80 p-6 rounded-2xl border border-white/5 font-mono text-sm md:text-base text-slate-300 break-all leading-loose shadow-inner group-hover:text-white transition-colors">
                <span className="text-indigo-500/50 mr-3">$</span>{generatedCommand}
              </div>
            </div>
            <button 
              onClick={() => copyToClipboard(generatedCommand)} 
              className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-2xl shadow-indigo-600/30 hover:bg-indigo-500 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
            >
              Copy Blueprint String
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </button>
         </div>
      </div>
    </div>
  );
};
