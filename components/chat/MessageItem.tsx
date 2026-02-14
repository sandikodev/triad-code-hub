
import React from 'react';
import { ChatMessage } from '../../types';

interface MessageItemProps {
  msg: ChatMessage;
  renderContent: (content: string) => React.ReactNode;
  handleRetry: () => void;
  openKeyManager: () => void;
  handleFeedback: (messageId: string, rating: 'positive' | 'negative') => void;
  feedbackHistory: Record<string, 'positive' | 'negative'>;
}

export const MessageItem: React.FC<MessageItemProps> = ({ 
  msg, renderContent, handleRetry, openKeyManager, handleFeedback, feedbackHistory 
}) => {
  return (
    <div className={`flex items-start gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`} aria-label={msg.role === 'user' ? 'Pesan Anda' : 'Pesan dari AI'}>
      {msg.role === 'model' && (
        <div className="flex-shrink-0 mt-1 hidden sm:block">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-[10px] text-white shadow-lg shadow-indigo-500/20 border border-white/10 select-none">
            T
          </div>
        </div>
      )}
      <div className={`max-w-[90%] md:max-w-[85%] relative group ${
        msg.role === 'user' 
          ? 'bg-indigo-600 p-4 rounded-2xl text-white rounded-br-none shadow-lg' 
          : msg.isError 
            ? 'bg-rose-500/10 border border-rose-500/20 p-6 rounded-2xl text-slate-300'
            : 'bg-transparent text-slate-300'
      }`}>
        {msg.role === 'model' && (
          <div className={`text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${msg.isError ? 'text-rose-400' : 'text-indigo-400'}`} aria-hidden="true">
            <div className={`w-4 h-0.5 ${msg.isError ? 'bg-rose-500' : 'bg-indigo-500'}`}></div> 
            {msg.isError ? 'Link Error' : 'Architectural AI'}
          </div>
        )}
        <div className={`text-sm leading-relaxed ${msg.role === 'model' ? 'font-light' : 'font-medium'}`}>
          {msg.isLoading ? (
            <div className="flex gap-1.5 py-2">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            renderContent(msg.content)
          )}
        </div>

        {/* Retry Mechanism for Errors */}
        {msg.isError && !msg.isLoading && (
          <div className="mt-6 flex flex-wrap gap-4">
            <button 
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-indigo-500/20 active:scale-95 group/retry"
            >
              <svg className="w-3.5 h-3.5 transition-transform group-hover/retry:rotate-180 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retry Architectural Link
            </button>
            
            {msg.content.includes("Quota Exceeded") && (
              <button 
                onClick={openKeyManager}
                className="flex items-center gap-2 px-6 py-3 bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl hover:bg-indigo-50 active:scale-95"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Update API Key
              </button>
            )}
          </div>
        )}

        {/* Feedback Mechanism */}
        {msg.role === 'model' && !msg.isError && !msg.isLoading && (
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
  );
};
