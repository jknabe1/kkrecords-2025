import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from 'next'

export const revalidate = 30;

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

async function getData(slug: string) {
  const query = `
    *[_type == "news" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          name,
          details,
          image,
          excerpt,
          publishedAt,
            date,
      }[0]`;

  const news = await client.fetch(query);
  return news;
}

export async function generateMetadata(
  { params }: { params: { slug: string } }, 
  parent: ResolvingMetadata
): Promise<Metadata> {
  const news = await getData(params.slug);

  return {
    title: `${news.name} - K&K Records`,
    description: news.excerpt || "Read the latest news and updates.",
    openGraph: {
      title: `${news.name} - K&K Records`,
      description: news.excerpt || "Read the latest news and updates.",
      images: news.image ? [{ url: urlFor(news.image).url() }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${news.name} - K&K Records`,
      description: news.excerpt || "Read the latest news and updates.",
      images: news.image ? [{ url: urlFor(news.image).url() }] : [],
    },
  };
}

export default async function BlogArticle(props: { params: { slug: string } }) {
  const { params } = props;
  const news = await getData(params.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": news.name,
    "description": news.excerpt || "Read the latest news and updates.",
    "datePublished": news.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://kkrecords.se/edits/${news.currentSlug}`
    },
    "image": news.image ? urlFor(news.image).url() : undefined,
    "author": {
      "@type": "Organization",
      "name": "K&K Records"
    },
    "publisher": {
      "@type": "Organization",
      "name": "K&K Records",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kkrecords.se/api"
      }
    }
  };

  return (
    <div>
      {/* ✅ Fixed: Inject JSON-LD separately */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <section className="relative">
        <section className="noise relative aspect-[4/5] lg:aspect-[12/5]">
          <Image
            alt={news.name}
            src={urlFor(news.image).url()}
            width={1920}
            height={700}
            className="absolute inset-0 object-cover w-full h-full"
            priority
          />
          <div className="absolute top-4 z-5 flex flex-col items-start gap-1 px-2 py-3 lg:px-5">
            <div className="bg-white text-black px-2 py-1 inline-block">
              <span className="text-[--vividGreen]">■</span> {news.name}
            </div>
            <div className="bg-white text-black text-sm px-2 py-1 inline-block">
              <p>{new Date(news.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </section>
        <section className="max-w-3xl mx-auto p-6 text-black">
          <h1 className="text-sans-35 lg:text-sans-60 font-600">{news.name}</h1>
          <div className='mt-6'>
            <PortableText value={news.details} />
          </div>
        </section>
      </section>
    </div>
  )
}
