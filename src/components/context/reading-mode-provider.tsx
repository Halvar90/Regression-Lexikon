"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type FontSize = 'small' | 'normal' | 'large';

interface ReadingModeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  getFontSizeClass: () => string;
}

const ReadingModeContext = createContext<ReadingModeContextType | undefined>(undefined);

interface ReadingModeProviderProps {
  children: ReactNode;
}

export function ReadingModeProvider({ children }: ReadingModeProviderProps) {
  const [fontSize, setFontSizeState] = useState<FontSize>('normal');

  // Lade Einstellung aus localStorage beim ersten Laden
  useEffect(() => {
    const savedFontSize = localStorage.getItem('reading-mode-font-size') as FontSize;
    if (savedFontSize && ['small', 'normal', 'large'].includes(savedFontSize)) {
      setFontSizeState(savedFontSize);
    }
  }, []);

  // Speichere Einstellung in localStorage
  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem('reading-mode-font-size', size);
  };

  // CSS-Klassen für verschiedene Schriftgrößen
  const getFontSizeClass = (): string => {
    switch (fontSize) {
      case 'small':
        return 'text-base'; // 16px
      case 'large':
        return 'text-xl'; // 20px
      default:
        return 'text-lg'; // 18px (normal)
    }
  };

  const value: ReadingModeContextType = {
    fontSize,
    setFontSize,
    getFontSizeClass,
  };

  return (
    <ReadingModeContext.Provider value={value}>
      {children}
    </ReadingModeContext.Provider>
  );
}

// Hook für die Verwendung des Contexts
export function useReadingMode() {
  const context = useContext(ReadingModeContext);
  if (context === undefined) {
    throw new Error('useReadingMode must be used within a ReadingModeProvider');
  }
  return context;
} 