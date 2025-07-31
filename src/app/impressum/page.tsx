export default function ImpressumPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-8">Impressum</h1>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Betreiber dieser Website:</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Regression Lexikon<br />
                [Anschrift wird aus Datenschutzgründen nicht veröffentlicht]
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Kontakt:</h3>
              <p className="text-slate-700 dark:text-slate-300">
                E-Mail: [Kontakt über Discord-Server]<br />
                Discord: <a href="/discord" className="text-blue-600 dark:text-blue-400 hover:underline">Discord Community</a>
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Regression Lexikon<br />
                [Anschrift wird aus Datenschutzgründen nicht veröffentlicht]
              </p>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Haftungsausschluss</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Haftung für Inhalte</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Haftung für Links</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Urheberrecht</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Datenschutz</h2>
          <p className="text-slate-700 dark:text-slate-300">
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
          </p>
          
          <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <strong>Hinweis:</strong> Dieses Impressum wurde zuletzt am {new Date().toLocaleDateString('de-DE')} aktualisiert. 
              Bei Fragen oder Anregungen kontaktieren Sie uns bitte über unseren Discord-Server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 