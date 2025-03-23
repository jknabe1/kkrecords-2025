import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Global/Header/Header";
import Footer from "@/components/Global/Footer/Footer";
import CookieNotice from "@/components/Global/CookieNotice/CookieNotice";
import { SplashScreen } from "@/components/Global/SplashScreen/SplashScreen";
import  CustomCursor  from "@/components/Global/Cursor/CustomCursor";
import LenisScrollProvider from "@/providers/lenis-providers";
import AlertBanner from "@/components/Global/VMA/Banner";




export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  
  return (
    <html lang="se_SV">
      <body className="antialiased">
        <SplashScreen />
        <CookieNotice />
        <AlertBanner />
        <Header/>  
        <LenisScrollProvider>
          {children}
          </LenisScrollProvider>
        <Footer />
        <CustomCursor />
      </body>
    </html>
  );
}
