"use client"

import Image from "next/image"
import Link from "next/link"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useState } from "react"
import type { SanityDocument } from "next-sanity"

// This is a Client Component
export default function PlaylistSlider({
  playlists,
}: {
  playlists: { _id: string; slug: { current: string }; creator: string; name: string; imageUrl: string }[]
}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 640px)": {
        slides: {
          perView: 1.2,
          spacing: 10,
        },
      },
      "(min-width: 641px) and (max-width: 1024px)": {
        slides: {
          perView: 2.2,
          spacing: 10,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <div className="px-2 py-3 lg:px-5">
      <section className="relative">
        <h1 className="text-sans-35 lg:text-sans-60 font-600">TUNE IN - VÅRA MIXTAPES</h1>
      </section>
    <section className="relative mt-10 first-of-type:mt-[calc(theme(spacing.10)_+_theme(spacing.16))] lg:mt-16 mb-10 lg:mb-16">
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {playlists.slice(0, 3).map((playlist) => (
            <div key={playlist._id} className="keen-slider__slide">
              <Link href={`${playlist.slug.current}`} className="group block h-full" target="_blank" rel="noopener">
                <div className="noise relative aspect-[4/5] lg:aspect-[6/5]">
                                  <Image 
                                  alt={playlist.name}
                                  loading="lazy" 
                                  width="1536"
                                  height="1920"
                                  className="h-full w-full object-cover border border-solid border-black transition-transform duration-500 group-hover:scale-105"
                                  sizes="50vw"
                    src={playlist.imageUrl || "/placeholder.svg"}
                  />
                  <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-transparent to-gray-950/50 p-5">
                    <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
                      <div className="bg-white text-black text-xs px-2 py-1 inline-block">
                        <span className="text-[--vividGreen]">■</span> TUNE-IN
                      </div>
                      <div className="bg-white text-black text-sm px-2 py-1 inline-block uppercase">
                        Skapad av: {playlist.creator}
                      </div>
                      <div className="bg-white text-black text-xs px-2 py-1 inline-block uppercase">Namn: {playlist.name}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* Discover More Slide */}
          <div className="keen-slider__slide">
            <Link
              href="/playlists"
              className="relative group overflow-hidden h-full bg-black flex items-center justify-center"
            >
              <div className="text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Se resten</h2>
                <p className="text-xl">Detta var bara ett smakprov... det finns mer.</p>
                <div className="mt-6 inline-block border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors">
                  Explore →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

