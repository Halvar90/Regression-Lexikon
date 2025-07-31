"use client";

import { useState, useEffect } from "react";

export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    // Initial progress berechnen
    updateProgress();

    // Event listener für Scroll-Events
    window.addEventListener('scroll', updateProgress, { passive: true });

    // Event listener für Resize-Events (falls sich die Fenstergröße ändert)
    window.addEventListener('resize', updateProgress, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-background/20 z-50">
      <div 
        className="h-full bg-accent transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 