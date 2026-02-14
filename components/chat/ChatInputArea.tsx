
import React from 'react';

interface ChatInputAreaProps {
  input: string;
  setInput: (val: string) => void;
  isLoading: boolean;
  handleSend: (customInput?: string) => void;
  setShowSuggestions: (val: boolean) => void;
  currentLanguage: string;
}

export const ChatInputArea: React.FC<ChatInputAreaProps> = ({ 
  input, setInput, isLoading, handleSend, setShowSuggestions, currentLanguage 
}) => {
  return (
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
        <div className="premium-tooltip">Kirim ke Architectural Mentor</div>
      </div>
    </div>
  );
};
