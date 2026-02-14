
import React from 'react';

export const AIStatusIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
       <div className="relative group">
         <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full cursor-help" role="status" aria-label="Status AI: Aktif">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">AI Link: Active</span>
         </div>
         <div className="premium-tooltip">Koneksi ke Gemini 3 Pro Stabil</div>
       </div>
    </div>
  );
};
