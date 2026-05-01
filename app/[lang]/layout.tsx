import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/Global/Footer/Footer";
import LenisScrollProvider from "@/providers/lenis-providers";
import Header from '@/components/Global/Header/Header'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { LanguageProvider } from '@/lib/LanguageContext';
import { isValidLanguage, DEFAULT_LANGUAGE, Language } from '@/lib/languages';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export const dynamic = 'force-dynamic'; // Force revalidation on every request

export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
  const params = await props.params;
  const lang = isValidLanguage(params.lang) ? params.lang : DEFAULT_LANGUAGE;
  
  const title = lang === 'sv' ? 'K&K RECORDS' : 'K&K RECORDS';
  const description = lang === 'sv' 
    ? "Inte den vanliga sortens skivbolag..." 
    : "Not your ordinary record label...";

  return {
    title: {
      template: '%s | K&K RECORDS',
      default: title,
    },
    description: description,
    metadataBase: new URL('https://kkrecords.se'),
    alternates: {
      languages: {
        'sv': 'https://kkrecords.se/sv',
        'en': 'https://kkrecords.se/en',
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://kkrecords.se/${lang}`,
      siteName: 'K&K RECORDS',
      images: [
        {
          url: 'https://kkrecords.se/api',
          width: 800,
          height: 600,
        },
      ],
      locale: lang === 'sv' ? 'sv_SE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['https://kkrecords.se/api'],
    },
  };
}

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'sv' },
  ];
}

export default async function RootLayout(props: LayoutProps) {
  const params = await props.params;
  const lang = isValidLanguage(params.lang) ? (params.lang as Language) : DEFAULT_LANGUAGE;

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
    description: lang === 'sv'
      ? "K&K Records - Inte den vanliga sortens skivbolag. Vi stödjer unga kulturutövare i Örebro län med finansiering, vägledning och kreativt stöd."
      : "K&K Records - Not your ordinary record label. We support young cultural practitioners in Örebro County with financing, guidance, and creative support.",
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
    knowsLanguage: lang,
  };

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* hreflang links for SEO */}
        <link rel="alternate" hrefLang="sv" href="https://kkrecords.se/sv" />
        <link rel="alternate" hrefLang="en" href="https://kkrecords.se/en" />
        <link rel="alternate" hrefLang="x-default" href="https://kkrecords.se/en" />
      </head>
      <body className="antialiased">
        <LanguageProvider initialLanguage={lang}>
          <Header />
          <LenisScrollProvider>
            {props.children}
            <SpeedInsights />
            <Analytics />
          </LenisScrollProvider>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
