import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const AboutSection = () => {
  return (
    <div>
        <section className="relative w-full pt-8">
            <div className="flex flex-col px-2 py-3 lg:px-5 gap-5">
                <section className="relative">
                    <h1 className="text-sans-35 lg:text-sans-60 font-600">VÅR HISTORIA</h1>
                </section>
                <div className="grid grid-cols-12">
                    <div className="relative col-span-full row-start-1 row-end-1 min-h-[350px] md:min-h-0 md:col-start-1 md:col-end-7">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 transition-transform duration-300 ease-bouncy">
                                <Image 
                                src="https://cdn.sanity.io/images/44gy0hz3/production/18197ec34557a8d5f8a9c59c0f1f788d457dc6a9-1024x1024.png"
                                alt='' 
                                className="w-full h-full object-cover noise border border-solid border-black transition-transform duration-500 group-hover:scale-105"
                                width="1024"
                                height="1024"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative py-8 md:p-12 lg:p-16 col-span-full md:col-start-7 md:col-end-13">
                        <div className="max-w-full md:max-w-[520px]">
                            <h2 className="text-sans-35 lg:text-sans-60 pt-8">Mer än ett ideellt skivbolag</h2>
                            <p className="text-[1rem] lg:text-[1.1875rem] tracking-[-0.02em] 2xl:text-lg transition duration-500 delay-200 pt-8">Sedan 2019 har K&K Records arbetat med att stärka kulturlivet i Örebro län genom att stödja unga kulturutövare med finansiering och vägledning, med målet att främja en positiv kulturutveckling och stärka regionens musikexport.</p>
                            <div className="flex gap-2 mt-7">
                                <Link className="cursor-pointer inline-block border disabled:text-opacity-70 disabled:border-opacity-70 text-center bg-black text-white text-[0.9375rem] tracking-normal leading-[1.4] px-2 py-2 lg:px-5 xl:text-[1.1875rem]" href="/om-oss">Läs mer →</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default AboutSection
