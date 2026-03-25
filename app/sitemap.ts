import { client } from "@/sanity/client";
import { MetadataRoute } from "next";

// ✅ Define static pages manually
const staticPages = [
  { path: "", priority: 1.0, changeFrequency: "daily" as const },
  { path: "om-oss", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "kontakta-oss", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "backstage", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "artists", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "event", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "edits", priority: 0.8, changeFrequency: "weekly" as const },
].map(({ path, priority, changeFrequency }) => ({
  url: `https://kkrecords.se/${path}`,
  lastModified: new Date().toISOString(),
  changeFrequency,
  priority,
}));

// ✅ Fetch dynamic pages from Sanity
async function fetchDynamicRoutes() {
  const ARTISTS_QUERY = `*[_type == "artist" && defined(slug.current)]{slug}`;
  const NEWS_QUERY = `*[_type == "news" && defined(slug.current)]{slug}`;
  const EVENTS_QUERY = `*[_type == "event" && defined(slug.current)]{slug}`;

  const [artists, news, events] = await Promise.all([
    client.fetch<{ slug: { current: string } }[]>(ARTISTS_QUERY),
    client.fetch<{ slug: { current: string } }[]>(NEWS_QUERY),
    client.fetch<{ slug: { current: string } }[]>(EVENTS_QUERY),
  ]);

  // Convert Sanity data to sitemap format
  const artistRoutes = artists.map(({ slug }) => ({
    url: `https://kkrecords.se/artists/${slug.current}`,
    lastModified: new Date().toISOString(),
  }));

  const newsRoutes = news.map(({ slug }) => ({
    url: `https://kkrecords.se/edits/${slug.current}`,
    lastModified: new Date().toISOString(),
  }));

  const eventRoutes = events.map(({ slug }) => ({
    url: `https://kkrecords.se/event/${slug.current}`,
    lastModified: new Date().toISOString(),
  }));

  return [...artistRoutes, ...newsRoutes, ...eventRoutes];
}

// ✅ Generate sitemap dynamically
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes = await fetchDynamicRoutes();
  return [...staticPages, ...dynamicRoutes];
}
