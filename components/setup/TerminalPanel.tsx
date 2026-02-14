
import React, { useEffect, useRef } from 'react';

interface TerminalPanelProps {
  isAuthenticated: boolean;
  user: any;
  logs?: string[];
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({ isAuthenticated, user, logs = [] }) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="h-64 bg-[#04060e] border-t border-white/5 p-8 font-mono text-[11px] overflow-y-auto custom-scrollbar shrink-0 shadow-inner">
      <div className="flex items-center justify-between mb-6 opacity-40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Lab-Terminal-V3.4.1</span>
        </div>
        <div className="text-[8px] font-bold uppercase tracking-widest text-slate-600">Kernel: Triad-OS-64</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-slate-600 flex gap-4">
           <span className="text-indigo-500/40">[sys]</span>
           <span>Initializing neural environment... <span className="text-emerald-500">READY</span></span>
        </div>
        <div className="text-slate-600 flex gap-4">
           <span className="text-indigo-500/40">[sys]</span>
           <span>Architecture link: <span className="text-indigo-400">Gemini-3-Pro-Preview</span></span>
        </div>
        <div className="text-slate-600 flex gap-4">
           <span className="text-indigo-500/40">[sys]</span>
           <span>Identity status: <span className={isAuthenticated ? "text-emerald-400" : "text-amber-400"}>
             {isAuthenticated ? `VERIFIED: ${user?.username}` : "ANONYMOUS_ARCHITECT"}
           </span></span>
        </div>

        {/* Dynamic Logs */}
        {logs.map((log, idx) => (
          <div key={idx} className="text-slate-400 flex gap-4 animate-fadeIn">
            <span className="text-indigo-500/40">[log]</span>
            <span className="font-light">{log}</span>
          </div>
        ))}

        <div className="text-emerald-500/80 mt-6 flex gap-3">
          <span className="font-black">➜</span>
          <span className="text-slate-500">triad-hub</span>
          <span className="text-indigo-500/60 font-black animate-pulse">_</span>
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
