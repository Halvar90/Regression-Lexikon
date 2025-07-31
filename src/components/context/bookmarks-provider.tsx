"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BookmarkItem {
  slug: string;
  title: string;
  href: string;
  addedAt: string;
}

interface BookmarksContextType {
  bookmarks: BookmarkItem[];
  addBookmark: (item: Omit<BookmarkItem, 'addedAt'>) => void;
  removeBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (item: Omit<BookmarkItem, 'addedAt'>) => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

interface BookmarksProviderProps {
  children: ReactNode;
}

export function BookmarksProvider({ children }: BookmarksProviderProps) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  // Lade Lesezeichen aus localStorage beim ersten Laden
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('regression-lexikon-bookmarks');
      if (savedBookmarks) {
        const parsedBookmarks = JSON.parse(savedBookmarks);
        if (Array.isArray(parsedBookmarks)) {
          setBookmarks(parsedBookmarks);
        }
      }
    } catch (error) {
      console.error('Fehler beim Laden der Lesezeichen:', error);
    }
  }, []);

  // Speichere Lesezeichen in localStorage
  const saveBookmarks = (newBookmarks: BookmarkItem[]) => {
    try {
      localStorage.setItem('regression-lexikon-bookmarks', JSON.stringify(newBookmarks));
    } catch (error) {
      console.error('Fehler beim Speichern der Lesezeichen:', error);
    }
  };

  // Lesezeichen hinzufügen
  const addBookmark = (item: Omit<BookmarkItem, 'addedAt'>) => {
    const newBookmark: BookmarkItem = {
      ...item,
      addedAt: new Date().toISOString(),
    };
    
    const newBookmarks = [...bookmarks, newBookmark];
    setBookmarks(newBookmarks);
    saveBookmarks(newBookmarks);
  };

  // Lesezeichen entfernen
  const removeBookmark = (slug: string) => {
    const newBookmarks = bookmarks.filter(bookmark => bookmark.slug !== slug);
    setBookmarks(newBookmarks);
    saveBookmarks(newBookmarks);
  };

  // Prüfen ob Artikel bereits als Lesezeichen gespeichert ist
  const isBookmarked = (slug: string): boolean => {
    return bookmarks.some(bookmark => bookmark.slug === slug);
  };

  // Lesezeichen umschalten (hinzufügen/entfernen)
  const toggleBookmark = (item: Omit<BookmarkItem, 'addedAt'>) => {
    if (isBookmarked(item.slug)) {
      removeBookmark(item.slug);
    } else {
      addBookmark(item);
    }
  };

  const value: BookmarksContextType = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
  };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
}

// Hook für die Verwendung des Contexts
export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
} 