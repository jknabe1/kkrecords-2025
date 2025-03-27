import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="grid grid-cols-12 gap-px">
            <div className="col-span-12 relative h-full grid-col-border">
                <div className="grid grid-cols-12 gap-px items-start">
                    <div className="col-span-12 lg:col-span-6 grid-col-border">
                        <ul className="flex flex-col gap-px">
                            <li className="grid-col-border px-2 py-3 lg:px-5">
                              {/* Heading */}
                              <h1 className="text-sans-35 lg:text-sans-60 font-600">
                              Tillgänglighet – K&K Records
                              </h1>

                              {/* Introduction */}
                              <p className="mt-4 text-lg leading-relaxed">
                              Du som besökare ska kunna uppfatta, hantera och ta del av information och tjänster på K&K Records webbplatser. 
                              För att webbplatserna ska fungera på bästa sätt förbättrar vi tillgängligheten genom att följa riktlinjerna i WCAG 2.1 på nivå AA.
                              </p>

                              {/* Sections */}
                              <div className="mt-6 space-y-6">
                                {/* What is a personal data? */}
                                <div className="border-b pb-4">
                                  <h2 className="text-xl font-semibold">I korthet</h2>
                                  <p className="text-lg leading-relaxed mt-2">
                                  Här hittar du information om tillgänglighetsbrister som finns på Örebro kommuns webbplatser och vad som görs för att lösa dessa. 
                                  Du kan även rapportera brister eller beställa innehåll som inte är tillgängligt på webbplatsen.
                                  </p>
                                </div>

                                {/* Data processing */}
                                <div className="border-b pb-4">
                                  <h2 className="text-xl font-semibold">
                                    Rapportera brister
                                  </h2>
                                  <p className="text-lg leading-relaxed mt-2">
                                    Om du vill rapportera brister eller behöver innehåll som inte är tillgängligt på webbplatsen är du välkommen att kontakta oss via e-post: {" "}
                                <a href="mailto:halloj@kkrecords.se" className="text-blue-600 underline">
                                  halloj@kkrecords.se
                                </a>
                                  </p>
                                </div>

                                {/* Security */}
                                <div className="border-b pb-4">
                                  <h2 className="text-xl font-semibold">
                                    Så här testar vi vår webbplats.
                                  </h2>
                                  <ul className="mt-2 space-y-2 text-lg list-disc list-inside">
                                    <li>Regelbundet granska vår webbplats för att identifiera eventuella tillgänglighetsproblem, inklusive de som rör tredjepartsinnehåll.                                    </li>
                                    <li>Samarbeta med våra tredjepartspartners och leverantörer för att uppmuntra dem att prioritera tillgänglighetsförbättringar och säkerställa att deras innehåll standarder.</li>
                                    <li>Tillhandahålla alternativa sätt att få tillgång till tjänster eller information som erbjuds av tredjepartsverktyg när det är möjligt.</li>
                                  </ul>
                                </div>

                                {/* Contact Information */}
                                <div className="mt-6">
                                  <p className="mt-4 text-sm text-gray-500">Senast uppdaterad: 2025-03-12</p>
                                </div>
                              </div>
                            </li>
                        </ul>
                      </div>
                      <div className="hidden lg:block col-span-6 grid-col-border sticky h-full overflow-hidden">
                        <div className="image overflow-hidden absolute inset-0">
                                <img className="" src="https://cdn.sanity.io/images/1k2t1bm0/production/b34d044f641e16d3f97b0237d7fbda9b0a22b306-1439x1913.jpg?auto=format&q=75&url=https://cdn.sanity.io/images/1k2t1bm0/production/b34d044f641e16d3f97b0237d7fbda9b0a22b306-1439x1913.jpg&w=1000" alt="A coiled black power cord with a two-prong plug against a light background."/>
                        </div>
                    </div>
                  </div>
                </div> 
    </div>
  );
}
