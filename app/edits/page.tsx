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
      category: "IN FOCUS",
      brand: "ASICS SPORTSTYLE →",
      subTitle: "KIKO CURATION",
      image: "https://images.ctfassets.net/j4v3qb06e2ew/5hQycuTNeCwQh31zNhlirT/ecc8838eae2535b12945619f96609f2a/ASICS-SportStyle-Kiko-Curation-Sneakersnstuff-web.jpg?w=1920&fm=webp",
      href: "/asics",
    },
    {
      category: "IN FOCUS",
      brand: "ADIDAS →",
      subTitle: "WMNS TAEKWONDO",
      image: "https://images.ctfassets.net/j4v3qb06e2ew/1pusQ4cCPKDXAFcc18qeF5/4c27bde409302601f568dc747d9d502e/adidas-Originals-Taekwondo-Sneakersnstuff-website.jpg?w=1920&fm=webp",
      href: "/adidas",
    },
    {
      category: "IN FOCUS",
      brand: "ASICS SPORTSTYLE →",
      subTitle: "KIKO CURATION",
      image: "https://images.ctfassets.net/j4v3qb06e2ew/5hQycuTNeCwQh31zNhlirT/ecc8838eae2535b12945619f96609f2a/ASICS-SportStyle-Kiko-Curation-Sneakersnstuff-web.jpg?w=1920&fm=webp",
      href: "/asics",
    },
    
  ]

  interface Product {
    category: string;
    brand: string;
    subTitle: string;
    image: string;
    href: string;
  }

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <Link href={product.href} className="relative group overflow-hidden h-screen">
      {/* Category Label */}
      <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
        <div className="bg-white text-black text-xs px-2 py-1 inline-block">
          <span className="text-[--vividGreen]">■</span> {product.category}
        </div>
        <div className="bg-white text-black text-sm px-2 py-1 inline-block">{product.brand}</div>
        <div className="bg-white text-black text-xs px-2 py-1 inline-block">{product.subTitle}</div>
      </div>

      {/* Image */}
      <div className="h-full">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.brand}
          width={800}
          height={1200}
          className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
          priority={index === 0}
        />
      </div>
    </Link>
  )

  return (
    <main className="h-screen">
      {isMobile ? (
        <div ref={sliderRef} className="keen-slider h-full">
          {products.map((product, index) => (
            <div key={index} className="keen-slider__slide">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 h-full">
          {products.slice(0, 9).map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>
      )}
    </main>
  )
}

