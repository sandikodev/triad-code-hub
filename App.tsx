
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TutorLab from './pages/TutorLab';
import SetupPage from './pages/SetupPage';
import { ChatProvider } from './context/ChatContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ChatProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/lab/:lang" element={<TutorLab />} />
          </Routes>
        </div>
      </HashRouter>
    </ChatProvider>
  );
};

export default App;
