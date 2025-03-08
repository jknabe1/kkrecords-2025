import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import { SanityDocument } from "next-sanity"
import PlaylistSlider from "./playlist-slider"

const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}

const playlistS_QUERY = `*[_type == "playlist" && defined(slug.current)]{_id, name, slug, creator, image}|order(date desc)`;



// This is a Server Component (no "use client" directive)
export default async function TuneIn() {
  const playlists = await client.fetch<SanityDocument[]>(playlistS_QUERY);

  const playlistsWithUrls = playlists.map(playlist => ({
    _id: playlist._id,
    slug: playlist.slug,
    creator: playlist.creator,
    name: playlist.name,
    imageUrl: urlFor(playlist.image).url(),
  }));
  
  return (
    <PlaylistSlider playlists={playlistsWithUrls} />
  )
}
