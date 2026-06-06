import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Padeal — Trouve ton partenaire padel',
  description:
    'Le Tinder du padel parisien. Trouve ton partenaire padel en 2 swipes.',
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
