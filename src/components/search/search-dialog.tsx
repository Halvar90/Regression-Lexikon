"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SearchItem {
  titel: string;
  href: string;
  keywords?: string[];
  content?: string;
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<SearchItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      loadSearchIndex();
    }
  }, [open]);

  const loadSearchIndex = async () => {
    setLoading(true);
    try {
      const response = await fetch('/search-index.json');
      if (response.ok) {
        const data = await response.json();
        setSearchItems(data);
      } else {
        console.error('Fehler beim Laden des Search-Index');
        setSearchItems([]);
      }
    } catch (error) {
      console.error('Fehler beim Laden des Search-Index:', error);
      setSearchItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Keyboard shortcut für die Suche (Cmd/Ctrl + K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Funktion zum Filtern der Suchergebnisse
  const filterItems = (query: string, items: SearchItem[]) => {
    if (!query.trim()) {
      return items;
    }
    
    const searchTerms = query.toLowerCase().split(/\s+/);
    
    return items.filter(item => {
      const searchableText = [
        item.titel.toLowerCase(),
        ...(item.keywords || []),
        ...(item.content ? [item.content.toLowerCase()] : [])
      ].join(' ');
      
      return searchTerms.every(term => searchableText.includes(term));
    });
  };

  // Effekt zum Filtern der Ergebnisse bei Änderung der Suchanfrage
  useEffect(() => {
    const filtered = filterItems(searchQuery, searchItems);
    setFilteredItems(filtered);
  }, [searchQuery, searchItems]);

  const handleSelect = (href: string) => {
    setOpen(false);
    setSearchQuery('');
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0"
          aria-label="Suchen"
        >
          <Search className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5" />
            Suchen
            <span className="text-xs text-muted-foreground font-normal ml-auto">
              ⌘K
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Command className="rounded-lg border shadow-md">
            <CommandInput 
              placeholder="Suche nach Seiten, Begriffen oder Inhalten..." 
              className="h-12 text-base"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList className="max-h-[400px] overflow-y-auto">
              <CommandEmpty>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="ml-3 text-muted-foreground">Lade Inhalte...</span>
                  </div>
                ) : searchQuery ? (
                  <div className="text-center py-8">
                    <Search className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Keine Ergebnisse für &ldquo;{searchQuery}&rdquo; gefunden.</p>
                    <p className="text-sm text-muted-foreground mt-1">Versuche andere Suchbegriffe.</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Search className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Beginne mit der Eingabe, um zu suchen.</p>
                  </div>
                )}
              </CommandEmpty>
              <CommandGroup heading={searchQuery ? `Suchergebnisse (${filteredItems.length})` : "Alle Seiten"}>
                {filteredItems.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${item.titel} ${item.keywords?.join(' ') || ''} ${item.content || ''}`}
                    onSelect={() => handleSelect(item.href)}
                    className="cursor-pointer p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex flex-col space-y-1 w-full">
                      <span className="font-semibold text-base">{item.titel}</span>
                      {item.content && (
                        <span className="text-sm text-muted-foreground line-clamp-2">
                          {item.content}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
} 