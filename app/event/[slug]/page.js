import { client } from '@/sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import { PortableText } from 'next-sanity';
import Link from 'next/link';

const builder = imageUrlBuilder(client);

export const revalidate = 60;

function urlFor(source) {
  return builder.image(source);
}

async function getEvent(slug) {
  const EVENT_QUERY = `*[
    _type == "event" &&
    slug.current == $slug
  ][0]{
    ...,
    headline->,
    venue->,
    tickets,
  }`;
  return await client.fetch(EVENT_QUERY, { slug });
}



export async function generateMetadata({ params }) {
  const event = await getEvent(params.slug);

  if (!event) {
    return {
      title: 'Event Not Found - K&K Records',
      description: 'The requested event does not exist.',
    };
  }

  return {
    title: `${event.name}`,
    description: event.details ? JSON.stringify(event.details) : '',
    openGraph: {
      title: `${event.name} - K&K Records`,
      description: event.details ? JSON.stringify(event.details) : '',
      url: `https://kkrecords.se/event/${event.slug.current}`,
      siteName: 'K&K Records',
      images: event.image ? [{ url: urlFor(event.image).url() }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.name} - K&K Records`,
      description: event.details ? JSON.stringify(event.details) : '',
      images: event.image ? [{ url: urlFor(event.image).url() }] : [],
    },
  };
}

export default async function EventPage({ params }) {
  const event = await getEvent(params.slug);

  const {
    venue,
    tickets,
  } = event;

  if (!event) {
    return <div className="text-center text-2xl p-10">Event Not Found</div>;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.name,
    startDate: event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.venue || 'K&K Records Venue',
    },
    image: event.image ? urlFor(event.image).url() : undefined,
    url: `https://kkrecords.se/event/${event.slug.current}`,
    description: event.details,
    performer: {
      '@type': 'PerformingGroup',
      name: event.headline,
    },
    organizer: {
      '@type': 'Organization',
      name: 'K&K Records',
      url: 'https://kkrecords.se',
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-12 gap-px">
        <div className="col-span-12 relative h-full grid-col-border">
          <div className="grid grid-cols-12 gap-px items-start">
            <div className="col-span-12 lg:col-span-6 grid-col-border">
              <ul className="flex flex-col gap-px">
                <li className="px-2 py-3 lg:px-5">
                  <h1 className="text-sans-35 lg:text-sans-60 font-600">{event.name}</h1>
                  <div className="mt-4 text-lg leading-relaxed text-prose">
                    <PortableText value={event.details} />
                  </div>
                </li>
                <div className="mt-4 text-lg leading-relaxed border-t pt-2 border-solid border-black px-2 py-3 lg:px-5">
                  Information för {event.name}:
                  <div className="flex gap-4 mt-2">
                    <span>
                      {venue ? venue.name : 'Ingen plats angiven'}
                    </span>
                    <span>
                      Datum: {event.date ? new Date(event.date).toLocaleDateString() : 'Inget datum angivet'}
                    </span>
                    {tickets && (
                      <Link href={tickets} target="_blank" rel="noopener noreferrer">
                        <div className="hover:italic">
                          Biljetter
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </ul>
            </div>
            <div className="hidden lg:block col-span-6 grid-col-b</svg>order sticky top-7 min-h-hero-minus-header overflow-hidden">
              <div className="image overflow-hidden absolute inset-0">
                {event.image ? (
                  <Image
                    src={urlFor(event.image).url()}
                    alt={event.name}
                    className="w-full h-full object-cover noise"
                    width={1000}
                    height={1000}
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-gray-200 text-black">
                    No Image Available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}