import '@/app/globals.css';
import { SanityDocument } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client';
import ArtistsList from '@/components/Artists/ArtistsSection';


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
}

export const revalidate = 30;

const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}

const ARTISTS_QUERY = `*[_type == "artist" && defined(slug.current)]{_id, name, slug, date, image}|order(name asc)`;

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
    image: artist.image
  }));
  
  return <ArtistsList initialArtists={artists} />;
}