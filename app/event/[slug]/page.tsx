import { client } from '@/sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { Metadata } from 'next';
import Image from 'next/image';
import { PortableText, PortableTextBlock } from '@portabletext/react'; // Updated import
import Link from 'next/link';

const builder = imageUrlBuilder(client);

// Define the Sanity image source type
interface SanityImageSource {
  asset: {
    _ref: string;
  };
}

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Define the Event data structure
interface Event {
  name: string;
  slug: { current: string };
  details: PortableTextBlock[]; // Replaced 'any' with PortableTextBlock[]
  image?: SanityImageSource;
  date?: string;
  venue?: string;
  tickets?: string;
  headline?: string;
}

async function getEvent(slug: string): Promise<Event | null> {
  const EVENT_QUERY = `*[
    _type == "event" &&
    slug.current == $slug
  ][0]{
    ...,
    headline->,
    venue->
  }`;
  return await client.fetch<Event>(EVENT_QUERY, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
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

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

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
                    <span className="hover:italic">
                      {typeof event.venue === 'string' ? event.venue : 'Ingen lokal tillgänglig'}
                    </span>
                    <span>
                      {event.date ? new Date(event.date).toLocaleDateString() : 'Inget datum angivet'}
                    </span>
                    <Link href={typeof event.tickets === 'string' ? event.tickets : '#'}>
                      <button
                        type="submit"
                        value="Sign Up"
                        className="block button button-primary text-left"
                      >
                        <div className="px-2 tracking-tighter text-sans-22 md:text-sans-30 md:px-3">
                          Biljetter
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </ul>
            </div>
            <div className="hidden lg:block col-span-6 grid-col-border sticky top-7 min-h-hero-minus-header overflow-hidden">
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