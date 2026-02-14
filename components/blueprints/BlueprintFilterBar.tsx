
import React from 'react';

interface BlueprintFilterBarProps {
  activeFilter: string;
  setFilter: (filter: string) => void;
}

export const BlueprintFilterBar: React.FC<BlueprintFilterBarProps> = ({ activeFilter, setFilter }) => {
  const categories = [
    'All', 
    'Neural Compute', 
    'Spatial Graphics', 
    'High Throughput', 
    'Fault Tolerance', 
    'Low Latency'
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-16 border-b border-white/5 pb-8 overflow-x-auto no-scrollbar">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
            activeFilter === cat 
              ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
              : 'bg-white/5 border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
