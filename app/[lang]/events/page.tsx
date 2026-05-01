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

interface Event {
  _id: string;
  name: InternationalizedString[];
  slug: InternationalizedString[];
  shortDescription: InternationalizedString[];
  ticketPrice: InternationalizedString[];
  image?: SanityImageSource;
  startDate: string;
  endDate?: string;
}

export const revalidate = 30;

const EVENTS_QUERY = `*[_type == "event" && defined(slug)] | order(startDate desc){
  _id,
  name,
  slug,
  shortDescription,
  ticketPrice,
  image,
  startDate,
  endDate
}`;

export default async function EventsPage({ params }: { params: { lang: string } }) {
  const events = await client.fetch<Event[]>(EVENTS_QUERY);

  const localizedEvents = events.map((event) => ({
    ...event,
    name: getLocalizedValue(event.name, params.lang, 'en'),
    slug: getLocalizedValue(event.slug, params.lang, 'en'),
    shortDescription: getLocalizedValue(event.shortDescription, params.lang, 'en'),
    ticketPrice: getLocalizedValue(event.ticketPrice, params.lang, 'en'),
  }));

  const pageTitle = params.lang === 'sv' ? 'Événemang' : 'Events';

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{pageTitle}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localizedEvents.map((event) => (
          <Link
            key={event._id}
            href={`/${params.lang}/events/${event.slug.current}`}
            className="group"
          >
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {event.image && (
                <div className="relative w-full h-48 bg-gray-200">
                  {/* Image would be rendered here with Next.js Image component */}
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {event.name}
                </h2>
                <p className="text-gray-600 text-sm mb-3">{event.shortDescription}</p>

                <div className="flex justify-between items-center">
                  <time className="text-xs text-gray-500">
                    {new Date(event.startDate).toLocaleDateString(
                      params.lang === 'sv' ? 'sv-SE' : 'en-US'
                    )}
                  </time>
                  <span className="text-sm font-semibold text-blue-600">
                    {event.ticketPrice}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {localizedEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {params.lang === 'sv'
              ? 'Inga kommande evenemang för närvarande'
              : 'No upcoming events at this time'}
          </p>
        </div>
      )}
    </main>
  );
}
