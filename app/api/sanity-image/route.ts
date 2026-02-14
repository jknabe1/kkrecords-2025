// app/api/sanity-image/route.ts
import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import { NextResponse } from "next/server"

const imageBuilder = imageUrlBuilder(client)
const urlFor = (source: any) => imageBuilder.image(source)

export async function GET() {
  try {
    const release = await client.fetch(
      `*[_type == "newRelease"] | order(_createdAt desc) [0] {
        "artistName": artist->name,
        releaseName,
        releaseDescription,
        href,
        image
      }`
    )

    if (!release || !release.image) {
      return NextResponse.json(
        { error: "No release found in Sanity" },
        { status: 404 }
      )
    }

    const imageUrl = urlFor(release.image)
      .url()

    return NextResponse.json({
      imageUrl,
      artistName: release.artistName,
      releaseName: release.releaseName,
      releaseDescription: release.releaseDescription,
      href: release.href || "/",
    })
  } catch (error) {
    console.error("Error fetching Sanity release:", error)
    return NextResponse.json(
      { error: "Failed to fetch release from Sanity" },
      { status: 500 }
    )
  }
}