"use client";

import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";

interface SliderProps {
  items: {
    _id: string;
    slug: { current: string };
    name: string;
    creator?: string; // Only for playlists
    imageUrl: string;
    date?: string; // Only for events
  }[];
  itemType: "playlist" | "event";
}

export default function DynamicSlider({ items, itemType }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 640px)": { slides: { perView: 1.2, spacing: 10 } },
      "(min-width: 641px) and (max-width: 1024px)": { slides: { perView: 2.2, spacing: 10 } },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="px-2 py-3 lg:px-5">
      <section className="relative">
        <h1 className="text-sans-35 lg:text-sans-60 font-600">
          {itemType === "playlist" ? "TUNE IN - VÅRA MIXTAPES" : "EVENTS"}
        </h1>
      </section>

      <section className="relative mt-10 first-of-type:mt-[calc(theme(spacing.10)_+_theme(spacing.16))] lg:mt-16 mb-10 lg:mb-16">
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {items.slice(0, 3).map((item) => (
              <div key={item._id} className="keen-slider__slide">
                <Link href={`/${itemType}/${item.slug.current}`} className="group block h-full" target="_blank" rel="noopener">
                  <div className="noise relative aspect-[4/5] lg:aspect-[6/5]">
                  <Image
                    alt={item.name}
                    loading="lazy"
                    width="1536"
                    height="1920"
                    className="h-full w-full object-cover border border-solid border-black transition-transform duration-500 group-hover:scale-105"
                    sizes="50vw"
                    src={item.imageUrl || "/placeholder.svg"}
                    />
                    <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-transparent to-gray-950/50 p-5">
                      <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
                        {itemType === "playlist" && (
                          <>
                            <div className="bg-white text-black text-xs px-2 py-1 inline-block">
                              <span className="text-[--vividGreen]">■</span> TUNE-IN
                            </div>
                            <div className="bg-white text-black text-sm px-2 py-1 inline-block">Skapad av: {item.creator}</div>
                            <div className="bg-white text-black text-xs px-2 py-1 inline-block">Namn: {item.name}</div>
                          </>
                        )}

                        {itemType === "event" && (
                          <>
                            <div className="bg-white text-black text-xs px-2 py-1 inline-block">
                            <span className="text-[--vividGreen] mr-2">■</span>
                              {new Date(item.date || "").toLocaleDateString()}
                            </div>
                            <div className="bg-white text-black text-sm px-2 py-1 inline-block">{item.name}</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

            {/* Discover More Slide */}
            <div className="keen-slider__slide">
              <Link
                href={itemType === "playlist" ? "/playlists" : "/events"}
                className="relative group overflow-hidden h-full bg-black flex items-center justify-center"
              >
                <div className="text-white text-center">
                  <h2 className="text-3xl font-bold mb-4">Se resten</h2>
                  <p className="text-xl">
                    {itemType === "playlist"
                      ? "Detta var bara ett smakprov... det finns mer."
                      : "Kolla in alla våra kommande och tidigare events!"}
                  </p>
                  <div className="mt-6 inline-block border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors">
                    Explore →
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Navigation Arrows */}
          {loaded && instanceRef.current && (
            <>
              {currentSlide > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    instanceRef.current?.prev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[--vividGreen] w-12 h-12 flex items-center justify-center transition-transform hover:scale-110"
                  aria-label="Previous slide"
                >
                  <span className="w-6 h-6 text-white">{"<"}</span>
                </button>
              )}

              {currentSlide < (instanceRef.current.track.details.slides.length - instanceRef.current.options.slides?.perView || 1) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    instanceRef.current?.next();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[--vividGreen] w-12 h-12 flex items-center justify-center transition-transform hover:scale-110"
                  aria-label="Next slide"
                >
                  <span className="w-6 h-6 text-white">{">"}</span>
                </button>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
