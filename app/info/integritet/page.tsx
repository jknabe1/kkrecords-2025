import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="grid grid-cols-12 gap-px">
            <div className="col-span-12 relative h-full grid-col-border">
                <div className="grid grid-cols-12 gap-px items-start">
                    <div className="col-span-12 lg:col-span-6 grid-col-border">
                        <ul className="flex flex-col gap-px">
                            <li className="grid-col-border p-2 lg:p-4">
                              {/* Heading */}
                              <h1 className="text-sans-35 lg:text-sans-60 font-600">
                                Integritetspolicy – K&K Records
                              </h1>

                              {/* Introduction */}
                              <p className="mt-4 text-lg leading-relaxed">
                                Vi på <strong>K&K Records</strong> tycker det är viktigt med personlig
                                integritet och skyddar all din data samt behandlar den med stor respekt.
                                I denna policy förklarar vi hur vi samlar in och använder
                                personuppgifter och annan information. Om du har frågor är du välkommen
                                att kontakta oss via e-post:{" "}
                                <a href="mailto:halloj@kkrecords.se" className="text-blue-600 underline">
                                  halloj@kkrecords.se
                                </a>
                                .
                              </p>

                              {/* Sections */}
                              <div className="mt-6 space-y-6">
                                {/* What is a personal data? */}
                                <div className="border-b pb-4">
                                  <h2 className="text-xl font-semibold">Vad är en personuppgift?</h2>
                                  <p className="text-lg leading-relaxed mt-2">
                                    All slags information som direkt eller indirekt kan hänföras till en
                                    fysisk person som är i livet räknas som personuppgifter. Det kan
                                    inkludera namn, e-postadress, telefonnummer samt krypterade
                                    uppgifter som IP-nummer.
                                  </p>
                                </div>

                                {/* Data processing */}
                                <div className="border-b pb-4">
                                  <h2 className="text-xl font-semibold">
                                    Vad är en behandling av en personuppgift?
                                  </h2>
                                  <p className="text-lg leading-relaxed mt-2">
                                    Behandling av personuppgifter inkluderar insamling, lagring,
                                    bearbetning, överföring och radering.
                                  </p>
                                </div>

                                {/* Data controller */}
                                <div className="border-b pb-4">
                                  <h2 className="text-xl font-semibold">
                                    Vem är ansvarig för de personuppgifter vi samlar in?
                                  </h2>
                                  <p className="text-lg leading-relaxed mt-2">
                                    <strong>K&K Records</strong>, Org.nr: <em>802541-7935</em>, är
                                    personuppgiftsansvarig för behandlingen av personuppgifterna.
                                  </p>
                                </div>

                                {/* Data Collection */}
                                <div className="border-b pb-4">
                                  <h2 className="text-xl font-semibold">Vilka personuppgifter samlar vi in?</h2>
                                  <p className="text-lg leading-relaxed mt-2">
                                    Vi samlar in namn, adress, telefonnummer och e-postadress vid köp av
                                    musik, merchandise eller evenemangsbiljetter.
                                  </p>
                                </div>

                                {/* Data usage */}
                                <div className="border-b pb-4">
                                  <h2 className="text-xl font-semibold">
                                    Hur använder vi dina personuppgifter?
                                  </h2>
                                  <ul className="mt-2 space-y-2 text-lg">
                                    <li>För att hantera försäljning inom ramen av vår verksamhet</li>
                                    <li>För att erbjuda kundservice</li>
                                    <li>För marknadsföring av vår verksamhet</li>
                                    <li>För att förbättra vår hemsida och användarupplevelse</li>
                                  </ul>
                                </div>

                                {/* Data access */}
                                <div className="border-b pb-4">
                                  <h2 className="text-xl font-semibold">
                                    Hur får vi tillgång till dina personuppgifter?
                                  </h2>
                                  <ul className="mt-2 space-y-2 text-lg">
                                    <li>När du själv lämnar dem (t.ex. vid köp eller registrering).</li>
                                    <li>När de registreras automatiskt (cookies, analysverktyg).</li>
                                    <li>Via samarbetspartners (betalning, biljettförsäljning).</li>
                                  </ul>
                                </div>

                                {/* Data sharing */}
                                <div className="border-b pb-4">
                                  <h2 className="text-xl font-semibold">
                                    Informationsdelning med tredje part
                                  </h2>
                                  <p className="text-lg leading-relaxed mt-2">
                                    Vi delar endast dina personuppgifter med noggrant utvalda
                                    samarbetspartners och tjänsteleverantörer:
                                  </p>
                                  <ul className="mt-2 space-y-2 text-lg">
                                    <li>Betalningsleverantörer (för att hantera transaktioner).</li>
                                    <li>Biljettleverantörer (för att administrera evenemangsbesök).</li>
                                    <li>IT-tjänster (för lagring och säker drift).</li>
                                    <li>Marknadsföringsplattformar (för utskick av nyhetsbrev).</li>
                                  </ul>
                                  <p className="mt-2 text-lg font-semibold">
                                    Vi säljer aldrig dina
                                    personuppgifter till tredje part.
                                  </p>
                                </div>

                                {/* GDPR rights */}
                                <div className="border-b pb-4">
                                  <h2 className="text-xl font-semibold">Dina rättigheter enligt GDPR</h2>
                                  <ul className="mt-2 space-y-2 text-lg">
                                    <li>Rätt till tillgång – Begär en kopia av dina uppgifter.</li>
                                    <li>Rätt till rättelse – Be oss korrigera felaktiga uppgifter.</li>
                                    <li>Rätt till radering – Rätt att begära att uppgifter tas bort.</li>
                                  </ul>
                                </div>

                                {/* Security */}
                                <div className="border-b pb-4">
                                  <h2 className="text-xl font-semibold">
                                    Säkerhet och skydd av dina personuppgifter
                                  </h2>
                                  <ul className="mt-2 space-y-2 text-lg">
                                    <li>Kryptering och säker lagring av data.</li>
                                    <li>Begränsad åtkomst till personuppgifter.</li>
                                    <li>Regelbundna säkerhetskontroller och uppdateringar.</li>
                                  </ul>
                                </div>

                                {/* Contact Information */}
                                <div className="mt-6">
                                  <h2 className="text-xl font-semibold">Kontaktuppgifter</h2>
                                  <p className="text-lg leading-relaxed mt-2">
                                    E-post:{" "}
                                    <Link href="mailto:halloj@kkrecords.se" className="text-blue-600 underline">
                                      halloj@kkrecords.se
                                    </Link>
                                    <br />
                                        Adress: <em>Järnvägsgatan 8, Örebro</em>
                                    <br />
                                        Hemsida:{" "}
                                    <Link href="https://www.kkrecords.se" className="text-blue-600 underline">
                                      www.kkrecords.se
                                    </Link>
                                  </p>
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
