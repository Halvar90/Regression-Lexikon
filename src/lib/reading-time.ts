/**
 * Berechnet die geschätzte Lesezeit für einen Text
 * @param content - Der Textinhalt
 * @returns Die geschätzte Lesezeit in Minuten (aufgerundet)
 */
export function calculateReadingTime(content: string): number {
  // Entferne Markdown-Syntax und HTML-Tags für eine genauere Wortzählung
  const cleanContent = content
    .replace(/[#*`~\[\]()]/g, '') // Entferne Markdown-Syntax
    .replace(/<[^>]*>/g, '') // Entferne HTML-Tags
    .replace(/\s+/g, ' ') // Normalisiere Whitespace
    .trim();
  
  // Zähle Wörter (getrennt durch Leerzeichen)
  const wordCount = cleanContent.split(' ').filter(word => word.length > 0).length;
  
  // Durchschnittliche Lesegeschwindigkeit: 220 Wörter pro Minute
  const averageReadingSpeed = 220;
  
  // Berechne Lesezeit und runde auf
  const readingTime = Math.ceil(wordCount / averageReadingSpeed);
  
  // Mindestens 1 Minute
  return Math.max(1, readingTime);
} 