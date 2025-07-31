"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// Card-Komponenten werden nicht verwendet, aber für zukünftige Verwendung importiert
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { DiscordCommunityCard } from "@/components/discord-community-card";
import { DiscordReviews } from "@/components/discord-reviews";

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
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12">
            Ein sicherer, respektvoller und wissenschaftlich fundierter Raum für alle, die sich mit Alters- und Pet-Regression beschäftigen.
          </p>
          
          {/* Community Stats Card */}
          <div className="max-w-md mx-auto mb-12">
            <DiscordCommunityCard />
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

        {/* Additional Info Section */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Warum unser Discord?</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Sicherer Raum</h4>
              <p className="text-slate-600 dark:text-slate-300">Strenge Moderation und klare Regeln für einen respektvollen Umgang</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Wissenschaftlich fundiert</h4>
              <p className="text-slate-600 dark:text-slate-300">Informationen basierend auf psychologischer Forschung und Erfahrungen</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Support & Austausch</h4>
              <p className="text-slate-600 dark:text-slate-300">Gemeinsamer Austausch und gegenseitige Unterstützung in der Community</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 
