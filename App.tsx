import React, { useEffect, useState, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TutorLab from './pages/TutorLab';
import SetupPage from './pages/SetupPage';
import BlueprintsPage from './pages/BlueprintsPage';
import FuturePage from './pages/FuturePage';
import { ChatProvider } from './context/ChatContext';
import { AuthProvider } from './context/AuthContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Only scroll to top if we are not navigating to pricing section
    if (pathname !== '/pricing') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);
  return null;
};

const GlobalTooltip = () => {
  const [content, setContent] = useState<{ label: string | null; text: string | null }>({ label: null, text: null });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const currentTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = tooltipRef.current;
      if (!el) return;

      const target = (e.target as HTMLElement).closest('[data-tooltip]') as HTMLElement;
      
      if (target) {
        if (currentTargetRef.current !== target) {
          currentTargetRef.current = target;
          const tooltipText = target.getAttribute('data-tooltip');
          const tooltipLabel = target.getAttribute('data-tooltip-label');
          setContent({ label: tooltipLabel, text: tooltipText });
        }

        const xOffset = 20;
        const yOffset = 20;
        let x = e.clientX + xOffset;
        let y = e.clientY + yOffset;

        const tooltipWidth = el.offsetWidth || 200;
        const tooltipHeight = el.offsetHeight || 50;
        const padding = 20;

        if (x + tooltipWidth > window.innerWidth - padding) {
          x = e.clientX - tooltipWidth - xOffset;
        }
        if (y + tooltipHeight > window.innerHeight - padding) {
          y = e.clientY - tooltipHeight - yOffset;
        }

        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        el.classList.add('visible');
      } else {
        if (currentTargetRef.current !== null) {
          currentTargetRef.current = null;
          setContent({ label: null, text: null });
        }
        el.classList.remove('visible');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); 

  return (
    <div 
      ref={tooltipRef}
      className="global-premium-tooltip"
      aria-hidden="true"
    >
      {content.label && <span className="tooltip-label">{content.label}</span>}
      {content.text}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <HashRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<LandingPage />} />
              <Route path="/setup" element={<SetupPage />} />
              <Route path="/blueprints" element={<BlueprintsPage />} />
              <Route path="/vision" element={<FuturePage />} />
              <Route path="/lab/:lang" element={<TutorLab />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </div>
          <GlobalTooltip />
        </HashRouter>
      </ChatProvider>
    </AuthProvider>
  );
};

export default App;