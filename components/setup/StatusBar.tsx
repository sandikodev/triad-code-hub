
import React from 'react';
import { ConfigType } from '../../pages/SetupPage';

interface StatusBarProps {
  activeConfig: ConfigType;
  hasCustomKey: boolean;
  user: any;
  isAuthenticated: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ activeConfig, hasCustomKey, user, isAuthenticated }) => {
  return (
    <div className="h-7 bg-indigo-700 flex items-center px-4 justify-between select-none shrink-0">
      <div className="flex items-center gap-5">
        <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Env v2.1</span>
        <span className="text-[9px] text-white/50 tracking-widest hidden md:inline uppercase">Active: {activeConfig}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[9px] font-black text-white uppercase tracking-widest">
          BYOK: {hasCustomKey ? 'PRO' : 'PUBLIC'}
        </span>
        <div className="w-px h-3 bg-white/20 mx-1"></div>
        <span className="text-[9px] font-black text-white uppercase tracking-widest">
          USER: {isAuthenticated ? user?.username : 'GUEST'}
        </span>
      </div>
    </div>
  );
};
