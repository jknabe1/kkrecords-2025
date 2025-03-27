import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// ✅ **Define Link Data**
const links = [
  { title: "Kontakta oss", slug: "contact", content: "Här kan du kontakta oss.", image: "/assets/contact.jpg" },
  { title: "Skicka post", slug: "send-mail", content: "Information om hur du skickar post till oss.", image: "/assets/mail.jpg" },
  { title: "Våra medarbetare", slug: "team", content: "Lär känna vårt team.", image: "/assets/team.jpg" },
  { title: "Så arbetar vi", slug: "how-we-work", content: "Läs mer om hur vi arbetar.", image: "/assets/work.jpg" },
  { title: "Vår myndighet", slug: "authority", content: "Information om vår myndighet.", image: "/assets/authority.jpg" },
  { title: "Medierum", slug: "media-room", content: "Här hittar du pressmaterial.", image: "/assets/media.jpg" },
  { title: "Logotyp", slug: "logo", content: "Ladda ner vår logotyp.", image: "/assets/logo.jpg" },
  { title: "Publikationer", slug: "publications", content: "Våra publikationer och rapporter.", image: "/assets/publications.jpg" },
  { title: "Jobba hos oss", slug: "careers", content: "Se våra lediga tjänster.", image: "/assets/careers.jpg" },
];

// ✅ **Fetch Data Based on Slug**
async function getLinkData(slug: string) {
  return links.find((item) => item.slug === slug) || null;
}

// ✅ **Generate Dynamic Metadata for SEO**
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const linkData = await getLinkData(params.slug);

  if (!linkData) {
    return {
      title: "Sidan finns inte - K&K Records",
      description: "Den begärda sidan kunde inte hittas.",
    };
  }

  return {
    title: `${linkData.title} - K&K Records`,
    description: linkData.content,
    openGraph: {
      title: `${linkData.title} - K&K Records`,
      description: linkData.content,
      url: `https://kkrecords.se/links/${linkData.slug}`,
      siteName: "K&K Records",
      images: linkData.image ? [{ url: `https://kkrecords.se${linkData.image}` }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${linkData.title} - K&K Records`,
      description: linkData.content,
      images: linkData.image ? [`https://kkrecords.se${linkData.image}`] : [],
    },
  };
}

// ✅ **Dynamic Page Component**
export default async function LinkPage({ params }: { params: { slug: string } }) {
  const linkData = await getLinkData(params.slug);

  if (!linkData) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": linkData.title,
            "description": linkData.content,
            "url": `https://kkrecords.se/links/${linkData.slug}`,
            "publisher": {
              "@type": "Organization",
              "name": "K&K Records",
              "url": "https://kkrecords.se",
            },
          }),
        }}
      />

      {/* ✅ Page Content */}
      <h1 className="text-4xl font-bold text-center mb-6">{linkData.title}</h1>
      <p className="text-lg text-gray-700 text-center">{linkData.content}</p>

      {/* ✅ Image if available */}
      {linkData.image && (
        <div className="mt-6 flex justify-center">
          <img
            src={linkData.image}
            alt={linkData.title}
            className="rounded-lg w-full max-w-md"
          />
        </div>
      )}

      {/* ✅ Back to Links Page */}
      <div className="mt-6 text-center">
        <Link href="/links" className="text-blue-600 hover:underline">
          ← Tillbaka till Snabblänkar
        </Link>
      </div>
    </div>
  );
}
