
import React, { useState, useEffect } from 'react';
import { FloatingHeader } from '../components/landing/FloatingHeader';
import { Footer } from '../components/landing/Footer';
import { LanguageType } from '../types';
import { BLUEPRINTS_DATA } from '../data/blueprintsData';
import { BlueprintCard } from '../components/blueprints/BlueprintCard';
import { BlueprintFilterBar } from '../components/blueprints/BlueprintFilterBar';
import { BlueprintHeader } from '../components/blueprints/BlueprintHeader';

const BlueprintsPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredBlueprints = filter === 'All' 
    ? BLUEPRINTS_DATA 
    : BLUEPRINTS_DATA.filter(b => b.category === filter);

  return (
    <div className="bg-slate-950 min-h-screen selection:bg-indigo-500/30">
      <FloatingHeader 
        scrolled={scrolled} 
        activeRoadmap={LanguageType.RUST} 
        scrollTo={() => {}} 
      />

      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
        <BlueprintHeader />

        <BlueprintFilterBar activeFilter={filter} setFilter={setFilter} />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlueprints.map((bp) => (
            <BlueprintCard key={bp.id} bp={bp} />
          ))}
        </div>
        
        {filteredBlueprints.length === 0 && (
          <div className="py-20 text-center animate-fadeIn">
             <p className="text-slate-600 font-mono text-sm uppercase tracking-widest">No blueprints found in this frequency.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlueprintsPage;
