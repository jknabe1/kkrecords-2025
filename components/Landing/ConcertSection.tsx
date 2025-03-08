import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";
import DynamicSlider from "@/components/General/Slider";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).url();
}

const EVENTS_QUERY = `*[_type == "event" && defined(slug.current)]{_id, name, slug, date, image}|order(date asc)`;

export default async function EventGrid() {
  const events = await client.fetch<SanityDocument[]>(EVENTS_QUERY);

  // Filter out past events & sort by closest date first
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date()) // Remove past events
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort soonest first

  // Ensure all required properties exist
  const eventsWithUrls = upcomingEvents.map((event) => ({
    _id: event._id,
    slug: event.slug, // Ensure slug is present
    name: event.name, // Ensure name is present
    date: event.date, // Ensure date is present
    imageUrl: urlFor(event.image), // Convert image to URL
  }));

  return <DynamicSlider items={eventsWithUrls} itemType="event" />;
}
