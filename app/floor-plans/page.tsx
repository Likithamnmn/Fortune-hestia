import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloorPlansContent from "@/components/sections/FloorPlansContent";

export const metadata = {
  title: "Floor Plans | Fortune Hestia",
  description: "Explore our exclusive floor plans — luxury villa layouts crafted for refined living.",
};

export default function FloorPlansPage() {
  return (
    <>
      <Navbar />
      <FloorPlansContent />
      <Footer />
    </>
  );
}
