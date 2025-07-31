// Zentrale Konfiguration für Umgebungsvariablen
export const config = {
  // Basis-URL für die Anwendung
  // Verwendet NEXT_PUBLIC_BASE_URL oder RAILWAY_PUBLIC_DOMAIN oder Fallback
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 
           (process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : 'http://localhost:3000'),
  
  // Weitere Umgebungsvariablen können hier hinzugefügt werden
  // z.B. für Analytics, API-Keys, etc.
} as const;

// Hilfsfunktion zum Erstellen vollständiger URLs
export const createFullUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${config.baseUrl}${cleanPath}`;
}; 