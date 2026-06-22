import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Amenities from "@/components/sections/Amenities";
import Residences from "@/components/sections/Residences";
import Gallery from "@/components/sections/Gallery";
import CTA from "@/components/sections/CTA";
import Experience from "@/components/sections/Experience";
import GreekArchitecture from "@/components/sections/GreekArchitecture";
import Villas from "@/components/sections/Villas";
import LifeInsideCosmos from "@/components/sections/LifeInsideCosmos";
import LocationAdvantage from "@/components/sections/LocationAdvantage";
import TrustLegacy from "@/components/sections/TrustLegacy";
import PrivateTourCTA from "@/components/sections/PrivateTourCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <Hero />
        <About />
        <Experience />
        <GreekArchitecture />
        <Villas />
        <LifeInsideCosmos />
        <Amenities />
        <LocationAdvantage />
        <PrivateTourCTA />
      </PageTransition>
      <Footer />
    </>
  );
}
