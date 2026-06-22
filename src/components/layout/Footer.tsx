import Link from "next/link";

const quickLinks = [
  { label: "Projects", href: "/#villa-design" },
  { label: "Amenities", href: "/#amenities" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Blog", href: "/blog" },
  { label: "Location", href: "/#location" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {/* Brand */}
          <div>
            <h3 className="font-serif text-3xl text-white">
              Fortune Hestia
            </h3>
            <p className="mt-4 text-white/60 leading-relaxed">
              Luxury Villas on Sarjapur Road
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white/80 uppercase tracking-[0.2em] text-sm mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white/80 uppercase tracking-[0.2em] text-sm mb-6">
              Social Links
            </h4>
            <div className="flex gap-4">
              {["Instagram", "Facebook", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-white/50 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom line */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Fortune Hestia. All rights reserved.
          </p>
          <p className="text-white/30 text-sm hover:text-white/60 transition">
            Crafted with precision and intention
          </p>
        </div>

      </div>
    </footer>
  );
}
