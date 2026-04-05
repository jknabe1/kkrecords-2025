import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import { NextResponse } from "next/server"

const imageBuilder = imageUrlBuilder(client)
const urlFor = (source: any) => imageBuilder.image(source).url()

export async function GET() {
  try {
    const news = await client.fetch(
      `*[_type == "news" && defined(slug.current)]{_id, name, slug, image, publishedAt} | order(publishedAt desc)`
    )

    // Transform data to include resolved image URLs
    const transformedNews = news.map((article: any) => ({
      ...article,
      imageUrl: article.image ? urlFor(article.image) : null,
    }))

    return NextResponse.json(transformedNews)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json(
      { error: "Failed to fetch news from Sanity" },
      { status: 500 }
    )
  }
}
