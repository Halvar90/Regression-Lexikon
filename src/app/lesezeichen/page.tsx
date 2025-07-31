"use client";

import { useBookmarks } from '@/components/context/bookmarks-provider';
import { BookmarkButton } from '@/components/layout/bookmark-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LesezeichenPage() {
  const { bookmarks, removeBookmark } = useBookmarks();
  // const router = useRouter(); // Für zukünftige Navigation

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRemoveBookmark = (slug: string) => {
    removeBookmark(slug);
  };

  if (bookmarks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-slate-400" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Keine Lesezeichen
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                Du hast noch keine Artikel als Lesezeichen gespeichert. 
                Besuche Artikel und klicke auf das Lesezeichen-Symbol, um sie hier zu speichern.
              </p>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Zur Startseite
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Lesezeichen
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {bookmarks.length} Artikel gespeichert
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((bookmark) => (
              <Card 
                key={bookmark.slug} 
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-200"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2">
                      {bookmark.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 ml-2">
                      <BookmarkButton
                        slug={bookmark.slug}
                        title={bookmark.title}
                        href={bookmark.href}
                        className="flex-shrink-0"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveBookmark(bookmark.slug)}
                        className="h-9 w-9 p-0 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                        aria-label="Lesezeichen entfernen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Hinzugefügt am {formatDate(bookmark.addedAt)}
                    </p>
                    <div className="flex gap-2">
                      <Link href={bookmark.href} className="flex-1">
                        <Button 
                          variant="outline" 
                          className="w-full bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Lesen
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 