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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artist = await getData(params.slug);

  if (!artist) {
    return {
      title: 'Artist Not Found | K&K RECORDS',
      description: 'The requested artist could not be found.',
    };
  }

  return {
    title: `${artist.name} | K&K RECORDS`,
    description: artist.Biography?.map(block => block.children?.map(child => child.text).join(' ')).join(' ') || 'Explore the artist’s biography and works.',
    openGraph: {
      title: artist.name,
      description: artist.Biography?.map(block => block.children?.map(child => child.text).join(' ')).join(' ') || 'Explore the artist’s biography and works.',
      images: artist.image ? [{ url: urlFor(artist.image).url() }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: artist.name,
      description: artist.Biography?.map(block => block.children?.map(child => child.text).join(' ')).join(' ') || 'Explore the artist’s biography and works.',
      images: artist.image ? [{ url: urlFor(artist.image).url() }] : [],
    },
  };
}