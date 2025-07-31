import React from 'react';
import fs from 'fs';
import path from 'path';
import { ReadingModeProvider } from '../context/reading-mode-provider';
import { MarkdownContent } from './markdown-content';
import { ArticleControls } from './article-controls';

interface MarkdownPageServerProps {
  fileName: string;
}

const MarkdownPageServer: React.FC<MarkdownPageServerProps> = ({ fileName }) => {
  // Lade Markdown-Datei direkt beim Server-Side Rendering
  const filePath = path.join(process.cwd(), 'src', 'content', `${fileName}.md`);
  
  let content = '';
  try {
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf-8');
    } else {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-red-600 dark:text-red-400 text-center">
            <p className="text-lg font-semibold">Datei nicht gefunden</p>
            <p className="text-sm mt-2">Die Datei {fileName}.md konnte nicht gefunden werden.</p>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error('Fehler beim Laden der Markdown-Datei:', error);
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-600 dark:text-red-400 text-center">
          <p className="text-lg font-semibold">Fehler beim Laden</p>
          <p className="text-sm mt-2">Ein Fehler ist beim Laden der Datei aufgetreten.</p>
        </div>
      </div>
    );
  }

  // Extrahiere Slug, Titel und URL aus dem Dateinamen
  const getPageInfo = (fileName: string) => {
    const fileToUrlMapping: Record<string, { href: string; title: string }> = {
      '00-inhaltsuebersicht': { href: '/', title: 'Inhaltsübersicht' },
      '01-grundlagen-und-definitionen': { href: '/grundlagen', title: 'Grundlagen & Definitionen' },
      '02-psychologische-hintergruende': { href: '/psychologische-hintergruende', title: 'Psychologische Hintergründe' },
      '03-freiwillig-vs-unfreiwillig': { href: '/freiwillig-vs-unfreiwillig', title: 'Freiwillig vs. Unfreiwillig' },
      '04-merkmale-und-erscheinungsformen': { href: '/merkmale-und-erscheinungsformen', title: 'Merkmale & Erscheinungsformen' },
      '05-ursachen-und-ausloeser': { href: '/ursachen-und-ausloeser', title: 'Ursachen & Auslöser' },
      '06-die-rolle-des-caregivers': { href: '/die-rolle-des-caregivers', title: 'Die Rolle des Caregivers' },
      '07-die-dunkle-seite-risiken-und-ungesunde-dynamiken': { href: '/risiken-und-ungesunde-dynamiken', title: 'Risiken & Ungesunde Dynamiken' },
      '08-abgrenzung-zu-kink-und-bdsm': { href: '/abgrenzung-kink-bdsm', title: 'Abgrenzung zu Kink/BDSM' },
      '09-abgrenzung-zu-anderen-identitaeten': { href: '/abgrenzung-anderen-identitaeten', title: 'Abgrenzung zu anderen Identitäten' },
      '10-therapeutische-perspektiven': { href: '/therapeutische-perspektiven', title: 'Therapeutische Perspektiven' },
      '11-die-rolle-von-online-communities': { href: '/die-rolle-von-online-communities', title: 'Die Rolle von Online-Communities' },
      '12-spezifische-formen-und-unterarten': { href: '/spezifische-formen-und-unterarten', title: 'Spezifische Formen & Unterarten' },
      '13-praktische-tipps-fuer-betroffene': { href: '/tipps-fuer-betroffene', title: 'Tipps für Betroffene' },
      '14-praktische-tipps-fuer-das-umfeld': { href: '/tipps-fuer-das-umfeld', title: 'Tipps für das Umfeld' },
      '15-regression-im-tierreich': { href: '/regression-im-tierreich', title: 'Regression im Tierreich' },
      '16-rechtliche-aspekte': { href: '/rechtliche-aspekte', title: 'Rechtliche Aspekte' },
      '17-zusammenfassung-und-ausblick': { href: '/zusammenfassung-und-ausblick', title: 'Zusammenfassung & Ausblick' },
      '18-glossar-wichtige-begriffe-erklaert': { href: '/glossar', title: 'Glossar - Wichtige Begriffe erklärt' },
      '19-hilfsangebote-und-anlaufstellen': { href: '/hilfsangebote-und-anlaufstellen', title: 'Hilfsangebote & Anlaufstellen' },
    };

    const pageInfo = fileToUrlMapping[fileName];
    if (pageInfo) {
      return {
        slug: fileName,
        title: pageInfo.title,
        href: pageInfo.href,
      };
    }
    return null;
  };

  const pageInfo = getPageInfo(fileName);

  return (
    <ReadingModeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4 py-12">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
            <main className="lg:col-span-8">
              <div className="max-w-4xl mx-auto">
                <article className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-xl">
                  <MarkdownContent 
                    content={content} 
                    slug={pageInfo?.slug}
                    title={pageInfo?.title}
                    href={pageInfo?.href}
                  />
                </article>
              </div>
            </main>
            <aside className="lg:col-span-4">
              <ArticleControls slug={pageInfo?.slug} title={pageInfo?.title} href={pageInfo?.href} />
              <div className="hidden lg:block h-96"></div> {/* Platzhalter */}
            </aside>
          </div>
        </div>
      </div>
    </ReadingModeProvider>
  );
};

export default MarkdownPageServer; 