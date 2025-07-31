const fs = require('fs');
const path = require('path');

// Mapping von Dateinamen zu URLs (basierend auf der Projektstruktur)
const fileToUrlMapping = {
  '00-inhaltsuebersicht.md': '/',
  '01-grundlagen-und-definitionen.md': '/grundlagen',
  '02-psychologische-hintergruende.md': '/psychologische-hintergruende',
  '03-freiwillig-vs-unfreiwillig.md': '/freiwillig-vs-unfreiwillig',
  '04-merkmale-und-erscheinungsformen.md': '/merkmale-und-erscheinungsformen',
  '05-ursachen-und-ausloeser.md': '/ursachen-und-ausloeser',
  '06-die-rolle-des-caregivers.md': '/die-rolle-des-caregivers',
  '07-die-dunkle-seite-risiken-und-ungesunde-dynamiken.md': '/risiken-und-ungesunde-dynamiken',
  '08-abgrenzung-zu-kink-und-bdsm.md': '/abgrenzung-kink-bdsm',
  '09-abgrenzung-zu-anderen-identitaeten.md': '/abgrenzung-anderen-identitaeten',
  '10-therapeutische-perspektiven.md': '/therapeutische-perspektiven',
  '11-die-rolle-von-online-communities.md': '/die-rolle-von-online-communities',
  '12-spezifische-formen-und-unterarten.md': '/spezifische-formen-und-unterarten',
  '13-praktische-tipps-fuer-betroffene.md': '/tipps-fuer-betroffene',
  '14-praktische-tipps-fuer-das-umfeld.md': '/tipps-fuer-das-umfeld',
  '15-regression-im-tierreich.md': '/regression-im-tierreich',
  '16-rechtliche-aspekte.md': '/rechtliche-aspekte',
  '17-zusammenfassung-und-ausblick.md': '/zusammenfassung-und-ausblick',
  '18-glossar-wichtige-begriffe-erklaert.md': '/glossar',
  '19-hilfsangebote-und-anlaufstellen.md': '/hilfsangebote-und-anlaufstellen'
};

// Mapping von URLs zu benutzerfreundlichen Titeln
const urlToTitleMapping = {
  '/': 'Inhaltsübersicht',
  '/grundlagen': 'Grundlagen & Definitionen',
  '/psychologische-hintergruende': 'Psychologische Hintergründe',
  '/freiwillig-vs-unfreiwillig': 'Freiwillig vs. Unfreiwillig',
  '/merkmale-und-erscheinungsformen': 'Merkmale & Erscheinungsformen',
  '/ursachen-und-ausloeser': 'Ursachen & Auslöser',
  '/die-rolle-des-caregivers': 'Die Rolle des Caregivers',
  '/risiken-und-ungesunde-dynamiken': 'Risiken & Ungesunde Dynamiken',
  '/abgrenzung-kink-bdsm': 'Abgrenzung zu Kink/BDSM',
  '/abgrenzung-anderen-identitaeten': 'Abgrenzung zu anderen Identitäten',
  '/therapeutische-perspektiven': 'Therapeutische Perspektiven',
  '/die-rolle-von-online-communities': 'Die Rolle von Online-Communities',
  '/spezifische-formen-und-unterarten': 'Spezifische Formen & Unterarten',
  '/tipps-fuer-betroffene': 'Tipps für Betroffene',
  '/tipps-fuer-das-umfeld': 'Tipps für das Umfeld',
  '/regression-im-tierreich': 'Regression im Tierreich',
  '/rechtliche-aspekte': 'Rechtliche Aspekte',
  '/zusammenfassung-und-ausblick': 'Zusammenfassung & Ausblick',
  '/glossar': 'Glossar - Wichtige Begriffe erklärt',
  '/hilfsangebote-und-anlaufstellen': 'Hilfsangebote & Anlaufstellen'
};

// Funktion zum Bereinigen von Markdown-Text für die Suche
function cleanMarkdownContent(content) {
  return content
    .replace(/^#+\s+/gm, '') // Entferne Markdown-Überschriften
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Entferne Links, behalte Text
    .replace(/[*_`~]/g, '') // Entferne Markdown-Formatierung
    .replace(/\n+/g, ' ') // Ersetze Zeilenumbrüche durch Leerzeichen
    .replace(/\s+/g, ' ') // Normalisiere Whitespace
    .trim();
}

// Funktion zum Extrahieren von Schlüsselwörtern aus dem Inhalt
function extractKeywords(content, title) {
  const cleanedContent = cleanMarkdownContent(content);
  const words = cleanedContent.toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3) // Nur Wörter mit mehr als 3 Zeichen
    .filter(word => !/^(der|die|das|und|oder|aber|auch|nur|noch|schon|wenn|dann|dass|mit|von|aus|bei|nach|vor|über|unter|zwischen|durch|für|gegen|ohne|um|an|auf|in|zu|zur|zum|bei|seit|bis|ab|von|aus|nach|vor|über|unter|zwischen|durch|für|gegen|ohne|um|an|auf|in|zu|zur|zum|bei|seit|bis|ab)$/.test(word)); // Entferne Stop-Wörter
  
  // Füge auch Wörter aus dem Titel hinzu
  const titleWords = title.toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2);
  
  return [...new Set([...titleWords, ...words.slice(0, 50)])]; // Maximal 50 Schlüsselwörter
}

function buildSearchIndex() {
  const contentDir = path.join(__dirname, '..', 'src', 'content');
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Stelle sicher, dass der public-Ordner existiert
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const searchIndex = [];
  
  // Lese alle Markdown-Dateien im content-Ordner
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  
  files.forEach(file => {
    const url = fileToUrlMapping[file];
    if (url) {
      const title = urlToTitleMapping[url];
      if (title) {
        // Lese den Inhalt der Markdown-Datei
        const filePath = path.join(contentDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const keywords = extractKeywords(content, title);
        
        searchIndex.push({
          titel: title,
          href: url,
          keywords: keywords,
          content: cleanMarkdownContent(content).substring(0, 200) + '...' // Erste 200 Zeichen als Vorschau
        });
      }
    }
  });
  
  // Sortiere nach Titel
  searchIndex.sort((a, b) => a.titel.localeCompare(b.titel, 'de'));
  
  // Schreibe die JSON-Datei
  const outputPath = path.join(publicDir, 'search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
  
  console.log(`✅ Search-Index erstellt: ${outputPath}`);
  console.log(`📊 ${searchIndex.length} Seiten indexiert`);
}

// Führe das Skript aus
buildSearchIndex(); 