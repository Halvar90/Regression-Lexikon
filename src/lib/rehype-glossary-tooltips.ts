import { visit } from 'unist-util-visit';
// import { toString } from 'hast-util-from-string'; // Nicht verwendet
import type { Plugin } from 'unified';
import type { Root, Text, Element } from 'hast';
import type { Parent } from 'unist';

interface GlossaryData {
  [key: string]: string;
}

interface RehypeGlossaryTooltipsOptions {
  glossary: GlossaryData;
}

/**
 * Rehype-Plugin für Glossar-Tooltips
 * 
 * Dieses Plugin durchsucht den Textinhalt nach Glossar-Begriffen und
 * umschließt gefundene Begriffe mit span-Elementen, die ein
 * data-glossary-term-Attribut haben.
 */
const rehypeGlossaryTooltips: Plugin<[RehypeGlossaryTooltipsOptions], Root> = (options) => {
  const { glossary } = options;
  
  if (!glossary || typeof glossary !== 'object') {
    throw new Error('rehype-glossary-tooltips: glossary option is required and must be an object');
  }

  // Erstelle eine Map für schnellere Suche (case-insensitive)
  const glossaryMap = new Map<string, string>();
  Object.keys(glossary).forEach(term => {
    glossaryMap.set(term.toLowerCase(), term);
  });

  return (tree) => {
    visit(tree, 'text', (node: Text, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || (parent as Element).tagName === 'code' || (parent as Element).tagName === 'pre') {
        // Überspringe Code-Blöcke
        return;
      }

      const text = node.value;
      let modified = false;
      const newChildren: (Text | Element)[] = [];
      let lastIndex = 0;

      // Durchlaufe alle Glossar-Begriffe und suche nach Übereinstimmungen
      for (const [, originalTerm] of glossaryMap) {
        const regex = new RegExp(`\\b${escapeRegExp(originalTerm)}\\b`, 'gi');
        let match;

        while ((match = regex.exec(text)) !== null) {
          const start = match.index;
          const end = start + match[0].length;

          // Füge Text vor dem Begriff hinzu
          if (start > lastIndex) {
            newChildren.push({
              type: 'text',
              value: text.slice(lastIndex, start)
            });
          }

          // Erstelle span-Element für den Glossar-Begriff
          newChildren.push({
            type: 'element',
            tagName: 'span',
            properties: {
              'data-glossary-term': originalTerm
            },
            children: [{
              type: 'text',
              value: match[0]
            }]
          });

          lastIndex = end;
          modified = true;
        }
      }

      // Füge restlichen Text hinzu
      if (lastIndex < text.length) {
        newChildren.push({
          type: 'text',
          value: text.slice(lastIndex)
        });
      }

      // Ersetze den ursprünglichen Text-Node durch die neuen Kinder
      if (modified && index !== undefined) {
        parent.children.splice(index, 1, ...newChildren);
        return index + newChildren.length; // Überspringe die neuen Kinder
      }
    });
  };
};

/**
 * Escaped spezielle Regex-Zeichen in einem String
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default rehypeGlossaryTooltips; 