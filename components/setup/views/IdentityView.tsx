
import React from 'react';

interface IdentityViewProps {
  user: any;
  isAuthenticated: boolean;
  hasCustomKey: boolean;
  loginWithGithub: () => void;
  logout: () => void;
  openKeyManager: () => void;
}

export const IdentityView: React.FC<IdentityViewProps> = ({ user, isAuthenticated, hasCustomKey, loginWithGithub, logout, openKeyManager }) => {
  return (
    <div className="animate-fadeIn p-8">
      <div className="flex flex-col gap-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Architect <br /><span className="text-indigo-500">Identity.</span></h2>
            {isAuthenticated && (
               <div className="px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Architect Level: Standard</span>
               </div>
            )}
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-lg font-light">Hubungkan akun GitHub Anda untuk sinkronisasi cloud blueprint dan kelola kunci API mandiri untuk akses AI tanpa batas.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* GitHub Auth Section */}
          <div className="relative group bg-[#0c1226]/50 border border-white/5 rounded-[2.5rem] p-8 space-y-8 overflow-hidden transition-all hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-600/10 blur-[50px] rounded-full group-hover:bg-indigo-600/20 transition-all duration-500"></div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 rounded-2xl text-white shadow-inner">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">GitHub Sync</span>
                   <span className="text-[8px] font-mono text-indigo-400 opacity-50">v1.2.4-stable</span>
                </div>
              </div>
              {isAuthenticated && (
                <div className="flex items-center gap-2">
                   <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Linked</span>
                   <div className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-[1.5rem] relative group/profile">
                  <div className="relative">
                    <img src={user?.avatarUrl} alt={user?.username} className="w-14 h-14 rounded-2xl border-2 border-white/10 shadow-lg group-hover/profile:border-indigo-500/50 transition-all duration-300" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#070c1b] rounded-full"></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-black text-lg tracking-tight">{user?.username}</p>
                    <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest flex items-center gap-2">
                      Architect Linked
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/5 space-y-4">
                   <button className="w-full py-3.5 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/10">Upgrade to Pro</button>
                   <button onClick={logout} className="w-full py-3.5 rounded-2xl border border-rose-500/10 text-rose-500/60 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-rose-500/5 hover:text-rose-500 hover:border-rose-500/30 transition-all active:scale-95">
                     Disconnect Account
                   </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-xs text-slate-500 leading-relaxed font-light">Aktifkan sinkronisasi otomatis untuk menyimpan riwayat lab Anda di cloud Triad Hub.</p>
                <button onClick={loginWithGithub} className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-50 transition-all shadow-xl shadow-white/5 active:scale-95 flex items-center justify-center gap-3">
                  Authenticate via OAuth
                </button>
              </div>
            )}
          </div>

          {/* BYOK Section */}
          <div className="relative group bg-[#0c1226]/50 border border-white/5 rounded-[2.5rem] p-8 space-y-8 overflow-hidden transition-all hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-600/10 blur-[50px] rounded-full group-hover:bg-emerald-600/20 transition-all duration-500"></div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 rounded-2xl text-indigo-400 shadow-inner">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">BYOK Engine</span>
                   <span className="text-[8px] font-mono text-emerald-400 opacity-50">Gemini-3-Pro Ready</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Gunakan API Key Gemini Pro Anda untuk kuota tak terbatas. Sesi Anda akan diprioritaskan oleh model Gemini 3 Pro.
              </p>
              
              <button onClick={openKeyManager} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3">
                Manage Secure Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
