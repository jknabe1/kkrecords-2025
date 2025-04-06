// pages/artists/ArtistsList.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { urlFor } from '@/app/artists/page';
import { SanityDocument } from "next-sanity";
import Image from 'next/image';
// Define the Artist interface based on your Sanity schema
interface Artist extends SanityDocument {
  _id: string;
  name: string;
  slug: { current: string };
  date: string;
  image?: {
    asset: {
      _ref: string;
    };
    // Add other image properties if needed
  };
}

interface ArtistsListProps {
  initialArtists: Artist[];
}

export default function ArtistsList({ initialArtists }: ArtistsListProps) {
  const [selectedArtist, setSelectedArtist] = useState<Linkrtist | null>(
    initialArtists[0] || null
  );

  if (!initialArtists || initialArtists.length === 0) {
    return <div>No news found</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-12 gap-px">
        <div className="col-span-12 relative h-full grid-col-border">
          <div className="grid grid-cols-12 gap-px items-start">
            <div className="col-span-12 lg:col-span-6 grid-col-border">
              <ul className="flex flex-col gap-px">
                {initialArtists.map((artist) => (
                  <Link key={artist._id} href={`/edits/${artist.slug.current}`}>
                    <li 
                      className="grid-col-border px-2 py-3 lg:px-5"
                      onMouseEnter={() => setSelectedArtist(artist)}
                    >
                      <h2 className="text-sans-35 lg:text-sans-60 font-600 mb-1 lg:mb-3 uppercase">
                        {artist.name}
                      </h2>
                      <div className="rich-text text-sans-22 lg:text-sans-30 rich-text-light line-break">
                            <p>
                                {new Date(artist.publishedAt).toISOString().split('T')[0]}
                            </p>
                        </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="hidden lg:block col-span-6 grid-col-border sticky top-7 min-h-hero-minus-header overflow-hidden">
              <div className="image overflow-hidden absolute inset-0">
                {selectedArtist && selectedArtist.image ? (
                  <Image
                    src={urlFor(selectedArtist.image).url()}
                    alt={selectedArtist.name}
                    className="w-full h-full object-cover noise"
                    width={1000}
                    height={1000}
                    loading='lazy'
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    No image available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}