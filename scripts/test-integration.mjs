import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Teste die Integration
function testIntegration() {
  console.log('🧪 Teste Glossar-Integration...\n');
  
  // 1. Prüfe, ob glossary.json existiert
  const glossaryPath = path.join(__dirname, '../public/glossary.json');
  if (!fs.existsSync(glossaryPath)) {
    console.log('❌ glossary.json nicht gefunden!');
    return;
  }
  console.log('✅ glossary.json gefunden');
  
  // 2. Prüfe, ob Tooltip-Komponente existiert
  const tooltipPath = path.join(__dirname, '../src/components/ui/tooltip.tsx');
  if (!fs.existsSync(tooltipPath)) {
    console.log('❌ Tooltip-Komponente nicht gefunden!');
    return;
  }
  console.log('✅ Tooltip-Komponente gefunden');
  
  // 3. Prüfe, ob rehype-Plugin existiert
  const pluginPath = path.join(__dirname, '../src/lib/rehype-glossary-tooltips.ts');
  if (!fs.existsSync(pluginPath)) {
    console.log('❌ rehype-Plugin nicht gefunden!');
    return;
  }
  console.log('✅ rehype-Plugin gefunden');
  
  // 4. Prüfe, ob glossary-utils existiert
  const utilsPath = path.join(__dirname, '../src/lib/glossary-utils.ts');
  if (!fs.existsSync(utilsPath)) {
    console.log('❌ glossary-utils nicht gefunden!');
    return;
  }
  console.log('✅ glossary-utils gefunden');
  
  // 5. Lade und teste Glossar-Daten
  try {
    const glossaryData = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));
    const termCount = Object.keys(glossaryData).length;
    console.log(`✅ Glossar-Daten geladen: ${termCount} Begriffe`);
    
    // Zeige ein paar Beispiel-Begriffe
    const sampleTerms = Object.keys(glossaryData).slice(0, 3);
    console.log('\n📝 Beispiel-Begriffe:');
    sampleTerms.forEach(term => {
      console.log(`   • "${term}"`);
    });
    
  } catch (error) {
    console.log('❌ Fehler beim Laden der Glossar-Daten:', error.message);
  }
  
  console.log('\n🎉 Integration-Test abgeschlossen!');
  console.log('\n📋 Nächste Schritte:');
  console.log('   1. Starte die Entwicklungsumgebung: npm run dev');
  console.log('   2. Öffne eine Seite mit Glossar-Begriffen');
  console.log('   3. Hover über unterstrichene Begriffe für Tooltips');
}

testIntegration(); 