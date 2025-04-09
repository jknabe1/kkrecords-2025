"use client"

import { useState } from "react"
import Link from "next/link"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(true)
  if (!isVisible) {
    return null
  }

  return (
    <div className="px-2 py-3 lg:px-5">
      <div className="fixed bottom-0 left-0 md:bottom-2 md:left-5 right-0 lg:right-auto z-[99] border border-solid border-black ">
        <div className="w-full lg:max-w-[480px] bg-white text-black overflow-hidden">
          <div className="flex flex-col gap-px">
            <div className="grid-col-border-invert-dark flex flex-col justify-center p-2">
              <div className="flex flex-col gap-half">
                <h2 className="uppercase text-sans-14 font-800 tracking-wider">Kakor...</h2>
                <div className="rich-text text-sans-12">
                  <p>Vi använder cookies för att förbättra din surfupplevelse, visa personligt anpassade annonser eller innehåll och analysera vår trafik. Genom att klicka på &quot;Acceptera&quot; samtycker du till vår användning av cookies. <Link className="" href="/om-oss/integritet"> Läs mer här</Link>.</p>
                </div>
              </div>
            </div>
            <div>
              <button className="block w-full" onClick={() => setIsVisible(false)}>
                <div className="flex justify-between items-center p-2">
                  <div className="flex items-baseline gap-1">
                    <div className="tracking-tighter text-sans-22">Acceptera</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>  
    </div>   
  )
}
