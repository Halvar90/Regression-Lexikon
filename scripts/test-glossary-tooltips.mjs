import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Teste die Glossar-Tooltip-Funktionalität
function testGlossaryTooltips() {
  console.log('🧪 Teste Glossar-Tooltip-Funktionalität...\n');
  
  // 1. Prüfe, ob glossary.json existiert und gültig ist
  const glossaryPath = path.join(__dirname, '../public/glossary.json');
  if (!fs.existsSync(glossaryPath)) {
    console.log('❌ glossary.json nicht gefunden!');
    return;
  }
  
  try {
    const glossaryData = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));
    const termCount = Object.keys(glossaryData).length;
    console.log(`✅ Glossar-Daten geladen: ${termCount} Begriffe`);
    
    // 2. Teste ein paar spezifische Begriffe
    const testTerms = ['Little Space', 'Caregiver', 'Agere'];
    console.log('\n🔍 Teste spezifische Begriffe:');
    
    testTerms.forEach(term => {
      if (glossaryData[term]) {
        console.log(`   ✅ "${term}" gefunden`);
        console.log(`      Definition: ${glossaryData[term].substring(0, 60)}...`);
      } else {
        console.log(`   ❌ "${term}" nicht gefunden`);
      }
    });
    
    // 3. Prüfe, ob alle wichtigen Dateien existieren
    const requiredFiles = [
      '../src/lib/rehype-glossary-tooltips.ts',
      '../src/components/ui/tooltip.tsx',
      '../src/components/layout/markdown-content.tsx'
    ];
    
    console.log('\n📁 Prüfe erforderliche Dateien:');
    requiredFiles.forEach(file => {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        console.log(`   ✅ ${file}`);
      } else {
        console.log(`   ❌ ${file} nicht gefunden`);
      }
    });
    
    // 4. Zeige Beispiel-HTML-Ausgabe
    console.log('\n🎨 Beispiel-HTML-Ausgabe für Tooltip:');
    const exampleTerm = 'Little Space';
    const exampleDefinition = glossaryData[exampleTerm];
    
    if (exampleDefinition) {
      console.log(`<span data-glossary-term="${exampleTerm}">${exampleTerm}</span>`);
      console.log(`Tooltip-Inhalt: ${exampleDefinition}`);
    }
    
    console.log('\n🎉 Glossar-Tooltip-Test abgeschlossen!');
    console.log('\n📋 Nächste Schritte:');
    console.log('   1. Öffne http://localhost:3000/grundlagen');
    console.log('   2. Suche nach unterstrichenen Begriffen');
    console.log('   3. Hover über die Begriffe für Tooltips');
    
  } catch (error) {
    console.log('❌ Fehler beim Testen:', error.message);
  }
}

testGlossaryTooltips(); 