import type { Metadata } from 'next';
import AboutSection from "@/components/Landing/About/AboutSection";
import ConcertSection from "@/components/Landing/ConcertSection";
import NewsSection from "@/components/Landing/NewsSection";
import TuneIn from "@/components/Landing/TuneIn/playlist-section";
import ArtistSection from "@/components/Landing/Artists/ArtistSection";
import { AsciiHero } from '@/components/Landing/ASCII-Header/hero';
import { Language, isValidLanguage, DEFAULT_LANGUAGE } from '@/lib/languages';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(props: HomePageProps): Promise<Metadata> {
  const params = await props.params;
  const lang = isValidLanguage(params.lang) ? params.lang : DEFAULT_LANGUAGE;

  if (lang === 'sv') {
    return {
      title: "K&K RECORDS - Inte den vanliga sortens skivbolag",
      description: "Upptäck de bästa artisterna, senaste konserterna och exklusiva musiknyheter från K&K Records i Örebro.",
      keywords: ["K&K Records", "skivbolag", "Örebro", "musik", "konserter", "artister", "live musik", "svenska artister"],
      authors: [{ name: "K&K Records" }],
      creator: "K&K Records",
      publisher: "K&K Records",
      alternates: {
        canonical: "https://kkrecords.se/sv",
      },
      openGraph: {
        title: "K&K RECORDS - Inte den vanliga sortens skivbolag",
        description: "Upptäck de bästa artisterna, senaste konserterna och exklusiva musiknyheter från K&K Records.",
        url: "https://kkrecords.se/sv",
        siteName: "K&K RECORDS",
        locale: "sv_SE",
        type: "website",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  return {
    title: "K&K RECORDS - A Different Kind of Record Label",
    description: "Discover the best artists, latest concerts, and exclusive music news from K&K Records in Örebro.",
    keywords: ["K&K Records", "record label", "Örebro", "music", "concerts", "artists", "live music", "swedish music"],
    authors: [{ name: "K&K Records" }],
    creator: "K&K Records",
    publisher: "K&K Records",
    alternates: {
      canonical: "https://kkrecords.se/en",
    },
    openGraph: {
      title: "K&K RECORDS - A Different Kind of Record Label",
      description: "Discover the best artists, latest concerts, and exclusive music news from K&K Records.",
      url: "https://kkrecords.se/en",
      siteName: "K&K RECORDS",
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  const lang = isValidLanguage(params.lang) ? (params.lang as Language) : DEFAULT_LANGUAGE;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://kkrecords.se/#website",
    name: "K&K Records",
    alternateName: "K&K RECORDS",
    url: "https://kkrecords.se",
    description: lang === 'sv'
      ? "K&K Records - Inte den vanliga sortens skivbolag. Upptäck de bästa artisterna och senaste konserterna."
      : "K&K Records - A Different Kind of Record Label. Discover the best artists and latest concerts.",
    publisher: {
      "@id": "https://kkrecords.se/#organization"
    },
    inLanguage: lang === 'sv' ? "sv-SE" : "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === 'sv' ? "Hem" : "Home",
        item: `https://kkrecords.se/${lang}`
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
