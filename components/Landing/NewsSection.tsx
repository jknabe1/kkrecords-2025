"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).url();
}

export default function NewsSection() {
  interface NewsArticle {
    _id: string;
    name: string;
    slug: { current: string };
    image: string;
    publishedAt: string;
  }

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "news" && defined(slug.current)]{_id, name, date, slug, image, publishedAt} | order(publishedAt desc)`
        );
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading news...</div>;
  }

  return (
    <div className="px-2 py-3 lg:px-5">
      <section className="relative">
        <h1 className="text-sans-35 lg:text-sans-60 font-600">EDITS - DET SENASTE FRÅN OSS</h1>
      </section>
      <section className="relative mt-10 first-of-type:mt-[calc(theme(spacing.10)_+_theme(spacing.16))] lg:mt-16 mb-10 lg:mb-16">
        <div className="grid gap-5 lg:grid-cols-3">
        {news.slice(0, 1).map((article) => (
          <div key={article._id} className="lg:col-span-3">
            <a className="group block" href="">
              <div className="noise relative aspect-[4/5] lg:aspect-[12/5]">
                <Image 
                  src={urlFor(article.image)}
                  alt={article.name}                  
                  loading="lazy" 
                  width="1536" 
                  height="1920" 
                  className="h-full w-full object-cover" 
                />
                  <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-transparent to-gray-950/50 p-5">
                  <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
                    <div className="bg-white text-black text-xs px-2 py-1 inline-block uppercase">
                      <span className="text-[--vividGreen] uppercase">■</span> EDITS
                    </div>
                    <div className="bg-white text-black text-sm px-2 py-1 inline-block uppercase">{article.name}</div>
                    <div className="bg-white text-black text-xs px-2 py-1 inline-block">{new Date(article.publishedAt).toLocaleDateString()}</div>
                  </div>
                    </div>
                  </div>
                </a>
              </div>
        ))}
              {news.slice(1, 3).map((article) => (
              <div key={article._id} className="">
                <Link href={`edits${article.slug.current}`} className="group block">
                  <div className="noise relative aspect-[4/5] lg:aspect-[6/5]">
                  <Image 
                  alt={article.name}
                  loading="lazy" 
                  width="1536"
                  height="1920"
                  className="h-full w-full object-cover border border-solid border-black transition-transform duration-500 group-hover:scale-105"
                  sizes="50vw"
                  src={urlFor(article.image)}/>
                  <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-transparent to-gray-950/50 p-5">
                  <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
                    <div className="bg-white text-black text-xs px-2 py-1 inline-block">
                      <span className="text-[--vividGreen]">■</span> EDITS
                    </div>
                    <div className="bg-white text-black text-sm px-2 py-1 inline-block uppercase">{article.name}</div>
                    <div className="bg-white text-black text-xs px-2 py-1 inline-block">{new Date(article.publishedAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
              </Link>
            </div>
            ))}
            <div className="keen-slider__slide">
              <Link
                href="/edits/"
                className="relative group overflow-hidden h-full bg-black flex items-center justify-center"
              >
                <div className="text-white text-center">
                  <h2 className="text-3xl font-bold mb-4">Läs mer</h2>
                  <p className="text-xl">Läs mer av våra edits...</p>
                  <div className="mt-6 inline-block border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors">
                    Explore →
                  </div>
                </div>
              </Link>
            </div>
            </div>
          </section>
    </div>
  )
}
