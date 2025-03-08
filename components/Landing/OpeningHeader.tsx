import React from 'react'

const OpeningHeader = () => {
  return (
    <div>
        <div className="md:px-container-desktop my-8 md:my-16">
            <div className="grid grid-cols-12 md:grid-reverse">
                <div className="col-span-12 md:col-span-6 lg:col-span-7 min-h-[100vw] md:min-h-hero-80 relative">
                    <div className="absolute inset-0">
                        <div className="block w-full image absolute inset-0">
                            <video playsInline loop autoPlay muted poster="https://image.mux.com/c00PMROTO3TpDk5QTm4V6Fh8pKlRAVdg02IcN2E6D4mQk/thumbnail.jpg?width=1920&amp;fit_mode=preserve&amp;time=0" className="block w-full" src="blob:https://www.benirugs.com/57718910-ab15-4e8c-b566-ad183981266e"></video>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-5 min-h-[100vw] md:min-h-hero-80 bg-off-white">
                    <div className="h-full flex flex-col justify-between gap-4 p-3 md:p-4">
                        <div className="flex flex-col gap-1 md:gap-2">
                            <p className="text-sans-12-caps uppercase tracking-wider">Orpheu by Garcé and Dimofski</p>
                            <h2 className="font-serif text-serif-24 md:text-serif-42 tracking-tight">Everything is theatre</h2>
                            <div className="text-sans-13 tracking-wide rich-text line-break max-w-[380px]">
                                <p>From the poetic perspective of Fernando Pessoa to the aesthetic vernacular of Portuguese architecture, Orpheu paints a Fauvist vision of imagination and reality through the eyes of Olivier Garcé and Clio Dimofski.</p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <a className="block w-full md:w-auto button button-medium button-border button-secondary-white" title="EXPLORE ALL EIGHT ACTS" href="/collections/orpheu-collection">
                            <svg viewBox="0 0 100 44" fill="none" width="100%" height="100%" preserveAspectRatio="none" className="icon-border absolute inset-0">
                                <g mask="url(#border-mask-4-44)">
                                    <rect x="0" y="0" width="100" height="44" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></rect>
                                </g>
                                <mask id="border-mask-4-44" x="0" y="0" width="100" height="44">
                                    <rect x="0" y="0" width="100" height="44" fill="white"></rect>
                                    <rect x="0" y="1" width="4" height="4" fill="black" className="icon-border-mask-rect origin-top-left"></rect>
                                    <rect x="96" y="1" width="4" height="4" fill="black" className="icon-border-mask-rect origin-top-right"></rect>
                                    <rect x="96" y="39" width="4" height="4" fill="black" className="icon-border-mask-rect origin-bottom-right"></rect>
                                    <rect x="0" y="39" width="4" height="4" fill="black" className="icon-border-mask-rect origin-bottom-left"></rect>
                                </mask>
                            </svg>
                            EXPLORE ALL EIGHT ACTS
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OpeningHeader