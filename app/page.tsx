import type { Metadata } from 'next';
import AboutSection from "@/components/Landing/About/AboutSection";
import ConcertSection from "@/components/Landing/ConcertSection";
import NewsSection from "@/components/Landing/NewsSection";
import TuneIn from "@/components/Landing/TuneIn/playlist-section";
import ArtistSection from "@/components/Landing/Artists/ArtistSection";
import { AsciiHero } from '@/components/Landing/ASCII-Header/hero';

export const metadata: Metadata = {
  title: "K&K RECORDS - Inte den vanliga sortens skivbolag",
  description: "Upptäck de bästa artisterna, senaste konserterna och exklusiva musiknyheter från K&K Records i Örebro.",
  keywords: ["K&K Records", "skivbolag", "Örebro", "musik", "konserter", "artister", "live musik", "svenska artister"],
  authors: [{ name: "K&K Records" }],
  creator: "K&K Records",
  publisher: "K&K Records",
  alternates: {
    canonical: "https://kkrecords.se",
  },
  openGraph: {
    title: "K&K RECORDS - Inte den vanliga sortens skivbolag",
    description: "Upptäck de bästa artisterna, senaste konserterna och exklusiva musiknyheter från K&K Records.",
    url: "https://kkrecords.se",
    siteName: "K&K RECORDS",
    images: [
      {
        url: "https://kkrecords.se/api",
        width: 1200,
        height: 630,
        alt: "K&K RECORDS - Inte den vanliga sortens skivbolag",
      },
    ],
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K&K RECORDS - Inte den vanliga sortens skivbolag",
    description: "Håll dig uppdaterad med den senaste musiken, konserterna och artisterna på K&K Records.",
    images: ["https://kkrecords.se/api"],
    creator: "@kkrecords",
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
    // Add your Google Search Console verification code here
    // google: 'your-verification-code',
  },
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://kkrecords.se/#website",
    name: "K&K Records",
    alternateName: "K&K RECORDS",
    url: "https://kkrecords.se",
    description: "K&K Records - Inte den vanliga sortens skivbolag. Upptäck de bästa artisterna och senaste konserterna.",
    publisher: {
      "@id": "https://kkrecords.se/#organization"
    },
    inLanguage: "sv-SE",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://kkrecords.se/api/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: "https://kkrecords.se"
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AsciiHero />
      <ArtistSection />
      <AboutSection />
      <ConcertSection />
      <NewsSection />
      <TuneIn />
    </main>
  );
}
