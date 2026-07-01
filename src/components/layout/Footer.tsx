import Link from "next/link";
import Image from "next/image";

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
    <footer className="bg-[#212121]  py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {/* Brand */}
          <div>
            <h3 className="font-serif text-3xl text-white">
              <Image
                                src="/logooo.png"
                                alt="Fortune Group"
                                width={160}
                                height={48}
                                priority
                                className="object-contain object-left"
                              />
            </h3>
            <p className="mt-4 text-white/60">
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
                    className="text-white/50 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons (INLINE SVG = NO ERRORS EVER) */}
          <div>
            <h4 className="text-white/80 uppercase tracking-[0.2em] text-sm mb-6">
              Social Links
            </h4>

            <div className="flex gap-5 items-center">

              {/* Instagram */}
              <a className="text-white/50 hover:text-white transition hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 11.37a4 4 0 1 1-7.9 1.26A4 4 0 0 1 16 11.37z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              {/* Globe */}
              <a className="text-white/50 hover:text-white transition hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 12h20"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a className="text-white/50 hover:text-white transition hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="2"
                    y="9"
                    width="4"
                    height="12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="4" cy="4" r="2" fill="currentColor" />
                </svg>
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-white/10 pt-8 flex justify-between">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Fortune Hestia
          </p>

          <p className="text-white/30 text-sm">
            Crafted with precision and intention
          </p>
        </div>

      </div>
    </footer>
  );
}