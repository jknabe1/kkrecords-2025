import '@/app/globals.css';
import { client } from '@/sanity/client';
import { getLocalizedValue } from '@/lib/localized-content';
import { PortableText } from '@portabletext/react';

interface InternationalizedString {
  _key?: string;
  language: string;
  value: string;
}

interface About {
  _id: string;
  name: InternationalizedString[];
  excerpt: InternationalizedString[];
  details: any[];
  image?: any;
}

export const revalidate = 60;

const ABOUT_QUERY = `*[_type == "about"][0]{
  _id,
  name,
  excerpt,
  details,
  image
}`;

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const about = await client.fetch<About>(ABOUT_QUERY);

  if (!about) {
    return (
      <main className="container mx-auto px-4 py-12">
        <h1>{params.lang === 'sv' ? 'Om oss' : 'About Us'}</h1>
        <p>{params.lang === 'sv' ? 'Ingen innehåll tillgängligt' : 'No content available'}</p>
      </main>
    );
  }

  const localizedName = getLocalizedValue(about.name, params.lang, 'en');
  const localizedExcerpt = getLocalizedValue(about.excerpt, params.lang, 'en');

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{localizedName}</h1>
        <p className="text-lg text-gray-600 mb-8">{localizedExcerpt}</p>

        <article className="prose prose-lg max-w-none">
          {about.details && (
            <PortableText
              value={about.details}
              components={{
                block: {
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
                  ),
                  normal: ({ children }) => (
                    <p className="mb-4 leading-relaxed">{children}</p>
                  ),
                },
              }}
            />
          )}
        </article>
      </div>
    </main>
  );
}
