
import React from 'react';
import { LanguageInfo } from '../../../types';

interface LanguageIdentityProps {
  langInfo: LanguageInfo;
}

export const LanguageIdentity: React.FC<LanguageIdentityProps> = ({ langInfo }) => {
  return (
    <div className="space-y-4">
      <div className={`w-12 h-12 rounded-xl ${langInfo.color} flex items-center justify-center text-2xl shadow-xl`} aria-hidden="true">
         {langInfo.icon}
      </div>
      <h2 className="text-2xl font-bold">{langInfo.name} Core</h2>
      <p className="text-sm text-slate-400 leading-relaxed font-light">
        {langInfo.description}
      </p>
    </div>
  );
};
