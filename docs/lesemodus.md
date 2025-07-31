# Lesemodus - Schriftgrößen-Steuerung

## Übersicht

Der Lesemodus ermöglicht es Benutzern, die Schriftgröße der Artikelseiten in drei Stufen anzupassen:
- **Klein**: 16px (text-base)
- **Normal**: 18px (text-lg) - Standard
- **Groß**: 20px (text-xl)

## Funktionen

### Schriftgrößen-Steuerung
- **A- Button**: Verkleinert die Schriftgröße
- **A+ Button**: Vergrößert die Schriftgröße
- **Anzeige**: Zeigt die aktuelle Einstellung (Klein/Normal/Groß)

### Persistierung
- Einstellungen werden im `localStorage` gespeichert
- Beim nächsten Besuch wird die gewählte Schriftgröße automatisch wiederhergestellt

### Responsive Design
- **Desktop**: Steuerelemente sind oben rechts positioniert
- **Mobile**: Steuerelemente sind unter der Überschrift zentriert

## Technische Implementierung

### Komponenten

#### ReadingModeProvider (`src/components/context/reading-mode-provider.tsx`)
- React Context für die Verwaltung der Schriftgrößen-Einstellungen
- localStorage-Integration für Persistierung
- Hook `useReadingMode()` für einfache Verwendung

#### FontSizeControls (`src/components/layout/font-size-controls.tsx`)
- UI-Komponente mit A- und A+ Buttons
- Zeigt aktuelle Einstellung an
- Deaktiviert Buttons bei Min/Max-Werten

#### MarkdownContent (`src/components/layout/markdown-content.tsx`)
- Client-Komponente für Markdown-Rendering
- Integriert Schriftgrößen-Steuerung
- Wendet dynamische CSS-Klassen an

### Verwendung

```tsx
import { ReadingModeProvider } from '@/components/context/reading-mode-provider';
import { useReadingMode } from '@/components/context/reading-mode-provider';

// Provider umschließen
<ReadingModeProvider>
  <YourComponent />
</ReadingModeProvider>

// In Komponenten verwenden
const { fontSize, setFontSize, getFontSizeClass } = useReadingMode();
```

### CSS-Klassen

Die Schriftgrößen werden über Tailwind CSS-Klassen gesteuert:
- `text-base` (16px) für "Klein"
- `text-lg` (18px) für "Normal"
- `text-xl` (20px) für "Groß"

## Benutzerfreundlichkeit

### Zugänglichkeit
- ARIA-Labels für Screen Reader
- Keyboard-Navigation unterstützt
- Kontrastreiche Farben für bessere Lesbarkeit

### Animationen
- Sanfte Übergänge beim Schriftgrößenwechsel
- Hover-Effekte für bessere Interaktivität

### Design
- Moderne, glasartige Steuerelemente
- Konsistent mit dem Gesamtdesign
- Backdrop-Blur für bessere Lesbarkeit 