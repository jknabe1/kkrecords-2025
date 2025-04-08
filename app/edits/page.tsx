import '@/app/globals.css';
import { urlFor } from '@/lib/utils';
import { client } from '@/sanity/client';
import NewsList from '@/components/News/NewsSection';
import { Metadata } from 'next';

// Define the Sanity image source type
interface SanityImageSource {
  asset: {
    _ref: string;
  };
}

// Define the News interface with proper image typing
interface News {
  _id: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: { current: string };
  date: string;
  image: SanityImageSource;
  publishedAt: string;
}

export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Edits',
  description: 'Senaste nyheterna från K&K Records. Håll dig uppdaterad med pressmeddelanden, evenemang och nyheter.',
  openGraph: {
    title: 'Edits - K&K Records',
    description: 'Senaste nyheterna från K&K Records.',
    url: 'https://kkrecords.se/edits',
    siteName: 'K&K Records',
    images: [
      {
        url: 'https://kkrecords.se/api', // Replace with a valid image
        width: 1200,
        height: 630,
        alt: 'Nyheter - K&K Records',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edits - K&K Records',
    description: 'Håll dig uppdaterad med de senaste nyheterna från K&K Records.',
    images: ['https://kkrecords.se/api'],
  },
};

const NEWS_QUERY = `*[_type == "news" && defined(slug.current)]{_id, name, slug, date, image, publishedAt} | order(publishedAt desc)`;

export default async function Page() {
  const sanityNews = await client.fetch<News[]>(NEWS_QUERY); // Type directly as News[]
  const newsItems: News[] = sanityNews.map((news) => ({
    _id: news._id,
    _rev: news._rev,
    _type: news._type,
    _createdAt: news._createdAt,
    _updatedAt: news._updatedAt,
    name: news.name,
    slug: news.slug,
    date: news.date,
    image: news.image,
    publishedAt: news.publishedAt,
  }));

  return <NewsList initialArtists={newsItems} />;
}