import { client } from "@/sanity/client";
import { MetadataRoute } from "next";

// ✅ Define static pages manually with priority and changeFrequency
const staticPages: MetadataRoute.Sitemap = [
  {
    url: "https://kkrecords.se",
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: "https://kkrecords.se/om-oss",
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: "https://kkrecords.se/om-oss/kontakta-oss",
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: "https://kkrecords.se/artists",
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: "https://kkrecords.se/event",
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: "https://kkrecords.se/edits",
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
];

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

  // Convert Sanity data to sitemap format with priority and changeFrequency
  const artistRoutes: MetadataRoute.Sitemap = artists.map(({ slug }) => ({
    url: `https://kkrecords.se/artists/${slug.current}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const newsRoutes: MetadataRoute.Sitemap = news.map(({ slug }) => ({
    url: `https://kkrecords.se/edits/${slug.current}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map(({ slug }) => ({
    url: `https://kkrecords.se/event/${slug.current}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...artistRoutes, ...newsRoutes, ...eventRoutes];
}

// ✅ Generate sitemap dynamically
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes = await fetchDynamicRoutes();
  return [...staticPages, ...dynamicRoutes];
}
