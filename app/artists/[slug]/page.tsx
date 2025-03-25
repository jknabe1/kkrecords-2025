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

async function getData(slug: string, id: any) {
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
          date,
      }[0]`;

  const artist = await client.fetch(query);
  return artist;
}

// ✅ **Fixed: Remove JSON-LD from generateMetadata**
export async function generateMetadata(
  { params }: { params: { slug: string; id: any } }, 
  parent: ResolvingMetadata
): Promise<Metadata> {
  const artist = await getData(params.slug, params.id);

  return {
    title: `${artist.name} - K&K Records`,
    description: artist.Biography || "Explore the artist's biography and works.",
    openGraph: {
      title: artist.name,
      description: artist.Biography || "Explore the artist's biography and works.",
      images: artist.image ? [{ url: urlFor(artist.image).url() }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: artist.name,
      description: artist.Biography || "Explore the artist's biography and works.",
      images: artist.image ? [{ url: urlFor(artist.image).url() }] : [],
    },
  };
}

export default async function BlogArticle({ params }: { params: { slug: string; id: any } }) {
  const artist = await getData(params.slug, params.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": artist.name,
    "description": artist.Biography,
    "image": artist.image ? urlFor(artist.image).url() : undefined,
    "url": `https://yourwebsite.com/artist/${artist.currentSlug}`,
    "sameAs": [
      artist.Instagram || "",
      artist.Facebook || "",
      artist.spotify || ""
    ].filter(Boolean) // Removes empty values
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-12 gap-px">
        <div className="col-span-12 relative h-full grid-col-border">
          <div className="grid grid-cols-12 gap-px items-start">
            <div className="col-span-12 lg:col-span-6 grid-col-border">
              <ul className="flex flex-col gap-px">
                <li className="p-2 lg:p-4">
                  {/* Heading */}
                  <h1 className="text-sans-35 lg:text-sans-60 font-600">
                    {artist.name}
                  </h1>
                  <div className='mt-4 text-lg leading-relaxed text-prose'>
                    <PortableText value={artist.Biography} />
                  </div>
                </li>
                <div className='mt-4 text-lg leading-relaxed border-t pt-2 border-solid border-black p-2 lg:p-4'>
                    Följ {artist.name} på sociala medier:
                    <div className='flex gap-4 mt-2'>
                      {artist.Instagram && (
                        <a href={artist.Instagram} target="_blank" className='hover:italic' rel="noopener noreferrer">
                          Instagram
                        </a>
                      )}
                      {artist.Facebook && (
                        <a href={artist.Facebook} target="_blank" className='hover:italic' rel="noopener noreferrer">
                          Facebook
                        </a>
                      )}
                      {artist.spotify && (
                        <a href={artist.spotify} className='hover:italic' target="_blank" rel="noopener noreferrer">
                          Spotify
                        </a>
                      )}
                    </div>  
                  </div>
              </ul>
            </div>
            <div className="hidden lg:block col-span-6 grid-col-border sticky top-7 min-h-hero-minus-header overflow-hidden">
              <div className="image overflow-hidden absolute inset-0">
                <Image
                  src={urlFor(artist.image).url()}
                  alt={artist.name}
                  className="w-full h-full object-cover noise"
                  width={1000}
                  height={1000}
                  loading='lazy'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
