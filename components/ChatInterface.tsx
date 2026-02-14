
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { LanguageType, ChatMessage } from '../types';
import { SUGGESTIONS } from '../constants';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { MessageItem } from './chat/MessageItem';
import { ChatInputArea } from './chat/ChatInputArea';
import { ChatAutocomplete } from './chat/ChatAutocomplete';
import { QuickActionPills } from './chat/QuickActionPills';

declare var Prism: any;
declare var renderMathInElement: any;
declare var mermaid: any;

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
  
  const { openKeyManager } = useAuth();
  
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 300);
    return () => clearTimeout(handler);
  }, [input]);

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
    if (!debouncedInput.trim()) return [];
    const query = debouncedInput.toLowerCase();
    return list.filter(s => s.toLowerCase().includes(query)).slice(0, 4);
  }, [debouncedInput, currentLanguage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (typeof Prism !== 'undefined') Prism.highlightAll();
    if (typeof renderMathInElement !== 'undefined' && scrollRef.current) {
      renderMathInElement(scrollRef.current, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false},
          {left: '\\(', right: '\\)', display: false},
          {left: '\\[', right: '\\]', display: true}
        ],
        throwOnError: false
      });
    }
    if (typeof mermaid !== 'undefined' && scrollRef.current) {
      try { mermaid.init(undefined, ".mermaid"); } catch (e) { console.error("Mermaid initialization failed", e); }
    }
  }, [messages, isUserTyping]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputContainerRef.current && !inputContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = useCallback(async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    setIsUserTyping(false);
    setInput('');
    setDebouncedInput('');
    setShowSuggestions(false);
    await sendMessage(textToSend, currentLanguage);
  }, [input, isLoading, currentLanguage, sendMessage]);

  const handleRetry = useCallback(async () => {
    if (isLoading) return;
    const userMessages = messages.filter(m => m.role === 'user');
    if (userMessages.length === 0) return;
    const lastUserMsg = userMessages[userMessages.length - 1];
    await sendMessage(lastUserMsg.content, currentLanguage, true);
  }, [isLoading, messages, currentLanguage, sendMessage]);

  const formatTextSegments = (text: string) => {
    let segments: (string | React.ReactNode)[] = [text];
    segments = segments.flatMap(seg => {
      if (typeof seg !== 'string') return seg;
      const parts = seg.split(/(\*\*.*?\*\*)/g);
      return parts.map((p, i) => p.startsWith('**') && p.endsWith('**') ? <strong key={`b-${i}`} className="font-bold text-white">{p.slice(2, -2)}</strong> : p);
    });
    segments = segments.flatMap(seg => {
      if (typeof seg !== 'string') return seg;
      const parts = seg.split(/(\*.*?\*)/g);
      return parts.map((p, i) => p.startsWith('*') && p.endsWith('*') ? <em key={`i-${i}`} className="italic text-slate-200">{p.slice(1, -1)}</em> : p);
    });
    return segments;
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        const lang = match?.[1] || 'clike';
        const code = match?.[2] || '';
        if (lang === 'mermaid') {
          return (
            <div key={index} className="mermaid-wrapper my-6 p-4 bg-slate-900/40 border border-white/5 rounded-2xl overflow-x-auto flex justify-center">
              <pre className="mermaid opacity-100">{code.trim()}</pre>
            </div>
          );
        }
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
          {part.split('\n').map((line, lIdx) => {
            const trimmedLine = line.trim();
            if (trimmedLine === '') return <div key={lIdx} className="h-2" />;
            if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
              return <div key={lIdx} className="flex gap-3 ml-4 mb-2"><span className="text-indigo-500 mt-1.5 flex-shrink-0">•</span><span>{formatTextSegments(line.substring(2))}</span></div>;
            }
            if (/^\d+\. /.test(trimmedLine)) {
              return <div key={lIdx} className="flex gap-3 ml-4 mb-2"><span className="text-indigo-500 font-bold font-mono text-[10px] mt-1 flex-shrink-0">{trimmedLine.match(/^\d+/)?.[0]}.</span><span>{formatTextSegments(line.replace(/^\d+\. /, ''))}</span></div>;
            }
            return <p key={lIdx} className="mb-2">{formatTextSegments(line)}</p>;
          })}
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

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8" role="log" aria-live="polite" aria-label="Riwayat percakapan">
        {messages.map((msg) => (
          <MessageItem 
            key={msg.id} 
            msg={msg} 
            renderContent={renderContent} 
            handleRetry={handleRetry} 
            openKeyManager={openKeyManager} 
            handleFeedback={handleFeedback} 
            feedbackHistory={feedbackHistory} 
          />
        ))}

        {isUserTyping && (
          <div className="flex items-start gap-3 md:gap-4 justify-end animate-fadeIn">
            <div className="bg-indigo-600/10 px-4 py-2 rounded-2xl text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/10 flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              Drafting Blueprint
            </div>
          </div>
        )}
      </div>

      <div className={`p-8 relative ${isLabView ? 'max-w-4xl mx-auto w-full' : 'bg-slate-800 border-t border-slate-700'}`} ref={inputContainerRef}>
        {!input.trim() && !isLoading && messages.length <= 1 && (
          <QuickActionPills suggestions={SUGGESTIONS[currentLanguage] || SUGGESTIONS["General"]} handleSend={handleSend} />
        )}

        <ChatAutocomplete filteredSuggestions={filteredSuggestions} handleSend={handleSend} />

        <ChatInputArea 
          input={input} 
          setInput={(val) => {
            setInput(val);
            if (val.trim()) {
              setIsUserTyping(true);
              if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = setTimeout(() => setIsUserTyping(false), 1500);
            } else { setIsUserTyping(false); }
          }} 
          isLoading={isLoading} 
          handleSend={handleSend} 
          setShowSuggestions={setShowSuggestions} 
          currentLanguage={currentLanguage} 
        />
        
        <p className="text-center text-[10px] text-slate-600 font-mono mt-4 uppercase tracking-widest" aria-hidden="true">
           Secure Lab Environment – End-to-End Encryption Enabled
        </p>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};
