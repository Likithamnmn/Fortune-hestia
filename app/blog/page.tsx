import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogContent from "@/components/sections/BlogContent";

export const metadata = {
  title: "Journal | Fortune Hestia",
  description: "Insights on luxury living, architecture, and the Fortune Cosmos lifestyle.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <BlogContent />
      <Footer />
    </>
  );
}
