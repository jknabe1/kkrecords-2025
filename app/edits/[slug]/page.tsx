import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText, PortableTextBlock } from 'next-sanity';
import { generateMetadata } from './metadata';
import { notFound } from 'next/navigation';

export const revalidate = 30;

interface SanityImageSource {
  asset: {
    _ref: string;
  };
}

interface GalleryImage {
  asset: SanityImageSource;
  alt?: string;
  caption?: string;
}

interface NewsArticle {
  currentSlug: string;
  name: string;
  details: PortableTextBlock[];
  image: SanityImageSource;
  gallery?: GalleryImage[];
  excerpt: string;
  publishedAt: string;
  category?: string;
  tags?: string[];
}

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

async function getData(slug: string): Promise<NewsArticle | null> {
  const query = `
    *[_type == "news" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
        name,
        details,
        image,
        "gallery": gallery[]{
          asset,
          alt,
          caption
        },
        excerpt,
        publishedAt,
        category,
        tags
    }[0]`;
  const news = await client.fetch<NewsArticle>(query);
  return news;
}

// Helper function to convert Portable Text to plain text for schema
function portableTextToPlainText(blocks: PortableTextBlock[] = []): string {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return (block.children as unknown as Array<{ text?: string }>).map((child) => child.text || '').join('');
    })
    .join(' ')
    .trim();
}

export { generateMetadata };

export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const news = await getData(resolvedParams.slug);

  if (!news) {
    notFound();
  }

  const plainTextContent = portableTextToPlainText(news.details);
  const publishedDate = new Date(news.publishedAt);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `https://kkrecords.se/edits/${news.currentSlug}`,
    headline: news.name,
    description: news.excerpt || plainTextContent.slice(0, 160),
    image: news.image ? urlFor(news.image).url() : undefined,
    datePublished: news.publishedAt,
    dateModified: news.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'K&K Records',
      url: 'https://kkrecords.se',
    },
    publisher: {
      '@type': 'Organization',
      name: 'K&K Records',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kkrecords.se/logo.svg',
        width: 250,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://kkrecords.se/edits/${news.currentSlug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kkrecords.se',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Edits',
        item: 'https://kkrecords.se/edits',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: news.name,
        item: `https://kkrecords.se/edits/${news.currentSlug}`,
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main>
        <article className="relative">
          <header className="relative overflow-hidden">
            <div className="noise relative aspect-[4/5] lg:aspect-[12/5] bg-gray-200">
              <Image
                alt={news.name}
                src={urlFor(news.image).width(1920).height(700).url()}
                width={1920}
                height={700}
                className="absolute inset-0 object-cover w-full h-full"
                priority
                quality={85}
              />
              <div className="absolute top-4 z-10 flex flex-col items-start gap-2 px-4 py-3 lg:px-6">
                <div className="bg-white text-black px-3 py-2 inline-block shadow-sm">
                  <span className="text-[--vividGreen] font-bold">■</span> <span className="font-semibold">{news.name}</span>
                </div>
                <time className="bg-white text-black text-sm px-3 py-2 inline-block shadow-sm" dateTime={news.publishedAt}>
                  {publishedDate.toLocaleDateString('sv-SE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </header>

          <section className="max-w-3xl mx-auto p-6 lg:p-8 text-gray-900">
            <div className="mb-6">
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">{news.name}</h1>
              <time dateTime={news.publishedAt} className="text-gray-600 text-sm">
                Published on{' '}
                {publishedDate.toLocaleDateString('sv-SE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            {news.excerpt && (
              <p className="text-xl text-gray-700 mb-8 font-medium leading-relaxed">{news.excerpt}</p>
            )}

            <div className="prose prose-lg max-w-none mb-8">
              <PortableText value={news.details} />
            </div>

            {/* Image Gallery */}
            {news.gallery && news.gallery.length > 0 && (
              <div className="mt-12 mb-8">
                <h3 className="text-xl font-bold mb-4">Galleri</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {news.gallery.map((img, index) => (
                    <figure key={index} className="relative aspect-video overflow-hidden bg-gray-100 rounded-lg">
                      <Image
                        src={urlFor(img.asset).width(800).height(450).url()}
                        alt={img.alt || `Bild ${index + 1} från ${news.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      {img.caption && (
                        <figcaption className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2 rounded-b-lg">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {news.tags && news.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {news.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-gray-300 pt-6 mt-8">
              <p className="text-sm text-gray-600">
                Last updated: {publishedDate.toLocaleDateString('sv-SE')}
              </p>
            </div>
          </section>

          <nav className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-3xl mx-auto px-6 py-6 lg:py-8">
              <Link
                href="/edits"
                className="inline-block text-blue-600 hover:text-blue-700 hover:underline font-medium"
              >
                ← Back to all edits
              </Link>
            </div>
          </nav>
        </article>
      </main>
    </div>
  );
}
