# Lesezeichen-System

## Übersicht

Das Lesezeichen-System ermöglicht es Benutzern, Artikel als Lesezeichen zu speichern und später wiederzufinden. Alle Lesezeichen werden im `localStorage` des Browsers gespeichert und sind persistent.

## Funktionen

### Lesezeichen hinzufügen/entfernen
- **Lesezeichen-Button**: Auf jeder Artikelseite verfügbar
- **Visueller Status**: Gefülltes/leeres Icon zeigt den aktuellen Status
- **Toggle-Funktion**: Ein Klick fügt hinzu, ein weiterer entfernt das Lesezeichen

### Lesezeichen-Seite (`/lesezeichen`)
- **Übersicht**: Zeigt alle gespeicherten Artikel als Karten an
- **Sortierung**: Nach Datum des Hinzufügens (neueste zuerst)
- **Aktionen**: Direktes Lesen und Entfernen von Lesezeichen
- **Leerer Zustand**: Hilfreiche Nachricht wenn keine Lesezeichen vorhanden sind

### Persistierung
- **localStorage**: Alle Lesezeichen werden automatisch gespeichert
- **Browser-unabhängig**: Lesezeichen bleiben auch nach Browser-Neustart erhalten
- **Fehlerbehandlung**: Robuste Behandlung von localStorage-Fehlern

## Technische Implementierung

### Komponenten

#### BookmarksProvider (`src/components/context/bookmarks-provider.tsx`)
- React Context für die globale Verwaltung der Lesezeichen
- localStorage-Integration für Persistierung
- Hook `useBookmarks()` für einfache Verwendung
- Funktionen: `addBookmark`, `removeBookmark`, `isBookmarked`, `toggleBookmark`

#### BookmarkButton (`src/components/layout/bookmark-button.tsx`)
- UI-Komponente für das Hinzufügen/Entfernen von Lesezeichen
- Dynamisches Icon (gefüllt/leer) basierend auf dem Status
- Animation beim Klicken
- ARIA-Labels für Barrierefreiheit

#### LesezeichenPage (`src/app/lesezeichen/page.tsx`)
- Übersichtsseite für alle gespeicherten Lesezeichen
- Responsive Grid-Layout
- Karten-Design mit Titel, Datum und Aktionen
- Leerer Zustand mit Call-to-Action

### Datenstruktur

```typescript
interface BookmarkItem {
  slug: string;        // Eindeutiger Identifier (Dateiname)
  title: string;       // Anzeigename des Artikels
  href: string;        // URL des Artikels
  addedAt: string;     // ISO-Datum des Hinzufügens
}
```

### Verwendung

```tsx
import { useBookmarks } from '@/components/context/bookmarks-provider';
import { BookmarkButton } from '@/components/layout/bookmark-button';

// In Komponenten verwenden
const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();

// Lesezeichen-Button verwenden
<BookmarkButton
  slug="01-grundlagen-und-definitionen"
  title="Grundlagen & Definitionen"
  href="/grundlagen"
/>
```

## Benutzerfreundlichkeit

### Navigation
- **Header-Link**: Direkter Zugang zu den Lesezeichen über den Header
- **Breadcrumb**: Klare Navigation zur Lesezeichen-Seite
- **Zurück-Navigation**: Einfache Rückkehr zu Artikeln

### Visuelles Feedback
- **Icon-Status**: Gefülltes/leeres Lesezeichen-Icon
- **Animationen**: Sanfte Übergänge beim Hinzufügen/Entfernen
- **Hover-Effekte**: Interaktive Elemente reagieren auf Mausbewegungen

### Responsive Design
- **Desktop**: Steuerelemente sind neben der Schriftgrößen-Steuerung
- **Mobile**: Steuerelemente sind unter der Überschrift
- **Karten-Layout**: Responsive Grid für verschiedene Bildschirmgrößen

## Speicherung

### localStorage-Schlüssel
- **Schlüssel**: `regression-lexikon-bookmarks`
- **Format**: JSON-Array von BookmarkItem-Objekten
- **Persistierung**: Bleibt auch nach Browser-Neustart erhalten

### Fehlerbehandlung
- **JSON-Parsing**: Sichere Verarbeitung von localStorage-Daten
- **Fallback**: Leeres Array bei ungültigen Daten
- **Console-Logs**: Hilfreiche Fehlermeldungen für Entwickler

## Barrierefreiheit

### ARIA-Labels
- **Button-Labels**: "Lesezeichen hinzufügen" / "Lesezeichen entfernen"
- **Entfernen-Button**: "Lesezeichen entfernen" auf der Übersichtsseite

### Keyboard-Navigation
- **Tab-Reihenfolge**: Logische Navigation durch alle interaktiven Elemente
- **Enter/Space**: Aktivierung von Buttons über Tastatur

### Screen Reader
- **Semantische Struktur**: Korrekte HTML-Struktur für Screen Reader
- **Status-Anzeige**: Klare Kommunikation des Lesezeichen-Status 