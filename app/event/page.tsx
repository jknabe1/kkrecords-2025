import React from 'react';
import EventGrid from '@/components/Events/EventGrid';
import { client } from '@/sanity/client';
import type { Metadata } from 'next';
import imageUrlBuilder from '@sanity/image-url';

export const revalidate = 30;

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
  date: string;
  image: SanityImageSource;
  slug: { current: string };
}

// Fetch Events from Sanity for Metadata
async function fetchEvents(): Promise<Event[]> {
  const query = '*[_type == "event"] | order(date desc)[0..5]';
  return await client.fetch<Event[]>(query);
}

// Generate Dynamic Metadata
export async function generateMetadata(): Promise<Metadata> {
  const events = await fetchEvents();

  return {
    title: 'Events',
    description: 'Se våra kommande och tidigare konserter och evenemang.',
    openGraph: {
      title: 'Events - K&K Records',
      description: 'Check out the latest concerts and events at K&K Records.',
      url: 'https://kkrecords.se/events',
      siteName: 'K&K Records',
      images: events.length > 0
        ? events.map((event) => ({ url: urlFor(event.image).url() }))
        : [{ url: 'https://kkrecords.se/assets/default-event.jpg' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Events - K&K Records',
      description: 'Stay updated with the latest concerts and events at K&K Records.',
      images: events.length > 0
        ? events.map((event) => urlFor(event.image).url())
        : ['https://kkrecords.se/assets/default-event.jpg'],
    },
  };
}

export default function Page() {
  return (
    <div>
      <EventGrid />
    </div>
  );
}