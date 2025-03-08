"use client"

import Image from "next/image"
import Link from "next/link"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect, useState } from "react"

export default function ArtistGrid() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 0,
    },
  })

  const products = [
    {
      category: "ARTIST",
      brand: "ILLUSION",
      image:
        "https://cdn.sanity.io/images/44gy0hz3/production/e047514bb49871ee12ec539c0d12daacae269ab1-1600x1200.jpg",
      href: "/asics",
    },
    {
      category: "ARTIST",
      brand: "EDWIN KRUTHOLM",
      image:
        "https://cdn.sanity.io/images/44gy0hz3/production/f7244996c35175eecca3a79c6941b11da4d0aeee-7952x4472.png",
      href: "/adidas",
    },
    {
      category: "ARTIST",
      brand: "LUVGHUL",
      image:
        "https://cdn.sanity.io/images/44gy0hz3/production/6b683e5468051851c2a12bac543b490fb8175384-1080x1080.jpg",
      href: "/adidas",
    },
  ]

  // Full-width banner data
  const fullWidthBanner = {
    category: "FEATURED",
    brand: "NEW BALANCE →",
    subTitle: "SPRING COLLECTION",
    image:
      "https://cdn.sanity.io/images/44gy0hz3/production/6b683e5468051851c2a12bac543b490fb8175384-1080x1080.jpg",
    href: "/new-balance",
  }

  interface Product {
    category: string
    brand: string
    image: string
    href: string
  }

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <Link href={product.href} className="relative group overflow-hidden h-full">
      {/* Category Label */}
      <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
        <div className="bg-white text-black text-xs px-2 py-1 inline-block">
          <span className="text-[--vividGreen]">■</span> {product.category}
        </div>
        <div className="bg-white text-black text-sm px-2 py-1 inline-block">{product.brand}</div>
      </div>

      {/* Image */}
      <div className="h-full border border-solid border-black bg-black">
        <Image
          src={product.image || ""}
          alt={product.brand}
          width={800}
          height={1200}
          className="noise object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
          priority={index === 0}
        />
      </div>
    </Link>
  )

  return (
    <div className="flex flex-col px-2 py-3 lg:px-5 gap-5">
      {/* Top section with grid/slider */}
      <main className="h-[100vh]">
        {isMobile ? (
          <div ref={sliderRef} className="keen-slider h-full">
            {products.map((product, index) => (
              <div key={index} className="keen-slider__slide">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 h-full gap-5 ">
            {products.slice(0, 2).map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
        )}
      </main>

      {/* Full-width banner section */}
      <div className="noise relative aspect-[4/5] lg:aspect-[12/5] hidden lg:block">
        <Image 
        alt="Luvghul" 
        loading="lazy" 
        width="1080" 
        height="1920" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://cdn.sanity.io/images/44gy0hz3/production/6b683e5468051851c2a12bac543b490fb8175384-1080x1080.jpg"/>
        <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-transparent to-gray-950/50 p-5">
        <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
        <div className="bg-white text-black text-xs px-2 py-1 inline-block">
          <span className="text-[--vividGreen]">■</span> ARTIST
        </div>
        <div className="bg-white text-black text-sm px-2 py-1 inline-block">LUVGHUL</div>
      </div>
          </div>
        </div>
    </div>
  )
}

