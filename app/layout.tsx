import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "India Toolkit - Free Online Tools for Everyone",
    template: "%s | India Toolkit",
  },
  description: "Access 500+ free online tools including calculators, converters, text utilities, development tools, and more. No registration required. Made for India.",
  keywords: [
    "online tools",
    "free tools",
    "calculators",
    "converters",
    "text tools",
    "development tools",
    "design tools",
    "indian tools",
    "free online tools",
    "productivity tools",
    "utility tools",
    "web tools",
    "browser tools",
    "india toolkit",
    "omnitools",
  ],
  authors: [{ name: "India Toolkit", url: "https://www.indiatoolkit.in" }],
  creator: "India Toolkit",
  publisher: "India Toolkit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.indiatoolkit.in"),
  openGraph: {
    title: "India Toolkit - Free Online Tools for Everyone",
    description: "500+ free online tools including calculators, converters, text utilities, and development tools.",
    url: "https://www.indiatoolkit.in",
    siteName: "India Toolkit",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "India Toolkit - Free Online Tools Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "India Toolkit - Free Online Tools",
    description: "500+ free online tools for everyone in India",
    images: ["/og-image.jpg"],
    creator: "@indiatoolkit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://www.indiatoolkit.in",
    languages: {
      en: "https://www.indiatoolkit.in",
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BBHVWNTSWB"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BBHVWNTSWB');
              
              // Suppress MetaMask extension errors
              const originalError = console.error;
              console.error = function(...args) {
                if (args[0] && typeof args[0] === 'string' && args[0].includes('MetaMask')) {
                  return; // Suppress MetaMask errors
                }
                originalError.apply(console, args);
              };
            `,
          }}
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen bg-linear-to-br from-slate-50 to-green-50`}
      >
        <Header />
        <main className="pt-16 bg-linear-to-br from-slate-50 to-green-50 min-h-screen">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
