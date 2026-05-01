import '@/app/globals.css';
import { client } from '@/sanity/client';
import { getLocalizedValue } from '@/lib/localized-content';
import Link from 'next/link';
import { SanityImageSource } from '@/lib/utils';

interface InternationalizedString {
  _key?: string;
  language: string;
  value: string;
}

interface News {
  _id: string;
  name: InternationalizedString[];
  slug: InternationalizedString[];
  excerpt: InternationalizedString[];
  image?: SanityImageSource;
  publishedAt: string;
}

export const revalidate = 30;

const NEWS_QUERY = `*[_type == "news" && defined(slug)] | order(publishedAt desc){
  _id,
  name,
  slug,
  excerpt,
  image,
  publishedAt
}`;

export default async function NewsPage({ params }: { params: { lang: string } }) {
  const news = await client.fetch<News[]>(NEWS_QUERY);

  const localizedNews = news.map((item) => ({
    ...item,
    name: getLocalizedValue(item.name, params.lang, 'en'),
    slug: getLocalizedValue(item.slug, params.lang, 'en'),
    excerpt: getLocalizedValue(item.excerpt, params.lang, 'en'),
  }));

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        {params.lang === 'sv' ? 'Nyheter' : 'News'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localizedNews.map((item) => (
          <Link
            key={item._id}
            href={`/${params.lang}/news/${item.slug.current}`}
            className="group"
          >
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {item.image && (
                <div className="relative w-full h-48 bg-gray-200">
                  {/* Image would be rendered here with Next.js Image component */}
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">{item.excerpt}</p>
                <time className="text-xs text-gray-500">
                  {new Date(item.publishedAt).toLocaleDateString(
                    params.lang === 'sv' ? 'sv-SE' : 'en-US'
                  )}
                </time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
