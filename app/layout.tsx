import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Script from "next/script";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "India Toolkit - India's Premier Online Tools Platform",
  description: "India Toolkit provides 100+ free online tools for developers, designers, students, and professionals in India. From calculators to converters, text tools to development utilities.",
  keywords: "online tools, calculators, converters, text tools, development tools, india toolkit, free tools, indian tools",
  authors: [{ name: "India Toolkit" }],
  creator: "India Toolkit",
  publisher: "India Toolkit",
  openGraph: {
    title: "India Toolkit - India's Premier Online Tools Platform",
    description: "100+ free online tools for developers, designers, students, and professionals in India",
    url: "https://indiatoolkit.com",
    siteName: "India Toolkit",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "India Toolkit - India's Premier Online Tools Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "India Toolkit - India's Premier Online Tools Platform",
    description: "100+ free online tools for developers, designers, students, and professionals in India",
    images: ["/og-image.jpg"],
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
  alternates: {
    canonical: "https://indiatoolkit.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BBHVWNTSWB"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BBHVWNTSWB');
            `
          }}
        />
      </Head>
      <body
        className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-slate-50 to-green-50`}
      >
        <Header />
        <main className="pt-16 bg-gradient-to-br from-slate-50 to-green-50 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}