
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LanguageType } from '../types';
import { LANGUAGES } from '../constants';
import { ChatInterface } from '../components/ChatInterface';

const TutorLab: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  
  // Find current language based on URL param
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

  const handleLangChange = (id: LanguageType) => {
    navigate(`/lab/${id.toLowerCase()}`);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden animate-fadeIn">
      {/* Header Lab */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <button 
              onClick={() => navigate('/')}
              aria-label="Kembali ke Beranda"
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="premium-tooltip top-full left-0 mt-2">Keluar dari Lab</div>
          </div>
          <div className="h-6 w-[1px] bg-slate-800" aria-hidden="true"></div>
          <nav className="flex items-center gap-3" aria-label="Pemilihan Bahasa Pemrograman">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest" id="workspace-label">Workspace:</span>
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800" role="group" aria-labelledby="workspace-label">
              {LANGUAGES.map(l => (
                <div key={l.id} className="relative group">
                  <button
                    onClick={() => handleLangChange(l.id as LanguageType)}
                    aria-pressed={currentLang === l.id}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      currentLang === l.id 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {l.name}
                  </button>
                  <div className="premium-tooltip top-full left-1/2 -translate-x-1/2 mt-2">Ganti ke {l.name}</div>
                </div>
              ))}
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative group">
             <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full cursor-help" role="status" aria-label="Status AI: Aktif">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">AI Link: Active</span>
             </div>
             <div className="premium-tooltip top-full right-0 mt-2">Koneksi ke Gemini 3 Pro Stabil</div>
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel: Info & Tools */}
        <aside className="w-80 border-r border-slate-800 p-6 flex flex-col gap-8 bg-slate-950 overflow-y-auto hidden lg:flex" aria-label="Informasi Bahasa dan Alat Bantu">
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
                  <div className="premium-tooltip left-full ml-4">{node.tip}</div>
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

        {/* Center Panel: Immersive Chat */}
        <section className="flex-1 flex flex-col bg-slate-900/20" aria-label="Interaksi AI Tutor">
          <ChatInterface currentLanguage={currentLang} isLabView={true} />
        </section>
      </main>
    </div>
  );
};

export default TutorLab;
