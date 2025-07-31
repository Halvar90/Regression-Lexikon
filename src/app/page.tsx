import Link from 'next/link';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import {
  BookOpen, BrainCircuit, Users, Heart, Shield, GitFork, Eye, UserCheck, MessageCircle,
  Scale, Info, HelpCircle, LifeBuoy, PawPrint, Milestone, Book, Sparkles, Files
} from 'lucide-react';

const lexikonKategorien = {
  grundlagen: [
    { titel: "Grundlagen & Definitionen", href: "/grundlagen", beschreibung: "Die wichtigsten Begriffe und Konzepte einfach erklärt.", icon: <BookOpen className="w-5 h-5" /> },
    { titel: "Psychologische Hintergründe", href: "/psychologische-hintergruende", beschreibung: "Die Theorien von Freud, Jung und der Bindungsforschung.", icon: <BrainCircuit className="w-5 h-5" /> },
    { titel: "Freiwillig vs. Unfreiwillig", href: "/freiwillig-vs-unfreiwillig", beschreibung: "Der entscheidende Unterschied in der Praxis.", icon: <GitFork className="w-5 h-5" /> },
    { titel: "Merkmale & Erscheinungsformen", href: "/merkmale-und-erscheinungsformen", beschreibung: "Wie sich Regression äußert.", icon: <Eye className="w-5 h-5" /> },
    { titel: "Ursachen & Auslöser", href: "/ursachen-und-ausloeser", beschreibung: "Von Trauma bis zu Alltagsstress.", icon: <Sparkles className="w-5 h-5" /> },
  ],
  soziales: [
    { titel: "Die Rolle des Caregivers", href: "/die-rolle-des-caregivers", beschreibung: "Die Dynamik mit der wichtigsten Bezugsperson.", icon: <Heart className="w-5 h-5" /> },
    { titel: "Die dunkle Seite: Risiken", href: "/risiken-und-ungesunde-dynamiken", beschreibung: "Ungesunde Dynamiken und Co-Abhängigkeit.", icon: <Shield className="w-5 h-5" /> },
    { titel: "Abgrenzung zu Kink & BDSM", href: "/abgrenzung-kink-bdsm", beschreibung: "Warum Agere und Petre kein Fetisch sind.", icon: <Files className="w-5 h-5" /> },
    { titel: "Abgrenzung zu Identitäten", href: "/abgrenzung-anderen-identitaeten", beschreibung: "Unterschiede zu Therianthropie und Furry.", icon: <Users className="w-5 h-5" /> },
    { titel: "Die Rolle von Online-Communities", href: "/die-rolle-von-online-communities", beschreibung: "Segen und Fluch der digitalen Vernetzung.", icon: <MessageCircle className="w-5 h-5" /> },
  ],
  praxis: [
    { titel: "Therapeutische Perspektiven", href: "/therapeutische-perspektiven", beschreibung: "Wie Therapeuten mit Regression arbeiten.", icon: <UserCheck className="w-5 h-5" /> },
    { titel: "Praktische Tipps für Betroffene", href: "/tipps-fuer-betroffene", beschreibung: "Ein Leitfaden für eine gesunde Praxis.", icon: <HelpCircle className="w-5 h-5" /> },
    { titel: "Praktische Tipps für das Umfeld", href: "/tipps-fuer-das-umfeld", beschreibung: "Wie Partner und Freunde unterstützen können.", icon: <LifeBuoy className="w-5 h-5" /> },
    { titel: "Hilfsangebote & Anlaufstellen", href: "/hilfsangebote-und-anlaufstellen", beschreibung: "Wo man professionelle Hilfe findet.", icon: <Info className="w-5 h-5" /> },
  ],
  sonstiges: [
    { titel: "Spezifische Formen", href: "/spezifische-formen-und-unterarten", beschreibung: "Von Little Space bis Petre.", icon: <Milestone className="w-5 h-5" /> },
    { titel: "Regression im Tierreich", href: "/regression-im-tierreich", beschreibung: "Ein Blick auf Verhaltensbiologie.", icon: <PawPrint className="w-5 h-5" /> },
    { titel: "Rechtliche Aspekte", href: "/rechtliche-aspekte", beschreibung: "Was man rechtlich beachten sollte.", icon: <Scale className="w-5 h-5" /> },
    { titel: "Glossar", href: "/glossar", beschreibung: "Alle wichtigen Begriffe auf einen Blick.", icon: <Book className="w-5 h-5" /> },
  ]
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))]" />
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
              Umfassendes Lexikon zu Alters- und Pet-Regression
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Regressions-Lexikon
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Ein wissenschaftlich fundierter, respektvoller und umfassender Überblick über die verschiedenen Facetten von Alters- und Pet-Regression.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 pb-24">
        {Object.entries(lexikonKategorien).map(([kategorie, items]) => (
          <section key={kategorie} className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 capitalize">
                {kategorie.replace(/_/g, ' ')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Link href={item.href} key={item.titel} className="group">
                  <Card className="relative h-full bg-white/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 backdrop-blur-sm group-hover:bg-white/90 dark:group-hover:bg-slate-800/90 overflow-hidden">
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                            {item.titel}
                          </CardTitle>
                        </div>
                      </div>
                      
                      <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {item.beschreibung}
                      </CardDescription>
                      
                      {/* Hover Arrow */}
                      <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        Mehr erfahren
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
