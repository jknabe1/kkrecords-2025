import React from 'react'

export const page = () => {
  return (
    <div>
        <div className="grid grid-cols-12 gap-px">
            <div className="col-span-12 relative h-full grid-col-border">
                <div className="grid grid-cols-12 gap-px items-start">
                    <div className="col-span-12 lg:col-span-6 grid-col-border">
                        <ul className="flex flex-col gap-px">
                            <li className="grid-col-border px-2 py-3 lg:px-5">
                                <h2 className="text-sans-35 lg:text-sans-60 font-600">Föreningen</h2>
                                <div className="rich-text text-sans-22 lg:text-sans-30 rich-text-light line-break">
                                    <p>halloj@kkrecords.se</p>
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
                                <h2 className="text-sans-35 lg:text-sans-60 font-600">Ordförande</h2>
                                <div className="rich-text text-sans-22 lg:text-sans-30 rich-text-light line-break">
                                    <p>nerim.mehmedovic@kf019.se</p>
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
    </div>
  )
}
