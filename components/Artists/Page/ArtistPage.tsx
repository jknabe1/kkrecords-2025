import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from 'next/link';

export const revalidate = 30;


const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}
 


async function getData(slug: string, id: any) {
  const query = `
    *[_type == "artist" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          name,
          Biography,
          image,
          Instagram,
          Facebook,
          spotify,
          excerpt,
            date,
      }[0]`;

  const artist = await client.fetch(query);
  return artist;
  
} 



export default async function BlogArticle({params,}: { params: {
  id(slug: string, id: any): unknown; slug: string 
};}) {
  const artist = await getData(params.slug, params.id);


 
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artist.name,
    description: artist.Biography,
  }
  return (
    <div>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <section className="relative w-full pt-12 md:pt-16 xl:pt-24 pb-12 md:pb-16 xl:pb-24 text-black bright-cursor">
        <div className="relative w-full max-w-[1900px] mx-auto px-[6%] md:px-[3%]">
                <div className="grid grid-cols-12">
                    <div className="relative col-span-full row-start-1 row-end-1 min-h-full md:col-start-1 md:col-end-7">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 transition-transform duration-300 ease-bouncy">
                            <Image
                                src={urlFor(artist.image).url()}
                                width={1080}
                                height={1080}
                                alt={artist.name}
                                loading='lazy'
                                className="mt-8"
                            />
                            </div>
                        </div>
                    </div>
                <div className="relative py-8 md:p-12 col-span-full md:col-start-7 md:col-end-13">
                    <div className="max-w-full md:max-w-[520px]">
                        <h1 className=" mb-6 uppercase font-medium transition duration-500 leading-[1.2] tracking-[-0.035em] text-[calc(1.875rem+(100vw-375px)/52)] 2xl:text-3xl">{artist.name}</h1>
                        <div className='rich-text-container'>
                        <PortableText value={artist.Biography} />
                        </div>
                        <div className="flex gap-2 mt-7">
                            <Link className="cursor-pointer inline-block rounded-full font-light border disabled:text-opacity-70 disabled:border-opacity-70 text-center bg-transparent text-black border-black hover:bg-black hover:text-white text-[0.9375rem] tracking-normal leading-[1.4] px-4 py-2 lg:px-7 xl:text-[1.1875rem] transition duration-500 delay-300" href="/kontakt">Boka {artist.name}</Link>
                        </div>
                        <div className="flex gap-2 mt-7">  
                            {artist.Facebook && (
                              <a
                                className="cursor-pointer inline-block rounded-full font-light border disabled:text-opacity-70 disabled:border-opacity-70 text-center bg-transparent text-black border-black hover:bg-black hover:text-white text-[0.9375rem] tracking-normal leading-[1.4] px-4 py-2 lg:px-7 xl:text-[1.1875rem] transition duration-500 delay-300"
                                href={artist.Facebook}
                              >
                                Facebook
                              </a>
                            )}
                            {artist.Instagram && (
                              <a
                                className="cursor-pointer inline-block rounded-full font-light border disabled:text-opacity-70 disabled:border-opacity-70 text-center bg-transparent text-black border-black hover:bg-black hover:text-white text-[0.9375rem] tracking-normal leading-[1.4] px-4 py-2 lg:px-7 xl:text-[1.1875rem] transition duration-500 delay-300"
                                href={artist.Instagram}
                              >
                                Instagram
                              </a>)}
                              {artist.spotify && (
                              <a
                                className="cursor-pointer inline-block rounded-full font-light border disabled:text-opacity-70 disabled:border-opacity-70 text-center bg-transparent text-black border-black hover:bg-black hover:text-white text-[0.9375rem] tracking-normal leading-[1.4] px-4 py-2 lg:px-7 xl:text-[1.1875rem] transition duration-500 delay-300"
                                href={artist.spotify}
                              >
                                Spotify
                              </a>)}
                          </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
   
  );
}