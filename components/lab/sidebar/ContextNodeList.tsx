
import React from 'react';

export const ContextNodeList: React.FC = () => {
  const nodes = [
    { label: "Standard Library Overview", tip: "Analisis pustaka inti" },
    { label: "Concurrency Patterns", tip: "Mekanisme sinkronisasi data" },
    { label: "Memory Management Logic", tip: "Alokasi & Manajemen Pointer" }
  ];

  return (
    <nav className="space-y-4" aria-label="Konteks Arsitektur">
      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Context Nodes</h3>
      <div className="space-y-2">
        {nodes.map((node, nIdx) => (
          <div key={nIdx} className="relative group">
            <button className="w-full text-left p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
              {node.label}
            </button>
            <div className="premium-tooltip">{node.tip}</div>
          </div>
        ))}
      </div>
    </nav>
  );
};
