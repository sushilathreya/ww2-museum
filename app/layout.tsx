import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Bebas_Neue, JetBrains_Mono, Inter } from 'next/font/google';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { DEFAULT_SEO_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from '@/lib/seo';
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
  metadataBase: new URL(SITE_ORIGIN),
  title: 'Weapons of World War 2 - World War II Weapons Repository',
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Weapons of World War 2 - World War II Weapons Repository',
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    type: 'website',
    images: [
      {
        url: DEFAULT_SEO_IMAGE,
        alt: 'World War Weapons archive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weapons of World War 2 - World War II Weapons Repository',
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SEO_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
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
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
