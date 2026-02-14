
import React from 'react';
import { ConfigType } from '../../pages/SetupPage';

interface TabBarProps {
  activeConfig: ConfigType;
  setActiveConfig: (config: ConfigType) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeConfig, setActiveConfig }) => {
  const tabs: { id: ConfigType; label: string; icon: string }[] = [
    { id: 'identity', label: 'Identity', icon: '🔑' },
    { id: 'wizard', label: 'Wizard', icon: '🪄' },
    { id: 'starter', label: 'Starter', icon: '📖' },
    { id: 'nix', label: 'Nix', icon: '❄️' },
    { id: 'devcontainer', label: 'Container', icon: '📦' },
  ];

  return (
    <div className="h-11 bg-[#050814] flex items-center px-2 overflow-x-auto no-scrollbar border-b border-white/5 shrink-0">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveConfig(tab.id)}
          className={`flex items-center gap-3 px-6 h-full text-[10px] font-bold uppercase tracking-widest transition-all ${
            activeConfig === tab.id ? 'bg-[#070c1b] text-white shadow-[0_-2px_0_0_#6366f1_inset]' : 'text-slate-600 hover:bg-white/5'
          }`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
};
