"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchRef = useRef<HTMLDivElement>(null)

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible)
  }

  // Close search flyout when clicking outside
  const handleSearchClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsSearchVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleSearchClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleSearchClickOutside)
    }
  }, [])

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible)
  }

  const closeNav = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event from bubbling up
    setIsNavVisible(false)
  }

  const openNav = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event from bubbling up
    setIsNavVisible(true)
  }

  const navRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsNavVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLinkClick = () => {
    setIsNavVisible(false)
  }

  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const router = useRouter();

  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      toggleSearch(); // Optionally close the overlay
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 h-[60px] lg:h-[70px] bg-background border-b-black border-b border-solid flex flex-col justify-center z-20"
        role="navigation"
      >
        <div className="px-2 py-3 lg:px-5">
          <div className="grid grid-cols-12 items-center">
            <div className="hidden lg:block col-span-4">
              <ul className="flex items-center">
                <li className="mr-1">
                  <button
                    className="block icon-fill-hover open-menu"
                    aria-label={isNavVisible ? "Close Menu" : "Open Menu"}
                    onClick={isNavVisible ? closeNav : openNav}
                  >
                    {isNavVisible ? (
                      <svg width="28" height="30" viewBox="0 0 28 30">
                        <rect
                          width="28"
                          height="30"
                          fill="currentColor"
                          className="icon-fill-fill transition-transform duration-500 group-hover:scale-105"
                        ></rect>
                        <path d="M7 7L21 23" stroke="currentColor" strokeWidth="2"></path>
                        <path d="M21 7L7 23" stroke="currentColor" strokeWidth="2"></path>
                      </svg>
                    ) : (
                      <svg width="28" height="30" viewBox="0 0 28 30">
                        <rect
                          width="28"
                          height="30"
                          fill="currentColor"
                          className="icon-fill-fill transition-transform duration-500 group-hover:scale-105"
                        ></rect>
                        <rect width="28" height="2" fill="currentColor"></rect>
                        <rect y="28" width="28" height="2" fill="currentColor"></rect>
                        <rect y="14" width="28" height="2" fill="currentColor"></rect>
                      </svg>
                    )}
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-span-4 lg:col-span-4 lg:flex justify-center">
              <Link aria-label="K&K Records" className="block xl:ml-3" href="/">
                <picture>
                  <img
                    src="https://kkrecords.se/media/kkrecords-embed.svg"
                    alt="K&K Records Logo"
                    className="block w-full h-full"
                  />
                </picture>
              </Link>
            </div>
            <div className="col-span-8 lg:col-span-4">
              <ul className="flex justify-end items-center lg:items-end">
                <li>
                  <button className="block px-[7px]" aria-label="Open Search" onClick={toggleSearch}>
                    <div className="h-[70px] flex flex-col justify-center hidden lg:flex">
                      <div className="relative">
                        <div>
                          <svg width="36" height="37" viewBox="0 0 36 37" className="icon-fill">
                            <path d="M22.1659 23.1292L34.3457 35.9806" stroke="currentColor" strokeWidth="2"></path>
                            <path
                              d="M26.1024 13.4297C26.1024 20.233 20.6487 25.7298 13.9436 25.7298C7.23852 25.7298 1.78479 20.233 1.78479 13.4297C1.78479 6.62649 7.23852 1.12964 13.9436 1.12964C20.6487 1.12964 26.1024 6.62649 26.1024 13.4297Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="icon-fill-fill"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <svg className="lg:hidden" width="27" height="29" viewBox="0 0 27 29">
                      <path d="M16.8905 18.0781L26.3168 28.0241" stroke="currentColor"></path>
                      <path
                        d="M20.2111 10.5715C20.2111 15.9852 15.8705 20.3648 10.5272 20.3648C5.18393 20.3648 0.843262 15.9852 0.843262 10.5715C0.843262 5.15775 5.18393 0.778198 10.5272 0.778198C15.8705 0.778198 20.2111 5.15775 20.2111 10.5715Z"
                        stroke="currentColor"
                        fill="none"
                      ></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <Link className="block px-[7px] lg:pr-0" href="/backstage">
                    <div className="h-[70px] flex flex-col justify-center hidden lg:flex">
                      <div className="relative">
                        <div>
                          <div className="text-center relative bottom-[2px] relative">
                          <svg width="35" height="36" viewBox="0 0 35 36" className="icon-fill"><circle cx="17.6423" cy="10.1467" r="8.73657" stroke="currentColor" strokeWidth="2" fill="none" className="icon-fill-fill"></circle><path fillRule="evenodd" clipRule="evenodd" d="M32.6461 35.7288C32.6659 35.414 32.676 35.0965 32.676 34.7767C32.676 26.5491 26.0062 19.8794 17.7787 19.8794C9.55111 19.8794 2.88135 26.5491 2.88135 34.7767C2.88135 35.0965 2.89143 35.414 2.91128 35.7288H0.907722C0.890217 35.4137 0.881348 35.0962 0.881348 34.7767C0.881348 25.4446 8.44654 17.8794 17.7787 17.8794C27.1108 17.8794 34.676 25.4446 34.676 34.7767C34.676 35.0962 34.6671 35.4137 34.6496 35.7288H32.6461Z"></path><circle cx="17.5" cy="35" r="16" fill="none" className="icon-fill-fill"></circle><rect x="2" y="34" height="2" width="32" fill="currentColor"></rect></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center lg:hidden relative bottom-[2px] relative">
                      <svg width="23" height="29" viewBox="0 0 23 29" fill="none" className="icon-fill">
                        <rect
                          x="1.19751"
                          y="6.48889"
                          width="20.4104"
                          height="21.9772"
                          stroke="currentColor"
                          className="none"
                        ></rect>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5948 6.05257C16.8094 3.10725 14.2917 1.0141 11.4026 1.0141C8.51356 1.0141 5.99588 3.10725 5.2105 6.05257H4.18115C4.99264 2.58313 7.91808 0.0140991 11.4026 0.0140991C14.8872 0.0140991 17.8126 2.58313 18.6241 6.05257H17.5948Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </Link>
                </li>
                <li className="lg:hidden">
                  <button
                    className="block pl-[7px]"
                    aria-label={isNavVisible ? "Close Menu" : "Open Menu"}
                    onClick={isNavVisible ? closeNav : openNav}
                  >
                    {isNavVisible ? (
                      <svg width="23" height="23" viewBox="0 0 23 23">
                        <path d="M1 1L22 22" stroke="currentColor" strokeWidth="1.5"></path>
                        <path d="M22 1L1 22" stroke="currentColor" strokeWidth="1.5"></path>
                      </svg>
                    ) : (
                      <svg width="23" height="23" viewBox="0 0 23 23">
                        <rect width="23" height="1" fill="currentColor"></rect>
                        <rect y="11" width="23" height="1" fill="currentColor"></rect>
                        <rect y="22" width="23" height="1" fill="currentColor"></rect>
                      </svg>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar UI with slide-down animation */}
      <div
        className={`fixed top-[60px] lg:top-[70px] left-0 right-0 bottom-0 z-50 backdrop-blur-sm transform transition-all duration-300 ease-in-out ${
          isSearchVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        ref={searchRef}
      >
        <div className="relative w-full bg-white border-b border-gray-200 transform transition-transform duration-300 ease-out">
          <div className="flex items-center h-[160px] md:px-10 border-b border-black border-solid px-2 py-3 lg:px-5">
            <button
              className="mr-4 text-black hover:text-gray-900 transition-colors"
              aria-label="Close search"
              onClick={toggleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </button>

            <input
              type="text"
              placeholder="VAD LETAR DU EFTER?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchSubmit();
              }}
              className="flex-1 text-2xl md:text-3xl lg:text-4xl font-light text-black placeholder-gray-300 bg-transparent border-none outline-none uppercase"
              autoFocus={isSearchVisible}
            />

            <button className="ml-4 text-black hover:text-gray-900 transition-colors" aria-label="Submit search" onClick={handleSearchSubmit}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full h-[calc(100vh-230px)] backdrop-blur-md">{/* Content area with blur effect */}</div>
      </div>

      <div
        className={`fixed top-[60px] lg:top-[70px] left-0 right-0 bottom-0 bg-white text-black z-40 transform transition-all duration-300 ease-in-out ${
          isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        ref={navRef}
      >
        <div className="grid grid-cols-2 h-[calc(100vh-60px)] lg:h-[calc(100vh-70px)] border-b border-black border-solid">
          {/* Top row */}
          <Link
            href="/"
            className="flex items-center justify-center text-sans-35 lg:text-sans-60 font-600 border-r border-b border-black border-solid hover:italic"
            onClick={handleLinkClick}
          >
            START
          </Link>
          <Link
            href="/om-oss"
            className="flex items-center justify-center text-sans-35 lg:text-sans-60 font-600 border-b  border-black border-solid hover:italic"
            onClick={handleLinkClick}
          >
            OM OSS
          </Link>

          {/* Middle row */}
          <Link
            href="/artists"
            className="flex items-center justify-center text-sans-35 lg:text-sans-60 font-600 border-r border-b  border-black border-solid hover:italic" 
            onClick={handleLinkClick}
          >
            ARTISTER
          </Link>
          <Link
            href="/edits"
            className="flex items-center justify-center text-sans-35 lg:text-sans-60 font-600 border-b  border-black border-solid hover:italic"
            onClick={handleLinkClick}
          >
            EDITS
          </Link>

          {/* Bottom row with lucky button */}
          <div className="relative flex items-center justify-center text-sans-35 lg:text-sans-60 font-600 border-r  border-black border-solid hover:italic">
            <Link href="/event" className="w-full h-full flex items-center justify-center" onClick={handleLinkClick}>
              EVENTS
            </Link>
          </div>

          {/* Footer area */}
            <div className="flex items-center justify-center border-gray-800 right-0">
            <div className="w-full h-full flex flex-col items-center justify-center p-8">
              {/* Social Links */}
              <ul className="flex items-center space-x-6 list-none">
              <li>
                <Link className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Instagram" aria-label="Instagram" href="https://www.instagram.com/kkrecords.se">Instagram</Link>
              </li>
              <li>
                <Link className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Facebook" aria-label="Facebook" href="https://www.facebook.com/kkmusicrecords">Facebook</Link>
              </li>
              <li>
                <Link className='block w-full text-sans-14 uppercase tracking-wider p-2 text-left' title="TikTok" aria-label="TikTok" href="https://www.tiktok.com/kkrecords.se">TikTok</Link>
              </li>
              <li>
                <Link className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Spotify" aria-label="Spotify" href="https://open.spotify.com/user/rp0di7du2vijxmhev2mp6vugo">Spotify</Link>
              </li>
              <li>
                <Link className="block w-full text-sans-14 uppercase tracking-wider p-2 text-left" title="Youtube" aria-label="Youtube" href="https://www.youtube.com/@kkrec">Youtube</Link>
              </li>
              </ul>
            </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Header

