import React from 'react'
import NewsletterSection from '../Newsletter/NewsletterSection'

export default function Footer() {
  return (
    <div>
        <footer>
            <div className="overflow-hidden">
            <NewsletterSection />
                    <div className="grid grid-cols-12 gap-px relative">
                        <div className="col-span-12 grid-col-border lg:hidden">
                            <div>
                                <button className="p-2 text-left block w-full">
                                    <div className="w-full flex justify-between items-center">
                                        <div className="text-sans-35 font-600 tracking-tighter">Om oss</div>
                                    </div>
                                </button>
                                <div className="overflow-hidden">
                                    <div>
                                        <ul className="flex flex-col gap-px border-t border-solid">
                                            <li className="grid-col-border">
                                                <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Om oss" aria-label="Om oss" href="/om-oss/">Om oss</a>
                                            </li>
                                            <li className="grid-col-border">
                                                <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="CONTACT" aria-label="CONTACT" href="/om-oss/kontakta-oss">Kontakta oss</a>
                                            </li>
                                            <li className="grid-col-border">
                                                <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="integritet" aria-label="integritet" href="/om-oss/integritet">integritet</a>
                                            </li>
                                            <li className="grid-col-border">
                                                <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Tillgänglighet" aria-label="Tillgänglighet" href="/om-oss/tillganglighet">Tillgänglighet</a>
                                            </li>
                                            <li className="grid-col-border">
                                                <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Backstage" aria-label="Backstage" href="/backstage">Backstage </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 grid-col-border lg:hidden">
                            <div>
                                <button className="p-2 text-left block w-full">
                                    <div className="w-full flex justify-between items-center">
                                        <div className="text-sans-35 font-600 tracking-tighter">Om oss</div>
                                    </div>
                                </button>
                                <div className="overflow-hidden">
                                    <div>
                                        <ul className="flex flex-col gap-px border-t border-solid">
                                            <li className="grid-col-border">
                                                <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Om oss" aria-label="Om oss" href="/om-oss">Om oss</a>
                                            </li>
                                            <li className="grid-col-border">
                                                <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Kontakta oss" aria-label="Kontakta oss" href="/om-oss/kontakta-oss">Kontakta oss</a>
                                            </li>
                                            <li className="grid-col-border">
                                                <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Integritet" aria-label="Integritet" href="/om-oss/integritet">Integritet</a>
                                            </li>
                                            <li className="grid-col-border">
                                                <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Tillgänglighet" aria-label="Tillgänglighet" href="/om-oss/tillganglighet">Tillgänglighet</a>
                                            </li>
                                            <li className="grid-col-border">
                                                <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left"  title="Backstage" aria-label="Backstage" href="/backstage">Backstage </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 grid-col-border lg:hidden">
                            <div>
                                <button className="p-2 text-left block w-full">
                                    <div className="w-full flex justify-between items-center">
                                        <div className="text-sans-35 font-600 tracking-tighter">Genvägar</div>
                                    </div>
                                </button>
                            <div className="overflow-hidden">
                                <div>
                                    <ul className="flex flex-col gap-px border-t border-solid">
                                        <li className="grid-col-border">
                                            <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Artister" aria-label="Artister" href="/artister">Artister</a>
                                        </li>
                                        <li className="grid-col-border">
                                            <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Edits" aria-label="Edits" href="/edits">Edits</a>
                                        </li>
                                        <li className="grid-col-border">
                                            <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Event" aria-label="Event" href="/event">Event</a>
                                        </li>
                                        <li className="grid-col-border">
                                            <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Instagram" aria-label="Instagram" href="https://www.instagram.com/kkrecords.se">Instagram</a>
                                        </li>
                                        <li className="grid-col-border">
                                            <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Facebook" aria-label="Facebook" href="https://www.facebook.com/kkrecords.se">Facebook</a>
                                        </li>
                                        <li className="grid-col-border">
                                            <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="TikTok" aria-label="TikTok" href="https://www.tiktok.com/kkrecords.se">TikTok</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 grid-col-border lg:hidden">
                        <div>
                            <button className="p-2 text-left block w-full">
                                <div className="w-full flex justify-between items-center">
                                    <div className="text-sans-35 font-600 tracking-tighter">Stores</div>
                                </div>
                            </button>
                            <div className="overflow-hidden">
                                <div>
                                    <ul className="flex flex-col gap-px border-t border-solid">
                                        <li className="grid-col-border">
                                            <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Nolita NYC" aria-label="Nolita NYC" href="https://www.dsanddurga.com/retailers#nolita-nyc-store">Nolita NYC</a>
                                        </li>
                                        <li className="grid-col-border">
                                            <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Brooklyn NYC" aria-label="Brooklyn NYC" href="https://www.dsanddurga.com/retailers#brooklyn-nyc-store">Brooklyn NYC</a>
                                        </li>
                                        <li className="grid-col-border">
                                            <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Madison Ave NYC" aria-label="Madison Ave NYC" href="https://www.dsanddurga.com/retailers#madison-ave-nyc-store">Madison Ave NYC</a>
                                        </li>
                                        <li className="grid-col-border">
                                            <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Venice LA" aria-label="Venice LA" href="https://www.dsanddurga.com/retailers#venice-la-store">Venice LA</a>
                                        </li>
                                        <li className="grid-col-border">
                                            <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Silver Lake LA" aria-label="Silver Lake LA" href="/retailers#silver-lake-la-store">Silver Lake LA</a>
                                        </li>
                                        <li className="grid-col-border">
                                            <a className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="All Retailers" aria-label="All Retailers" href="/retailers">All Retailers</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 grid-col-border p-2 py-3 lg:hidden">
                        <div className="flex gap-2 items-center">
                            
                                <button className="block text-sans-12 uppercase tracking-wider link-primary">Site Credits</button>
                                <p className="text-sans-12 uppercase tracking-wider">© &amp; DURGA</p>
                            </div>
                        </div>
                        <div className="col-span-4 grid-col-border p-4 xl:p-5 hidden lg:block min-h-[420px] relative">
                            <h2 className="text-sans-60 font-600 mb-2 tracking-tighter ml-[-0.08em]">Om oss</h2>
                            <ul>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Om oss" aria-label="Om oss" href="/om-oss/">Om oss</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Kontakta oss" aria-label="Kontakta oss" href="/om-oss/kontakta-oss">Kontakta oss</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Integritet" aria-label="Integritet" href="/om-oss/integritet">Integritet</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Tillgänglighet" aria-label="Tillgänglighet" href="/om-oss/tillganglighet">Tillgänglighet</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Backstage" aria-label="Backstage" href="/backstage">Backstage</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-4 grid-col-border p-4 xl:p-5 hidden lg:block min-h-[420px] relative">
                            <h2 className="text-sans-60 font-600 mb-2 tracking-tighter ml-[-0.08em]">Genvägar</h2>
                            <ul>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Artister" aria-label="Artister" href="/artister">Artister</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Edits" aria-label="Edits" href="/edits">Edits</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Event" aria-label="Event" href="/event">Event</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Instagram" aria-label="Instagram" href="https://www.instagram.com/kkrecords.se">Instagram</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Facebook" aria-label="Facebook" href="https://www.facebook.com/kkrecords.se">Facebook</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="TikTok" aria-label="TikTok" href="https://www.tiktok.com/kkrecords.se">TikTok</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-4 grid-col-border p-4 xl:p-5 hidden lg:block min-h-[420px] relative">
                            <h2 className="text-sans-60 font-600 mb-2 tracking-tighter ml-[-0.08em]">Stores</h2>
                            <ul>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Nolita NYC" aria-label="Nolita NYC" href="https://www.dsanddurga.com/retailers#nolita-nyc-store">Nolita NYC</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Brooklyn NYC" aria-label="Brooklyn NYC" href="https://www.dsanddurga.com/retailers#brooklyn-nyc-store">Brooklyn NYC</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Madison Ave NYC" aria-label="Madison Ave NYC" href="https://www.dsanddurga.com/retailers#madison-ave-nyc-store">Madison Ave NYC</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Venice LA" aria-label="Venice LA" href="https://www.dsanddurga.com/retailers#venice-la-store">Venice LA</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="Silver Lake LA" aria-label="Silver Lake LA" href="/retailers#silver-lake-la-store">Silver Lake LA</a>
                                </li>
                                <li>
                                    <a className="inline-block text-sans-16 uppercase tracking-wider font-800 link-primary pb-1" title="All Retailers" aria-label="All Retailers" href="/retailers">All Retailers</a>
                                </li>
                            </ul>
                            <div className="mt-7">
                                <ul className="flex gap-2 items-center">
                                    <li>
                                        <a className="block link-primary" title="DS&amp;Durga Instagram" aria-label="DS&amp;Durga Instagram" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/dsanddurga/">
                                            <svg className="block" width="27" height="27" viewBox="0 0 27 27">
                                                <path d="M25.4348 5.08786C25.09 4.24638 24.5773 3.48286 23.9275 2.84326C23.2669 2.21818 22.5019 1.71184 21.6667 1.34686C20.6529 0.930589 19.5598 0.739079 18.4638 0.785705C16.7139 0.574796 14.949 0.51222 13.1884 0.598655H7.72464C6.6367 0.644159 5.55965 0.832858 4.52174 1.15981C3.62457 1.50037 2.84138 2.08353 2.26087 2.84326C1.49476 3.37932 0.957375 4.1796 0.753623 5.08786C0.371382 6.11293 0.118254 7.18098 0 8.26772L0 19.1166C0.0458343 20.1968 0.235901 21.266 0.565217 22.2965C0.909987 23.138 1.42269 23.9015 2.07246 24.5411C2.73307 25.1662 3.49807 25.6725 4.33333 26.0375C5.3471 26.4538 6.44019 26.6453 7.53623 26.5987H18.4638C19.5517 26.5532 20.6287 26.3645 21.6667 26.0375C22.5183 25.7017 23.2918 25.1966 23.9398 24.5533C24.5878 23.91 25.0965 23.142 25.4348 22.2965C25.8541 21.29 26.047 20.2048 26 19.1166V8.26772C25.9542 7.1876 25.7641 6.11831 25.4348 5.08786ZM23.7391 13.5051V18.7425C23.7908 19.5705 23.6622 20.3999 23.3623 21.1742C23.1665 21.7374 22.8443 22.249 22.42 22.6703C21.9956 23.0915 21.4803 23.4115 20.913 23.6058C20.1331 23.9036 19.2978 24.0312 18.4638 23.9799H7.91304C7.07904 24.0312 6.24369 23.9036 5.46377 23.6058C4.8965 23.4115 4.3812 23.0915 3.95686 22.6703C3.53252 22.249 3.21027 21.7374 3.01449 21.1742C2.71457 20.3999 2.58606 19.5705 2.63768 18.7425V8.26772C2.58606 7.43971 2.71457 6.61038 3.01449 5.83606C3.21027 5.27288 3.53252 4.76128 3.95686 4.34C4.3812 3.91871 4.8965 3.59878 5.46377 3.40441C6.24369 3.10665 7.07904 2.97905 7.91304 3.03031H18.4638C19.2978 2.97905 20.1331 3.10665 20.913 3.40441C21.4803 3.59878 21.9956 3.91871 22.42 4.34C22.8443 4.76128 23.1665 5.27288 23.3623 5.83606C23.6622 6.61038 23.7908 7.43971 23.7391 8.26772V13.5051Z" fill="currentColor"></path>
                                                <path d="M13.1884 6.95828C11.8469 6.95828 10.5356 7.35321 9.42016 8.09313C8.30476 8.83305 7.43542 9.88473 6.92206 11.1152C6.4087 12.3456 6.27438 13.6996 6.53609 15.0058C6.7978 16.312 7.44378 17.5119 8.39235 18.4536C9.34091 19.3954 10.5495 20.0367 11.8652 20.2965C13.1808 20.5563 14.5446 20.423 15.784 19.9133C17.0233 19.4037 18.0826 18.5406 18.8279 17.4332C19.5732 16.3258 19.971 15.0239 19.971 13.6921C19.9735 12.8071 19.7997 11.9304 19.4598 11.1123C19.1198 10.2942 18.6203 9.55085 17.9899 8.92506C17.3596 8.29928 16.6109 7.80336 15.7869 7.46583C14.9629 7.1283 14.0798 6.95581 13.1884 6.95828ZM13.1884 17.9943C12.6165 18.0044 12.0484 17.9 11.5181 17.6874C10.9877 17.4748 10.5059 17.1583 10.1015 16.7568C9.69705 16.3552 9.37824 15.8769 9.16409 15.3504C8.94993 14.8238 8.84483 14.2599 8.85504 13.6921C8.84483 13.1243 8.94993 12.5603 9.16409 12.0338C9.37824 11.5073 9.69705 11.0289 10.1015 10.6274C10.5059 10.2259 10.9877 9.90937 11.5181 9.69676C12.0484 9.48414 12.6165 9.37979 13.1884 9.38993C13.7602 9.37979 14.3283 9.48414 14.8587 9.69676C15.389 9.90937 15.8708 10.2259 16.2753 10.6274C16.6797 11.0289 16.9985 11.5073 17.2127 12.0338C17.4268 12.5603 17.5319 13.1243 17.5217 13.6921C17.5319 14.2599 17.4268 14.8238 17.2127 15.3504C16.9985 15.8769 16.6797 16.3552 16.2753 16.7568C15.8708 17.1583 15.389 17.4748 14.8587 17.6874C14.3283 17.9 13.7602 18.0044 13.1884 17.9943Z" fill="currentColor"></path>
                                                <path d="M20.1593 8.0807C20.9918 8.0807 21.6666 7.41073 21.6666 6.58429C21.6666 5.75785 20.9918 5.08789 20.1593 5.08789C19.3269 5.08789 18.6521 5.75785 18.6521 6.58429C18.6521 7.41073 19.3269 8.0807 20.1593 8.0807Z" fill="currentColor"></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="block link-primary" title="DS&amp;Durga Facebook" aria-label="DS&amp;Durga Facebook" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/dsandd/">
                                            <svg className="block" width="29" height="29" viewBox="0 0 29 29">
                                                <path d="M14.3481 0.598633C6.71913 0.598633 0.534668 6.90495 0.534668 14.6842C0.534668 21.7146 5.586 27.5419 12.1897 28.5986V18.7558H8.68241V14.6842H12.1897V11.581C12.1897 8.05077 14.252 6.1008 17.4072 6.1008C18.9186 6.1008 20.4993 6.37591 20.4993 6.37591V9.84228H18.7576C17.0417 9.84228 16.5064 10.9281 16.5064 12.0431V14.6842H20.3375L19.725 18.7558H16.5064V28.5986C23.1101 27.5419 28.1615 21.7146 28.1615 14.6842C28.1615 6.90495 21.977 0.598633 14.3481 0.598633Z" fill="currentColor"></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="block link-primary" title="DS&amp;Durga Pinterest" aria-label="DS&amp;Durga Pinterest" target="_blank" rel="noopener noreferrer" href="https://www.pinterest.com/dsanddurga/_shop/">
                                            <svg className="block" width="23" height="29" viewBox="0 0 23 29">
                                                <path d="M21.9042 8.41836C21.2601 2.83658 15.893 0.0456889 10.0966 0.68974C5.37354 1.33379 0.865181 4.98342 0.650497 10.3505C0.435814 13.5708 1.50923 16.147 4.51481 16.791C5.80291 14.4295 4.08544 13.7855 3.87075 12.068C2.79734 5.1981 11.8141 0.260373 16.7518 5.1981C20.1867 8.63304 17.8252 19.1525 12.4581 18.0791C7.30569 17.0057 15.0343 8.63304 10.9553 7.13025C7.52038 5.62747 5.80291 11.2092 7.30569 13.7855C6.44696 18.5085 4.30012 22.8022 5.15886 28.5986C7.73506 26.6665 8.5938 23.0169 9.45253 19.1525C10.7406 20.0113 11.5994 20.87 13.1022 20.87C19.328 21.5141 22.7629 14.6442 21.9042 8.41836Z" fill="currentColor"></path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
    </div>
  )
}
