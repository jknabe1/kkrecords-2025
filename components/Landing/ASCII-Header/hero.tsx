"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PortableText } from "next-sanity"

interface ReleaseData {
  imageUrl: string
  artistName: string
  releaseName: string
  releaseDescription: any
  href: string
}

export function AsciiHero() {
  const [release, setRelease] = useState<ReleaseData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [displayedTitle, setDisplayedTitle] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    async function fetchRelease() {
      try {
        const res = await fetch("/api/sanity-image")
        if (!res.ok) {
          const data = await res.json()
          setError(data.error || "Failed to load release")
          return
        }
        const data = await res.json()
        setRelease(data)
      } catch {
        setError("Failed to connect to API")
      }
    }
    fetchRelease()
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (!release?.releaseName) return

    setDisplayedTitle("")
    setIsTypingComplete(false)
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex <= release.releaseName.length) {
        setDisplayedTitle(release.releaseName.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTypingComplete(true)
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [release?.releaseName])

  if (error) {
    return (
      <section className="w-full flex items-center justify-center py-12">
        <p className="text-muted-foreground text-sm">{error}</p>
      </section>
    )
  }

  if (!release) {
    return (
      <section className="w-full flex items-center justify-center py-12">
        <p className="text-muted-foreground text-sm animate-pulse">
          Loading...
        </p>
      </section>
    )
  }

  return (
    <section className="w-full px-2 py-8 lg:px-5">
      <div className="">
        <h2 className="text-sans-35 lg:text-sans-60 font-600 mb-8">
          SENASTE RELEASE
        </h2>
        
        <div className="mb-10">
          {/* Desktop: 2 columns */}
          <div className="hidden md:grid grid-cols-2 gap-5">
            <Link
              href={release.href || "#"}
              className="group block relative aspect-[4/5] lg:aspect-[6/5] overflow-hidden"
            >
              <Image
                src={release.imageUrl}
                alt={release.releaseName}
                fill
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            
            <Link
              href={release.href || "#"}
              className="group block relative aspect-[4/5] lg:aspect-[6/5] overflow-hidden bg-background"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-start">
                {/* Tag */}
                <div className="block h-[23px] relative mb-2 sm:mb-2.5">
                  <span className="inline-block overflow-hidden text-sans-15 uppercase tracking-wider">
                    SENASTE RELEASE | {release.artistName}
                  </span>
                </div>

                {/* Title with typing effect and blinking cursor */}
                <h2 className="uppercase text-sans-35 lg:text-sans-60 font-600 mb-3 sm:mb-4 tracking-wide break-words">
                  <span>{displayedTitle}</span>
                  {!isTypingComplete && (
                    <span className="inline-block w-2 sm:w-2.5 h-[20px] sm:h-[24px] md:h-[28px] lg:h-[32px] ml-1 bg-black align-middle animate-blink" />
                  )}
                </h2>

                {/* Description */}
                <div className="text-sans-15 tracking-wider leading-relaxed mb-4 sm:mb-6 max-w-[90%]">
                  {release.releaseDescription && (
                    <PortableText value={release.releaseDescription} />
                  )}
                </div>

                {/* Arrow */}
                <div 
                  className={`text-lg sm:text-xl transition-all duration-100 ${
                    isHovered ? 'ml-1.5' : 'ml-0.5'
                  }`}
                >
                  Lyssna nu →
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile: Stack layout */}
          <div className="md:hidden">
            {/* Image with ASCII overlay */}
            <Link
              href={release.href || "#"}
              className="group block relative aspect-[4/5] overflow-hidden mb-5"
            >
              <Image
                src={release.imageUrl}
                alt={release.releaseName}
                fill
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            {/* Title - Full width */}
            <div className="mb-4">
              <div className="block h-[23px] relative mb-2">
                <span className="inline-block overflow-hidden text-sans-15 uppercase tracking-wider">
                  SENASTE RELEASE
                </span>
              </div>
              <h2 className="uppercase text-sans-24 font-600 tracking-wide break-words">
                <span>{displayedTitle}</span>
                {!isTypingComplete && (
                  <span className="inline-block w-2 h-[20px] ml-1 bg-black align-middle animate-blink" />
                )}
              </h2>
            </div>

            {/* Bottom row: Artist name (left) and Stream button (right) */}
            <div className="flex justify-between items-center">
              <div className="text-sans-15 uppercase tracking-wider">
                {release.artistName}
              </div>
              <Link
                href={release.href || "#"}
                className="border border-black px-4 py-2 text-sans-15 uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Lyssna nu →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 45% {
            opacity: 1;
          }
          55%, 100% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 0.5s linear infinite alternate;
        }
      `}</style>
    </section>
  )
}