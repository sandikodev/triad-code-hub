
import React from 'react';
import { LanguageInfo } from '../../types';
import { LanguageIdentity } from './sidebar/LanguageIdentity';
import { ContextNodeList } from './sidebar/ContextNodeList';
import { SidebarTip } from './sidebar/SidebarTip';

interface LabSidebarProps {
  langInfo: LanguageInfo;
}

export const LabSidebar: React.FC<LabSidebarProps> = ({ langInfo }) => {
  return (
    <aside className="w-80 border-r border-slate-800 p-6 flex flex-col gap-8 bg-slate-950 overflow-y-auto overflow-x-hidden hidden lg:flex" aria-label="Informasi Bahasa dan Alat Bantu">
      <LanguageIdentity langInfo={langInfo} />
      
      <ContextNodeList />

      <SidebarTip />
    </aside>
  );
};
