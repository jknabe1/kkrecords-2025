import Image from "next/image"
import Link from "next/link"

export default function EmployeeGrid() {
  const products = [
    {
      category: "IN FOCUS",
      brand: "ASICS SPORTSTYLE →",
      subTitle: "KIKO CURATION",
      image: "https://images.ctfassets.net/j4v3qb06e2ew/5hQycuTNeCwQh31zNhlirT/ecc8838eae2535b12945619f96609f2a/ASICS-SportStyle-Kiko-Curation-Sneakersnstuff-web.jpg?w=1920&fm=webp",
      href: "/asics",
    },
    {
      category: "NEW ARRIVALS",
      brand: "SALOMON →",
      subTitle: "GR10K X SALOMON QUEST LOW 2",
      image: "https://images.ctfassets.net/j4v3qb06e2ew/1pusQ4cCPKDXAFcc18qeF5/4c27bde409302601f568dc747d9d502e/adidas-Originals-Taekwondo-Sneakersnstuff-website.jpg?w=1920&fm=webp",
      href: "/salomon",
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
    {
      category: "NEW ARRIVALS",
      brand: "SALOMON →",
      subTitle: "GR10K X SALOMON QUEST LOW 2",
      image: "https://images.ctfassets.net/j4v3qb06e2ew/1pusQ4cCPKDXAFcc18qeF5/4c27bde409302601f568dc747d9d502e/adidas-Originals-Taekwondo-Sneakersnstuff-website.jpg?w=1920&fm=webp",
      href: "/salomon",
    },
    {
      category: "IN FOCUS",
      brand: "ADIDAS →",
      subTitle: "WMNS TAEKWONDO",
      image: "https://images.ctfassets.net/j4v3qb06e2ew/1pusQ4cCPKDXAFcc18qeF5/4c27bde409302601f568dc747d9d502e/adidas-Originals-Taekwondo-Sneakersnstuff-website.jpg?w=1920&fm=webp",
      href: "/adidas",
    },
  ]

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
      {products.map((product, index) => (
        <Link
          key={index}
          href={product.href}
          className="relative group overflow-hidden border-b md:border-b-0 md:border-r last:border-b-0 last:md:border-r-0 border-gray-200"
        >
          {/* Category Label */}
          <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
            <div className="bg-white text-black text-xs px-2 py-1 inline-block">
              <span className="text-green-500">■</span> {product.category}
            </div>
            <div className="bg-white text-black text-sm px-2 py-1 inline-block">{product.brand}</div>
            <div className="bg-white text-black text-xs px-2 py-1 inline-block">{product.subTitle}</div>
          </div>

          {/* Image */}
          <div className="h-[50vh] md:h-screen">
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
      ))}
    </main>
  )
}

