"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", scrollTo: null },
  { name: "Villa Design", href: "/#villa-design", scrollTo: "villa-design" },
  { name: "Floor Plans", href: "/floor-plans", scrollTo: null },
  { name: "Amenities", href: "/#amenities", scrollTo: "amenities" },
  { name: "Location", href: "/#location", scrollTo: "location" },
  { name: "Blog", href: "/blog", scrollTo: null },
  { name: "Contact", href: "/#contact", scrollTo: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, item: typeof navItems[0]) => {
      e.preventDefault();
      setIsOpen(false);

      // Pure page links — no hash
      if (!item.scrollTo) {
        router.push(item.href);
        return;
      }

      // If already on home page, just smooth-scroll
      if (pathname === "/") {
        scrollToSection(item.scrollTo);
      } else {
        // Navigate to home, then scroll after a brief delay
        router.push("/");
        setTimeout(() => scrollToSection(item.scrollTo!), 600);
      }
    },
    [pathname, router, scrollToSection]
  );

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    if (path === "/") return pathname === "/";
    return pathname === path;
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 z-[999] w-full"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`transition-all duration-700 ${
            scrolled
              ? "bg-black/70 backdrop-blur-[10px] border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
              : "bg-gradient-to-b from-black/60 to-transparent"
          }`}
        >
          <div className="mx-auto max-w-[1600px] px-6 lg:px-16">
            <div className="flex h-16 md:h-20 lg:h-24 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="relative h-10 w-32 md:h-12 md:w-40 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Fortune Group"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className="relative group text-xs uppercase tracking-[0.25em] text-white transition-all duration-300 hover:text-white/70 cursor-pointer"
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-amber-400/80 transition-all duration-300 ${
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                className="lg:hidden text-white p-2 hover:text-white/70 transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile / Tablet Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-[#090909] border-l border-white/10 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between px-8 py-7 border-b border-white/10">
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col justify-center flex-1 px-10 gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`group flex items-center justify-between py-4 border-b border-white/[0.06] text-sm uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                        isActive(item.href) ? "text-amber-400" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {item.name}
                      {isActive(item.href) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      )}
                    </a>
                  </motion.div>
                ))}
              </nav>

              <div className="px-10 pb-10">
                <p className="text-white/20 text-xs tracking-widest uppercase">Fortune Hestia</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
