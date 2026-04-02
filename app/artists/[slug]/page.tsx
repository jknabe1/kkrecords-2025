/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { generateMetadata } from './metadata';
import { PortableText, PortableTextBlock } from 'next-sanity';
import ShareButtons from '@/components/Share/ShareButtons';

export const revalidate = 30;

interface SanityImageSource {
  asset: {
    _ref: string;
  };
}

interface Artist {
  currentSlug: string;
  name: string;
  Biography: PortableTextBlock[];
  image: SanityImageSource;
  Instagram?: string;
  Facebook?: string;
  spotify?: string;
  excerpt?: string;
}

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

async function getData(slug: string): Promise<Artist | null> {
  const query = `
    *[_type == "artist" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
        name,
        Biography,
        image,
        Instagram,
        Facebook,
        spotify,
        excerpt,
    }[0]`;

  const artist = await client.fetch<Artist>(query);
  return artist;
}

function portableTextToPlainText(blocks: PortableTextBlock[] = []): string {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return (block.children as any[]).map((child) => child.text || "").join("");
    })
    .join(" ")
    .trim();
}

export { generateMetadata };

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const artist = await getData(resolvedParams.slug);

  if (!artist) {
    return <div>Artist not found</div>;
  }

  const plainTextBio = portableTextToPlainText(artist.Biography);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: "https://kkrecords.se"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Artists",
        item: "https://kkrecords.se/artists"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: artist.name,
        item: `https://kkrecords.se/artists/${artist.currentSlug}`
      }
    ]
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    '@id': `https://kkrecords.se/artists/${artist.currentSlug}`,
    name: artist.name,
    description: plainTextBio || `${artist.name} - Artist hos K&K Records`,
    image: artist.image ? urlFor(artist.image).url() : undefined,
    url: `https://kkrecords.se/artists/${artist.currentSlug}`,
    sameAs: [artist.Instagram || '', artist.Facebook || '', artist.spotify || ''].filter(Boolean),
    member: {
      "@type": "OrganizationRole",
      "roleName": "Artist",
      "memberOf": {
        "@type": "RecordLabel",
        "name": "K&K Records",
        "url": "https://kkrecords.se"
      }
    }
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Full-width Hero Image */}
      <header className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        {artist.image ? (
          <Image
            src={urlFor(artist.image).width(1920).height(1080).url()}
            alt={artist.name}
            fill
            priority
            loading="eager"
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
            <span className="text-neutral-500 text-lg">No Image Available</span>
          </div>
        )}
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Hero content overlay - Desktop */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-2 lg:px-5 lg:pb-10 hidden md:flex md:flex-row md:items-end md:justify-between gap-4">
          <h1 className="text-white uppercase font-600 text-sans-35 lg:text-sans-60 xl:text-sans-120 leading-[1.05] text-balance max-w-[75%]">
            {artist.name}
          </h1>
        </div>
        
        {/* Mobile banner - Artist name prominently displayed */}
        <div className="md:hidden bg-white text-black">
          <div className="max-w-4xl mx-auto">
            <div className="px-6 py-5 border-b border-solid border-black">
              <h1 className="text-sans-28 font-700 uppercase leading-[1.05] text-balance">
                {artist.name}
              </h1>
            </div>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-transparent to-gray-950/50 p-5">
          <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
            <nav aria-label="Breadcrumb" className="mb-4 bg-white px-2 py-1">
              <ol className="flex items-center gap-2 text-black text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">Hem</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/artists" className="hover:text-white transition-colors">Artists</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-black">{artist.name}</li>
              </ol>
            </nav>
          </div>
        </div>
      </header>

      {/* Two-column content area */}
      <div className="px-2 lg:px-5 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left column - Biography content */}
          <section className="lg:col-span-7 xl:col-span-8 border border-black border-solid p-6 md:p-8">
            <h2 className="sr-only">Om artisten</h2>
            <p className="text-sans-11 sm:text-sans-12 font-600 uppercase tracking-widest opacity-50 mb-3 sm:mb-4">Om artisten</p>
            
            {/* Excerpt highlight */}
            {artist.excerpt && (
              <p className="text-xl md:text-2xl text-neutral-700 font-500 leading-relaxed mb-8 text-balance">
                {artist.excerpt}
              </p>
            )}
            
            {/* Biography content */}
            {artist.Biography && artist.Biography.length > 0 ? (
              <div className="prose prose-lg max-w-none leading-relaxed">
                <PortableText value={artist.Biography} />
              </div>
            ) : (
              <p className="text-neutral-600 text-lg">
                Mer information kommer snart.
              </p>
            )}
          </section>

          {/* Right column - Artist info sidebar */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Artist info card */}
              <div className="border border-black border-solid p-6 md:p-8">
                <h2 className="text-sans-22 font-600 mb-6 uppercase tracking-wide">Om Artisten</h2>
                
                {/* Social media links */}
                <div className="space-y-4">
                  <h3 className="text-sans-14 font-600 uppercase tracking-widest">Följ på sociala medier</h3>
                  <div className="flex flex-col gap-3">
                    {artist.Instagram && (
                      <Link
                        href={artist.Instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-900 hover:text-[--vividGreen] transition-colors font-500 flex items-center gap-2"
                      >
                        Instagram
                        <span className="text-xs text-neutral-500">↗</span>
                      </Link>
                    )}
                    {artist.Facebook && (
                      <Link
                        href={artist.Facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-900 hover:text-[--vividGreen] transition-colors font-500 flex items-center gap-2"
                      >
                        Facebook
                        <span className="text-xs text-neutral-500">↗</span>
                      </Link>
                    )}
                    {artist.spotify && (
                      <Link
                        href={artist.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-900 hover:text-[--vividGreen] transition-colors font-500 flex items-center gap-2"
                      >
                        Spotify
                        <span className="text-xs text-neutral-500">↗</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Share section */}
              <div>
                <ShareButtons 
                  title={artist.name}
                  url={`https://kkrecords.se/artists/${artist.currentSlug}`}
                  variant="dark"
                />
              </div>

              {/* Back link */}
              <Link
                href="/artists"
                className="inline-flex items-center gap-2 text-neutral-900 hover:text-[--vividGreen] transition-colors font-500"
              >
                ← Tillbaka till artists
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

