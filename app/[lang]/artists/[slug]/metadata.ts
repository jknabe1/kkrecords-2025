import { client } from '@/sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { Metadata } from 'next';
import { PortableTextBlock } from '@portabletext/react';

// Define the type for Sanity image source
interface SanityImageSource {
  asset: {
    _ref: string;
  };
}

// Define the artist data structure
interface Artist {
  currentSlug: string;
  name: string;
  Biography: PortableTextBlock[];
  image: SanityImageSource;
  Instagram?: string;
  Facebook?: string;
  spotify?: string;
  excerpt?: string;
  date?: string;
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
          date,
      }[0]`;

  const artist = await client.fetch<Artist>(query);
  return artist;
}

// Explicitly use Metadata as the return type
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const artist = await getData(resolvedParams.slug);

  if (!artist) {
    return {
      title: 'Artist Not Found | K&K RECORDS',
      description: 'The requested artist could not be found.',
    };
  }

  const description = artist.Biography?.map(block => block.children?.map(child => child.text).join(' ')).join(' ').slice(0, 160) || `${artist.name} - Artist hos K&K Records`;

  return {
    title: `${artist.name}| K&K RECORDS`,
    description,
    alternates: {
      canonical: `https://kkrecords.se/artists/${artist.currentSlug}`,
    },
    openGraph: {
      title: `${artist.name} - K&K Records`,
      description,
      url: `https://kkrecords.se/artists/${artist.currentSlug}`,
      siteName: "K&K Records",
      locale: "sv_SE",
      type: "profile",
      images: artist.image ? [{ url: urlFor(artist.image).url(), width: 1200, height: 630, alt: artist.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artist.name} - K&K Records`,
      description,
      images: artist.image ? [{ url: urlFor(artist.image).url() }] : [],
    },
  };
}
