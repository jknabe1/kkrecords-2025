import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Global/Footer/Footer";
import LenisScrollProvider from "@/providers/lenis-providers";
import Header from '@/components/Global/Header/Header'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
  // Site-wide Organization Schema for better SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RecordLabel",
    "@id": "https://kkrecords.se/#organization",
    name: "K&K Records",
    alternateName: "K&K RECORDS",
    url: "https://kkrecords.se",
    logo: {
      "@type": "ImageObject",
      url: "https://kkrecords.se/api",
      width: 800,
      height: 600,
    },
    description: "K&K Records - Inte den vanliga sortens skivbolag. Vi stödjer unga kulturutövare i Örebro län med finansiering, vägledning och kreativt stöd.",
    foundingDate: "2019",
    founder: [
      { "@type": "Person", name: "Jens Knabe" },
      { "@type": "Person", name: "Edwin Krutholm" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Örebro",
      addressCountry: "SE",
    },
    sameAs: [
      "https://www.facebook.com/kkmusicrecords",
      "https://www.instagram.com/kkrecords.se",
    ],
    knowsLanguage: "sv",
  };

  return (
    <html lang="sv">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        <Header />
      <LenisScrollProvider>
        {children}
        <SpeedInsights />
        <Analytics />
      </LenisScrollProvider>
      <Footer />
      </body>
    </html>
  );
}
