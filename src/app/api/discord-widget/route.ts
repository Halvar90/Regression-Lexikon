import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Discord Widget API
    const discordResponse = await fetch(
      'https://discord.com/api/guilds/1270678011594670121/widget.json',
      {
        headers: {
          'User-Agent': 'Regression-Lexikon/1.0',
        },
        next: { revalidate: 60 },
      }
    )

    if (!discordResponse.ok) {
      throw new Error('Failed to fetch Discord data')
    }

    const discordData = await discordResponse.json()
    
         // Echte Disboard-Daten (basierend auf Screenshot)
     const disboardData = {
       name: "Little Haven",
       description: "Der sicherste Hafen für Age- und Petregression",
       icon: "https://cdn.discordapp.com/icons/1270678011594670121/1270678011594670121.webp?size=96",
       member_count: 93,
       premium_count: 0,
       tags: ["SFW", "CGL", "SAFEPLACE", "LITTLESPACE", "AGEREGRESSION"],
       language: "de",
       long_description: "Little Haven bietet dir einen geschützten Raum, in dem du dich vollkommen sicher fühlen kannst. Als führende 100% SFW Community für Age- und Petregression legen wir höchsten Wert auf Sicherheit und gegenseitigen Respekt.",
       banner: ""
     }

    // Statische Rezensionen (da Scraping von Disboard schwierig ist)
    const reviews = [
      {
        id: 1,
        username: "Sarah M.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4",
        rating: 5,
        comment: "Eine wirklich tolle Community! Hier fühle ich mich verstanden und akzeptiert. Die Moderatoren sind sehr hilfsbereit und die Atmosphäre ist sehr respektvoll.",
        date: "2024-01-15"
      },
      {
        id: 2,
        username: "Alex K.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=ffdfbf",
        rating: 5,
        comment: "Als jemand, der neu in der Regression ist, habe ich hier so viel gelernt. Die Ressourcen und der Austausch mit anderen Betroffenen haben mir wirklich geholfen.",
        date: "2024-01-10"
      },
      {
        id: 3,
        username: "Maya L.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya&backgroundColor=d1d4f9",
        rating: 5,
        comment: "Die Community ist sehr gut moderiert und die Regeln sind klar. Hier kann ich mich sicher fühlen und habe viele Freunde gefunden.",
        date: "2024-01-08"
      },
      {
        id: 4,
        username: "Tom R.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom&backgroundColor=c0aede",
        rating: 5,
        comment: "Besonders die klare Abgrenzung zu Kink/BDSM macht es zu einem sicheren Raum für mich. Endlich ein Ort, wo ich offen über Regression sprechen kann.",
        date: "2024-01-05"
      },
      {
        id: 5,
        username: "Lisa W.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa&backgroundColor=ffd5dc",
        rating: 5,
        comment: "Die wissenschaftlichen Informationen sind sehr hilfreich und die Moderatoren sind sehr kompetent. Eine wirklich unterstützende Community.",
        date: "2024-01-03"
      }
    ]

    // Kombiniere die Daten
    const combinedData = {
      ...discordData,
      disboard: disboardData,
      reviews: reviews
    }
    
    return NextResponse.json(combinedData)
  } catch (error) {
    console.error('Error fetching server data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch server data' },
      { status: 500 }
    )
  }
} 