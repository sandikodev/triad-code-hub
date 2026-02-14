
import React, { useEffect } from 'react';

declare var Prism: any;

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  concept: string;
  language: string;
  content: string;
  isLoading: boolean;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, concept, language, content, isLoading }) => {
  useEffect(() => {
    if (isOpen && !isLoading && typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }, [isOpen, isLoading, content]);

  if (!isOpen) return null;

  const renderFormattedContent = () => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        const lang = match?.[1] || language.toLowerCase() || 'clike';
        const code = match?.[2] || '';
        
        return (
          <div key={index} className="relative group my-8">
             <div className="absolute top-2 right-4 text-[9px] font-bold text-slate-600 uppercase tracking-widest pointer-events-none z-10">
               {lang}
             </div>
             <pre className={`language-${lang}`}>
               <code className={`language-${lang}`}>{code.trim()}</code>
             </pre>
          </div>
        );
      }
      
      return (
        <div key={index} className="space-y-4">
          {part.split('\n').map((line, idx) => {
            if (line.trim() === '') return <div key={idx} className="h-4" />;
            if (line.trim().startsWith('#')) {
              return (
                <h4 key={idx} className="text-white font-bold text-lg mt-8 mb-4 border-l-2 border-indigo-500 pl-4">
                  {line.replace(/#/g, '').trim()}
                </h4>
              );
            }
            return <p key={idx} className="text-slate-300 leading-relaxed font-light">{line}</p>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-fadeIn" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-4xl bg-slate-900 border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden animate-scaleIn">
        {/* Scanning Line Animation during loading */}
        {isLoading && (
          <div 
            className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent z-10 pointer-events-none"
            style={{ animation: 'scan 2s linear infinite' }}
          />
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-10 py-8 border-b border-white/5 bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-indigo-500 font-bold text-[10px] uppercase tracking-[0.3em]">{language} Blueprint</span>
            </div>
            <h3 className="text-3xl font-black text-white tracking-tighter transition-opacity duration-300">
              {isLoading ? (
                <span className="inline-block w-48 h-8 bg-white/5 rounded animate-pulse" />
              ) : (
                concept
              )}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-slate-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-10 max-h-[75vh] overflow-y-auto relative custom-scrollbar">
          {isLoading ? (
            <div className="space-y-8">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest animate-pulse">Establishing architectural link...</span>
                  <span className="text-[10px] text-slate-600 font-mono mt-1">Status: Decrypting node structures</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse shimmer" />
                <div className="h-4 bg-white/5 rounded w-full animate-pulse shimmer" style={{ animationDelay: '0.1s' }} />
                <div className="h-4 bg-white/5 rounded w-5/6 animate-pulse shimmer" style={{ animationDelay: '0.2s' }} />
              </div>
              
              <div className="h-64 bg-white/5 rounded-3xl animate-pulse shimmer" />

              <div className="space-y-4">
                <div className="h-4 bg-white/5 rounded w-2/3 animate-pulse shimmer" />
                <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse shimmer" />
              </div>
            </div>
          ) : (
            <div className="animate-fadeIn">
               {renderFormattedContent()}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-10 py-6 bg-slate-950/50 border-t border-white/5 flex justify-between items-center">
          <div className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em]">
            {isLoading ? 'Fetching data...' : 'Architecture Decrypted'}
          </div>
          <button 
            onClick={onClose}
            className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
              isLoading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 active:scale-95'
            }`}
            disabled={isLoading}
          >
            Close Blueprint
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(600px); opacity: 0; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
