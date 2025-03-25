"use client";


import React, { useEffect, useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'
import Link from 'next/link'
import Image from 'next/image'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

const EventGrid = () => {
    const [events, setEvents] = useState<{ 
      _id: string; 
      name: string; 
      image: any; 
      slug: { current: string }; 
      date: string; 
    }[]>([])
    
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await client.fetch('*[_type == "event"] | order(date desc)');
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    fetchEvents();
  }, []);

  // ✅ **Static JSON-LD for Schema.org**
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    "name": "K&K Records Events",
    "description": "A list of upcoming concerts and events at K&K Records.",
    "event": events.map(event => ({
      "@type": "MusicEvent",
      "name": event.name,
      "startDate": event.date,
      "eventStatus": "https://schema.org/EventScheduled",
      "image": event.image ? urlFor(event.image).url() : undefined,
      "url": `https://yourwebsite.com/event/${event.slug.current}`
    }))
  };

  return (
    <div>
      {/* ✅ Inject Static JSON-LD for Events */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

        <main className="grid grid-cols-1 md:grid-cols-3 gap-5 px-2 py-3 lg:px-5">
        {events && events.map((event: { _id: string, name: string, image: any, slug: { current: string }, date: string }) => (    
            <Link
          key={event._id}
          href={`/event/${event.slug.current}`}
          className="relative group overflow-hidden border-b md:border-b-0 md:border-r last:border-b-0 last:md:border-r-0 border-gray-200"
        >
          {/* Category Label */}
          <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
            <div className="bg-white text-black px-2 py-1 inline-block">
              <span className="text-[--vividGreen]">■</span> {event.name}
            </div>
            <div className="bg-white text-black px-2 py-1 inline-block">
                {new Date(event.date || "").toLocaleDateString()}
            </div>
          </div>

          {/* Image */}
            <div className="noise relative aspect-[4/5] lg:aspect-[6/5] border border-black border-solid">
            {event.image ? (
              <Image
              src={urlFor(event.image).url()}
              alt={event.name}
              loading="lazy"
              width="1536"
              height="1920"
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
      ))}
    </main>
    </div>
  )
}

export default EventGrid

function setEvents(data: any) {
    throw new Error('Function not implemented.');
}
