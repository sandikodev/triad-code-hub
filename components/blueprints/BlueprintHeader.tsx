
import React from 'react';

export const BlueprintHeader: React.FC = () => {
  return (
    <header className="mb-20 space-y-6">
      <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
        <span className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em]">System Catalog</span>
      </div>
      <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.8]">
        Architectural <br />
        <span className="text-slate-800">Blueprints.</span>
      </h1>
      <p className="text-slate-500 text-xl font-light leading-relaxed max-w-2xl">
        Kumpulan desain sistem tingkat lanjut yang memadukan kekuatan The Triad untuk memecahkan masalah komputasi modern.
      </p>
    </header>
  );
};
