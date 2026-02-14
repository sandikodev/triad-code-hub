
import React from 'react';

interface ActivityBarProps {
  activeSidebarTab: 'files' | 'search' | 'git';
  setActiveSidebarTab: (tab: 'files' | 'search' | 'git') => void;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({ activeSidebarTab, setActiveSidebarTab }) => {
  return (
    <aside className="w-16 bg-[#040712] border-r border-white/5 flex flex-col items-center py-8 shrink-0 hidden md:flex">
      <div className="flex-1 flex flex-col items-center gap-8">
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
        <div className="relative group">
          <button className="p-3.5 rounded-2xl text-slate-600 hover:text-slate-400 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>
          </button>
          <div className="premium-tooltip left-full ml-4">Extensions</div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mt-auto">
        <div className="relative group">
          <button className="p-3.5 rounded-2xl text-slate-600 hover:text-slate-400 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </button>
          <div className="premium-tooltip left-full ml-4">Settings</div>
        </div>
      </div>
    </aside>
  );
};
