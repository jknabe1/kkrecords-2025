'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Language, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, isValidLanguage } from '@/lib/languages';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage: Language;
}

/**
 * Provider component that manages language state for the entire application
 */
export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [language, setLanguage] = React.useState<Language>(() => {
    return isValidLanguage(initialLanguage) ? initialLanguage : DEFAULT_LANGUAGE;
  });

  const value: LanguageContextType = {
    language,
    setLanguage,
    availableLanguages: SUPPORTED_LANGUAGES as Language[],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access the current language context
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
