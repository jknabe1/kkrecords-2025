import { client } from '@/sanity/client';
import { groq, PortableTextBlock } from 'next-sanity'; // Updated import
import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import type { Metadata } from 'next';

// Define the Sanity image source type
interface SanityImageSource {
  asset: {
    _ref: string;
  };
  alt?: string;
}

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Define the SearchResult data structure
interface SearchResult {
  _id: string;
  _type: string;
  name: string;
  image?: SanityImageSource;
  Biography?: PortableTextBlock[]; // Replaced 'any' with PortableTextBlock[]
  description?: PortableTextBlock[]; // Replaced 'any' with PortableTextBlock[]
  slug?: { current: string };
  email?: string;
  roll?: string;
  title?: string;
  location?: string;
  date?: string;
  link?: string;
  category?: string;
  categorySlug?: string;
  publishedAt?: string;
  author?: string;
  excerpt?: string;
}

export const dynamic = 'force-dynamic';

async function getSearchResults(query: string): Promise<SearchResult[]> {
  if (!query) return [];

  const loweredQuery = query.toLowerCase();

  const groqQuery = groq`
  *[_type in ["artist", "event", "news", "item", "team"] && (
    name match $fuzzy ||
    description match $exact ||
    lower(pt::text(description)) match $fuzzy
  )]{
    _id,
    _type,
    name,
    image,
    Biography,
    description,
    "slug": slug.current,
    "email": email,
    "roll": roll,
    "title": title,
    "location": location,
    "date": date,
    "link": link,
    "category": category->title,
    "categorySlug": category->slug.current,
    publishedAt,
    "author": author->name,
    "excerpt": pt::text(description)[0...180]
  }
`;

  return await client.fetch<SearchResult[]>(groqQuery, {
    exact: `*${loweredQuery}*`,
    fuzzy: `*${loweredQuery}*`,
  });
}

const typeDisplayNames = {
  artist: 'Artist',
  event: 'Event',
  news: 'Edits',
  item: 'Item',
  team: 'Styrelsen',
} as const;

type Props = {
  searchParams: { q?: string };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = searchParams.q || '';

  return {
    title: `Sökresultat för "${query}"`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: query = '' } = await searchParams;
  const results = await getSearchResults(query);

  function getItemHref(item: SearchResult): string {
    if (item._type === 'team' && item.email) {
      return `mailto:${item.email}`;
    } else if (item.slug?.current) {
      return `/${item._type}/${item.slug.current}`;
    }
    return '#'; // Fallback URL if no conditions are met
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-5 px-2 py-3 lg:px-5">
      <div className="relative aspect-[4/5] lg:aspect-[6/5] bg-black flex items-center justify-center text-white border border-solid border-black">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            {results.length} resultat för "{query}"
          </h2>
          <p className="text-xl">Här är vad vi hittade för din sökning.</p>
        </div>
      </div>
      {results.map((item) => {
        const href = getItemHref(item);
        return (
          <Link
            key={item._id}
            href={href}
            className="relative group overflow-hidden border-b md:border-b-0 md:border-r last:border-b-0 last:md:border-r-0 border-gray-200"
          >
            {/* Category Label */}
            <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
              {item._type && (
                <div className="bg-white text-black px-2 py-1 inline-block">
                  <span className="text-[--vividGreen] mr-1">■</span>
                  {typeDisplayNames[item._type as keyof typeof typeDisplayNames] || item._type}
                </div>
              )}
              <div className="bg-white text-black px-2 py-1 inline-block">{item.name}</div>
              {item.roll && (
                <div className="bg-white text-black px-2 py-1 inline-block">{item.roll}</div>
              )}
              {item.publishedAt && (
                <div className="bg-white text-black px-2 py-1 inline-block">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </div>
              )}
              {item.email && (
                <div className="bg-white text-black px-2 py-1 inline-block hover:text-[--vividGreen] hover:underline">
                  {item.email}
                </div>
              )}
              {item.date && (
                <div className="bg-white text-black px-2 py-1 inline-block">
                  {new Date(item.date).toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Image */}
            <div className="noise relative aspect-[4/5] lg:aspect-[6/5] border border-black border-solid">
              {item.image ? (
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.name}
                  loading="lazy"
                  width={1536}
                  height={1920}
                  className="h-full w-full object-cover border-solid border-black transition-transform duration-500 group-hover:scale-105"
                  sizes="50vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-gray-200 text-black">
                  Bild saknas...
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </main>
  );
}