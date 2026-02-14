
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LanguageType } from '../types';
import { LANGUAGES } from '../constants';
import { ChatInterface } from '../components/ChatInterface';
import { LabHeader } from '../components/lab/LabHeader';
import { LabSidebar } from '../components/lab/LabSidebar';

const TutorLab: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  
  const initialLang = LANGUAGES.find(l => l.id.toLowerCase() === lang?.toLowerCase())?.id as LanguageType || LanguageType.ZIG;
  const [currentLang, setCurrentLang] = useState<LanguageType>(initialLang);

  useEffect(() => {
    if (lang) {
      const found = LANGUAGES.find(l => l.id.toLowerCase() === lang.toLowerCase());
      if (found) {
        setCurrentLang(found.id as LanguageType);
      }
    }
  }, [lang]);

  const langInfo = LANGUAGES.find(l => l.id === currentLang)!;
  const isPremiumLocked = langInfo.isPremium; // Simulasi: Semua premium terkunci untuk demo

  const handleLangChange = (id: LanguageType) => {
    navigate(`/lab/${id.toLowerCase()}`);
  };

  if (isPremiumLocked) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#020617] p-8 text-center space-y-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05),transparent_70%)]"></div>
        <div className="w-24 h-24 bg-amber-500/10 rounded-[2rem] border border-amber-500/20 flex items-center justify-center text-4xl shadow-2xl shadow-amber-500/10">
           🔒
        </div>
        <div className="space-y-4 max-w-xl relative z-10">
           <h2 className="text-4xl font-black text-white tracking-tighter">Architect Pro Access Required.</h2>
           <p className="text-slate-500 text-lg font-light leading-relaxed">
             Lab {langInfo.name} adalah bagian dari kurikulum tingkat lanjut kami. Dapatkan akses ke bahasa masa depan, prioritas AI, dan blueprint eksklusif dengan berlangganan **Architect Pro**.
           </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 relative z-10">
           <button onClick={() => navigate('/#pricing')} className="px-10 py-5 bg-amber-500 text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all shadow-2xl shadow-amber-500/20 active:scale-95">
              Unlock All Pro Labs
           </button>
           <button onClick={() => navigate('/')} className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
              Kembali ke Beranda
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden animate-fadeIn">
      <LabHeader 
        currentLang={currentLang} 
        handleLangChange={handleLangChange} 
      />

      <main className="flex-1 flex overflow-hidden">
        <LabSidebar langInfo={langInfo} />

        <section className="flex-1 flex flex-col bg-slate-900/20" aria-label="Interaksi AI Tutor">
          <ChatInterface currentLanguage={currentLang} isLabView={true} />
        </section>
      </main>
    </div>
  );
};

export default TutorLab;
