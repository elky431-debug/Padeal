import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Padeal — Tout ton padel dans une app',
  description:
    'Matche, joue, progresse. Partenaires, parties, ligue et chat — tout le padel au même endroit.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Padeal',
  },
};

export const viewport: Viewport = {
  themeColor: '#3B6D11',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
