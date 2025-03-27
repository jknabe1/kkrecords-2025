import '@/app/globals.css';
import { SanityDocument } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client';
import ArtistsList from '@/components/News/NewsSection';
import { Metadata } from 'next';

interface Artist {
  _id: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: { current: string };
  date: string;
  image: any;
  publishedAt: string;
}

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Edits",
  description: "Senaste nyheterna från K&K Records. Håll dig uppdaterad med pressmeddelanden, evenemang och nyheter.",
  openGraph: {
    title: "Edits - K&K Records",
    description: "Senaste nyheterna från K&K Records.",
    url: "https://kkrecords.se/edits",
    siteName: "K&K Records",
    images: [
      {
        url: "https://kkrecords.se/api", // Replace with a valid image
        width: 1200,
        height: 630,
        alt: "Nyheter - K&K Records",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edits - K&K Records",
    description: "Håll dig uppdaterad med de senaste nyheterna från K&K Records.",
    images: ["https://kkrecords.se/api"],
  },
};


const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}

const ARTISTS_QUERY = `*[_type == "news" && defined(slug.current)]{_id, name, slug, date, image,publishedAt} | order(publishedAt desc)`;

export default async function Page() {
  const sanityArtists = await client.fetch<SanityDocument[]>(ARTISTS_QUERY);
  const artists: Artist[] = sanityArtists.map(artist => ({
    _id: artist._id,
    _rev: artist._rev,
    _type: artist._type,
    _createdAt: artist._createdAt,
    _updatedAt: artist._updatedAt,
    name: artist.name,
    slug: artist.slug,
    date: artist.date,
    image: artist.image,
    publishedAt: artist.publishedAt
  }));
  
  return <ArtistsList initialArtists={artists} />;
}