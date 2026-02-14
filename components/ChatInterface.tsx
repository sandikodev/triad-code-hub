
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { LanguageType, ChatMessage } from '../types';
import { SUGGESTIONS } from '../constants';
import { useChat } from '../context/ChatContext';

declare var Prism: any;

interface ChatInterfaceProps {
  currentLanguage: LanguageType | 'General';
  isLabView?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentLanguage, isLabView }) => {
  const { 
    messages, 
    isLoading, 
    feedbackHistory, 
    sendMessage, 
    handleFeedback,
    setMessages 
  } = useChat();
  
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message if messages are empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'initial-welcome',
        role: 'model',
        content: `Selamat datang di Lab Arsitektural. Saya adalah asisten Anda untuk masteri ${currentLanguage === 'General' ? 'Zig, Elixir, atau Rust' : currentLanguage}. Apa blueprint yang ingin kita bahas hari ini?`,
        timestamp: new Date()
      }]);
    }
  }, [currentLanguage, setMessages, messages.length]);

  const filteredSuggestions = useMemo(() => {
    const list = SUGGESTIONS[currentLanguage] || SUGGESTIONS["General"];
    if (!input.trim()) return [];
    const query = input.toLowerCase();
    return list.filter(s => s.toLowerCase().includes(query)).slice(0, 4);
  }, [input, currentLanguage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }, [messages]);

  // Handle clicking outside of suggestions to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputContainerRef.current && !inputContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;

    setInput('');
    setShowSuggestions(false);
    await sendMessage(textToSend, currentLanguage);
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        const lang = match?.[1] || 'clike';
        const code = match?.[2] || '';
        
        return (
          <div key={index} className="relative group my-4">
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
        <div key={index} className="whitespace-pre-wrap mb-4 font-light text-slate-300">
          {part.split('\n').map((line, lIdx) => (
            <p key={lIdx} className={line.trim() === '' ? 'h-2' : 'mb-2'}>{line}</p>
          ))}
        </div>
      );
    });
  };

  return (
    <div className={`flex flex-col h-full overflow-hidden ${isLabView ? '' : 'bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl'}`}>
      {!isLabView && (
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <h3 className="font-semibold text-slate-200">AI Tutor: {currentLanguage}</h3>
          </div>
        </div>
      )}

      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8"
        role="log"
        aria-live="polite"
        aria-label="Riwayat percakapan"
      >
        {messages.map((msg, i) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`} aria-label={msg.role === 'user' ? 'Pesan Anda' : 'Pesan dari AI'}>
            <div className={`max-w-[90%] md:max-w-[85%] relative group ${
              msg.role === 'user' 
                ? 'bg-indigo-600 p-4 rounded-2xl text-white rounded-br-none shadow-lg' 
                : 'bg-transparent text-slate-300'
            }`}>
              {msg.role === 'model' && (
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2" aria-hidden="true">
                  <div className="w-4 h-0.5 bg-indigo-500"></div> Architectural AI
                </div>
              )}
              <div className={`text-sm leading-relaxed ${msg.role === 'model' ? 'font-light' : 'font-medium'}`}>
                {renderContent(msg.content)}
              </div>

              {/* Feedback Mechanism */}
              {msg.role === 'model' && (
                <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Rate response:</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleFeedback(msg.id, 'positive')}
                      className={`p-1.5 rounded-lg transition-all hover:scale-110 ${feedbackHistory[msg.id] === 'positive' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-600 hover:text-indigo-400'}`}
                      aria-label="Suka respons ini"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 10h4.708c.934 0 1.518 1.024 1.002 1.802l-3.236 4.854A2 2 0 0114.81 18H10a2 2 0 01-2-2v-4a2 2 0 01.553-1.414L11 8V3h3v7z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleFeedback(msg.id, 'negative')}
                      className={`p-1.5 rounded-lg transition-all hover:scale-110 ${feedbackHistory[msg.id] === 'negative' ? 'bg-rose-500/20 text-rose-400' : 'text-slate-600 hover:text-rose-400'}`}
                      aria-label="Tidak suka respons ini"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 14H5.292c-.934 0-1.518-1.024-1.002-1.802l3.236-4.854A2 2 0 019.19 6H14a2 2 0 012 2v4a2 2 0 01-.553 1.414L13 16v5h-3v-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start" aria-label="AI sedang mengetik">
            <div className="flex gap-1.5 p-4 bg-slate-900/50 rounded-2xl">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <div className={`p-8 relative ${isLabView ? 'max-w-4xl mx-auto w-full' : 'bg-slate-800 border-t border-slate-700'}`} ref={inputContainerRef}>
        
        {/* Auto-Suggestions Panel */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute bottom-full left-8 right-8 mb-4 bg-[#0c0e1a]/95 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn z-[100]">
            <div className="px-4 py-3 bg-slate-900/50 border-b border-white/5 flex items-center justify-between">
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">Saran Architectural Link</span>
              <span className="text-[8px] text-slate-600 font-mono">Select to ask</span>
            </div>
            <div className="flex flex-col">
              {filteredSuggestions.map((suggestion, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => handleSend(suggestion)}
                  className="w-full text-left px-5 py-4 text-xs text-slate-300 hover:text-white hover:bg-indigo-600/10 transition-all border-b border-white/5 last:border-0 group/sugg"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-3 h-3 text-indigo-500 group-hover/sugg:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {suggestion}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            aria-label={`Diskusikan arsitektur ${currentLanguage}`}
            placeholder={`Diskusikan arsitektur ${currentLanguage}...`}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-2xl px-6 py-5 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-2xl group-hover:border-slate-700"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 group">
            <button
              onClick={() => handleSend()}
              disabled={isLoading}
              aria-label="Kirim pesan"
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white p-3 rounded-xl transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
            <div className="premium-tooltip bottom-full right-0 mb-4">Kirim ke Architectural Mentor</div>
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-600 font-mono mt-4 uppercase tracking-widest" aria-hidden="true">
           Secure Lab Environment – End-to-End Encryption Enabled
        </p>
      </div>
    </div>
  );
};
