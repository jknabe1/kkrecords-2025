'use client'

import { useState } from "react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log("Subscribing email:", email)
    setEmail("")
  }
  return (
    <div>
        <div className="px-2 py-3 lg:px-5 border-t border-solid border-black">
                    <div>
                        <div className="w-full flex flex-col md:flex-row justify-between gap-2">
                        <h3 className="text-sans-35 lg:text-sans-60 font-600 tracking-tighter ">Prenumerera på nyhetsbrevet </h3>
                        <div className="max-w-[360px] w-full">
                            <div>
                            <div className="">
                                <form>
                                <div>
                                    <div className="relative">
                                    <input type="text" name="email" className="block w-full input-newsletter" aria-invalid="false" id="footer-email"/>
                                    <div className="absolute top-0 right-0 bottom-0">
                                        <button aria-label="Submit" type="submit" className="link-arrow-submit border border-solid w-8 lg:w-10 h-[60px] lg:h-[70px] bg-[--green]">
                                        <img alt="" src="https://www.dsanddurga.com/images/icon-arrow-carousel.svg" className="block mx-auto"/>
                                        </button>
                                    </div>
                                    </div>
                                    <label className="block"><span className="block mt-1 text-sans-12 uppercase tracking-wider font-600">Email</span></label>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

