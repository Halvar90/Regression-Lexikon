"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DiscordReviews } from "@/components/discord-reviews";
import { DiscordCommunityCard } from "@/components/discord-community-card";

 interface Review {
   id: number;
   username: string;
   rating: number;
   comment: string;
 }

export default function DiscordPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string>('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/disboard-reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
          setSource(data.source || 'unknown');
                 } else {
           // Fallback zu echten Rezensionen von Disboard
           setReviews([
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
           ]);
          setSource('fallback');
        }
             } catch (error) {
         console.error('Error fetching reviews:', error);
         // Fallback zu echten Rezensionen von Disboard
         setReviews([
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
         ]);
        setSource('fallback');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-12">
        {/* Discord Community Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 mb-8 backdrop-blur-sm">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
            </svg>
            Tritt unserer Community bei!
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
            Little Haven Discord
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Ein sicherer, respektvoller und sorgfältig recherchierter Raum für alle, die sich mit Alters- und Pet-Regression beschäftigen. 
            Unser Server bietet eine strenge Moderation, klare Regeln und eine warmherzige Community.
          </p>
          
          {/* Discord Widget */}
          <div className="max-w-md mx-auto mb-12">
            <DiscordCommunityCard />
          </div>
          
          {/* Server Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">95</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Mitglieder</div>
            </div>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">5.0</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Sterne Rating</div>
            </div>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">SFW</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Nur sichere Inhalte</div>
            </div>
          </div>
          
          {/* Discord Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              asChild
            >
              <a href="https://discord.gg/little-haven" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
                Tritt unserem Discord bei
              </a>
            </Button>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              asChild
            >
              <a href="https://disboard.org/server/1270678011594670121" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Mehr Rezensionen auf Disboard
              </a>
            </Button>
          </div>
        </div>

        {/* Server Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Was macht unseren Server besonders?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Wir bieten eine sichere und unterstützende Umgebung mit klaren Regeln und aktiver Moderation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Strenge Moderation</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Unser Team überwacht den Server sorgfältig und sorgt für einen respektvollen Umgang. 
                Bedrohungen werden proaktiv abgewehrt.
              </p>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Sicherer Raum</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Ein Ort, an dem sich alle wohlfühlen können. Wir schützen besonders vulnerable Mitglieder 
                und fördern eine warmherzige Atmosphäre.
              </p>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Sorgfältig recherchiert</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Unsere Informationen basieren auf sorgfältiger Recherche und den Erfahrungen 
                unserer Community-Mitglieder.
              </p>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Aktive Community</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Über 95 Mitglieder, die sich gegenseitig unterstützen und austauschen. 
                Es ist immer etwas los und neue Freunde warten auf dich.
              </p>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Regelmäßige Events</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Wir veranstalten regelmäßig Events und Aktivitäten, um die Community 
                zusammenzubringen und neue Freundschaften zu fördern.
              </p>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">SFW & Respektvoll</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Unser Server ist komplett SFW (Safe For Work) und respektvoll. 
                Keine sexuellen Inhalte oder unangemessene Verhaltensweisen.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Was unsere Mitglieder sagen</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-yellow-500 text-2xl">★★★★★</span>
              <span className="text-lg font-semibold text-slate-600 dark:text-slate-300">5.0 von 5.0 Sternen auf Disboard</span>
            </div>
            {source && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {source === 'disboard' ? '📊 Echte Rezensionen von Disboard' : '📝 Echte Rezensionen von Disboard'}
              </p>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-300">Lade Rezensionen...</p>
            </div>
          ) : (
            <DiscordReviews reviews={reviews} />
          )}
        </div>

        {/* Server Rules Preview */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-xl mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Unsere wichtigsten Regeln</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Respektvoller Umgang</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Behandle alle Mitglieder mit Respekt und Freundlichkeit</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">SFW-Inhalte</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Nur familienfreundliche und angemessene Inhalte</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Keine Ausbeutung</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Schutz vor Ausbeutung und unangemessenen Kontakten</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Aktive Moderation</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Sorgfältige Überwachung durch unser Moderationsteam</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Wissenschaftlicher Ansatz</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Fundierte Informationen und respektvolle Diskussionen</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Gemeinschaft</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Förderung von Freundschaften und gegenseitiger Unterstützung</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border border-green-200 dark:border-green-800 rounded-2xl p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Bereit, Teil unserer Community zu werden?
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Tritt noch heute bei und finde deinen sicheren Raum in unserer warmherzigen Community.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              asChild
            >
              <a href="https://discord.gg/little-haven" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
                Jetzt beitreten
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 
