"use client";

import React, { useState } from 'react';
import { Twitter, MessageCircle, Link, Check, Instagram } from 'lucide-react';
import { Button } from '../ui/button';
import { createFullUrl } from '@/lib/config';

interface SharingButtonsProps {
  slug: string;
}

export function SharingButtons({ slug }: SharingButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [instagramCopied, setInstagramCopied] = useState(false);
  
  // Erstelle die volle URL der Seite
  const currentUrl = createFullUrl(slug);
  
  // Teilen auf X (Twitter)
  const shareOnTwitter = () => {
    const text = `Schau dir diesen Artikel über Regression an: ${currentUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };
  
  // Teilen auf Reddit
  const shareOnReddit = () => {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent('Interessanter Artikel über Regression')}`;
    window.open(redditUrl, '_blank', 'width=600,height=400');
  };

  // Teilen auf Instagram
  const shareOnInstagram = async () => {
    const text = `Schau dir diesen Artikel über Regression an: ${currentUrl}`;
    
    try {
      // Kopiere den Text in die Zwischenablage
      await navigator.clipboard.writeText(text);
      setInstagramCopied(true);
      
      // Öffne Instagram in neuem Tab
      window.open('https://instagram.com', '_blank');
      
      // Reset nach 3 Sekunden
      setTimeout(() => setInstagramCopied(false), 3000);
    } catch (err) {
      console.error('Fehler beim Kopieren für Instagram:', err);
      // Fallback für ältere Browser
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setInstagramCopied(true);
      window.open('https://instagram.com', '_blank');
      setTimeout(() => setInstagramCopied(false), 3000);
    }
  };
  
  // Link kopieren
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fehler beim Kopieren des Links:', err);
      // Fallback für ältere Browser
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Artikel teilen
        </h3>
        <div className="flex items-center gap-3">
          <Button
            onClick={shareOnTwitter}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            <Twitter className="w-4 h-4" />
            <span className="hidden sm:inline">Auf X teilen</span>
          </Button>
          
          <Button
            onClick={shareOnInstagram}
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 transition-colors ${
              instagramCopied 
                ? 'bg-pink-50 dark:bg-pink-950 border-pink-300 dark:border-pink-700 text-pink-700 dark:text-pink-300'
                : 'hover:bg-pink-50 dark:hover:bg-pink-950 hover:border-pink-300 dark:hover:border-pink-700'
            }`}
          >
            <Instagram className="w-4 h-4" />
            <span className="hidden sm:inline">
              {instagramCopied ? 'Kopiert!' : 'Auf Instagram teilen'}
            </span>
          </Button>
          
          <Button
            onClick={shareOnReddit}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-orange-50 dark:hover:bg-orange-950 hover:border-orange-300 dark:hover:border-orange-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Auf Reddit teilen</span>
          </Button>
          
          <Button
            onClick={copyLink}
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 transition-colors ${
              copied 
                ? 'bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300'
                : 'hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Kopiert!</span>
              </>
            ) : (
              <>
                <Link className="w-4 h-4" />
                <span className="hidden sm:inline">Link kopieren</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 