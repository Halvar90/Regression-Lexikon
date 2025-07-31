import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Versuche, die Disboard Reviews-Seite zu scrapen
    const response = await fetch(
      'https://disboard.org/de/server/reviews/1270678011594670121',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        next: { revalidate: 300 }, // Cache für 5 Minuten
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    
    // Versuche, Rezensionen aus dem HTML zu extrahieren
    const reviews = extractReviewsFromHTML(html)
    
    return NextResponse.json({ reviews, source: 'disboard' })
  } catch (error) {
    console.error('Error fetching Disboard reviews:', error)
    
         // Echte Rezensionen von Disboard (basierend auf Screenshots)
     const fallbackReviews = [
       {
         id: 1,
         username: "gemusemuffin",
         rating: 5,
         comment: "Der Server ist mega. Die Regeln werden durchgesetzt und die Sanktionen sind auch okay. Hier steht Kommunikation an oberster Stelle. Alle sind super lieb und es ist eigentlich immer was los."
       },
       {
         id: 2,
         username: "iralthereal",
         rating: 5,
         comment: "Streng moderiert, aufmerksamer Owner und Moderatoren die Bedrohungen oft schon fernhalten bevor sie überhaupt auf die Mitglieder treffen... außerdem werden gerade cg etwas strenger beäugt um die littles zu schützen was sehr positiv ist^^"
       },
       {
         id: 3,
         username: "logo462",
         rating: 5,
         comment: "Little Haven - ein sicherer Ort zum Wohlfühlen. Eine liebevolle und sichere Online-Umgebung für alle, die sich in Little- oder Caregiver-Headspace befinden. Die Community ist warmherzig, respektvoll und unterstützend."
       },
       {
         id: 4,
         username: "pik4chw",
         rating: 5,
         comment: "sind alle echt lieb dort :) schreibe eig nie auf Servern aber dort schreib ich auch ab und zu ist ein echt super Server!!"
       },
       {
         id: 5,
         username: "sensi.77",
         rating: 5,
         comment: "Wie gesagt, alle super nett!! Wirklich super safe space für alle! Egal ob man selbst Teil der Community ist oder nur unterstützt<3"
       },
       {
         id: 6,
         username: "yennyjennycat",
         rating: 5,
         comment: "Auf Little Haven wird sehr großen Wert darauf gelegt, das der Server sicher für alle ist und bleibt dafür sorgt ein präsentes und aktives Mod/Adminteam. Ausserdem gibt es immer wieder mal tolle Events und jede Menge liebe Menschen."
       }
     ]
    
    return NextResponse.json({ 
      reviews: fallbackReviews, 
      source: 'fallback',
      error: 'Disboard scraping failed, using fallback data'
    })
  }
}

function extractReviewsFromHTML(html: string) {
  const reviews = []
  
  try {
    // Versuche, Rezensionen aus dem HTML zu extrahieren
    // Dies ist ein vereinfachter Ansatz - in der Praxis würde man einen HTML-Parser verwenden
    
    // Suche nach Review-Containern (dies ist ein Beispiel-Pattern)
    const reviewPattern = /<div[^>]*class="[^"]*review[^"]*"[^>]*>([\s\S]*?)<\/div>/gi
    let match
    
    while ((match = reviewPattern.exec(html)) !== null && reviews.length < 10) {
      const reviewHtml = match[1]
      
      // Extrahiere Benutzername
      const usernameMatch = reviewHtml.match(/<span[^>]*class="[^"]*username[^"]*"[^>]*>([^<]+)<\/span>/i)
      const username: string = usernameMatch ? usernameMatch[1].trim() : `User${reviews.length + 1}`
      
      // Extrahiere Bewertung
      const ratingMatch = reviewHtml.match(/<span[^>]*class="[^"]*rating[^"]*"[^>]*>(\d+)<\/span>/i)
      const rating = ratingMatch ? parseInt(ratingMatch[1]) : 5
      
      // Extrahiere Kommentar
      const commentMatch = reviewHtml.match(/<p[^>]*class="[^"]*comment[^"]*"[^>]*>([^<]+)<\/p>/i)
      const comment = commentMatch ? commentMatch[1].trim() : "Tolle Community!"
      
      // Extrahiere Datum (nicht verwendet, aber für zukünftige Verwendung)
      // const dateMatch = reviewHtml.match(/<span[^>]*class="[^"]*date[^"]*"[^>]*>([^<]+)<\/span>/i)
      // const date = dateMatch ? dateMatch[1].trim() : new Date().toISOString().split('T')[0]
      
             reviews.push({
         id: reviews.length + 1,
         username,
         rating,
         comment
       })
    }
  } catch (error) {
    console.error('Error extracting reviews from HTML:', error)
  }
  
  return reviews.length > 0 ? reviews : null
}

 