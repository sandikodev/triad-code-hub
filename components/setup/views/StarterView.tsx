
import React, { useState } from 'react';

interface StarterViewProps {
  selLangs: string[];
  copyToClipboard: (text: string) => void;
}

export const StarterView: React.FC<StarterViewProps> = ({ selLangs, copyToClipboard }) => {
  const [starterTabs, setStarterTabs] = useState<Record<string, 'basic' | 'advanced'>>({});

  const starterGuides: any = {
    zig: {
      basic: { 
        cmd: "zig init", 
        desc: "Initialize a standard Zig executable project.",
        tree: "project/\n├── build.zig\n└── src/\n    └── main.zig" 
      },
      advanced: { 
        cmd: "zig init-exe && mkdir deps src/c", 
        desc: "Template for high-performance systems with C-Interop.",
        tree: "project/\n├── build.zig (modified for C)\n├── src/\n│   ├── main.zig\n│   └── c/\n│       ├── bridge.c\n│       └── bridge.h\n└── deps/\n    └── vendor_lib/" 
      }
    },
    rust: {
      basic: { 
        cmd: "cargo new my_app", 
        desc: "Create a new Rust binary package.",
        tree: "my_app/\n├── Cargo.toml\n└── src/\n    └── main.rs" 
      },
      advanced: { 
        cmd: "cargo new my_workspace --lib && mkdir crates", 
        desc: "Multi-crate workspace architecture.",
        tree: "my_workspace/\n├── Cargo.toml (workspace)\n├── crates/\n│   ├── core-logic/\n│   │   ├── Cargo.toml\n│   │   └── src/lib.rs\n│   └── cli-tool/\n│       ├── Cargo.toml\n│       └── src/main.rs\n└── README.md" 
      }
    },
    elixir: {
      basic: { 
        cmd: "mix new my_app", 
        desc: "Generate a new Elixir project structure.",
        tree: "my_app/\n├── mix.exs\n├── lib/\n│   └── my_app.ex\n└── test/" 
      },
      advanced: { 
        cmd: "mix new my_dist_app --sup", 
        desc: "Distributed OTP Supervision tree architecture.",
        tree: "my_dist_app/\n├── mix.exs\n├── lib/\n│   ├── my_app/\n│   │   ├── application.ex\n│   │   ├── supervisor.ex\n│   │   └── worker.ex\n│   └── my_app.ex\n└── config/\n    ├── config.exs\n    └── runtime.exs" 
      }
    },
    nim: {
      basic: { 
        cmd: "nimble init", 
        desc: "Initialize a new Nimble package.",
        tree: "project/\n├── project.nimble\n└── src/\n    └── project.nim" 
      },
      advanced: { 
        cmd: "nimble init && mkdir tests docs bench", 
        desc: "Full-stack Nim package with testing suite.",
        tree: "project/\n├── project.nimble\n├── src/\n│   └── project.nim\n├── tests/\n│   └── t_core.nim\n├── bench/\n│   └── bench_logic.nim\n└── docs/" 
      }
    }
  };

  return (
    <div className="animate-fadeIn p-8 flex-1">
       <div className="space-y-8">
         <div className="flex flex-col gap-6">
            <span className="text-indigo-500 font-black text-[10px] uppercase tracking-[0.4em]">Project Initialization</span>
            <h2 className="text-4xl font-black text-white">Project <span className="text-slate-700">Starters.</span></h2>
         </div>
         <div className="grid md:grid-cols-2 gap-8">
            {selLangs.map(lang => {
              if (!starterGuides[lang]) return null;
              const activeTab = starterTabs[lang] || 'basic';
              const guide = starterGuides[lang][activeTab];
              return (
                <div key={lang} className="bg-white/5 border border-white/5 rounded-[2rem] p-8 flex flex-col gap-6 transition-all group/card">
                  <div className="flex items-center justify-between">
                     <div className="flex flex-col gap-1">
                        <h4 className="text-xl font-bold text-white uppercase tracking-tighter">{lang}</h4>
                        <span className="text-[9px] font-black text-indigo-500 uppercase">{activeTab} node</span>
                     </div>
                     <div className="flex bg-slate-950 p-1 rounded-lg border border-white/5">
                        <button onClick={() => setStarterTabs(p => ({...p, [lang]: 'basic'}))} className={`px-3 py-1 rounded-md text-[9px] font-black uppercase ${activeTab === 'basic' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}>Basic</button>
                        <button onClick={() => setStarterTabs(p => ({...p, [lang]: 'advanced'}))} className={`px-3 py-1 rounded-md text-[9px] font-black uppercase ${activeTab === 'advanced' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}>Advanced</button>
                     </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed italic">"{guide.desc}"</p>
                  <div className="relative group/cmd">
                    <div className="p-4 bg-slate-950/70 rounded-xl font-mono text-[11px] text-indigo-300 border border-indigo-500/10 flex justify-between items-center">
                      <span>$ {guide.cmd}</span>
                      <button onClick={() => copyToClipboard(guide.cmd)} className="opacity-0 group-hover/cmd:opacity-100 p-1 hover:text-white transition-all">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                      </button>
                    </div>
                  </div>
                  <pre className="font-mono text-[11px] text-slate-500 p-4 leading-relaxed bg-slate-900/40 rounded-xl overflow-x-auto no-scrollbar">{guide.tree}</pre>
                </div>
              );
            })}
         </div>
       </div>
    </div>
  );
};
