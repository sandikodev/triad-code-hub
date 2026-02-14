
import React, { useEffect } from 'react';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  // Global cursor tracking for follow-the-cursor tooltips
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AuthProvider>
      <ChatProvider>
        <HashRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/setup" element={<SetupPage />} />
              <Route path="/blueprints" element={<BlueprintsPage />} />
              <Route path="/vision" element={<FuturePage />} />
              <Route path="/lab/:lang" element={<TutorLab />} />
            </Routes>
          </div>
        </HashRouter>
      </ChatProvider>
    </AuthProvider>
  );
};

export default App;
