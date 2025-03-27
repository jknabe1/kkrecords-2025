import EmployeeGrid from '@/components/Contact/EmployeeGrid'
import React from 'react'
import type { Metadata } from 'next'

// ✅ Static Metadata
export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakta oss på K&K Records. Här hittar du kontaktuppgifter till föreningen, press, ekonomi, och våra medarbetare.",
  openGraph: {
    title: "Kontakt - K&K Records",
    description: "Behöver du nå oss? Här hittar du kontaktuppgifter till K&K Records.",
    url: "https://kkrecords.se/om-oss/kontakta-oss",
    siteName: "K&K Records",
    images: [
      {
        url: "https://kkrecords.se/api",
        width: 1200,
        height: 800,
        alt: "K&K Records Kontakt",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt - K&K Records",
    description: "Behöver du nå oss? Här hittar du kontaktuppgifter till K&K Records.",
    images: ["https://kkrecords.se/api"],
  },
};


export default function page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Kontakt oss  - K&K Records",
        "description": "Officiella kontaktuppgifter till K&K Records.",
        "url": "https://kkrecords.se/om-oss/kontakta-oss",
        "image": "https://kkrecords.se/api",
        "publisher": {
          "@type": "Organization",
          "name": "K&K Records",
          "url": "https://kkrecords.se"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "Föreningen",
            "email": "halloj@kkrecords.se"
          },
          {
            "@type": "ContactPoint",
            "contactType": "Ordförande",
            "email": "nerim.mehmedovic@kf019.se"
          },
          {
            "@type": "ContactPoint",
            "contactType": "Press",
            "email": "jens.knabe@kkrecords.se"
          },
          {
            "@type": "ContactPoint",
            "contactType": "Ekonomi",
            "email": "elliot.bergdahl@kf019.se"
          },
          {
            "@type": "ContactPoint",
            "contactType": "Music For Pennies",
            "email": "tjooo@musicforpennies.se"
          }
        ]
      };
    
  return (
    <div>
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grid grid-cols-12 gap-px ">
            <div className="col-span-12 relative h-full grid-col-border">
                <div className="grid grid-cols-12 gap-px items-start">
                    <div className="col-span-12 lg:col-span-6 grid-col-border">
                        <ul className="flex flex-col gap-px">
                            <li className="grid-col-border  px-2 py-3 lg:px-5">
                                <h2 className="text-sans-35 lg:text-sans-60 font-600">Föreningen</h2>
                                <div className="rich-text text-sans-22 lg:text-sans-30 rich-text-light line-break">
                                    <p>halloj@kkrecords.se</p>
                                </div>
                            </li>
                            <li className="grid-col-border px-2 py-3 lg:px-5">
                                <h2 className="text-sans-35 lg:text-sans-60 font-600">Ordförande</h2>
                                <div className="rich-text text-sans-22 lg:text-sans-30 rich-text-light line-break">
                                    <p>nerim.mehmedovic@kf019.se</p>
                                </div>
                            </li>
                            <li className="grid-col-border px-2 py-3 lg:px-5">
                                <h2 className="text-sans-35 lg:text-sans-60 font-600">Press</h2>
                                <div className="rich-text text-sans-22 lg:text-sans-30 rich-text-light line-break">
                                    <p>jens.knabe@kkrecords.se</p>
                                </div>
                            </li>
                            <li className="grid-col-border px-2 py-3 lg:px-5">
                                <h2 className="text-sans-35 lg:text-sans-60 font-600">Ekonomi</h2>
                                <div className="rich-text text-sans-22 lg:text-sans-30 rich-text-light line-break">
                                    <p>elliot.bergdahl@kf019.se</p>
                                </div>
                            </li>
                            <li className="grid-col-border px-2 py-3 lg:px-5">
                                <h2 className="text-sans-35 lg:text-sans-60 font-600">Music For Pennies</h2>
                                <div className="rich-text text-sans-22 lg:text-sans-30 rich-text-light line-break">
                                    <p>tjooo@musicforpennies.se</p>
                                </div>
                            </li>
                            <li className="grid-col-border px-2 py-3 lg:px-5 ">
                            <div className="flex items-center gap-2">
                                <h2 className="text-sans-35 lg:text-sans-60 font-600">Direktkontakt</h2>
                                <svg xmlns="http://www.w3.org/2000/svg" className='top-0' width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                                    <path d="M229.66,165.66l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L168,188.69V72H32a8,8,0,0,1,0-16H176a8,8,0,0,1,8,8V188.69l34.34-34.35a8,8,0,0,1,11.32,11.32Z"></path>
                                </svg>
                            </div>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden lg:block col-span-6 grid-col-border sticky top-7 min-h-hero-minus-header overflow-hidden">
                        <div className="image overflow-hidden absolute inset-0">
                                <img className="" src="https://cdn.sanity.io/images/1k2t1bm0/production/6d522608a1ffb4d5f2a6e4876670c22fc3ceb8de-1439x1913.jpg" alt="A coiled black power cord with a two-prong plug against a light background."/>
                        </div>
                </div>
            </div>
          </div>
        </div>
        <EmployeeGrid />
    </div>
  )
}
