
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ChatMessage, LanguageType } from '../types';
import { getGeminiResponse } from '../services/geminiService';

interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  feedbackHistory: Record<string, 'positive' | 'negative'>;
  sendMessage: (content: string, language: LanguageType | 'General', isRetry?: boolean) => Promise<void>;
  handleFeedback: (messageId: string, rating: 'positive' | 'negative') => void;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const STORAGE_KEY_MESSAGES = 'triadhub_chat_messages';
const STORAGE_KEY_FEEDBACK = 'triadhub_chat_feedback';

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize messages from localStorage
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MESSAGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure timestamps are converted back to Date objects and filter out any orphaned loading states
        return parsed
          .filter((m: any) => !m.isLoading)
          .map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }));
      }
    } catch (e) {
      console.error("Failed to load chat messages from localStorage", e);
    }
    return [];
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize feedback history from localStorage
  const [feedbackHistory, setFeedbackHistory] = useState<Record<string, 'positive' | 'negative'>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FEEDBACK);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load feedback history from localStorage", e);
    }
    return {};
  });

  // Persist messages to localStorage whenever they change, filtering out active loading states
  useEffect(() => {
    try {
      const messagesToSave = messages.filter(m => !m.isLoading);
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messagesToSave));
    } catch (e) {
      console.error("Failed to save chat messages to localStorage", e);
    }
  }, [messages]);

  const handleFeedback = useCallback((messageId: string, rating: 'positive' | 'negative') => {
    setFeedbackHistory(prev => {
      const newHistory = { ...prev, [messageId]: rating };
      try {
        localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(newHistory));
      } catch (e) {
        console.error("Failed to save feedback to localStorage", e);
      }
      return newHistory;
    });
  }, []);

  const sendMessage = useCallback(async (content: string, language: LanguageType | 'General', isRetry: boolean = false) => {
    if (!content.trim() || isLoading) return;

    if (!isRetry) {
      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: content,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
    } else {
      // If it's a retry, remove the last error message from the history to replace it
      setMessages(prev => {
        if (prev.length > 0 && prev[prev.length - 1].isError) {
          return prev.slice(0, -1);
        }
        return prev;
      });
    }

    // Create a placeholder message for the AI response
    const modelResponseId = generateId();
    const placeholderMessage: ChatMessage = {
      id: modelResponseId,
      role: 'model',
      content: '',
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prev => [...prev, placeholderMessage]);
    setIsLoading(true);

    try {
      const responseText = await getGeminiResponse(content, language);
      setMessages(prev => prev.map(m => 
        m.id === modelResponseId 
          ? { ...m, content: responseText, isLoading: false } 
          : m
      ));
    } catch (error: any) {
      console.error("Failed to send message", error);
      
      let errorText = "Gagal menghubungkan ke Arsitektur AI. Sinyal terputus atau terjadi gangguan pada tautan blueprint.";
      if (error?.message?.includes('429') || error?.message?.includes('quota')) {
        errorText = "Sistem sedang mengalami beban tinggi (Quota Exceeded). Silakan coba sesaat lagi.";
      }

      setMessages(prev => prev.map(m => 
        m.id === modelResponseId 
          ? { ...m, content: errorText, isLoading: false, isError: true } 
          : m
      ));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <ChatContext.Provider value={{ 
      messages, 
      isLoading, 
      feedbackHistory, 
      sendMessage, 
      handleFeedback,
      setMessages 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
