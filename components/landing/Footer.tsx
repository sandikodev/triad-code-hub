
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../Logo';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="py-24 px-8 border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-4 mb-10 cursor-pointer group" onClick={() => navigate('/')}>
           <Logo size="lg" />
           <div className="flex flex-col items-start text-left">
             <span className="font-black text-2xl tracking-tighter">TriadHub</span>
             <span className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">Engineering Excellence</span>
           </div>
        </div>
        <div className="flex gap-10 mb-12">
          {['Twitter', 'GitHub', 'Discord', 'Docs'].map(link => (
            <a key={link} href="#" className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors">{link}</a>
          ))}
        </div>
        <p className="text-slate-700 text-[10px] font-medium tracking-widest text-center uppercase">
          Designed for the future of decentralized and spatial systems. <br />
          © 2025 TriadHub Architectural Lab.
        </p>
      </div>
    </footer>
  );
};
