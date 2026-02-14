
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ChatMessage, LanguageType } from '../types';
import { getGeminiResponse } from '../services/geminiService';

interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  feedbackHistory: Record<string, 'positive' | 'negative'>;
  sendMessage: (content: string, language: LanguageType | 'General') => Promise<void>;
  handleFeedback: (messageId: string, rating: 'positive' | 'negative') => void;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState<Record<string, 'positive' | 'negative'>>({});

  useEffect(() => {
    const storedFeedback = localStorage.getItem('triadhub_chat_feedback');
    if (storedFeedback) {
      try {
        setFeedbackHistory(JSON.parse(storedFeedback));
      } catch (e) {
        console.error("Failed to load feedback history", e);
      }
    }
  }, []);

  const handleFeedback = useCallback((messageId: string, rating: 'positive' | 'negative') => {
    setFeedbackHistory(prev => {
      const newHistory = { ...prev, [messageId]: rating };
      localStorage.setItem('triadhub_chat_feedback', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const sendMessage = useCallback(async (content: string, language: LanguageType | 'General') => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const responseText = await getGeminiResponse(content, language);
      const modelMessage: ChatMessage = {
        id: generateId(),
        role: 'model',
        content: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Failed to send message", error);
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
