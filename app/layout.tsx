import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
const inter = Inter({ subsets: ["latin"] });

// Preconnect links for performance optimization
export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    template: '%s | India Toolkit - Free Online Tools',
    default: 'India Toolkit - 1000+ Free Online Tools for Developers & Students',
  },
  description: 'Discover 1000+ free online tools including calculators, converters, text tools, and developer utilities. Fast, secure, and easy to use.',
  keywords: ['online tools', 'free tools', 'calculators', 'converters', 'developer tools', 'text tools'],
  authors: [{ name: 'India Toolkit', url: 'https://www.indiatoolkit.in' }],
  creator: 'India Toolkit',
  publisher: 'India Toolkit',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.indiatoolkit.in'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.indiatoolkit.in',
    title: 'India Toolkit - 1000+ Free Online Tools for Developers & Students',
    description: 'Discover 1000+ free online tools including calculators, converters, text tools, and developer utilities. Fast, secure, and easy to use.',
    siteName: 'India Toolkit',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'India Toolkit - Free Online Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Toolkit - 1000+ Free Online Tools for Developers & Students',
    description: 'Discover 1000+ free online tools including calculators, converters, text tools, and developer utilities. Fast, secure, and easy to use.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'AgwD1GdPUNk__PiSa9BMYU64Rp0Y9C7s88ftJqNdj0E'
  },
  alternates: {
    canonical: 'https://www.indiatoolkit.in',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'India Toolkit',
      'url': 'https://www.indiatoolkit.in',
      'description': 'Discover 1000+ free online tools including calculators, converters, text tools, and developer utilities. Fast, secure, and easy to use.',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://www.indiatoolkit.in/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
          <SpeedInsights />

        </main>
        <Footer />
      </body>
    </html>
  );
}
