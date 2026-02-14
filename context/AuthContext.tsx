
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasCustomKey: boolean;
  loginWithGithub: () => void;
  logout: () => void;
  openKeyManager: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCustomKey, setHasCustomKey] = useState(false);

  useEffect(() => {
    // Sync with local state
    const checkAuthStatus = async () => {
      const savedUser = localStorage.getItem('triadhub_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
      
      // Use the window.aistudio helper if available to check for selected key
      if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        setHasCustomKey(hasKey);
      } else {
        const savedKey = localStorage.getItem('API_KEY');
        if (savedKey) setHasCustomKey(true);
      }
    };

    checkAuthStatus();
  }, []);

  const loginWithGithub = () => {
    // Mock GitHub login for demonstration
    const mockUser = {
      username: 'Architect_User',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Architect'
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('triadhub_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('triadhub_user');
  };

  const openKeyManager = async () => {
    if (typeof (window as any).aistudio?.openSelectKey === 'function') {
      await (window as any).aistudio.openSelectKey();
      // Assume success as per instructions to avoid race condition delays
      setHasCustomKey(true);
    } else {
      const key = prompt("Enter your Gemini API Key for BYOK mode:");
      if (key) {
        localStorage.setItem('API_KEY', key);
        setHasCustomKey(true);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, hasCustomKey, loginWithGithub, logout, openKeyManager }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
