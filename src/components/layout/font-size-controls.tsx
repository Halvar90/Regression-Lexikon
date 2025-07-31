"use client";

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReadingMode, FontSize } from '@/components/context/reading-mode-provider';

export function FontSizeControls() {
  const { fontSize, setFontSize } = useReadingMode();

  const decreaseFontSize = () => {
    const sizes: FontSize[] = ['small', 'normal', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };

  const increaseFontSize = () => {
    const sizes: FontSize[] = ['small', 'normal', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
    }
  };

  const getFontSizeLabel = () => {
    switch (fontSize) {
      case 'small':
        return 'Klein';
      case 'large':
        return 'Groß';
      default:
        return 'Normal';
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-3 shadow-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={increaseFontSize}
        disabled={fontSize === 'large'}
        className="h-9 w-9 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 transition-all duration-200"
        aria-label="Schriftgröße vergrößern"
      >
        <Plus className="h-4 w-4" />
      </Button>
      
      <div className="flex flex-col items-center min-w-[50px]">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Schrift
        </span>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {getFontSizeLabel()}
        </span>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={decreaseFontSize}
        disabled={fontSize === 'small'}
        className="h-9 w-9 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 transition-all duration-200"
        aria-label="Schriftgröße verkleinern"
      >
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
} 