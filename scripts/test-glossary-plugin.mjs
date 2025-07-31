import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import rehypeGlossaryTooltips from '../src/lib/rehype-glossary-tooltips.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Glossar-Daten laden
const glossaryPath = path.join(__dirname, '../public/glossary.json');
const glossaryData = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));

// Test-Markdown
const testMarkdown = `
# Test-Dokument

Dies ist ein Test-Dokument mit verschiedenen Glossar-Begriffen.

## Abschnitt 1

Wenn jemand in den **Little Space** regresst, kann ein **Caregiver** helfen. 
Manchmal verwenden Menschen **Gear** wie Schnuller oder Kuscheltiere.

## Abschnitt 2

**Agere** ist ein wichtiger Begriff in der Community. 
Auch **Age Dreaming** wird oft diskutiert.

## Code-Beispiel

\`\`\`
// Dieser Code-Block sollte nicht verändert werden
const littleSpace = "Little Space";
const caregiver = "Caregiver";
\`\`\`
`;

async function testGlossaryPlugin() {
  try {
    console.log('🧪 Teste rehype-Glossar-Plugin...\n');
    
    const result = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeGlossaryTooltips, { glossary: glossaryData })
      .use(rehypeStringify)
      .process(testMarkdown);

    console.log('✅ Plugin erfolgreich ausgeführt!\n');
    console.log('📄 Ergebnis:');
    console.log('='.repeat(50));
    console.log(result.toString());
    console.log('='.repeat(50));
    
    // Überprüfe, ob span-Elemente erstellt wurden
    const html = result.toString();
    const spanMatches = html.match(/<span data-glossary-term="[^"]*">[^<]*<\/span>/g);
    
    if (spanMatches) {
      console.log('\n🎯 Gefundene Glossar-Begriffe:');
      spanMatches.forEach((match, index) => {
        console.log(`${index + 1}. ${match}`);
      });
    } else {
      console.log('\n⚠️  Keine Glossar-Begriffe gefunden!');
    }
    
  } catch (error) {
    console.error('❌ Fehler beim Testen des Plugins:', error);
  }
}

testGlossaryPlugin(); 