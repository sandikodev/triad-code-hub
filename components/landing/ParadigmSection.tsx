
import React from 'react';

export const ParadigmSection: React.FC = () => {
  const paradigms = [
    { label: "Stability", value: "Memory Safety by Design", desc: "Rust menjamin keamanan tanpa garbage collector melalui model ownership dan borrowing." },
    { label: "Scalability", value: "Lightweight Concurrency", desc: "Elixir memanfaatkan BEAM VM untuk jutaan proses terisolasi yang fault-tolerant." },
    { label: "Precision", value: "No Hidden Control Flow", desc: "Zig memberikan kontrol mutlak atas memori dengan kesederhanaan yang tak tertandingi." }
  ];

  return (
    <section id="paradigma" className="py-20 px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {paradigms.map((item, i) => (
          <div key={i} className="space-y-4 p-8 bg-slate-900/40 rounded-3xl border border-white/5 hover:border-indigo-500/20 transition-all group">
            <span className="text-indigo-500 font-black text-[9px] uppercase tracking-[0.4em]">{item.label}</span>
            <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors text-left">{item.value}</h3>
            <p className="text-slate-500 text-sm font-light leading-relaxed text-left">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
