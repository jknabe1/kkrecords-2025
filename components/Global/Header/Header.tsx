"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

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

  const [email, setEmail] = useState("")
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribing email:", email)
    setEmail("")
  }

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
                  <button className="block icon-fill-hover open-menu" aria-label="Open Menu" onClick={toggleNav}>
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
                  </button>
                </li>
                <li className="px-1 block text-sans-18 uppercase tracking-wider">
                  <p>ARTISTER</p>
                </li>
                <li className="px-1 block text-sans-18 uppercase tracking-wider">
                  <p>EVENT</p>
                </li>
                <li className="px-1 block text-sans-18 uppercase tracking-wider">
                  <p>EDITS</p>
                </li>
              </ul>
            </div>
            <div className="col-span-4 lg:col-span-4 lg:flex justify-center">
              <a aria-label="K&K Records" className="block xl:ml-3" href="/">
                <picture>
                  <img
                    src="https://kkrecords.se/media/kkrecords-embed.svg"
                    alt="K&K Records Logo"
                    className="block w-full h-full"
                  />
                </picture>
              </a>
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
                  <a className="block px-[7px] lg:pr-0" href="/cart">
                    <div className="h-[70px] flex flex-col justify-center hidden lg:flex">
                      <div className="relative">
                        <div>
                          <div className="text-center relative bottom-[2px] relative">
                            <svg width="28" height="37" viewBox="0 0 28 37" fill="none" className="icon-fill">
                              ¨
                              <rect
                                x="1.59546"
                                y="9.24597"
                                width="24.5406"
                                height="26.4828"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="icon-fill-fill"
                              ></rect>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20.7531 8.32496C19.804 5.07808 16.9974 2.8396 13.8656 2.8396C10.7337 2.8396 7.92714 5.07808 6.97803 8.32496H4.91376C5.91969 4.0242 9.54609 0.8396 13.8656 0.8396C18.1851 0.8396 21.8115 4.0242 22.8174 8.32496H20.7531Z"
                                fill="currentColor"
                              ></path>
                            </svg>
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
                  </a>
                </li>
                <li className="lg:hidden">
                  <button className="block pl-[7px]" aria-label="Open Menu">
                    <svg width="23" height="23" viewBox="0 0 23 23">
                      <rect width="23" height="1" fill=""></rect>
                      <rect y="11" width="23" height="1" fill=""></rect>
                      <rect y="22" width="23" height="1" fill=""></rect>
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="pt-[60px] lg:pt-[70px] ">{/* Main content goes here */}</div>

      {/* Search Bar UI with slide-down animation */}
      <div
        className={`fixed top-[60px] lg:top-[70px] left-0 right-0 bottom-0 z-50 backdrop-blur-sm transform transition-all duration-300 ease-in-out ${
          isSearchVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        ref={searchRef}
      >
        <div className="relative w-full bg-white border-b border-gray-200 transform transition-transform duration-300 ease-out">
          <div className="flex items-center h-[160px] px-6 md:px-10 border-y border-black border-solid px-2 py-3 lg:px-5">
            <button
              className="mr-4 text-black hover:text-gray-900 transition-colors"
              aria-label="Close search"
              onClick={toggleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>            
            </button>

            <input
              type="text"
              placeholder="WHAT ARE YOU LOOKING FOR?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-2xl md:text-3xl lg:text-4xl font-light text-black placeholder-gray-300 bg-transparent border-none outline-none uppercase"
              autoFocus={isSearchVisible}
            />

            <button className="ml-4 text-black hover:text-gray-900 transition-colors" aria-label="Submit search">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>            
            </button>
          </div>
        </div>

        <div className="w-full h-[calc(100vh-230px)] backdrop-blur-md">
          {/* Content area with blur effect */}
        </div>
      </div>

      {isNavVisible && (
        <div className="fixed inset-0 bg-black text-white z-50" ref={navRef}>
          <div className="grid grid-cols-2 h-screen">
            {/* Top row */}
            <Link
              href="/"
              className="flex items-center justify-center text-7xl font-light border-r border-b border-gray-800 hover:bg-gray-900 transition-colors"
              onClick={handleLinkClick}
            >
              HOME
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-center text-7xl font-light border-b border-gray-800 hover:bg-gray-900 transition-colors"
              onClick={handleLinkClick}
            >
              ABOUT
            </Link>

            {/* Middle row */}
            <Link
              href="/artists"
              className="flex items-center justify-center text-7xl font-light border-r border-b border-gray-800 hover:bg-gray-900 transition-colors"
              onClick={handleLinkClick}
            >
              ARTISTS
            </Link>
            <Link
              href="/news"
              className="flex items-center justify-center text-7xl font-light border-b border-gray-800 hover:bg-gray-900 transition-colors"
              onClick={handleLinkClick}
            >
              NEWS
            </Link>

            {/* Bottom row with lucky button */}
            <div className="relative flex items-center justify-center text-7xl font-light border-r border-gray-800 hover:bg-gray-900 transition-colors">
              <Link href="/shop" className="w-full h-full flex items-center justify-center" onClick={handleLinkClick}>
                SHOP
              </Link>

              {/* Lucky Button */}
              <div
                className="absolute z-10 top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                <button
                  className="bg-lime-300 text-black px-6 py-2 rounded-full rotate-6 text-lg font-medium transition-transform"
                  style={{
                    transform: isButtonHovered ? "rotate(10deg) scale(1.05)" : "rotate(6deg)",
                  }}
                >
                  I&apos;M FEELING LUCKY
                </button>
              </div>
            </div>

            {/* Footer area */}
            <div className="flex items-center justify-center border-gray-800">
              <div className="w-full h-full flex flex-col md:flex-row items-center justify-between p-8">
                {/* Subscribe Form */}
                <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full md:w-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="bg-transparent border-b border-gray-500 focus:border-white outline-none px-2 py-1 w-full md:w-64"
                    required
                  />
                  <button
                    type="submit"
                    className="border border-white px-4 py-1 text-sm hover:bg-white hover:text-black transition-colors"
                  >
                    SUBSCRIBE
                  </button>
                </form>

                {/* Social Links */}
                <div className="flex items-center space-x-6 mt-6 md:mt-0">
                  <Link href="#" className="hover:text-gray-300 transition-colors">
                    YOUTUBE
                  </Link>
                  <Link href="#" className="hover:text-gray-300 transition-colors">
                    TWITTER
                  </Link>
                  <Link href="#" className="hover:text-gray-300 transition-colors">
                    INSTAGRAM
                  </Link>
                  <Link href="#" className="hover:text-gray-300 transition-colors">
                    FACEBOOK
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header

