export const metadata = {
    title: "Artister",
    description:
      "Utforska alla artister som är signade till K&K Records. Se bilder, namn och datum för varje artist.",
    openGraph: {
      title: "Artister | K&K RECORDS",
      description: "Se hela listan av artister som är del av K&K Records och upptäck nya namn.",
      url: "https://kkrecords.se/artists",
      siteName: "K&K Records",
      images: [
        {
          url: "https://kkrecords.se/api",
          width: 1200,
          height: 630,
          alt: "Artister | K&K RECORDS",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Artister | K&K RECORDS",
      description: "Upptäck artister som tillhör K&K Records – allt från nya stjärnskott till etablerade namn.",
      images: ["https://kkrecords.se/api"],
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Artister | K&K RECORDS",
    "description":
      "K&K Records representerar ett brett spektrum av artister och musiker i Sverige.",
    "url": "https://kkrecords.se/artists",
    "publisher": {
      "@type": "Organization",
      "name": "K&K Records",
      "url": "https://kkrecords.se",
    },
  };
  
  
  export default function ArtistsLayout({ children }: { children: React.ReactNode }) {
    return <>
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    {children}
    </>;
  }
  