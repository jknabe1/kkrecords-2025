import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Global/Header/Header";
import Footer from "@/components/Global/Footer/Footer";
import CookieNotice from "@/components/Global/CookieNotice/CookieNotice";
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
        url: 'https://kkrecords.se/api', // Must be an absolute URL
        width: 800,
        height: 600,
      },

    ],
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'wwww.kkrecords.se',
    description: "Inte den vanliga sortens skivbolag...",
    images: ['https://kkrecords.se/api',], // Must be an absolute URL
  },

};

export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  
  return (
    <html lang="se_SV">
      <body className="antialiased">
        <Header/>  
          <LenisScrollProvider>
            {children}
            <CookieNotice />
            <SpeedInsights/>
            <Analytics />
          </LenisScrollProvider>
        <Footer />
      </body>
    </html>
  );
}
