import { Metadata } from "next"

export const metadata: Metadata = {
  title: "404",
  description: "404 – Sidan du letar efter finns inte. Gå tillbaka till startsidan eller kontakta oss.",
  robots: {
    index: false, // Prevents indexing
    follow: false,
  },
};


export default function NotFound() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-px">
            <div className="col-span-12 relative h-full grid-col-border">
                <div className="grid grid-cols-12 gap-px items-start">
                    <div className="col-span-12 lg:col-span-6 grid-col-border">
                        <ul className="flex flex-col gap-px">
                            <li className="grid-col-border px-2 py-3 lg:px-5">
                                <h2 className="text-sans-35 lg:text-sans-60 font-600">404</h2>
                                <div className="rich-text text-sans-22 lg:text-sans-30 rich-text-light line-break">
                                    <p>Antingen är sidan bortagen, eller så fanns det inget här från början.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden lg:block col-span-6 grid-col-border sticky top-7 min-h-hero-minus-header overflow-hidden">
                        <div className="image overflow-hidden absolute inset-0">
                                <img className="" loading="lazy" src="https://images.unsplash.com/photo-1603520762497-4f020fe0f1b1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A coiled black power cord with a two-prong plug against a light background."/>
                        </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}