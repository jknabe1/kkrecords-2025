"use client"

import { useState, useEffect } from "react"
import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import Link from "next/link"
import Image from "next/image"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

// Define the Sanity image source type
interface SanityImageSource {
  asset: {
    _ref: string
  }
}

const builder = imageUrlBuilder(client)
function urlFor(source: SanityImageSource) {
  return builder.image(source).url()
}

// Define the Artist data structure
interface Artist {
  _id: string
  name: string
  slug: { current: string }
  image: SanityImageSource
}

export default function ArtistSection() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [randomArtists, setRandomArtists] = useState<Artist[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1.2,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
  })

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        // Fetch all artists
        const allArtists = await client.fetch<Artist[]>(
          `*[_type == "artist" && defined(slug.current)]{_id, name, slug, image}|order(name asc)`,
        )

        setArtists(allArtists)

        // Pick two unique random artists
        if (allArtists.length > 2) {
          const firstIndex = Math.floor(Math.random() * allArtists.length)
          let secondIndex

          do {
            secondIndex = Math.floor(Math.random() * allArtists.length)
          } while (secondIndex === firstIndex) // Ensure they are different

          setRandomArtists([allArtists[firstIndex], allArtists[secondIndex]])
        }
      } catch (error) {
        console.error("Error fetching artists:", error)
      }
    }

    fetchArtists()
  }, [])

  // Ensure random artists do not appear in the main displayed list
  const filteredArtists = artists.filter((artist) => !randomArtists.some((random) => random._id === artist._id))

  return (
    <div className="px-2 py-3 lg:px-5">

      {isMobile ? (
        // Mobile: All artists in a single carousel
        <div ref={sliderRef} className="keen-slider">
          {/* Show all artists in the carousel */}
          {[...randomArtists, ...filteredArtists.slice(0, 5)].map((artist) => (
            <div key={artist._id} className="keen-slider__slide">
              <Link href={`/artists/${artist.slug.current}`} className="block relative h-full overflow-hidden">
              <div className="noise relative aspect-[4/5] lg:aspect-[6/5]">
                    <Image
                      src={urlFor(artist.image) || "/placeholder.svg"}
                      alt={artist.name}
                      loading="lazy"
                      width={1536}
                      height={1920}
                      className="h-full w-full object-cover border border-solid border-black"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-transparent to-gray-950/50 p-5 z-10">
                      <div className="absolute top-4 left-4 flex flex-col items-start gap-1">
                        <div className="bg-white text-black text-xs px-2 py-1 inline-block">
                          <span className="text-[--vividGreen]">■</span> ARTIST
                        </div>
                        <div className="bg-white text-black text-sm px-2 py-1 inline-block">{artist.name}</div>
                      </div>
                    </div>
                  </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        // Desktop: Two separate grids
        <>
          {/* First Grid: Two large images (50% each) */}
          {randomArtists.length > 0 && (
            <div className="mb-10">
              <div className="grid grid-cols-2 gap-4">
                {randomArtists.map((artist) => (
                  <Link
                    key={artist._id}
                    href={`/artists/${artist.slug.current}`}
                    className="block relative h-96 overflow-hidden"
                  >
                    <div className="noise relative aspect-[4/5] lg:aspect-[6/5]">
                    <Image
                      src={urlFor(artist.image) || "/placeholder.svg"}
                      alt={artist.name}
                      loading="lazy"
                      width={1536}
                      height={1920}
                      className="h-full w-full object-cover border border-solid border-black"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-transparent to-gray-950/50 p-5 z-10">
                      <div className="absolute top-4 left-4 flex flex-col items-start gap-1">
                        <div className="bg-white text-black text-xs px-2 py-1 inline-block">
                          <span className="text-[--vividGreen]">■</span> ARTIST
                        </div>
                        <div className="bg-white text-black text-sm px-2 py-1 inline-block">{artist.name}</div>
                      </div>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Second Grid: Three images */}
          {filteredArtists.length > 0 && (
            <div className="mt-12">
              <div className="grid grid-cols-3 gap-4">
                {filteredArtists.slice(0, 3).map((artist) => (
                  <Link
                    key={artist._id}
                    href={`/artists/${artist.slug.current}`}
                    className="block relative h-72 overflow-hidden"
                  >
                    <div className="noise relative aspect-[4/5] lg:aspect-[6/5]">
                    <Image
                      src={urlFor(artist.image) || "/placeholder.svg"}
                      alt={artist.name}
                      loading="lazy"
                      width={1536}
                      height={1920}
                      className="h-full w-full object-cover border border-solid border-black"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-transparent to-gray-950/50 p-5 z-10">
                      <div className="absolute top-4 left-4 flex flex-col items-start gap-1">
                        <div className="bg-white text-black text-xs px-2 py-1 inline-block">
                          <span className="text-[--vividGreen]">■</span> ARTIST
                        </div>
                        <div className="bg-white text-black text-sm px-2 py-1 inline-block">{artist.name}</div>
                      </div>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
