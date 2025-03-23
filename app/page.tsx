import AboutSection from "@/components/Landing/About/AboutSection";
import ConcertSection from "@/components/Landing/ConcertSection";
import NewsSection from "@/components/Landing/NewsSection";
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
