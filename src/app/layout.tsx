import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import { AppProvider } from '@/context/AppContext';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fatafat - Mumbai Transit Companion',
  description: 'Your companion for navigating Mumbai\'s suburban railway network',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1F3A5F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="font-sans">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
