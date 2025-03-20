"use client"

import { useState } from "react"
import Link from "next/link"

// Custom Switch component
const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => {
  return (
    <button
      className={`w-11 h-6 flex items-center rounded-full p-1 ${checked ? "bg-[--vividGreen]" : "bg-gray-300"}`}
      onClick={() => onCheckedChange(!checked)}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  )
}

// Custom ArrowRight icon component
const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
)

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(true)
  const [preferences, setPreferences] = useState({
    functional: false,
    performance: false,
    targeting: false,
  })

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 md:bottom-2 md:left-5 right-0 lg:right-auto z-50 border border-solid border-black ">
      <div className="w-full lg:max-w-[480px] bg-white text-black overflow-hidden">
        <div className="flex flex-col gap-px">
          <div className="grid-col-border-invert-dark flex flex-col justify-center p-2">
            <div className="flex flex-col gap-half">
              <h2 className="uppercase text-sans-14 font-800 tracking-wider">Kakor...</h2>
              <div className="rich-text text-sans-12">
                <p>Vi använder cookies för att förbättra din surfupplevelse, visa personligt anpassade annonser eller innehåll och analysera vår trafik. Genom att klicka på "Acceptera" samtycker du till vår användning av cookies. <Link className="" href="/info/integritet"> Läs mer här</Link>.</p>
              </div>
            </div>
          </div>
          <div>
            <button className="block w-full">
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
  )
}

