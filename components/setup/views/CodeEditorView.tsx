
import React from 'react';
import { ConfigType } from '../../../pages/SetupPage';

interface CodeEditorViewProps {
  activeConfig: 'nix' | 'devcontainer' | ConfigType;
  configs: any;
  copyToClipboard: (text: string) => void;
}

export const CodeEditorView: React.FC<CodeEditorViewProps> = ({ activeConfig, configs, copyToClipboard }) => {
  const currentConfig = configs[activeConfig as 'nix' | 'devcontainer'];
  if (!currentConfig) return null;

  const renderCodeWithLineNumbers = (code: string, lang: string) => {
    const lines = code.trim().split('\n');
    return (
      <div className="flex font-mono text-[11px] md:text-xs leading-[2.2] group selection:bg-indigo-500/40">
        <div className="flex flex-col text-right pr-4 mr-8 border-r border-white/5 text-slate-700 select-none min-w-[3.5rem] bg-slate-950/20">
          {lines.map((_, i) => (
            <span key={i} className="group-hover:text-slate-500 transition-colors">
              {String(i + 1).padStart(2, '0')}
            </span>
          ))}
        </div>
        <pre className={`language-${lang} !p-0 !m-0 !bg-transparent overflow-visible flex-1`}>
          <code className={`language-${lang} code-font block`}>
            {code.trim()}
          </code>
        </pre>
      </div>
    );
  };

  return (
    <div className="flex-1 animate-fadeIn p-8 custom-scrollbar">
      <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex flex-col">
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            {currentConfig.path}
          </div>
          <div className="text-sm font-bold text-white font-mono">
            {currentConfig.filename}
          </div>
        </div>
        <button 
          onClick={() => copyToClipboard(currentConfig.content)} 
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          Copy Code
        </button>
      </div>
      <div className="bg-slate-950/30 rounded-2xl p-6 border border-white/5">
        {renderCodeWithLineNumbers(currentConfig.content, currentConfig.lang)}
      </div>
    </div>
  );
};
