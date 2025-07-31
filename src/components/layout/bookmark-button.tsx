"use client";

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarks, BookmarkItem } from '../context/bookmarks-provider';
import { useState } from 'react';

interface BookmarkButtonProps {
  slug: string;
  title: string;
  href: string;
  className?: string;
}

export function BookmarkButton({ slug, title, href, className = "" }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [isAnimating, setIsAnimating] = useState(false);

  const bookmarked = isBookmarked(slug);

  const handleClick = () => {
    setIsAnimating(true);
    
    const bookmarkItem: Omit<BookmarkItem, 'addedAt'> = {
      slug,
      title,
      href,
    };
    
    toggleBookmark(bookmarkItem);
    
    // Animation zurücksetzen
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={`h-9 w-9 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 ${className} ${
        isAnimating ? 'scale-110' : ''
      }`}
      aria-label={bookmarked ? 'Lesezeichen entfernen' : 'Lesezeichen hinzufügen'}
    >
      {bookmarked ? (
        <BookmarkCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      ) : (
        <Bookmark className="h-4 w-4 text-slate-600 dark:text-slate-400" />
      )}
    </Button>
  );
} 