"use client";

import { client } from "@/sanity/client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the Sanity image source type
interface SanityImageSource {
  asset: {
    _ref: string;
  };
}

const InfoGrid = () => {
  // Define the interface for the About type
  interface About {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
    date?: string;
    image?: SanityImageSource; // Replaced 'any' with proper type
    publishedAt?: string;
  }

  const [abouts, setAbouts] = useState<About[]>([]);

  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        // GROQ query remains the same but we're ensuring we get the slug.current
        const data = await client.fetch<About[]>(
          '*[_type == "about" && defined(slug.current)]{_id, name, slug, date, image, publishedAt} | order(name asc)'
        );
        setAbouts(data);
      } catch (error) {
        console.error('Error fetching abouts:', error);
      }
    };

    fetchAbouts();
  }, []);

  return (
    <div className="px-2 py-3 lg:px-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {abouts.map(({ _id, name, slug }) => (
          <Link
            key={_id}
            href={`/om-oss/${slug.current}`}
            className="group"
          >
            <div className="hover:bg-black hover:text-white border border-black border-solid p-6 flex items-center justify-between transition-transform duration-200 hover:italic">
              <span className="text-lg leading-relaxed">{name}</span>
              <span className="text-lg leading-relaxed transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
        <Link
            href={`/om-oss/kontakta-oss`}
            className="group"
          >
            <div className="hover:bg-black hover:text-white border border-black border-solid p-6 flex items-center justify-between transition-transform duration-200 hover:italic">
              <span className="text-lg leading-relaxed">Kontakta oss</span>
              <span className="text-lg leading-relaxed transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
      </div>
    </div>
  );
};

export default InfoGrid;