
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

declare var Prism: any;

const SetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeConfig, setActiveConfig] = useState<'wizard' | 'nix' | 'devcontainer' | 'starter'>('wizard');
  const [activeSidebarTab, setActiveSidebarTab] = useState<'files' | 'search' | 'git'>('files');
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Tab state for individual starter cards
  const [starterTabs, setStarterTabs] = useState<Record<string, 'basic' | 'advanced'>>({
    zig: 'basic',
    rust: 'basic',
    elixir: 'basic',
    nim: 'basic'
  });

  // Command Generator State
  const [selLangs, setSelLangs] = useState<string[]>(['zig', 'rust', 'elixir']);
  const [includeTools, setIncludeTools] = useState(true);
  const [targetOS, setTargetOS] = useState<'linux' | 'macos'>('linux');

  // Dynamic Blueprint Contents
  const configs = useMemo(() => ({
    nix: {
      filename: 'flake.nix',
      path: './infra/',
      lang: 'nix',
      content: `{
  description = "Triad Hub Architectural Environment";
  inputs = { nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable"; };
  outputs = { self, nixpkgs }: 
    let pkgs = nixpkgs.legacyPackages.x86_64-linux;
    in {
      devShells.x86_64-linux.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          ${selLangs.join(' ')}
          ${includeTools ? 'erlang-ls rust-analyzer zls nim-lang-server' : ''}
        ];
        shellHook = "echo 'Triad Lab: [${selLangs.join(', ').toUpperCase()}] Ready.'";
      };
    };
}`
    },
    devcontainer: {
      filename: 'devcontainer.json',
      path: './.devcontainer/',
      lang: 'json',
      content: `{
  "name": "Triad Hub Lab",
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    ${selLangs.map(l => `"ghcr.io/devcontainers/features/${l}:1": {}`).join(',\n    ')}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        ${includeTools ? '"ziglang.vscode-zig", "rust-lang.rust-analyzer", "elixir-lsp.elixir-ls"' : '""'}
      ]
    }
  }
}`
    }
  }), [selLangs, includeTools]);

  const starterGuides = useMemo(() => ({
    zig: {
      basic: {
        cmd: "zig init",
        desc: "Initialize a standard Zig executable project.",
        tree: "project/\n├── build.zig\n└── src/\n    └── main.zig"
      },
      advanced: {
        cmd: "zig init-exe && mkdir deps src/c",
        desc: "Template for high-performance systems interacting with C libraries via C-Interop.",
        tree: "project/\n├── build.zig (modified for C)\n├── src/\n│   ├── main.zig\n│   └── c/\n│       ├── bridge.c\n│       └── bridge.h\n└── deps/\n    └── vendor_lib/"
      }
    },
    rust: {
      basic: {
        cmd: "cargo new my_app",
        desc: "Create a new Rust binary package with standard configuration.",
        tree: "my_app/\n├── Cargo.toml\n└── src/\n    └── main.rs"
      },
      advanced: {
        cmd: "cargo new my_workspace --lib && mkdir crates",
        desc: "Multi-crate workspace architecture for large-scale modular systems.",
        tree: "my_workspace/\n├── Cargo.toml (workspace definition)\n├── crates/\n│   ├── core-logic/\n│   │   ├── Cargo.toml\n│   │   └── src/lib.rs\n│   └── cli-tool/\n│       ├── Cargo.toml\n│       └── src/main.rs\n└── README.md"
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
        desc: "Distributed OTP Supervision tree architecture for fault-tolerant systems.",
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
        desc: "Full-stack Nim package with testing suite and benchmarking nodes.",
        tree: "project/\n├── project.nimble\n├── src/\n│   └── project.nim\n├── tests/\n│   └── t_core.nim\n├── bench/\n│   └── bench_logic.nim\n└── docs/"
      }
    }
  }), []);

  const generatedCommand = useMemo(() => {
    const langFlags = selLangs.map(l => `--${l}`).join(' ');
    const toolFlag = includeTools ? '--with-tools' : '';
    const osFlag = `--os ${targetOS}`;
    return `curl -fsSL https://triad-hub.io/provision | bash -s -- ${langFlags} ${toolFlag} ${osFlag}`;
  }, [selLangs, includeTools, targetOS]);

  useEffect(() => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }, [activeConfig, configs]);

  const showToastMessage = (msg: string) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToastMessage('Copied to clipboard');
  };

  const toggleLang = (lang: string) => {
    setSelLangs(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  };

  const setStarterCardTab = (lang: string, tab: 'basic' | 'advanced') => {
    setStarterTabs(prev => ({ ...prev, [lang]: tab }));
  };

  const renderCodeWithLineNumbers = (code: string, lang: string) => {
    const lines = code.trim().split('\n');
    return (
      <div className="flex font-mono text-[11px] md:text-xs leading-[2.2] group selection:bg-indigo-500/40">
        <div className="flex flex-col text-right pr-4 mr-8 border-r border-white/5 text-slate-700 select-none min-w-[3.5rem] bg-slate-950/20">
          {lines.map((_, i) => (
            <span key={i} className="group-hover:text-slate-500 transition-colors">
              {String(i + 1).padStart(2, '0')}
            </span>
          ))}
        </div>
        <pre className={`language-${lang} !p-0 !m-0 !bg-transparent overflow-visible flex-1`}>
          <code className={`language-${lang} code-font block`}>
            {code.trim()}
          </code>
        </pre>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-20 px-4 md:px-8 animate-fadeIn selection:bg-indigo-500/30 overflow-x-hidden relative">
      {/* Toast Notification */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl transition-all duration-500 flex items-center gap-3 ${toast.show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
        {toast.message}
      </div>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[180px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <nav className="mb-10 flex items-center gap-4">
          <div className="relative group">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 hover:text-white transition-all group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              Triad Hub
            </button>
            <div className="premium-tooltip top-full left-0 mt-2">Kembali ke Dashboard</div>
          </div>
          <div className="w-1 h-1 bg-slate-800 rounded-full" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.25em]">Lab Initialization</span>
        </nav>

        <header className="mb-14 grid lg:grid-cols-2 gap-10 items-end">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-indigo-400 font-black text-[9px] uppercase tracking-[0.3em]">Infrastructure Automations</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85]">
              Provisioning <br />
              <span className="text-slate-800">Blueprints.</span>
            </h1>
          </div>
          <p className="text-slate-400 text-lg font-light leading-relaxed max-w-xl">
            Simulator IDE interaktif untuk membangun infrastruktur deterministik Zig, Rust, dan Elixir melalui ekosistem Nix.
          </p>
        </header>

        {/* FULL FEATURED IDE SIMULATOR */}
        <div className="grid lg:grid-cols-12 gap-6 mb-12">
          {/* Main IDE Body */}
          <div className="lg:col-span-9 bg-[#070c1b]/80 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[900px]">
            
            {/* Activity Bar */}
            <aside className="w-16 bg-[#040712] border-r border-white/5 flex flex-col items-center py-8 gap-8 shrink-0 hidden md:flex">
              <div className="relative group">
                <button onClick={() => setActiveSidebarTab('files')} className={`p-3.5 rounded-2xl transition-all ${activeSidebarTab === 'files' ? 'text-indigo-400 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'text-slate-600 hover:text-slate-400'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                </button>
                <div className="premium-tooltip left-full ml-4">Explorer</div>
              </div>
              <div className="relative group">
                <button onClick={() => setActiveSidebarTab('search')} className={`p-3.5 rounded-2xl transition-all ${activeSidebarTab === 'search' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-600 hover:text-slate-400'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>
                <div className="premium-tooltip left-full ml-4">Pencarian</div>
              </div>
              <div className="relative group">
                <button onClick={() => setActiveSidebarTab('git')} className={`p-3.5 rounded-2xl transition-all ${activeSidebarTab === 'git' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-600 hover:text-slate-400'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h2m2-14h2a2 2 0 012 2v3m0-10V3m0 4h.01"/></svg>
                </button>
                <div className="premium-tooltip left-full ml-4">Source Control</div>
              </div>
            </aside>

            {/* Sidebar Explorer */}
            <aside className="w-64 border-r border-white/5 bg-[#060a16] hidden md:flex flex-col">
              <div className="px-6 py-5 flex items-center justify-between border-b border-white/5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Workspace Explorer</span>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pt-4">
                <div className="px-6 py-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest bg-white/5">triad-hub</div>
                <div className="ml-8 mt-4 space-y-0.5">
                  <div className="relative group">
                    <button onClick={() => setActiveConfig('wizard')} className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-l-xl transition-all text-left ${activeConfig === 'wizard' ? 'bg-indigo-500/10 text-indigo-400 border-r-2 border-indigo-500' : 'text-slate-600 hover:bg-white/5 hover:text-slate-400'}`}>
                      <span className="text-xs font-mono">setup_wizard.exe</span>
                    </button>
                    <div className="premium-tooltip left-full ml-4">Generator Konfigurasi Utama</div>
                  </div>
                  <div className="relative group">
                    <button onClick={() => setActiveConfig('starter')} className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-l-xl transition-all text-left ${activeConfig === 'starter' ? 'bg-indigo-500/10 text-indigo-400 border-r-2 border-indigo-500' : 'text-slate-600 hover:bg-white/5 hover:text-slate-400'}`}>
                      <span className="text-xs font-mono">STARTER_GUIDE.md</span>
                    </button>
                    <div className="premium-tooltip left-full ml-4">Panduan Inisialisasi Proyek</div>
                  </div>
                  <div className="relative group">
                    <button onClick={() => setActiveConfig('nix')} className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-l-xl transition-all text-left ${activeConfig === 'nix' ? 'bg-indigo-500/10 text-indigo-400 border-r-2 border-indigo-500' : 'text-slate-600 hover:bg-white/5 hover:text-slate-400'}`}>
                      <span className="text-xs font-mono">flake.nix</span>
                    </button>
                    <div className="premium-tooltip left-full ml-4">Definisi Toolchain Deterministik</div>
                  </div>
                  <div className="relative group">
                    <button onClick={() => setActiveConfig('devcontainer')} className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-l-xl transition-all text-left ${activeConfig === 'devcontainer' ? 'bg-indigo-500/10 text-indigo-400 border-r-2 border-indigo-500' : 'text-slate-600 hover:bg-white/5 hover:text-slate-400'}`}>
                      <span className="text-xs font-mono">devcontainer.json</span>
                    </button>
                    <div className="premium-tooltip left-full ml-4">Konfigurasi VS Code Containers</div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#070c1b]">
              {/* Tab Bar */}
              <div className="h-11 bg-[#050814] flex items-center px-2 overflow-x-auto no-scrollbar border-b border-white/5">
                <button onClick={() => setActiveConfig('wizard')} className={`flex items-center gap-3 px-6 h-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeConfig === 'wizard' ? 'bg-[#070c1b] text-white shadow-[0_-2px_0_0_#6366f1_inset]' : 'text-slate-600 hover:bg-white/5'}`}>🪄 Wizard</button>
                <button onClick={() => setActiveConfig('starter')} className={`flex items-center gap-3 px-6 h-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeConfig === 'starter' ? 'bg-[#070c1b] text-white shadow-[0_-2px_0_0_#6366f1_inset]' : 'text-slate-600 hover:bg-white/5'}`}>Starter Guide</button>
                <button onClick={() => setActiveConfig('nix')} className={`flex items-center gap-3 px-6 h-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeConfig === 'nix' ? 'bg-[#070c1b] text-white shadow-[0_-2px_0_0_#6366f1_inset]' : 'text-slate-600 hover:bg-white/5'}`}>flake.nix</button>
                <button onClick={() => setActiveConfig('devcontainer')} className={`flex items-center gap-3 px-6 h-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeConfig === 'devcontainer' ? 'bg-[#070c1b] text-white shadow-[0_-2px_0_0_#6366f1_inset]' : 'text-slate-600 hover:bg-white/5'}`}>devcontainer.json</button>
              </div>

              {/* Main Workspace Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                {activeConfig === 'wizard' ? (
                  <div className="p-10 md:p-14 space-y-12 animate-fadeIn">
                    <div className="flex flex-col lg:flex-row justify-between gap-10">
                      <div className="max-w-md space-y-4">
                        <h2 className="text-4xl font-black text-white leading-tight">Provisioning <br /><span className="text-indigo-500">Wizard.</span></h2>
                        <p className="text-slate-500 text-sm leading-relaxed">Pilih runtime yang akan diinjeksikan ke dalam lingkungan Lab Anda.</p>
                      </div>
                      
                      <div className="flex-1 bg-slate-950/50 border border-white/5 rounded-3xl p-8 space-y-8">
                        <div>
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-4">Architectural Nodes</label>
                          <div className="flex flex-wrap gap-2">
                            {['zig', 'rust', 'elixir', 'nim'].map(l => (
                              <div key={l} className="relative group">
                                <button onClick={() => toggleLang(l)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selLangs.includes(l) ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-900 border-white/5 text-slate-500 hover:border-white/20'}`}>{l}</button>
                                <div className="premium-tooltip top-full left-1/2 -translate-x-1/2 mt-2">Aktifkan {l.toUpperCase()} Runtime</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div>
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-4">System OS</label>
                            <div className="flex bg-slate-900 p-1 rounded-xl border border-white/5">
                              <div className="relative group">
                                <button onClick={() => setTargetOS('linux')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${targetOS === 'linux' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Linux</button>
                                <div className="premium-tooltip bottom-full left-1/2 -translate-x-1/2 mb-2">Build untuk Linux</div>
                              </div>
                              <div className="relative group">
                                <button onClick={() => setTargetOS('macos')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${targetOS === 'macos' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>macOS</button>
                                <div className="premium-tooltip bottom-full left-1/2 -translate-x-1/2 mb-2">Build untuk macOS</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-4">LSP Tooling</label>
                            <div className="relative group">
                              <button onClick={() => setIncludeTools(!includeTools)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${includeTools ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400' : 'bg-slate-900 border-white/5 text-slate-500'}`}>{includeTools ? 'Active' : 'Inactive'}</button>
                              <div className="premium-tooltip bottom-full left-1/2 -translate-x-1/2 mb-2">Language Server Protocol</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#050814] border border-white/5 rounded-[2.5rem] p-10 relative group overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] pointer-events-none" />
                       <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-6 block">Generated Provisioning Command</span>
                       <code className="block font-mono text-sm md:text-base text-slate-300 break-all leading-loose mb-10 pr-12">
                          {generatedCommand}
                       </code>
                       <div className="relative group">
                         <button onClick={() => copyToClipboard(generatedCommand)} className="w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 active:scale-95">
                           Copy curl Command
                         </button>
                         <div className="premium-tooltip top-full left-1/2 -translate-x-1/2 mt-4">Salin perintah inisialisasi otomatis</div>
                       </div>
                    </div>
                  </div>
                ) : activeConfig === 'starter' ? (
                  <div className="p-10 md:p-14 space-y-12 animate-fadeIn flex-1">
                     <div className="flex flex-col gap-6">
                        <span className="text-indigo-500 font-black text-[10px] uppercase tracking-[0.4em]">Project Initialization Guide</span>
                        <h2 className="text-4xl font-black text-white">Project <span className="text-slate-700">Starters.</span></h2>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">Setelah environment Nix Anda aktif, gunakan perintah berikut untuk memulai proyek baru dengan struktur yang idiomatik.</p>
                     </div>

                     <div className="grid md:grid-cols-2 gap-8">
                        {selLangs.map(lang => {
                          const activeTab = starterTabs[lang] || 'basic';
                          const guide = starterGuides[lang as keyof typeof starterGuides][activeTab];

                          return (
                            <div key={lang} className="bg-white/5 border border-white/5 rounded-[2rem] p-8 flex flex-col gap-6 hover:border-indigo-500/20 transition-all group/card">
                              <div className="flex items-center justify-between">
                                 <div className="flex flex-col gap-1">
                                    <h4 className="text-xl font-bold text-white uppercase tracking-tighter">{lang}</h4>
                                    <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{activeTab} node</span>
                                 </div>
                                 <div className="flex bg-slate-950 p-1 rounded-lg border border-white/5 shadow-inner">
                                    <button 
                                      onClick={() => setStarterCardTab(lang, 'basic')}
                                      className={`px-3 py-1 rounded-md text-[9px] font-black uppercase transition-all ${activeTab === 'basic' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-400'}`}
                                    >
                                      Basic
                                    </button>
                                    <button 
                                      onClick={() => setStarterCardTab(lang, 'advanced')}
                                      className={`px-3 py-1 rounded-md text-[9px] font-black uppercase transition-all ${activeTab === 'advanced' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-400'}`}
                                    >
                                      Advanced
                                    </button>
                                 </div>
                              </div>
                              
                              <p className="text-xs text-slate-400 leading-relaxed min-h-[40px]">{guide.desc}</p>
                              
                              <div className="space-y-4">
                                 <div>
                                   <div className="flex items-center justify-between mb-2">
                                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Initialization Command</span>
                                      <button onClick={() => copyToClipboard(guide.cmd)} className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest hover:text-white">Copy</button>
                                   </div>
                                   <div className="p-4 bg-slate-950/70 rounded-xl font-mono text-[11px] text-indigo-300 border border-indigo-500/10 overflow-x-auto whitespace-nowrap custom-scrollbar scroll-smooth">
                                      $ {guide.cmd}
                                   </div>
                                 </div>
                                 <div>
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-2">Project Architecture</span>
                                    <div className="bg-slate-900/40 rounded-xl border border-white/5 overflow-hidden shadow-inner">
                                      <pre className="font-mono text-[11px] text-slate-500 p-4 leading-relaxed overflow-x-auto custom-scrollbar scroll-smooth">
                                         {guide.tree}
                                      </pre>
                                    </div>
                                 </div>
                              </div>
                            </div>
                          );
                        })}
                     </div>
                  </div>
                ) : (
                  <div className="flex-1 p-10 custom-scrollbar space-y-12">
                    <div className="animate-fadeIn">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="text-[10px] font-mono text-slate-600">
                          {configs[activeConfig as 'nix' | 'devcontainer'].path}{configs[activeConfig as 'nix' | 'devcontainer'].filename}
                        </div>
                        <div className="relative group">
                          <button onClick={() => copyToClipboard(configs[activeConfig as 'nix' | 'devcontainer'].content)} className="text-[9px] font-black text-indigo-500 uppercase tracking-widest hover:text-white transition-colors">
                            Copy Content
                          </button>
                          <div className="premium-tooltip bottom-full right-0 mb-2">Salin konten blueprint ini</div>
                        </div>
                      </div>
                      {renderCodeWithLineNumbers(configs[activeConfig as 'nix' | 'devcontainer'].content, configs[activeConfig as 'nix' | 'devcontainer'].lang)}
                    </div>

                    {/* Nix Deep Dive Explanation (Specifically for Nix tab) */}
                    {activeConfig === 'nix' && (
                      <div className="mt-20 space-y-10 animate-fadeIn border-t border-white/5 pt-16">
                        <div className="flex flex-col gap-4">
                           <span className="text-indigo-500 font-black text-[10px] uppercase tracking-[0.4em]">Architectural Insight</span>
                           <h3 className="text-3xl font-black text-white">Nix: The Multi-Toolchain Engine</h3>
                           <p className="text-slate-400 text-sm leading-relaxed max-w-2xl font-light">
                             Mengelola Zig, Elixir, dan Rust dalam satu proyek biasanya berujung pada "Dependency Hell". Nix menyelesaikan ini melalui isolasi murni.
                           </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                           <div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-4 hover:border-indigo-500/30 transition-all">
                              <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center">
                                 <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                              </div>
                              <h4 className="text-lg font-bold text-white">Versatile Toolchain Isolation</h4>
                              <p className="text-xs text-slate-500 leading-relaxed font-light">
                                Nix memungkinkan Anda menggunakan versi compiler Zig 0.11 untuk satu proyek dan 0.12 untuk proyek lainnya tanpa konflik. Setiap binari di-hash secara unik dan disimpan dalam immutable store, mencegah "DLL Hell" atau kerusakan runtime sistem global.
                              </p>
                           </div>

                           <div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-4 hover:border-emerald-500/30 transition-all">
                              <div className="w-10 h-10 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                                 <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                              </div>
                              <h4 className="text-lg font-bold text-white">Deterministic CI/CD Pipelines</h4>
                              <p className="text-xs text-slate-500 leading-relaxed font-light">
                                Kontribusi Nix paling besar dalam CI/CD adalah sifatnya yang *reproducible*. Dengan Nix Flakes, lingkungan build di GitHub Actions atau GitLab CI dijamin 100% identik dengan mesin lokal Anda. Tidak ada lagi bug "It works on my machine".
                              </p>
                           </div>
                        </div>

                        <div className="p-8 bg-indigo-600/5 border border-indigo-500/20 rounded-3xl">
                           <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Impact Summary</h4>
                           <div className="flex flex-wrap gap-8">
                              <div className="flex flex-col gap-1">
                                 <span className="text-xl font-black text-white">0%</span>
                                 <span className="text-[9px] text-slate-500 uppercase tracking-widest">Version Drift</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                 <span className="text-xl font-black text-white">100%</span>
                                 <span className="text-[9px] text-slate-500 uppercase tracking-widest">Reproducibility</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                 <span className="text-xl font-black text-white">Instant</span>
                                 <span className="text-[9px] text-slate-500 uppercase tracking-widest">Onboarding</span>
                              </div>
                           </div>
                        </div>

                        {/* Best Practices Subsection (New) */}
                        <div className="mt-16 space-y-8 animate-fadeIn border-t border-white/5 pt-16">
                           <div className="flex flex-col gap-4">
                              <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em]">Best Practices</span>
                              <h3 className="text-3xl font-black text-white">Managing Cross-Project Dependencies</h3>
                              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl font-light">
                                Strategi efektif untuk mengelola dependensi dan konfigurasi di berbagai proyek menggunakan Nix Flakes.
                              </p>
                           </div>

                           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                              {[
                                {
                                  title: "Modular Flake Inputs",
                                  icon: (
                                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>
                                  ),
                                  desc: "Pecah konfigurasi besar menjadi flake kecil yang dapat digunakan kembali untuk konsistensi antar tim."
                                },
                                {
                                  title: "Lockfile Integrity",
                                  icon: (
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                                  ),
                                  desc: "Selalu commit `flake.lock`. Ini adalah satu-satunya sumber kebenaran untuk versi toolchain Anda."
                                },
                                {
                                  title: "Optimized Shell Hooks",
                                  icon: (
                                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                  ),
                                  desc: "Gunakan `shellHook` untuk mengotomatisasi env vars seperti DATABASE_URL atau PATH khusus proyek."
                                },
                                {
                                  title: "Periodic GC",
                                  icon: (
                                    <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                  ),
                                  desc: "Jalankan `nix-collect-garbage` secara berkala untuk membersihkan store path yang tidak terpakai lagi."
                                }
                              ].map((item, i) => (
                                <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-3 hover:bg-white/10 transition-colors">
                                  <div className="p-2 bg-white/5 rounded-lg w-fit">{item.icon}</div>
                                  <h4 className="text-xs font-bold text-white uppercase tracking-tight">{item.title}</h4>
                                  <p className="text-[10px] text-slate-500 leading-relaxed font-light">{item.desc}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Terminal Emulator (RESTORED) */}
              <div className="h-56 bg-[#04060e] border-t border-white/5 p-6 font-mono text-xs overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3 mb-4 opacity-50">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest">Triad-Terminal-V3</span>
                </div>
                <div className="space-y-1.5">
                  <div className="text-emerald-500/80">➜  triad-hub git:(main) <span className="text-white">ls -la</span></div>
                  <div className="text-slate-600">drwxr-xr-x  10 triad staff  320 Feb 24 14:00 .</div>
                  <div className="text-slate-600">drwxr-xr-x   3 triad staff   96 Feb 24 14:00 .devcontainer</div>
                  <div className="text-slate-600">-rw-r--r--   1 triad staff  480 Feb 24 14:00 flake.nix</div>
                  <div className="text-emerald-500/80 mt-2">➜  triad-hub git:(main) <span className="text-white"># Waiting for your provisioning command...</span></div>
                </div>
              </div>

              {/* Status Bar (RESTORED) */}
              <div className="h-7 bg-indigo-700 flex items-center px-4 justify-between select-none">
                <div className="flex items-center gap-5">
                   <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Environment System v2.1</span>
                   <span className="text-[9px] text-white/50 tracking-widest hidden md:inline">SYNC: {activeConfig.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">LSP: {includeTools ? 'READY' : 'OFF'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Contextual Information (RESTORED) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-indigo-950/40 to-slate-950 border border-white/5 rounded-[2.5rem] p-8 group hover:border-indigo-500/30 transition-all shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px]"></div>
              <h3 className="text-2xl font-black text-white mb-3">Cloud Lab.</h3>
              <p className="text-slate-500 text-[11px] font-light leading-relaxed mb-8">Lompati konfigurasi lokal. Mulai laboratorium dalam cloud dalam 60 detik.</p>
              <div className="relative group">
                <a href="https://github.com/codespaces/new?repo=triad-hub/architecture-lab" target="_blank" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-indigo-500 shadow-xl shadow-indigo-600/20">
                  Spin up Lab
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>
                <div className="premium-tooltip bottom-full left-1/2 -translate-x-1/2 mb-4">Mulai di GitHub Codespaces</div>
              </div>
            </div>

            <div className="bg-slate-900/30 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-8 shadow-inner">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Deployment Pipeline</span>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Structure Init", text: "Create local laboratory folder structure" },
                  { step: "02", title: "Logic Injection", text: "Inject configuration logic into target files" },
                  { step: "03", title: "Shell Start", text: "Execute shell initialization command" },
                  { step: "04", title: "Stability Check", text: "Verify architectural toolchain stability" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <span className="text-[10px] font-black text-indigo-500/80 bg-indigo-500/5 px-2 py-0.5 rounded-md mt-0.5 border border-indigo-500/20">{item.step}</span>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">{item.title}</p>
                      <p className="text-[9px] text-slate-600 leading-relaxed font-light">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Specs Bottom Grid (RESTORED) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Architecture Engine", value: "Nix unstable-25.01" },
            { label: "Container Runtime", value: "Docker / Podman" },
            { label: "Runtimes Injected", value: selLangs.join(' + ').toUpperCase() },
            { label: "Deployment Method", value: "curl / Bash Pipe" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#050814] border border-white/5 rounded-3xl p-6 flex flex-col gap-1.5 hover:border-indigo-500/20 transition-colors shadow-lg group">
              <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] group-hover:text-indigo-500 transition-colors">{stat.label}</span>
              <span className="text-xs font-bold text-slate-300 tracking-tight">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.3); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        pre[class*="language-"] { background: transparent !important; border: none !important; margin: 0 !important; padding: 0 !important; }
      `}</style>
    </div>
  );
};

export default SetupPage;
