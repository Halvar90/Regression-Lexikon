"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DiscordMember {
  username: string
  status: string
  avatar_url?: string
}

interface DiscordData {
  name: string
  presence_count: number
  members: DiscordMember[]
  disboard?: {
    name: string
    description: string
    icon: string
    member_count: number
    premium_count: number
    tags: string[]
    language: string
    long_description: string
    banner: string
  }
  reviews?: Array<{
    id: number
    username: string
    avatar: string
    rating: number
    comment: string
    date: string
  }>
}

export function DiscordCommunityCard() {
  const [discordData, setDiscordData] = useState<DiscordData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const response = await fetch('/api/discord-widget')
        if (response.ok) {
          const data = await response.json()
          setDiscordData(data)
        } else {
          setError(true)
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchDiscordData()
  }, [])

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Little Haven</CardTitle>
          <p className="text-purple-100">Lade Community-Daten...</p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center items-center space-x-6 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold animate-pulse">...</div>
              <div className="text-sm text-purple-100">Online</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold animate-pulse">...</div>
              <div className="text-sm text-purple-100">Mitglieder</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !discordData) {
    return (
      <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Little Haven</CardTitle>
          <p className="text-purple-100">Deine sichere Community für Regression</p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center items-center space-x-6 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-purple-100">Online</div>
            </div>
                     <div className="text-center">
           <div className="text-2xl font-bold">80+</div>
           <div className="text-sm text-purple-100">Mitglieder</div>
         </div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-purple-100">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span>Deutschlands aktivste Regression Community</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Filtere echte Benutzer (nicht Bots) - erweiterte Filterung basierend auf Screenshot
  const realMembers = discordData.members.filter(member => 
    !member.username.toLowerCase().includes('bot') && 
    !member.username.toLowerCase().includes('disboard') &&
    !member.username.toLowerCase().includes('statbot') &&
    !member.username.toLowerCase().includes('tts') &&
    !member.username.toLowerCase().includes('scamprotect') &&
    !member.username.toLowerCase().includes('tempvoice') &&
    !member.username.toLowerCase().includes('lawliet') &&
    !member.username.toLowerCase().includes('sapphire') &&
    !member.username.toLowerCase().includes('ko-fi') &&
    !member.username.toLowerCase().includes('app')
  )

  const onlineCount = realMembers.filter(member => 
    member.status === 'online' || member.status === 'idle' || member.status === 'dnd'
  ).length

    return (
    <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
      <CardHeader className="text-center">
                 <div className="flex items-center justify-center space-x-3 mb-2">
           <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
             <span className="text-white font-bold text-lg">LH</span>
           </div>
           <div>
             <CardTitle className="text-2xl font-bold">{discordData.disboard?.name || discordData.name}</CardTitle>
             {discordData.disboard?.description && (
               <p className="text-purple-100 text-sm mt-1">{discordData.disboard.description}</p>
             )}
           </div>
         </div>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex justify-center items-center space-x-6 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{onlineCount}</div>
            <div className="text-sm text-purple-100">Online</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{discordData.disboard?.member_count || '80+'}</div>
            <div className="text-sm text-purple-100">Mitglieder</div>
            <div className="text-xs text-purple-200 opacity-75">(Gesamt)</div>
          </div>
        </div>
        
                 {/* Server Tags */}
         {discordData.disboard?.tags && discordData.disboard.tags.length > 0 && (
           <div className="mb-4">
             <div className="flex flex-wrap justify-center gap-1">
               {discordData.disboard.tags.slice(0, 6).map((tag, index) => (
                 <span 
                   key={index}
                   className="bg-white/20 text-purple-100 px-2 py-1 rounded-full text-xs"
                 >
                   {tag}
                 </span>
               ))}
             </div>
           </div>
         )}

                   {/* Online Members - Live-Daten von Discord */}
          {realMembers.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-purple-100 mb-3">
                Live Online-Mitglieder ({onlineCount}):
                <span className="text-xs text-purple-200 opacity-75 ml-2">🟢 Echte Discord-Daten</span>
              </p>
              <div className="max-h-40 overflow-y-auto bg-white/5 rounded-lg p-2">
                                 <div className="grid grid-cols-2 gap-1">
                   {realMembers
                     .sort((a, b) => {
                       // Nach Status sortieren: online > idle > dnd > offline
                       const statusOrder = { 'online': 0, 'idle': 1, 'dnd': 2, 'offline': 3 };
                       return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
                     })
                     .map((member, index) => (
                       <div 
                         key={index}
                         className="flex items-center space-x-2 bg-white/10 rounded px-2 py-1 text-xs hover:bg-white/15 transition-colors"
                       >
                         <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                           member.status === 'online' ? 'bg-green-400' : 
                           member.status === 'idle' ? 'bg-yellow-400' : 
                           member.status === 'dnd' ? 'bg-red-400' : 'bg-gray-400'
                         }`}></div>
                         <span className="text-purple-100 truncate flex-1">
                           {member.username}
                         </span>
                         <span className="text-purple-200 text-xs opacity-75">
                           {member.status === 'online' ? 'Online' : 
                            member.status === 'idle' ? 'Abwesend' : 
                            member.status === 'dnd' ? 'Nicht stören' : 'Offline'}
                         </span>
                       </div>
                     ))}
                 </div>
              </div>
            </div>
          )}
        
        <div className="flex items-center justify-center space-x-2 text-sm text-purple-100">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span>Deutschlands aktivste Regression Community</span>
        </div>
      </CardContent>
    </Card>
  )
} 