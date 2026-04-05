import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import { NextResponse } from "next/server"

const imageBuilder = imageUrlBuilder(client)
const urlFor = (source: any) => imageBuilder.image(source).url()

export async function GET() {
  try {
    const artists = await client.fetch(
      `*[_type == "artist" && defined(slug.current)]{_id, name, slug, image}|order(name asc)`
    )

    // Transform data to include resolved image URLs
    const transformedArtists = artists.map((artist: any) => ({
      ...artist,
      imageUrl: artist.image ? urlFor(artist.image) : null,
    }))

    return NextResponse.json(transformedArtists)
  } catch (error) {
    console.error("Error fetching artists:", error)
    return NextResponse.json(
      { error: "Failed to fetch artists from Sanity" },
      { status: 500 }
    )
  }
}
