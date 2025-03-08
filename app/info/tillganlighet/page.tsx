import React from 'react'

const page = () => {
  return (
    <div>
        <div className="grid grid-cols-12 gap-px">
            <div className="col-span-12 relative h-full grid-col-border">
                <div className="grid grid-cols-12 gap-px items-start">
                    <div className="col-span-12 lg:col-span-6 grid-col-border">
                        <ul className="flex flex-col gap-px">
                            <li className="grid-col-border p-2 lg:p-4">
                                <h2 className="text-sans-30 lg:text-sans-60 xl:text-sans-120 tracking-tighter mb-1 lg:mb-3">Tillgänlighet för alla</h2>
                                <div className="rich-text text-sans-22 lg:text-sans-30 rich-text-light line-break">
                                    <p>
                                        D.S. & Durga is committed to digital accessibility, and to conforming to the Web Content Accessibility Guidelines (WCAG) 2.1, Level A and AA and complying with Americans with Disabilities Act (ADA) effective communication requirements, and other applicable regulations.
                                        <br/>
                                        <br/>
                                        To accomplish this, we have partnered with Level Access to administer our accessibility program and oversee its governance. Their accessibility program evaluates our digital products on an ongoing basis in accordance with best practices and is supported by a diverse team of accessibility professionals, including users of assistive technologies. The platform, moreover, goes beyond minimum compliance requirements by making an assistive CX technology application available to customers who have trouble typing, gesturing, moving a mouse, or reading. The application is free to download and it incorporates tools such as mouse and keyboard replacements, voice recognition, speech enablement, hands-free/touch-free navigation, and more. We want to hear from you if you encounter any accessibility barriers on our digital properties. Please contact our Customer Support at cs@dsanddurga.com.
                                        <br/>
                                        <br/>
                                        <b>3rd-party Controlled Content</b>
                                        <br/>
                                        <br/>
                                        We recognize that some sections of our website include 3rd-party content, tools, widgets or other functionalities. While we strive to ensure that the content we directly control is fully accessible, we acknowledge that there may be instances where 3rd-party content does not fully comply with our accessibility standards. Thus, we are actively engaged in efforts to address these challenges. Our approach includes:
                                        <br/>
                                        <br/>
                                        Regularly reviewing our site to identify any accessibility issues, including those related to 3rd-party content.
                                        Collaborating with our 3rd-party partners and vendors to encourage them to prioritize accessibility improvements and ensure their content meets ADA and WCAG 2.1 standards.
                                        Providing alternative ways to access the services or information offered by third-party tools when possible.
                                        We value your feedback and encourage you to report any accessibility issues you encounter. Your input is crucial in helping us improve and provide a more accessible experience for everyone.
                                        <br/>
                                        <br/>
                                        Please contact us at cs@dsanddurga.com for any accessibility concerns or suggestions.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden lg:block col-span-6 grid-col-border sticky top-7 min-h-hero-minus-header overflow-hidden">
                        <div className="image overflow-hidden absolute inset-0">
                                <img className="" src="https://cdn.sanity.io/images/1k2t1bm0/production/b34d044f641e16d3f97b0237d7fbda9b0a22b306-1439x1913.jpg?auto=format&q=75&url=https://cdn.sanity.io/images/1k2t1bm0/production/b34d044f641e16d3f97b0237d7fbda9b0a22b306-1439x1913.jpg&w=1000" alt="A coiled black power cord with a two-prong plug against a light background."/>
                        </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default page