import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import Image from "next/image"
import { PortableText } from 'next-sanity';
import Link from "next/link"

const builder = imageUrlBuilder(client)

export const revalidate = 60

function urlFor(source) {
  return builder.image(source)
}

// Helper function to convert Portable Text to plain text for meta descriptions
function portableTextToPlainText(blocks = []) {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return ""
      }
      return block.children.map((child) => child.text).join("")
    })
    .join("\n\n")
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
  }`
  return await client.fetch(EVENT_QUERY, { slug })
}

export async function generateMetadata({ params }) {
  const event = await getEvent(params.slug)

  if (!event) {
    return {
      title: "Event Not Found - K&K Records",
      description: "The requested event does not exist.",
    }
  }

  // Convert Portable Text to plain text for meta description
  const plainTextDescription = event.details ? portableTextToPlainText(event.details) : ""

  return {
    title: `${event.name}`,
    description: plainTextDescription || `Event by K&K Records: ${event.name}`,
    openGraph: {
      title: `${event.name} - K&K Records`,
      description: plainTextDescription || `Event by K&K Records: ${event.name}`,
      url: `https://kkrecords.se/event/${event.slug.current}`,
      siteName: "K&K Records",
      images: event.image ? [{ url: urlFor(event.image).url() }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.name} - K&K Records`,
      description: plainTextDescription || `Event by K&K Records: ${event.name}`,
      images: event.image ? [{ url: urlFor(event.image).url() }] : [],
    },
  }
}

export default async function EventPage({ params }) {
  const event = await getEvent(params.slug)

  if (!event) {
    return <div className="text-center text-2xl p-10">Event Not Found</div>
  }

  const { venue, tickets } = event

  // Convert Portable Text to plain text for schema description
  const plainTextDescription = event.details ? portableTextToPlainText(event.details) : ""

  // Ensure we have a valid venue object
  const venueObject = venue
    ? {
        "@type": "Place",
        name: venue.name || "K&K Records Venue",
        address: venue.address || "K&K Records, Sweden",
      }
    : {
        "@type": "Place",
        name: "K&K Records Venue",
        address: "K&K Records, Sweden",
      }

  // Ensure we have a valid performer object
  const performerObject = {
    "@type": "MusicGroup",
    name: event.headline?.name || event.name || "K&K Records Artist",
  }

  // Create the JSON-LD schema with all required fields
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: event.name,
    startDate: event.date,
    eventStatus: "https://schema.org/EventScheduled",
    location: venueObject,
    image: event.image ? urlFor(event.image).url() : "https://kkrecords.se/default-event-image.jpg",
    url: `https://kkrecords.se/event/${event.slug.current}`,
    description: plainTextDescription || `Music event: ${event.name} at K&K Records`,
    performer: performerObject,
    organizer: {
      "@type": "Organization",
      name: "K&K Records",
      url: "https://kkrecords.se",
      logo: "https://kkrecords.se/logo.png",
    },
    offers: tickets
      ? {
          "@type": "Offer",
          url: tickets,
          availability: "https://schema.org/InStock",
          price: "0",
          priceCurrency: "SEK",
        }
      : undefined,
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid grid-cols-12 gap-px">
        <div className="col-span-12 relative h-full grid-col-border">
          <div className="grid grid-cols-12 gap-px items-start">
            <div className="col-span-12 lg:col-span-6 grid-col-border">
              <ul className="flex flex-col gap-px">
                <li className="px-2 py-3 lg:px-5">
                  <h1 className="text-sans-35 lg:text-sans-60 font-600">{event.name}</h1>
                  <div className="mt-4 text-lg leading-relaxed prose overflow-hidden text-wrap">
                    <PortableText value={event.details} />
                  </div>
                </li>
                <div className="mt-4 text-lg leading-relaxed border-t pt-2 border-solid border-black px-2 py-3 lg:px-5">
                  Information för {event.name}:
                  <div className="flex gap-4 mt-2">
                    <span>{venue ? venue.name : "Ingen plats angiven"}</span>
                    <span>Datum: {event.date ? new Date(event.date).toLocaleDateString('sv-SE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }) : "Inget datum angivet"}</span>
                    {tickets && (
                      <Link href={tickets} target="_blank" rel="noopener noreferrer">
                        <div className="hover:italic">Biljetter</div>
                      </Link>
                    )}
                  </div>
                </div>
              </ul>
            </div>
            <div className="hidden lg:block col-span-6 grid-col-border sticky top-7 min-h-hero-minus-header overflow-hidden">
              <div className="image overflow-hidden absolute inset-0">
                {event.image ? (
                  <Image
                    src={urlFor(event.image).url() || "/placeholder.svg"}
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
  )
}
