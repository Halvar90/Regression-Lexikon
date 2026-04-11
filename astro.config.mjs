import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Regression-Lexikon',
      components: {
        Footer: './src/components/Footer.astro',
      },
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'Deutsch',
          lang: 'de',
        },
      },
      sidebar: [
  {
    label: '1. Willkommen & Sicherheit',
    items: [
      { label: 'Was ist Regression?', link: '/grundlagen/einstieg' },
      { label: 'WICHTIG: SFW-Statement', link: '/grundlagen/wichtig-sfw-statement' },
      { label: 'SFW & NSFW erklärt', link: '/grundlagen/sfw-und-nsfw' },
    ],
  },
  {
    label: '2. Hintergründe & Biologie',
    items: [
      { label: 'Das Nervensystem (Polyvagal)', link: '/psychologie/nervensystem-polyvagal' },
      { label: 'Warum wir regredieren (Coping)', link: '/psychologie/coping-mechanismus' },
      { label: 'Trauma & Stressreaktionen', link: '/psychologie/trauma-und-stress' },
      { label: 'Neurodivergenz', link: '/psychologie/neurodivergenz-und-regression' },
      { label: 'Vorteile & Nutzen', link: '/psychologie/vorteile-und-nutzen' },
    ],
  },
  {
    label: '3. Den Little Space gestalten',
    items: [
      { label: 'Regression sicher einleiten', link: '/praxis/regression-einleiten' },
      { label: 'Hilfsmittel & Sensorik (Gear)', link: '/praxis/hilfsmittel-gear' },
      { label: 'Solo-Regression', link: '/praxis/selbstfuersorge' },
      { label: 'Die verschiedenen Formen', link: '/grundlagen/formen-der-regression' },
      { label: 'Pet Regression', link: '/grundlagen/pet-regression' },
    ],
  },
  {
    label: '4. Herausforderungen & Notfälle',
    items: [
      { label: 'Notfall-Hilfe (Unfreiwillig)', link: '/praxis/notfall-hilfe' },
      { label: 'Regre-Drop & Aftercare', link: '/praxis/aftercare-regre-drop' },
      { label: 'Regression vs. Dissoziation', link: '/psychologie/altersregression-vs-altersdissoziation' },
    ],
  },
  {
    label: '5. Miteinander & Umfeld',
    items: [
      { label: 'Caregiving & Verantwortung', link: '/praxis/caregiving-dynamiken' },
      { label: 'In der Partnerschaft leben', link: '/community/partnerschaft' },
      { label: 'Stigma & Vorurteile', link: '/community/stigma-vorurteile' },
     
    ],
  },
  {
    label: '6. Wissen & Ethik',
    items: [
      { label: 'Häufige Fragen (FAQ)', link: '/grundlagen/faq' },
      { label: 'Ethik & Consent', link: '/sicherheit/ethik-leitfaden-consent' },
      { label: 'Der sichere Raum (Safe Space)', link: '/sicherheit/sicherer-raum' },
      { label: 'Seriöse Quellen finden', link: '/sicherheit/vertrauenswuerdige-quellen' },
    ],
  },
  {
    label: '7. Service',
    items: [
      { label: 'Notfall-Kontakte (DACH+)', link: '/notfall-kontakte' },
      { label: 'Quellenverzeichnis', link: '/quellen' },
    ],
  },
  {
    label: '8. Werkzeuge & Checklisten',
    items: [
      { label: 'Red-Flag-Check (Online)', link: '/interaktiv/red-flag-check' },
      { label: 'SOS: Grounding-Tool', link: '/interaktiv/sos-grounding' },
    ],
  },
],
      customCss: [],
    }),
  ],
});
