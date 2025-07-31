import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Glossar-Daten laden
const glossaryPath = path.join(__dirname, '../public/glossary.json');
const glossaryData = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));

// Test-Text
const testText = `
Dies ist ein Test-Text mit verschiedenen Glossar-Begriffen.

Wenn jemand in den Little Space regresst, kann ein Caregiver helfen. 
Manchmal verwenden Menschen Gear wie Schnuller oder Kuscheltiere.

Agere ist ein wichtiger Begriff in der Community. 
Auch Age Dreaming wird oft diskutiert.

Code-Beispiel: const littleSpace = "Little Space";
`;

function testGlossaryMatching() {
  console.log('🧪 Teste Glossar-Begriff-Erkennung...\n');
  
  const foundTerms = [];
  
  // Durchlaufe alle Glossar-Begriffe
  for (const [term, definition] of Object.entries(glossaryData)) {
    const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'gi');
    const matches = testText.match(regex);
    
    if (matches) {
      foundTerms.push({
        term,
        matches: matches.length,
        definition: definition.substring(0, 80) + '...'
      });
    }
  }
  
  console.log('📊 Gefundene Begriffe im Test-Text:');
  console.log('='.repeat(60));
  
  if (foundTerms.length > 0) {
    foundTerms.forEach((item, index) => {
      console.log(`${index + 1}. "${item.term}" (${item.matches}x gefunden)`);
      console.log(`   Definition: ${item.definition}`);
      console.log('');
    });
  } else {
    console.log('⚠️  Keine Glossar-Begriffe im Test-Text gefunden!');
  }
  
  console.log('='.repeat(60));
  console.log(`📈 Insgesamt ${foundTerms.length} Begriffe gefunden`);
  
  // Zeige Beispiel-HTML-Ausgabe
  console.log('\n🔍 Beispiel-HTML-Ausgabe:');
  console.log('='.repeat(60));
  
  let exampleHtml = testText;
  foundTerms.slice(0, 3).forEach(item => {
    const regex = new RegExp(`\\b${escapeRegExp(item.term)}\\b`, 'gi');
    exampleHtml = exampleHtml.replace(regex, `<span data-glossary-term="${item.term}">$&</span>`);
  });
  
  console.log(exampleHtml);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

testGlossaryMatching(); 