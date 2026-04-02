import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client';
import Image from 'next/image';
import { PortableText, PortableTextBlock } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import ShareButtons from '@/components/Share/ShareButtons';

export const revalidate = 30;

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface GalleryImage {
  asset: SanityImageSource;
  alt?: string;
  caption?: string;
}

interface ContentSection {
  sectionTitle?: string;
  sectionContent?: PortableTextBlock[];
}

interface AboutPage {
  currentSlug: string;
  name: string;
  details: PortableTextBlock[];
  image: SanityImageSource;
  gallery?: GalleryImage[];
  excerpt: string;
  publishedAt: string;
  additionalContent?: ContentSection[];
}

async function getData(slug: string): Promise<AboutPage | null> {
  const query = `
    *[_type == "about" && slug.current == '${slug}'] {
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
        "additionalContent": additionalContent[]{
          sectionTitle,
          sectionContent
        }
    }[0]`;
  const about = await client.fetch<AboutPage>(query);
  return about;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const about = await getData(resolvedParams.slug);

  if (!about) {
    return {
      title: 'Page Not Found - K&K Records',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: `${about.name}`,
    description: about.excerpt || 'Learn more about K&K Records.',
    alternates: {
      canonical: `https://kkrecords.se/om-oss/${about.currentSlug}`,
    },
    openGraph: {
      title: `${about.name} - K&K Records`,
      description: about.excerpt || 'Learn more about K&K Records.',
      url: `https://kkrecords.se/om-oss/${about.currentSlug}`,
      siteName: 'K&K Records',
      locale: 'sv_SE',
      type: 'article',
      images: about.image ? [{ url: urlFor(about.image).url(), width: 1200, height: 630, alt: about.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${about.name} - K&K Records`,
      description: about.excerpt || 'Learn more about K&K Records.',
      images: about.image ? [{ url: urlFor(about.image).url() }] : [],
    },
  };
}

export default async function AboutArticle({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const about = await getData(resolvedParams.slug);

  if (!about) {
    notFound();
  }

  const publishedDate = new Date(about.publishedAt);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `https://kkrecords.se/om-oss/${about.currentSlug}`,
    name: about.name,
    description: about.excerpt || '',
    datePublished: about.publishedAt,
    dateModified: about.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://kkrecords.se/om-oss/${about.currentSlug}`,
    },
    image: about.image ? urlFor(about.image).url() : undefined,
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
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Hem',
        item: 'https://kkrecords.se',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Om oss',
        item: 'https://kkrecords.se/om-oss',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: about.name,
        item: `https://kkrecords.se/om-oss/${about.currentSlug}`,
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main>
        <article className="relative">
          {/* Hero Image */}
          <header className="relative overflow-hidden">
            <div className="noise relative aspect-[4/5] lg:aspect-[12/5] bg-gray-200">
              <Image
                alt={about.name}
                src={urlFor(about.image).width(1920).height(700).url()}
                width={1920}
                height={700}
                className="absolute inset-0 object-cover w-full h-full"
                priority
                quality={85}
              />
              <div className="absolute top-4 z-10 flex flex-col items-start gap-2 px-4 py-3 lg:px-6">
                              <nav aria-label="Breadcrumb" className="mb-4 bg-white px-2 py-1">
                                <ol className="flex items-center gap-2 text-black text-sm">
                                <li>
                                  <Link href="/" className="hover:text-white transition-colors">Hem</Link>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li>
                                  <Link href="/om-oss" className="hover:text-white transition-colors">Om oss</Link>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li aria-current="page" className="text-black">{about.name}</li>
                                </ol>
                              </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <section className="px-2 lg:px-5 py-8 md:py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left column - Main content */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="mb-6">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2">{about.name}</h1>
                  <time dateTime={about.publishedAt} className="text-gray-600 text-sm">
                    Publicerad{' '}
                    {publishedDate.toLocaleDateString('sv-SE', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                {about.excerpt && (
                  <p className="text-xl text-gray-700 mb-8 font-medium leading-relaxed">{about.excerpt}</p>
                )}

                <div className="prose prose-lg max-w-none mb-8">
                  <PortableText value={about.details} />
                </div>

                {/* Additional Content Sections */}
                {about.additionalContent && about.additionalContent.length > 0 && (
                  <div className="space-y-8 mt-12">
                    {about.additionalContent.map((section, index) => (
                      <section key={index} className="border-t border-gray-200 pt-8">
                        {section.sectionTitle && (
                          <h2 className="text-2xl font-bold mb-4">{section.sectionTitle}</h2>
                        )}
                        {section.sectionContent && (
                          <div className="prose prose-lg max-w-none">
                            <PortableText value={section.sectionContent} />
                          </div>
                        )}
                      </section>
                    ))}
                  </div>
                )}

                {/* Image Gallery */}
                {about.gallery && about.gallery.length > 0 && (
                  <div className="mt-12 mb-8">
                    <h3 className="text-xl font-bold mb-4">Galleri</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {about.gallery.map((img, index) => (
                        <figure key={index} className="relative aspect-video overflow-hidden bg-gray-100 rounded-lg">
                          <Image
                            src={urlFor(img.asset).width(800).height(450).url()}
                            alt={img.alt || `Bild ${index + 1} från ${about.name}`}
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

                <div className="border-t border-gray-300 pt-6 mt-8">
                  <p className="text-sm text-gray-600">
                    Senast uppdaterad: {publishedDate.toLocaleDateString('sv-SE')}
                  </p>
                </div>
              </div>

              {/* Right column - Share sidebar */}
              <aside className="lg:col-span-5 xl:col-span-4">
                <div className="sticky top-24">
                  {/* Share Section */}
                  <div className="border border-black border-solid p-6 md:p-8">
                    <ShareButtons 
                      title={about.name}
                      url={`https://kkrecords.se/om-oss/${about.currentSlug}`}
                      variant="dark"
                    />
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* Back navigation */}
          <nav className="bg-gray-50 border-t border-gray-200">
            <div className="px-2 lg:px-5 py-8 md:py-12 lg:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-7 xl:col-span-8">
                  <Link
                    href="/om-oss"
                    className="inline-block text-blue-600 hover:text-blue-700 hover:underline font-medium"
                  >
                    ← Tillbaka till Om oss
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </article>
      </main>
    </div>
  );
}
