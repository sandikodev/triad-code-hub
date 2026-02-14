
import React from 'react';
import { LanguageInfo } from '../../types';

interface LabSidebarProps {
  langInfo: LanguageInfo;
}

export const LabSidebar: React.FC<LabSidebarProps> = ({ langInfo }) => {
  return (
    <aside className="w-80 border-r border-slate-800 p-6 flex flex-col gap-8 bg-slate-950 overflow-y-auto overflow-x-hidden hidden lg:flex" aria-label="Informasi Bahasa dan Alat Bantu">
      <div className="space-y-4">
        <div className={`w-12 h-12 rounded-xl ${langInfo.color} flex items-center justify-center text-2xl shadow-xl`} aria-hidden="true">
           {langInfo.icon}
        </div>
        <h2 className="text-2xl font-bold">{langInfo.name} Core</h2>
        <p className="text-sm text-slate-400 leading-relaxed font-light">
          {langInfo.description}
        </p>
      </div>

      <nav className="space-y-4" aria-label="Konteks Arsitektur">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Context Nodes</h3>
        <div className="space-y-2">
          {[
            { label: "Standard Library Overview", tip: "Analisis pustaka inti" },
            { label: "Concurrency Patterns", tip: "Mekanisme sinkronisasi data" },
            { label: "Memory Management Logic", tip: "Alokasi & Manajemen Pointer" }
          ].map((node, nIdx) => (
            <div key={nIdx} className="relative group">
              <button className="w-full text-left p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                {node.label}
              </button>
              <div className="premium-tooltip">{node.tip}</div>
            </div>
          ))}
        </div>
      </nav>

      <div className="mt-auto p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl" role="note" aria-label="Tips Laboratorium">
        <h4 className="text-xs font-bold text-indigo-400 mb-2">Lab Tip</h4>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Tanyakan pada tutor tentang "Architectural Pattern" untuk bahasa ini guna memahami struktur bisnis di masa depan.
        </p>
      </div>
    </aside>
  );
};
