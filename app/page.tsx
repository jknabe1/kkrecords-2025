import AboutSection from "@/components/Landing/About/AboutSection";
import ArtistGrid from "@/components/Landing/ArtistGrid";
import ConcertSection from "@/components/Landing/ConcertSection";
import MerchSlider from "@/components/Landing/Merch/MerchSlider";
import NewsSection from "@/components/Landing/NewsSection";
import OpeningHeader from "@/components/Landing/OpeningHeader";
import TuneIn from "@/components/Landing/TuneIn/playlist-section";
import ArtistSection from "@/components/Landing/Artists/ArtistSection";

export default function Home() {
  return (
    <main>
    <ArtistSection/>  
    <AboutSection/>
    <ConcertSection/>
    <NewsSection/>
    <TuneIn/>
    </main>
  );
}
