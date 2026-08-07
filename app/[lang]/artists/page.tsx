import '@/app/globals.css';
import { client } from '@/sanity/client';
import ArtistsList from '@/components/Artists/ArtistsSection';
import { SanityImageSource } from '@/lib/utils';
import { getLocalizedValue } from '@/lib/localized-content';

// Define the Artist interface with internationalized fields
interface InternationalizedString {
  _key?: string;
  language: string;
  value: string;
}

interface Artist {
  _id: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  name: InternationalizedString[];
  slug: InternationalizedString[];
  Biography?: any[];
  image: SanityImageSource;
}

export const revalidate = 30;

const ARTISTS_QUERY = `*[_type == "artist" && defined(slug)]{
  _id, 
  name, 
  slug, 
  image,
  Biography
}|order(name[0].value asc)`;

export default async function Page({ params }: { params: { lang: string } }) {
  const sanityArtists = await client.fetch<Artist[]>(ARTISTS_QUERY);
  
  // Transform the data to include localized names
  const artists = sanityArtists.map((artist) => ({
    _id: artist._id,
    _rev: artist._rev,
    _type: artist._type,
    _createdAt: artist._createdAt,
    _updatedAt: artist._updatedAt,
    name: getLocalizedValue(artist.name, params.lang, 'en'),
    slug: getLocalizedValue(artist.slug, params.lang, 'en').current,
    image: artist.image,
  }));

  return <ArtistsList initialArtists={artists} />;
}
