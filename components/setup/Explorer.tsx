
import React, { useState } from 'react';
import { ConfigType } from '../../pages/SetupPage';

interface ExplorerProps {
  activeConfig: ConfigType;
  setActiveConfig: (config: ConfigType) => void;
}

export const Explorer: React.FC<ExplorerProps> = ({ activeConfig, setActiveConfig }) => {
  const [infraOpen, setInfraOpen] = useState(true);
  const [guidesOpen, setGuidesOpen] = useState(true);

  const files: { id: ConfigType; name: string; icon: string; category?: string; status?: 'new' | 'modified' }[] = [
    { id: 'identity', name: 'identity.config', icon: '🔑', status: 'modified' },
    { id: 'wizard', name: 'setup_wizard.exe', icon: '🪄', status: 'new' },
    { id: 'starter', name: 'STARTER_GUIDE.md', icon: '📖', category: 'guides' },
    { id: 'nix', name: 'flake.nix', icon: '❄️', category: 'infra', status: 'new' },
    { id: 'devcontainer', name: 'devcontainer.json', icon: '📦', category: 'infra', status: 'new' },
  ];

  const renderFile = (file: typeof files[0]) => (
    <button
      key={file.id}
      onClick={() => setActiveConfig(file.id)}
      className={`w-full flex items-center justify-between pl-4 pr-3 py-2.5 rounded-l-xl transition-all text-left group shrink-0 ${
        activeConfig === file.id
          ? 'bg-indigo-500/10 text-indigo-400 border-r-2 border-indigo-500'
          : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
      }`}
    >
      <div className="flex items-center gap-2.5 overflow-hidden">
        <span className="text-xs grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">{file.icon}</span>
        <span className="text-[11px] font-mono tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{file.name}</span>
      </div>
      {file.status && (
        <span className={`w-1 h-1 rounded-full ${file.status === 'new' ? 'bg-emerald-500' : 'bg-amber-500'} shrink-0 ml-2 shadow-[0_0_8px_currentColor]`}></span>
      )}
    </button>
  );

  return (
    <aside className="w-64 border-r border-white/5 bg-[#060a16] hidden md:flex flex-col overflow-hidden">
      <div className="px-6 py-6 flex items-center justify-between border-b border-white/5 shrink-0 bg-white/[0.02]">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Workspace Explorer</span>
        <div className="flex gap-2">
           <button className="p-1 text-slate-700 hover:text-slate-400 transition-colors"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg></button>
           <button className="p-1 text-slate-700 hover:text-slate-400 transition-colors"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar pt-4">
        <div className="px-6 py-2.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest bg-white/[0.03] flex items-center justify-between border-y border-white/[0.03]">
           <div className="flex items-center gap-2">
              <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              <span>triad-hub</span>
           </div>
           <span className="text-[9px] text-indigo-500/50 font-mono">LAB</span>
        </div>

        <div className="mt-4 space-y-1">
          {/* Root Level Files */}
          <div className="pl-6 space-y-0.5">
            {files.filter(f => !f.category).map(renderFile)}
          </div>

          {/* Infra Folder */}
          <div className="mt-4">
             <button onClick={() => setInfraOpen(!infraOpen)} className="w-full flex items-center gap-2 px-6 py-2 text-[10px] font-black uppercase text-slate-500 hover:text-slate-300 transition-colors bg-white/[0.01]">
                <svg className={`w-3 h-3 transition-transform duration-300 ${infraOpen ? '' : '-rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                <span>Infrastructure</span>
             </button>
             {infraOpen && (
               <div className="pl-6 mt-1 space-y-0.5 border-l border-white/5 ml-8">
                 {files.filter(f => f.category === 'infra').map(renderFile)}
               </div>
             )}
          </div>

          {/* Guides Folder */}
          <div className="mt-2">
             <button onClick={() => setGuidesOpen(!guidesOpen)} className="w-full flex items-center gap-2 px-6 py-2 text-[10px] font-black uppercase text-slate-500 hover:text-slate-300 transition-colors bg-white/[0.01]">
                <svg className={`w-3 h-3 transition-transform duration-300 ${guidesOpen ? '' : '-rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                <span>Documentation</span>
             </button>
             {guidesOpen && (
               <div className="pl-6 mt-1 space-y-0.5 border-l border-white/5 ml-8">
                 {files.filter(f => f.category === 'guides').map(renderFile)}
                 <div className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-700 text-[11px] font-mono italic">
                   <span>README.md</span>
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white/[0.01] border-t border-white/5">
         <div className="flex flex-col gap-3">
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Protocol Sync</span>
            <div className="flex gap-1.5">
               {[1,2,3,4,5,6,7].map(i => <div key={i} className="flex-1 h-1 bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-full animate-pulse" style={{animationDelay: `${i*100}ms`}}></div></div>)}
            </div>
         </div>
      </div>
    </aside>
  );
};
