"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Header = () => {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

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
        className={`fixed top-[60px] lg:top-[70px] left-0 right-0 bottom-0 bg-white dark:bg-neutral-900 text-black dark:text-white z-40 transform transition-all duration-300 ease-in-out overflow-hidden ${
          isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        ref={navRef}
      >
        {/* Mobile: Stacked Layout */}
        <div className="lg:hidden flex flex-col h-full overflow-y-auto">
          {/* Main Navigation Links */}
          <Link
            href="/"
            className="flex items-center justify-center text-sans-35 font-600 border-b border-black dark:border-neutral-700 border-solid hover:italic py-5"
            onClick={handleLinkClick}
          >
            START
          </Link>
          <Link
            href="/om-oss"
            className="flex items-center justify-center text-sans-35 font-600 border-b border-black dark:border-neutral-700 border-solid hover:italic py-5"
            onClick={handleLinkClick}
          >
            OM OSS
          </Link>
          <Link
            href="/artists"
            className="flex items-center justify-center text-sans-35 font-600 border-b border-black dark:border-neutral-700 border-solid hover:italic py-5"
            onClick={handleLinkClick}
          >
            ARTISTER
          </Link>
          <Link
            href="/edits"
            className="flex items-center justify-center text-sans-35 font-600 border-b border-black dark:border-neutral-700 border-solid hover:italic py-5"
            onClick={handleLinkClick}
          >
            EDITS
          </Link>
          <Link
            href="/event"
            className="flex items-center justify-center text-sans-35 font-600 border-b border-black dark:border-neutral-700 border-solid hover:italic py-5"
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
        <div className="hidden lg:grid grid-cols-2 h-[calc(100vh-70px)] border-b border-black dark:border-neutral-700 border-solid">
          {/* Top row */}
          <Link
            href="/"
            className="flex items-center justify-center text-sans-60 font-600 border-r border-b border-black dark:border-neutral-700 border-solid hover:italic"
            onClick={handleLinkClick}
          >
            START
          </Link>
          <Link
            href="/om-oss"
            className="flex items-center justify-center text-sans-60 font-600 border-b border-black dark:border-neutral-700 border-solid hover:italic"
            onClick={handleLinkClick}
          >
            OM OSS
          </Link>

          {/* Middle row */}
          <Link
            href="/artists"
            className="flex items-center justify-center text-sans-60 font-600 border-r border-b border-black dark:border-neutral-700 border-solid hover:italic"
            onClick={handleLinkClick}
          >
            ARTISTER
          </Link>
          <Link
            href="/edits"
            className="flex items-center justify-center text-sans-60 font-600 border-b border-black dark:border-neutral-700 border-solid hover:italic"
            onClick={handleLinkClick}
          >
            EDITS
          </Link>

          {/* Bottom row with lucky button */}
          <div className="relative flex items-center justify-center text-sans-60 font-600 border-r border-black dark:border-neutral-700 border-solid hover:italic">
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
