
import React from 'react';

export const SidebarTip: React.FC = () => {
  return (
    <div className="mt-auto p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl" role="note" aria-label="Tips Laboratorium">
      <h4 className="text-xs font-bold text-indigo-400 mb-2">Lab Tip</h4>
      <p className="text-[10px] text-slate-500 leading-relaxed">
        Tanyakan pada tutor tentang "Architectural Pattern" untuk bahasa ini guna memahami struktur bisnis di masa depan.
      </p>
    </div>
  );
};
