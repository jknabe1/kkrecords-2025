"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    const expandCursor = () => {
      cursor.classList.add("expand")
    }

    const shrinkCursor = () => {
      cursor.classList.remove("expand")
    }

    document.addEventListener("mousemove", moveCursor)
    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("mouseenter", expandCursor)
      link.addEventListener("mouseleave", shrinkCursor)
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.querySelectorAll("a").forEach((link) => {
        link.removeEventListener("mouseenter", expandCursor)
        link.removeEventListener("mouseleave", shrinkCursor)
      })
    }
  }, [])

  const product =  {
    category: "EDITS",
    brand: "TACK ALLMÄNNA ARVSFONDEN",
    image: "https://images.ctfassets.net/j4v3qb06e2ew/5hQycuTNeCwQh31zNhlirT/ecc8838eae2535b12945619f96609f2a/ASICS-SportStyle-Kiko-Curation-Sneakersnstuff-web.jpg?w=1920&fm=webp",
    href: "/asics",
  }

  return (
    <main className="h-screen cursor-none">
      <div ref={cursorRef} className="custom-cursor"></div>

      <Link href={product.href} className="relative block h-screen w-full overflow-hidden">
        {/* Category Label */}
        <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
          <div className="bg-white text-black text-xs px-2 py-1 inline-block">
            <span className="text-green-500">■</span> {product.category}
          </div>
          <div className="bg-white text-black text-sm px-2 py-1 inline-block">{product.brand}</div>
        </div>

        {/* Image */}
        <div className="h-full">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.brand}
            width={1920}
            height={1080}
            className="object-cover h-full w-full transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>
      </Link>
      
    </main>
  )
}

