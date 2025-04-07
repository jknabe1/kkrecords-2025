"use client";

import React, { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';

// Define the Sanity image source type
interface SanityImageSource {
  asset: {
    _ref: string;
  };
}

// Define the Team data structure
interface Team {
  _id: string;
  name: string;
  image?: SanityImageSource;
  email: string;
  roll: string;
}

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const EmployeeGrid = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await client.fetch<Team[]>('*[_type == "team"]');
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
  
    fetchTeams();
  }, []);

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-5 px-2 py-3 lg:px-5">
      {teams.map((team) => (        
        <Link
          key={team._id}
          href={`mailto:${team.email}`}
          className="relative group overflow-hidden border-b md:border-b-0 md:border-r last:border-b-0 last:md:border-r-0 border-gray-200"
        >
          {/* Category Label */}
          <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
            <div className="bg-white text-black px-2 py-1 inline-block">
              <span className="text-[--vividGreen]">■</span> {team.name}
            </div>
            <div className="bg-white text-black px-2 py-1 inline-block">{team.roll || ""}</div>
            <div className="bg-white text-black px-2 py-1 inline-block hover:text-[vividGreen] hover:underline">{team.email}</div>
          </div>

          {/* Image */}
          <div className="noise relative aspect-[4/5] lg:aspect-[6/5] border border-black border-solid">
            {team.image ? (
              <Image
                src={urlFor(team.image).url()}
                alt={team.name}
                loading="lazy"
                width={1536}
                height={1920}
                className="h-full w-full object-cover border-solid border-black transition-transform duration-500 group-hover:scale-105"
                sizes="50vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-200 text-black">
                Bild saknas...
              </div>
            )}
          </div>
        </Link>
      ))}
    </main>
  );
};

export default EmployeeGrid;