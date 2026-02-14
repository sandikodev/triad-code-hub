
import React, { useEffect, useState, useRef } from 'react';
import { LanguageType, RoadmapStep } from '../types';
import { getRoadmap, getConceptCodeExample } from '../services/geminiService';
import { CodeModal } from './CodeModal';

interface RoadmapProps {
  language: LanguageType;
}

export const Roadmap: React.FC<RoadmapProps> = ({ language }) => {
  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const [expandedRelated, setExpandedRelated] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  const fetchRoadmap = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRoadmap(language);
      if (data.length === 0) {
        setError("DATA_EMPTY");
      } else {
        setSteps(data);
        setVisibleSteps(new Set());
        setExpandedRelated(new Set());
        setExpandedSteps(new Set([0])); // Expand first step
      }
    } catch (err: any) {
      if (err.message === "QUOTA_EXCEEDED") {
        setError("QUOTA_EXCEEDED");
      } else {
        setError("GENERAL_ERROR");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, [language]);

  useEffect(() => {
    if (loading || !!error || steps.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSteps((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    );

    const stepElements = document.querySelectorAll('.roadmap-step');
    stepElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading, error, steps]);

  const handleConceptClick = async (e: React.MouseEvent, concept: string) => {
    e.stopPropagation();
    setSelectedConcept(concept);
    setModalOpen(true);
    setModalLoading(true);
    setModalContent('');
    
    const content = await getConceptCodeExample(language, concept);
    setModalContent(content);
    setModalLoading(false);
  };

  const toggleStep = (index: number) => {
    setExpandedSteps(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const toggleRelated = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setExpandedRelated(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="relative py-12 px-2 md:px-0" role="status" aria-label="Memuat Peta Jalan">
        <div className="absolute left-8 md:left-10 top-0 bottom-0 w-[2px] bg-slate-800/30 rounded-full" />
        <div className="space-y-20">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative pl-16 md:pl-28 opacity-50">
              <div className="absolute left-6 md:left-8 top-1 flex items-center justify-center z-20">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-xl bg-slate-800 border-2 border-slate-700 rotate-45 animate-pulse" />
              </div>
              <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-3xl p-8 shimmer">
                <div className="h-8 bg-slate-800 rounded-lg w-1/2 animate-pulse mb-6" />
                <div className="space-y-3">
                  <div className="h-4 bg-slate-800/60 rounded w-full animate-pulse" />
                  <div className="h-4 bg-slate-800/60 rounded w-5/6 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 px-4 flex flex-col items-center justify-center text-center animate-fadeIn">
        <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-8 border border-indigo-500/20">
          <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">
          {error === "QUOTA_EXCEEDED" ? "Architectural Link Quota Exceeded" : "System Communication Failure"}
        </h3>
        <p className="text-slate-500 max-w-md text-sm leading-relaxed mb-10">
          {error === "QUOTA_EXCEEDED" 
            ? "Batas penggunaan API Gemini Anda telah tercapai. Silakan coba kembali dalam beberapa menit atau periksa kuota API Key Anda." 
            : "Gagal menghubungkan ke pusat arsitektur AI. Periksa koneksi internet Anda dan coba lagi."}
        </p>
        <button 
          onClick={fetchRoadmap}
          className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
        >
          Retry Link
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative py-12 px-2 md:px-0" aria-label={`Peta Jalan Belajar ${language}`}>
      <div className="absolute left-8 md:left-10 top-0 bottom-0 w-[2px] bg-slate-800/80 rounded-full" aria-hidden="true">
        <div 
          className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent transition-all duration-1000 ease-out relative"
          style={{ 
            height: `${(visibleSteps.size / steps.length) * 100}%`,
            boxShadow: '0 0 25px rgba(99,102,241,0.5)'
          }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-12 bg-indigo-400 blur-md opacity-50 animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-8 md:space-y-12">
        {steps.map((step, index) => {
          const isVisible = visibleSteps.has(index);
          const isStepExpanded = expandedSteps.has(index);
          const isRelatedExpanded = expandedRelated.has(index);

          return (
            <div 
              key={index} 
              data-index={index}
              className={`roadmap-step relative pl-16 md:pl-28 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform 
                ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-16 scale-95'}`}
            >
              <div className="absolute left-6 md:left-8 top-1 flex items-center justify-center z-20" aria-hidden="true">
                <div className={`relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-xl transition-all duration-700 border-2 rotate-45
                  ${isVisible ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.8)]' : 'bg-slate-900 border-slate-700'}
                `}>
                  <div className="-rotate-45">
                    <span className={`text-xs font-black ${isVisible ? 'text-white' : 'text-slate-600'}`}>
                      {index + 1}
                    </span>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => toggleStep(index)}
                role="button"
                aria-expanded={isStepExpanded}
                className={`group relative bg-slate-900/40 backdrop-blur-md border rounded-3xl p-6 md:p-8 transition-all duration-700 cursor-pointer overflow-hidden
                  ${isVisible ? 'border-slate-700/50 shadow-2xl' : 'border-transparent shadow-none'}
                  ${isStepExpanded ? 'bg-slate-800/80 border-indigo-500/30' : 'hover:bg-slate-800/50 hover:border-slate-600'}
                `}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-700 ${isVisible ? 'text-white' : 'text-slate-600'}`}>
                        {step.title}
                      </h3>
                      {isVisible && isStepExpanded && (
                        <span className="w-fit px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                          Milestone Active
                        </span>
                      )}
                    </div>
                    
                    <div className={`p-2 rounded-full transition-all duration-500 ${isStepExpanded ? 'bg-indigo-500/20 text-indigo-400 rotate-180' : 'bg-slate-800 text-slate-500'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isStepExpanded ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                    <p className="text-slate-400 text-md leading-relaxed mb-8 group-hover:text-slate-300 transition-colors">
                      {step.description}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Core Blueprint</h4>
                        <div className="flex flex-wrap gap-3">
                          {step.concepts.map((concept, ci) => (
                            <div key={ci} className="relative group/tooltip">
                              <button 
                                onClick={(e) => handleConceptClick(e, concept.name)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all duration-300 group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                                  bg-slate-950 border-slate-800 text-indigo-400 hover:border-indigo-400 hover:bg-indigo-500 hover:text-white hover:scale-105 active:scale-95
                                `}
                              >
                                <span className="flex items-center gap-2">
                                  {concept.name}
                                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-3 w-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                </span>
                              </button>
                              <div className="premium-tooltip bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 !whitespace-normal text-center leading-relaxed text-[10px] lowercase tracking-normal font-medium py-3 px-4 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.8)] pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/tooltip:translate-y-0 border-indigo-500/50 bg-[#0c0e1a]">
                                <span className="block text-indigo-400 font-black uppercase text-[8px] tracking-[0.2em] mb-1.5">Arsitektur Node</span>
                                {concept.definition}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {step.relatedConcepts && step.relatedConcepts.length > 0 && (
                        <div className="pt-2">
                          <button 
                            onClick={(e) => toggleRelated(e, index)}
                            className="flex items-center gap-2 text-[10px] font-bold text-indigo-400/70 hover:text-indigo-400 uppercase tracking-widest transition-colors focus:outline-none"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform duration-300 ${isRelatedExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            {isRelatedExpanded ? 'Hide Related Paradigms' : 'Show Related Paradigms'}
                          </button>
                          
                          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isRelatedExpanded ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                            <div className="flex flex-wrap gap-2">
                              {step.relatedConcepts.map((rConcept, ri) => (
                                <div key={ri} className="relative group/tooltip">
                                  <button
                                    onClick={(e) => handleConceptClick(e, rConcept.name)}
                                    className="px-3 py-1 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-indigo-300/60 text-[10px] hover:text-indigo-300 hover:border-indigo-500/30 transition-all focus:outline-none"
                                  >
                                    {rConcept.name}
                                  </button>
                                  <div className="premium-tooltip bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 !whitespace-normal text-center leading-relaxed text-[9px] lowercase tracking-normal font-medium py-2 px-3 shadow-2xl pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/tooltip:translate-y-0 border-purple-500/30 bg-[#0c0e1a]">
                                    <span className="block text-purple-400 font-black uppercase text-[7px] tracking-[0.2em] mb-1">Paradigma</span>
                                    {rConcept.definition}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CodeModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        concept={selectedConcept}
        language={language}
        content={modalContent}
        isLoading={modalLoading}
      />
    </div>
  );
};
