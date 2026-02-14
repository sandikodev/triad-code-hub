
import React, { useState, useEffect } from 'react';
import { LanguageType } from '../types';
import { FloatingHeader } from '../components/landing/FloatingHeader';
import { HeroSection } from '../components/landing/HeroSection';
import { ParadigmSection } from '../components/landing/ParadigmSection';
import { PathwaySection } from '../components/landing/PathwaySection';
import { Footer } from '../components/landing/Footer';

const LandingPage: React.FC = () => {
  const [activeRoadmap, setActiveRoadmap] = useState<LanguageType>(LanguageType.ZIG);
  const [heroTextIdx, setHeroTextIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const heroTexts = [
    { title: "Bukan Mengganti,", subtitle: "Mendefinisikan Ulang." },
    { title: "Evolusi Kode,", subtitle: "Arsitektur Spasial." },
    { title: "Presisi Runtime,", subtitle: "Efisiensi Tanpa Batas." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTextIdx((prev) => (prev + 1) % heroTexts.length);
    }, 5000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="animate-fadeIn selection:bg-indigo-500/30 bg-slate-950">
      <FloatingHeader 
        scrolled={scrolled} 
        activeRoadmap={activeRoadmap} 
        scrollTo={scrollTo} 
      />

      <HeroSection 
        heroTexts={heroTexts} 
        heroTextIdx={heroTextIdx} 
        scrollTo={scrollTo} 
      />

      <ParadigmSection />

      <PathwaySection 
        activeRoadmap={activeRoadmap} 
        setActiveRoadmap={setActiveRoadmap} 
      />

      <Footer />
    </div>
  );
};

export default LandingPage;
