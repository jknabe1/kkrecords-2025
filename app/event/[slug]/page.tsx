import { client } from '@/sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

// ✅ **Fetch Event Data from Sanity**
async function getEvent(slug: string) {
  const query = `*[_type == "event" && slug.current == $slug][0]{
    name,
    date,
    headline,
    image,
    details,
    eventType,
    doorsOpen,
    venue,
    tickets,
    "slug": slug.current
  }`;

  return await client.fetch(query, { slug });
}

// ✅ **Generate Dynamic Metadata**
export async function generateMetadata(
  { params }: { params: { slug: string } }, 
  parent: ResolvingMetadata
): Promise<Metadata> {
  const event = await getEvent(params.slug);

  if (!event) {
    return {
      title: "Event Not Found - K&K Records",
      description: "The requested event does not exist.",
    };
  }

  return {
    title: `${event.name} - K&K Records`,
    description: event.details || "Join us for an amazing event at K&K Records.",
    openGraph: {
      title: `${event.name} - K&K Records`,
      description: event.details || "Join us for an amazing event at K&K Records.",
      url: `https://yourwebsite.com/event/${event.slug}`, // ✅ FIXED: Access slug correctly
      siteName: "K&K Records",
      images: event.image ? [{ url: urlFor(event.image).url() }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.name} - K&K Records`,
      description: event.details || "Join us for an amazing event at K&K Records.",
      images: event.image ? [{ url: urlFor(event.image).url() }] : [],
    },
  };
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

  if (!event) {
    return <div className="text-center text-2xl p-10">Event Not Found</div>;
  }

  // ✅ **Dynamic JSON-LD for Schema.org**
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "name": event.name,
    "startDate": event.date,
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": event.venue || "K&K Records Venue",
    },
    "image": event.image ? urlFor(event.image).url() : undefined,
    "url": `https://yourwebsite.com/event/${event.slug}`, // ✅ FIXED: Use correct slug
    "description": event.details,
    "performer": {
      "@type": "PerformingGroup",
      "name": event.headline,
    },
    "organizer": {
      "@type": "Organization",
      "name": "K&K Records",
      "url": "https://kkrecords.se"
    }
  };
  

  return (
    <div>
      {/* ✅ Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-12 gap-px">
        <div className="col-span-12 relative h-full grid-col-border">
          <div className="grid grid-cols-12 gap-px items-start">
            <div className="col-span-12 lg:col-span-6 grid-col-border">
              <ul className="flex flex-col gap-px">
                <li className="p-2 lg:p-4">
                  {/* Heading */}
                  <h1 className="text-sans-35 lg:text-sans-60 font-600">
                    {event.name}
                  </h1>
                  <div className='mt-4 text-lg leading-relaxed text-prose'>
                    <PortableText value={event.details}/>
                  </div>
                </li>
                <div className='mt-4 text-lg leading-relaxed border-t pt-2 border-solid border-black p-2 lg:p-4'>
                  Information för {event.name}:
                  <div className='flex gap-4 mt-2'>
                    <span className='hover:italic'>
                      {typeof event.venue === "string" ? event.venue : "Unknown Venue"} {/* ✅ Ensure it's a string */}
                    </span>
                    <span>
                      {event.date ? new Date(event.date).toLocaleDateString() : "No Date Available"}
                    </span>
                    <span>
                      {typeof event.tickets === "string" ? event.tickets : "No Ticket Info"} {/* ✅ Ensure it's a string */}
                    </span>
                  </div>  
                </div>
              </ul>
            </div>
            <div className="hidden lg:block col-span-6 grid-col-border sticky top-7 min-h-hero-minus-header overflow-hidden">
              <div className="image overflow-hidden absolute inset-0">
              {event.image ? (
                <Image
                  src={urlFor(event.image).url()} // ✅ Convert Sanity image reference to URL
                  alt={event.name}
                  className="w-full h-full object-cover noise"
                  width={1000}
                  height={1000}
                  loading='lazy'
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
