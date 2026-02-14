
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Modular Views
import { IdentityView } from '../components/setup/views/IdentityView';
import { WizardView } from '../components/setup/views/WizardView';
import { StarterView } from '../components/setup/views/StarterView';
import { CodeEditorView } from '../components/setup/views/CodeEditorView';

// Modular UI Components
import { ActivityBar } from '../components/setup/ActivityBar';
import { Explorer } from '../components/setup/Explorer';
import { TabBar } from '../components/setup/TabBar';
import { TerminalPanel } from '../components/setup/TerminalPanel';
import { StatusBar } from '../components/setup/StatusBar';

declare var Prism: any;

export type ConfigType = 'wizard' | 'nix' | 'devcontainer' | 'starter' | 'identity';

const SetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, hasCustomKey, loginWithGithub, logout, openKeyManager } = useAuth();
  
  const [activeConfig, setActiveConfig] = useState<ConfigType>('wizard');
  const [activeSidebarTab, setActiveSidebarTab] = useState<'files' | 'search' | 'git'>('files');
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

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

  const generatedCommand = useMemo(() => {
    const langFlags = selLangs.map(l => `--${l}`).join(' ');
    const toolFlag = includeTools ? '--with-tools' : '';
    const osFlag = `--os ${targetOS}`;
    return `curl -fsSL https://triad-hub.io/provision | bash -s -- ${langFlags} ${toolFlag} ${osFlag}`;
  }, [selLangs, includeTools, targetOS]);

  const addTerminalLog = useCallback((msg: string) => {
    setTerminalLogs(prev => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  }, []);

  useEffect(() => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }, [activeConfig, configs]);

  useEffect(() => {
    addTerminalLog(`Provisioning engine re-calibrated for: ${selLangs.join(', ').toUpperCase()}`);
  }, [selLangs, includeTools, targetOS, addTerminalLog]);

  const showToastMessage = (msg: string) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToastMessage('Copied to clipboard');
    addTerminalLog("Blueprint string exported to system clipboard.");
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-20 px-4 md:px-8 animate-fadeIn selection:bg-indigo-500/30 overflow-x-hidden relative">
      {/* Dynamic Background Grid */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[200px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <nav className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 hover:text-white transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
                Triad Hub
              </button>
            </div>
            <div className="w-1 h-1 bg-slate-800 rounded-full" />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.25em]">Provisioning Lab</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Nodes Active</span>
             </div>
          </div>
        </nav>

        <header className="mb-14 grid lg:grid-cols-2 gap-10 items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
              <span className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em]">Protocol V3.4.1</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.8]">
              Virtual <br />
              <span className="text-slate-800">Lab Space.</span>
            </h1>
          </div>
          <p className="text-slate-500 text-xl font-light leading-relaxed max-w-xl">
            Lingkungan tervirtualisasi untuk merancang infrastruktur berbasis Nix dan DevContainer dengan presisi tinggi.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-6 mb-12">
          {/* Main IDE Body */}
          <div className="lg:col-span-9 bg-[#070c1b]/60 backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[950px] transition-all hover:border-white/10">
            
            <ActivityBar activeSidebarTab={activeSidebarTab} setActiveSidebarTab={setActiveSidebarTab} />
            
            <Explorer activeConfig={activeConfig} setActiveConfig={setActiveConfig} />

            <div className="flex-1 flex flex-col min-w-0 bg-[#070c1b]/40">
              <TabBar activeConfig={activeConfig} setActiveConfig={setActiveConfig} />

              <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col relative">
                {activeConfig === 'identity' ? (
                  <IdentityView 
                    user={user} 
                    isAuthenticated={isAuthenticated} 
                    hasCustomKey={hasCustomKey} 
                    loginWithGithub={loginWithGithub} 
                    logout={logout} 
                    openKeyManager={openKeyManager} 
                  />
                ) : activeConfig === 'wizard' ? (
                  <WizardView 
                    selLangs={selLangs} 
                    setSelLangs={setSelLangs} 
                    targetOS={targetOS} 
                    setTargetOS={setTargetOS} 
                    includeTools={includeTools} 
                    setIncludeTools={setIncludeTools} 
                    generatedCommand={generatedCommand} 
                    copyToClipboard={copyToClipboard} 
                  />
                ) : activeConfig === 'starter' ? (
                  <StarterView 
                    selLangs={selLangs} 
                    copyToClipboard={copyToClipboard} 
                  />
                ) : (
                  <CodeEditorView 
                    activeConfig={activeConfig} 
                    configs={configs} 
                    copyToClipboard={copyToClipboard} 
                  />
                )}
              </div>

              <TerminalPanel isAuthenticated={isAuthenticated} user={user} logs={terminalLogs} />

              <StatusBar activeConfig={activeConfig} hasCustomKey={hasCustomKey} user={user} isAuthenticated={isAuthenticated} />
            </div>
          </div>

          {/* Right Panel: Side Modules */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 flex flex-col gap-8 shadow-2xl overflow-hidden relative group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full group-hover:bg-indigo-500/20 transition-all"></div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] relative z-10">Neural Identity</span>
              
              <div className="space-y-8 relative z-10">
                {[
                  { step: "01", title: "Global Sync", text: "Persistent configuration across all neural lab nodes." },
                  { step: "02", title: "Pro Logic", text: "Prioritized Gemini-3 reasoning for complex refactoring." },
                  { step: "03", title: "Safe Storage", text: "Encrypted local memory for your private API keys." },
                  { step: "04", title: "History", text: "Track architectural changes across your session." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start group/item">
                    <span className="text-[9px] font-black text-indigo-500/80 bg-indigo-500/10 px-2 py-0.5 rounded-lg border border-indigo-500/20 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all">{item.step}</span>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-300 group-hover/item:text-white transition-colors">{item.title}</p>
                      <p className="text-[9px] text-slate-600 leading-relaxed font-light">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-6 border-t border-white/5">
                 <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex items-center justify-between">
                    <span className="text-[8px] text-indigo-400 font-bold uppercase tracking-widest">Integrity: 100%</span>
                    <div className="flex gap-1">
                       {[1,2,3,4].map(i => <div key={i} className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" style={{animationDelay: `${i*150}ms`}}></div>)}
                    </div>
                 </div>
              </div>
            </div>

            {/* Live Telemetry Panel */}
            <div className="bg-[#0c1226]/80 border border-white/5 rounded-[3rem] p-8 space-y-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Lab Telemetry</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
              <div className="space-y-6">
                 <div className="space-y-3">
                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-500">
                       <span>Logical Compute</span>
                       <span className="text-indigo-400 font-black">2.4 GHz</span>
                    </div>
                    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden p-[1px]">
                       <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[45%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-500">
                       <span>Memory Bridge</span>
                       <span className="text-indigo-400 font-black">Stable</span>
                    </div>
                    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden p-[1px]">
                       <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 w-[78%] rounded-full"></div>
                    </div>
                 </div>
              </div>
              <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
                 <div className="flex items-center justify-between text-[8px] font-mono text-slate-600">
                    <span>Protocol: TLS-1.3</span>
                    <span>Buffer: 1024KB</span>
                 </div>
              </div>
            </div>
            
            <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-[3rem] p-8 transition-all hover:bg-indigo-600/10">
               <h4 className="text-indigo-300 font-bold text-xs mb-3 flex items-center gap-2">
                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                 Encrypted Session
               </h4>
               <p className="text-[10px] text-slate-500 leading-relaxed">Local keys are injected directly into your browser memory. We never store private API credentials on our servers.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.4); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        pre[class*="language-"] { background: transparent !important; border: none !important; margin: 0 !important; padding: 0 !important; }
      `}</style>
    </div>
  );
};

export default SetupPage;
