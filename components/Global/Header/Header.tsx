"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/providers/theme-provider"

const Header = () => {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()

  const router = useRouter()

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible)
  }

  const closeNav = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsNavVisible(false)
  }

  const openNav = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsNavVisible(true)
  }

  // Close search flyout when clicking outside
  const handleSearchClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsSearchVisible(false)
    }
  }

  // We're removing the click outside handler for the nav menu as requested

  useEffect(() => {
    document.addEventListener("mousedown", handleSearchClickOutside)
    // Removed the click outside handler for the nav menu
    return () => {
      document.removeEventListener("mousedown", handleSearchClickOutside)
      // Removed the cleanup for the nav click outside handler
    }
  }, [])

  const handleLinkClick = () => {
    setIsNavVisible(false)
  }

  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      toggleSearch() // Optionally close the overlay
    }
  }

  useEffect(() => {
    if (isNavVisible) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isNavVisible])

  return (
    <>
      <header
        aria-label="Main Navigation"
        className="sticky top-0 left-0 right-0 h-[60px] lg:h-[70px] bg-white dark:bg-neutral-900 dark:border-neutral-700 border-b-black border-b border-solid flex flex-col justify-center z-50 overflow-hidden"
        role="navigation"
      >
        <div className="px-2 py-8 lg:px-5">
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
                    src="https://kkrecords.se/media/kkrecords.svg"
                    alt="K&K Records Logo"
                    className="block w-full h-full"
                  />
                </picture>
              </Link>
            </div>
            <div className="col-span-8 lg:col-span-4">
              <ul className="flex justify-end items-center lg:items-end">
                <li>
                  <button
                    className="block px-[7px]"
                    aria-label="Toggle dark mode"
                    onClick={toggleTheme}
                    title={theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}
                  >
                    <div className="h-[70px] flex flex-col justify-center hidden lg:flex">
                      <div className="relative">
                        {theme === 'light' ? (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-fill">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                          </svg>
                        ) : (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-fill">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="lg:hidden">
                      {theme === 'light' ? (
                        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                      ) : (
                        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="5"></circle>
                          <line x1="12" y1="1" x2="12" y2="3"></line>
                          <line x1="12" y1="21" x2="12" y2="23"></line>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                          <line x1="1" y1="12" x2="3" y2="12"></line>
                          <line x1="21" y1="12" x2="23" y2="12"></line>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                      )}
                    </div>
                  </button>
                </li>
                <li>
                  <button className="block px-[7px]" aria-label="Open Search" onClick={toggleSearch}>
                    <div className="h-[70px] flex flex-col justify-center hidden lg:flex">
                      <div className="relative">
                        <svg width="35" height="36" viewBox="0 0 35 36" className="icon-fill">
                          <circle
                            cx="17.6423"
                            cy="10.1467"
                            r="8.73657"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="icon-fill-fill"
                          ></circle>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M32.6461 35.7288C32.6659 35.414 32.676 35.0965 32.676 34.7767C32.676 26.5491 26.0062 19.8794 17.7787 19.8794C9.55111 19.8794 2.88135 26.5491 2.88135 34.7767C2.88135 35.0965 2.89143 35.414 2.91128 35.7288H0.907722C0.890217 35.4137 0.881348 35.0962 0.881348 34.7767C0.881348 25.4446 8.44654 17.8794 17.7787 17.8794C27.1108 17.8794 34.676 25.4446 34.676 34.7767C34.676 35.0962 34.6671 35.4137 34.6496 35.7288H32.6461Z"
                          ></path>
                          <circle cx="17.5" cy="35" r="16" fill="none" className="icon-fill-fill"></circle>
                          <rect x="2" y="34" height="2" width="32" fill="currentColor"></rect>
                        </svg>
                      </div>
                    </div>
                    <div className="text-center lg:hidden relative bottom-[2px]">
                      <svg width="23" height="29" viewBox="0 0 35 36" className="icon-fill">
                        <circle
                          cx="17.6423"
                          cy="10.1467"
                          r="8.73657"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className="icon-fill-fill"
                        ></circle>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M32.6461 35.7288C32.6659 35.414 32.676 35.0965 32.676 34.7767C32.676 26.5491 26.0062 19.8794 17.7787 19.8794C9.55111 19.8794 2.88135 26.5491 2.88135 34.7767C2.88135 35.0965 2.89143 35.414 2.91128 35.7288H0.907722C0.890217 35.4137 0.881348 35.0962 0.881348 34.7767C0.881348 25.4446 8.44654 17.8794 17.7787 17.8794C27.1108 17.8794 34.676 25.4446 34.676 34.7767C34.676 35.0962 34.6671 35.4137 34.6496 35.7288H32.6461Z"
                        ></path>
                        <circle cx="17.5" cy="35" r="16" fill="none" className="icon-fill-fill"></circle>
                        <rect x="2" y="34" height="2" width="32" fill="currentColor"></rect>
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
        <div className="relative w-full bg-white dark:bg-neutral-900 dark:border-neutral-700 border-b border-gray-200 transform transition-transform duration-300 ease-out">
          <div className="flex items-center h-[160px] md:px-10 dark:border-neutral-700 border-b border-black border-solid px-2 py-3 lg:px-5">
            <button
              className="mr-4 text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
              aria-label="Close search"
              onClick={toggleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </button>

            <input
              type="text"
              placeholder="VAD LETAR DU EFTER?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchSubmit()
              }}
              className="flex-1 text-2xl md:text-3xl lg:text-4xl font-light text-black dark:text-white placeholder-gray-300 dark:placeholder-gray-600 bg-transparent border-none outline-none uppercase"
              autoFocus={isSearchVisible}
            />

            <button
              className="ml-4 text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
              aria-label="Submit search"
              onClick={handleSearchSubmit}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full h-[calc(100vh-230px)] backdrop-blur-md">{/* Content area with blur effect */}</div>
      </div>

      <div
        className={`fixed top-[60px] lg:top-[70px] left-0 right-0 bottom-0 bg-white text-black z-40 transform transition-all duration-300 ease-in-out overflow-hidden ${
          isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        ref={navRef}
      >
        {/* Mobile: Stacked Layout */}
        <div className="lg:hidden flex flex-col h-full overflow-y-auto">
          {/* Main Navigation Links */}
          <Link
            href="/"
            className="flex items-center justify-center text-sans-35 font-600 border-b border-black border-solid hover:italic py-5"
            onClick={handleLinkClick}
          >
            START
          </Link>
          <Link
            href="/om-oss"
            className="flex items-center justify-center text-sans-35 font-600 border-b border-black border-solid hover:italic py-5"
            onClick={handleLinkClick}
          >
            OM OSS
          </Link>
          <Link
            href="/artists"
            className="flex items-center justify-center text-sans-35 font-600 border-b border-black border-solid hover:italic py-5"
            onClick={handleLinkClick}
          >
            ARTISTER
          </Link>
          <Link
            href="/edits"
            className="flex items-center justify-center text-sans-35 font-600 border-b border-black border-solid hover:italic py-5"
            onClick={handleLinkClick}
          >
            EDITS
          </Link>
          <Link
            href="/event"
            className="flex items-center justify-center text-sans-35 font-600 border-b border-black border-solid hover:italic py-5"
            onClick={handleLinkClick}
          >
            EVENTS
          </Link>

          {/* Social Links - Grouped in two rows: 3 links on top, 2 links on bottom */}
          <div className="py-6 border-b border-black border-solid">
            <div className="flex flex-col items-center gap-4">
              {/* First row - 3 links */}
              <div className="flex justify-center items-center space-x-4">
                <Link
                  href="https://www.instagram.com/kkrecords.se"
                  className="text-sm font-medium hover:italic px-2 py-1 whitespace-nowrap"
                  onClick={handleLinkClick}
                >
                  INSTAGRAM
                </Link>
                <Link
                  href="https://www.facebook.com/kkmusicrecords"
                  className="text-sm font-medium hover:italic px-2 py-1 whitespace-nowrap"
                  onClick={handleLinkClick}
                >
                  FACEBOOK
                </Link>
                <Link
                  href="https://www.tiktok.com/@kkrecordssweden"
                  className="text-sm font-medium hover:italic px-2 py-1 whitespace-nowrap"
                  onClick={handleLinkClick}
                >
                  TIKTOK
                </Link>
              </div>

              {/* Second row - 2 links */}
              <div className="flex justify-center items-center space-x-4">
                <Link
                  href="https://open.spotify.com/user/rp0di7du2vijxmhev2mp6vugo"
                  className="text-sm font-medium hover:italic px-2 py-1 whitespace-nowrap"
                  onClick={handleLinkClick}
                >
                  SPOTIFY
                </Link>
                <Link
                  href="https://www.youtube.com/@kkrec"
                  className="text-sm font-medium hover:italic px-2 py-1 whitespace-nowrap"
                  onClick={handleLinkClick}
                >
                  YOUTUBE
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Keep the original grid layout */}
        <div className="hidden lg:grid grid-cols-2 h-[calc(100vh-70px)] border-b border-black border-solid">
          {/* Top row */}
          <Link
            href="/"
            className="flex items-center justify-center text-sans-60 font-600 border-r border-b border-black border-solid hover:italic"
            onClick={handleLinkClick}
          >
            START
          </Link>
          <Link
            href="/om-oss"
            className="flex items-center justify-center text-sans-60 font-600 border-b border-black border-solid hover:italic"
            onClick={handleLinkClick}
          >
            OM OSS
          </Link>

          {/* Middle row */}
          <Link
            href="/artists"
            className="flex items-center justify-center text-sans-60 font-600 border-r border-b border-black border-solid hover:italic"
            onClick={handleLinkClick}
          >
            ARTISTER
          </Link>
          <Link
            href="/edits"
            className="flex items-center justify-center text-sans-60 font-600 border-b border-black border-solid hover:italic"
            onClick={handleLinkClick}
          >
            EDITS
          </Link>

          {/* Bottom row with lucky button */}
          <div className="relative flex items-center justify-center text-sans-60 font-600 border-r border-black border-solid hover:italic">
            <Link href="/event" className="w-full h-full flex items-center justify-center" onClick={handleLinkClick}>
              EVENTS
            </Link>
          </div>

          {/* Footer area */}
          <div className="flex items-center justify-center border-gray-800 right-0">
            <div className="w-full h-full flex flex-col items-center justify-center p-8">
              {/* Social Links */}
              <ul className="flex flex-row items-center space-x-6 list-none">
                <li>
                  <Link
                    className="block w-full text-sans-14 uppercase tracking-wider p-2 text-center"
                    title="Instagram"
                    aria-label="Instagram"
                    href="https://www.instagram.com/kkrecords.se"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full text-sans-14 uppercase tracking-wider p-2 text-center"
                    title="Facebook"
                    aria-label="Facebook"
                    href="https://www.facebook.com/kkmusicrecords"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full text-sans-14 uppercase tracking-wider p-2 text-center"
                    title="TikTok"
                    aria-label="TikTok"
                    href="https://www.tiktok.com/@kkrecordssweden"
                  >
                    TikTok
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full text-sans-14 uppercase tracking-wider p-2 text-center"
                    title="Spotify"
                    aria-label="Spotify"
                    href="https://open.spotify.com/user/rp0di7du2vijxmhev2mp6vugo"
                  >
                    Spotify
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full text-sans-14 uppercase tracking-wider p-2 text-center"
                    title="Youtube"
                    aria-label="Youtube"
                    href="https://www.youtube.com/@kkrec"
                  >
                    Youtube
                  </Link>
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
