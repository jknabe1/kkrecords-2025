import InfoGrid from "@/components/About/InfoGrid/InfoGrid";
import type { Metadata } from "next";
import React from "react";

// ✅ **Static Metadata for SEO**
export const metadata: Metadata = {
  title: "Om Oss",
  description:
    "K&K Records är en ledande aktör inom live- och underhållningsindustrin i Sverige och Europa. Vi representerar artister, producerar konserter, festivaler och musikaler.",
  openGraph: {
    title: "Om K&K Records - Mer än ett skivbolag",
    description:
      "K&K Records är en ledande aktör inom live- och underhållningsindustrin i Sverige och Europa. Vi representerar artister, producerar konserter, festivaler och musikaler.",
    url: "https://kkrecords.se/om-oss",
    siteName: "K&K Records",
    images: [
      {
        url: "https://kkrecords.se/api",
        width: 1200,
        height: 800,
        alt: "K&K Records - Om oss",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om K&K Records - Mer än ett skivbolag",
    description:
      "K&K Records är en ledande aktör inom live- och underhållningsindustrin i Sverige och Europa. Vi representerar artister, producerar konserter, festivaler och musikaler.",
    images: [
      "https://kkrecords.se/api",
    ],
  },
};

export default function Page() {
  // ✅ **Static JSON-LD for Schema.org**
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "K&K Records",
    "description":
      "K&K Records är en ledande aktör inom live- och underhållningsindustrin i Sverige och Europa. Vi representerar artister, producerar konserter, festivaler och musikaler.",
    "image": "https://cdn.sanity.io/images/1k2t1bm0/production/b34d044f641e16d3f97b0237d7fbda9b0a22b306-1439x1913.jpg",
    "url": "https://yourwebsite.com/about",
    "sameAs": [
      "https://www.facebook.com/kkmusicrecords",
      "https://www.instagram.com/kkrecords.se",
    ],
    "foundingDate": "2019",
    "founder": [
      {
        "@type": "Person",
        "name": "Jens Knabe",
      },
      {
        "@type": "Person",
        "name": "Edwin Krutholm",
      },
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "Music For Pennies",
    },
  };

  return (
  <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-12 gap-px">
            <div className="col-span-12 relative h-full grid-col-border">
                <div className="grid grid-cols-12 gap-px items-start">
                    <div className="col-span-12 lg:col-span-6 grid-col-border">
                        <ul className="flex flex-col gap-px">
                            <li className="grid-col-border p-2 lg:p-4">
                              {/* Heading */}
                              <h1 className="text-sans-35 lg:text-sans-60 font-600">
                                Om K&K Records
                              </h1>

                              {/* Introduction */}
                              <p className="mt-4 text-lg leading-relaxed">
                                All Things Live Sweden representerar ett 150-tal av Sveriges mest framstående artister, band, komiker, skådespelare och profiler samt producerar konserter, festivaler, shower, musikaler, livepoddar, föreställningar och standup över hela Skandinavien.
                                <br/>
                                All Things Live är sedan december 2018 en av Sveriges och Europas största aktörer inom live-/underhållningsindustrin. Vi erbjuder ett brett utbud som sträcker sig från svenska musikproduktioner och standup-evenemang till arenakonserter med internationella artister.
                                <br/>
                                Musikagenturen representerar bland annat artister som Veronica Maggio, Miss Li, Weeping Willows, Thomas Stenström, AmenaA, Albin Lee Meldau, Helen Sjöholm, Greczula, Lena Philipsson, Lisa Nilsson, Tjuvjakt, Soppgirobygget och Nadja Evelina.
                                <br/>
                                Vi samarbetar även med världsstjärnor och arrangerar konserter med artister som Taylor Swift, Andrea Bocelli, Sabaton, Justin Bieber och Nick Cave and the Bad Seeds. Dessutom agerar vi agentur och bokningsbolag för flera komiker och profiler såsom Johan Glans, Kristina “Keyyo” Petrushina, Farah Abadi, Hampus Hedström och Özz Nûjen.
                                <br/>   
                                Utöver detta arrangerar vi årligen Melodifestivalen och flera festivaler, såsom A day at the park, Summer On och Amaze. Vi samproducerar även musikalerna & Juliet och We Will Rock You, föreställningen Kärleksbrev med Krister Henriksson och Ulla Skoog, samt evenemang i den mobila arenan Evenew.
                                <br/>                                        
                                Vår företagskultur kännetecknas av prestigelöshet och professionalism i alla led. Sedan 2011 driver vi ett aktivt jämställdhets- och mångfaldsarbete och detta är en viktig del av vår värdegrund. Våra värdeord är mod, tydlighet, engagemang och glädje.
                              </p>
                              </li>
                        </ul>
                      </div>
                      <div className="hidden lg:block col-span-6 grid-col-border sticky h-full overflow-hidden">
                        <div className="image overflow-hidden absolute inset-0">
                                <img className="" src="https://cdn.sanity.io/images/1k2t1bm0/production/b34d044f641e16d3f97b0237d7fbda9b0a22b306-1439x1913.jpg?auto=format&q=75&url=https://cdn.sanity.io/images/1k2t1bm0/production/b34d044f641e16d3f97b0237d7fbda9b0a22b306-1439x1913.jpg&w=1000" alt="A coiled black power cord with a two-prong plug against a light background."/>
                        </div>
                    </div>
                    <div className="col-span-12 bg-[lightPink] py-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-sans-35 lg:text-sans-60 font-600 text-black text-center">
                                Mer än ett skivbolag
                            </h2>
                            <p className="mt-4 text-lg text-gray-700 text-center leading-relaxed">
                                Vi verkar 
                            </p>
                        </div>
                    </div>
                  </div>
                  <InfoGrid/>
            </div> 
      </div>
    </div>

  );
}
