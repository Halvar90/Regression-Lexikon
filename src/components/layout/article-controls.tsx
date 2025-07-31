"use client";

import React, { useState, useEffect } from 'react';
import { FontSizeControls } from './font-size-controls';
import { BookmarkButton } from './bookmark-button';

interface ArticleControlsProps {
  slug?: string;
  title?: string;
  href?: string;
}

export function ArticleControls({ slug, title, href }: ArticleControlsProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Berechne den Kreis-Fortschritt (0-100%)
  const circleProgress = scrollProgress;
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (circleProgress / 100) * circumference;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 p-2 backdrop-blur-sm lg:sticky lg:top-24 lg:z-auto lg:w-auto lg:border-none lg:bg-transparent lg:p-0">
      <div className="flex flex-row justify-around items-center lg:flex-col lg:items-center lg:gap-6 lg:justify-start lg:pr-180">
        {/* Lesefortschrittsanzeige als Kreis */}
        <div className="relative w-12 h-12 group">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 40 40">
            {/* Hintergrund-Kreis */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              className="text-slate-200 dark:text-slate-700"
            />
            {/* Fortschritts-Kreis */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-blue-500 dark:text-blue-400 transition-all duration-500 ease-out drop-shadow-sm"
            />
          </svg>
          {/* Prozentanzeige in der Mitte */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {Math.round(circleProgress)}%
            </span>
          </div>
        </div>

        {/* Lesezeichen-Button */}
        {slug && title && href && (
          <BookmarkButton
            slug={slug}
            title={title}
            href={href}
            className="h-12 w-12"
          />
        )}

        {/* Schriftgrößeneinstellung */}
        <FontSizeControls />
      </div>
    </div>
  );
} 