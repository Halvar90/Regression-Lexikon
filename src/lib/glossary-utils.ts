import rehypeGlossaryTooltips from './rehype-glossary-tooltips';

interface GlossaryData {
  [key: string]: string;
}

/**
 * Erstellt eine konfigurierte Instanz des rehype-Glossar-Plugins
 * Diese Funktion wird nur im Server-Kontext verwendet
 */
export function createGlossaryPlugin(glossaryData: GlossaryData) {
  return [rehypeGlossaryTooltips, { glossary: glossaryData }];
}

/**
 * Prüft, ob ein Begriff im Glossar existiert
 */
export function isGlossaryTerm(term: string, glossaryData: GlossaryData): boolean {
  return Object.keys(glossaryData).some(
    glossaryTerm => glossaryTerm.toLowerCase() === term.toLowerCase()
  );
}

/**
 * Holt die Definition für einen Begriff aus dem Glossar
 */
export function getGlossaryDefinition(term: string, glossaryData: GlossaryData): string | null {
  const foundTerm = Object.keys(glossaryData).find(
    glossaryTerm => glossaryTerm.toLowerCase() === term.toLowerCase()
  );
  
  return foundTerm ? glossaryData[foundTerm] : null;
} 