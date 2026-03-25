import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Global/Header/Header";
import Footer from "@/components/Global/Footer/Footer";
import LenisScrollProvider from "@/providers/lenis-providers";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const dynamic = 'force-dynamic'; // Force revalidation on every request

export const metadata: Metadata = {
  title: {
    template: '%s | K&K RECORDS',
    default: 'K&K RECORDS', 
  },  
  description: "Inte den vanliga sortens skivbolag...",

  metadataBase: new URL('https://kkrecords.se'),
  openGraph: {
    title: 'K&K RECORDS',
    description: "Inte den vanliga sortens skivbolag...",
    url: 'https://kkrecords.se',
    siteName: 'K&K RECORDS',
    images: [
      {
        url: 'https://kkrecords.se/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'K&K RECORDS - Inte den vanliga sortens skivbolag',
      },
    ],
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K&K RECORDS',
    description: "Inte den vanliga sortens skivbolag...",
    images: ['https://kkrecords.se/og-image.jpg'],
  },
};

export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  
  return (
    <html lang="sv-SE">
      <body className="antialiased">
        <Header/>  
          <LenisScrollProvider>
            {children}
            <SpeedInsights/>
            <Analytics />
          </LenisScrollProvider>
        <Footer />
      </body>
    </html>
  );
}
