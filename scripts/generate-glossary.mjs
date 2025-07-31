import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfade definieren
const inputFile = path.join(__dirname, '../src/content/18-glossar-wichtige-begriffe-erklaert.md');
const outputFile = path.join(__dirname, '../public/glossary.json');

function parseGlossary(markdownContent) {
    const glossary = {};
    const lines = markdownContent.split('\n');
    
    let currentTerm = null;
    let currentDefinition = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Überschriften überspringen
        if (line.startsWith('#') || line === '---') {
            continue;
        }
        
        // Leere Zeilen überspringen
        if (line === '') {
            continue;
        }
        
        // Begriffe erkennen (Zeilen die mit * beginnen)
        if (line.startsWith('* **') && line.includes('**')) {
            // Vorherigen Begriff speichern, falls vorhanden
            if (currentTerm && currentDefinition.length > 0) {
                glossary[currentTerm] = currentDefinition.join(' ').trim();
            }
            
            // Neuen Begriff extrahieren
            const termMatch = line.match(/\*\*([^*]+)\*\*/);
            if (termMatch) {
                currentTerm = termMatch[1].trim();
                currentDefinition = [];
                
                // Definition in derselben Zeile nach dem Begriff
                const definitionPart = line.split('**').slice(2).join('**').trim();
                if (definitionPart) {
                    currentDefinition.push(definitionPart);
                }
            }
        } else if (currentTerm && line.startsWith('    ')) {
            // Fortsetzung der Definition (eingerückt)
            currentDefinition.push(line.trim());
        } else if (currentTerm && line) {
            // Weitere Definition ohne Einrückung
            currentDefinition.push(line);
        }
    }
    
    // Letzten Begriff speichern
    if (currentTerm && currentDefinition.length > 0) {
        glossary[currentTerm] = currentDefinition.join(' ').trim();
    }
    
    return glossary;
}

function generateGlossary() {
    try {
        console.log('Lese Glossar-Datei...');
        const markdownContent = fs.readFileSync(inputFile, 'utf8');
        
        console.log('Parse Glossar...');
        const glossary = parseGlossary(markdownContent);
        
        console.log('Speichere JSON-Datei...');
        fs.writeFileSync(outputFile, JSON.stringify(glossary, null, 2), 'utf8');
        
        console.log(`✅ Glossar erfolgreich generiert!`);
        console.log(`📁 Ausgabedatei: ${outputFile}`);
        console.log(`📊 Anzahl Begriffe: ${Object.keys(glossary).length}`);
        
        // Zeige die ersten paar Einträge zur Überprüfung
        console.log('\n🔍 Erste Einträge zur Überprüfung:');
        const entries = Object.entries(glossary).slice(0, 3);
        entries.forEach(([term, definition]) => {
            console.log(`\n"${term}": "${definition.substring(0, 100)}${definition.length > 100 ? '...' : ''}"`);
        });
        
    } catch (error) {
        console.error('❌ Fehler beim Generieren des Glossars:', error.message);
        process.exit(1);
    }
}

// Skript ausführen
generateGlossary(); 