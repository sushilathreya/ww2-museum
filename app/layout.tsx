import type { Metadata } from 'next';
import { Bebas_Neue, JetBrains_Mono, Inter } from 'next/font/google';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Weapons of World War 2 - World War II Weapons Repository',
  description:
    'An interactive museum of World War II weapons featuring 3D models, historical data, and detailed specifications of guns, tanks, planes, and naval vessels.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="font-[var(--font-inter)] antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
