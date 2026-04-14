import type { Metadata } from 'next';
import Script from 'next/script';
import { Instrument_Serif, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://genomeprivate.com'),
  title: 'How private is your genome? — a six-question dossier',
  description:
    'When 23andMe sold its database for $305M, the product being sold was customers. Six questions. Thirty seconds. No email required, nothing stored.',
  openGraph: {
    title: 'How private is your genome?',
    description:
      'A six-question dossier on your genetic exposure. Built by PrivDNA.',
    url: 'https://genomeprivate.com',
    siteName: 'Genome Private',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How private is your genome?',
    description: 'Six questions. Thirty seconds. No email. Cookieless analytics only.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Rybbit: self-hosted, cookieless, no PII. Shares a backend with privdna.com
  // (distinct site_id) so quiz -> privdna.com conversions are visible in one
  // dashboard. No-op locally unless RYBBIT_SITE_ID is set.
  const rybbitSiteId = process.env.RYBBIT_SITE_ID;
  const rybbitUrl = process.env.RYBBIT_URL || 'https://analytics.privdna.com';

  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <head>
        {rybbitSiteId && (
          <Script
            src={`${rybbitUrl}/api/script.js`}
            data-site-id={rybbitSiteId}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
