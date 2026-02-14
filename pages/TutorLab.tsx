
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

  const handleLangChange = (id: LanguageType) => {
    navigate(`/lab/${id.toLowerCase()}`);
  };

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
