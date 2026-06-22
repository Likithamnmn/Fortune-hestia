"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Villa Design", href: "/#villa-design" },
  { name: "Floor Plans", href: "/floor-plans" },
  { name: "Amenities", href: "/#amenities" },
  { name: "Location", href: "/#location" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    if (path === "/") return pathname === "/";
    return pathname === path;
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 z-50 w-full"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/10" : ""
          }`}
        >
          <div className="mx-auto max-w-[1600px] px-6 lg:px-16">
            <div className="flex h-20 md:h-24 items-center justify-between">

              {/* Logo */}
              <Link href="/" className="relative h-12 w-40 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Fortune Group"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative group text-xs uppercase tracking-[0.25em] text-white transition-all duration-300 hover:text-white/70"
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-amber-400/80 transition-all duration-300 ${
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                ))}
              </nav>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                className="xl:hidden text-white p-2 hover:text-white/70 transition-colors"
              >
                <Menu size={24} />
              </button>

            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
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
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between py-4 border-b border-white/[0.06] text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                        isActive(item.href)
                          ? "text-amber-400"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {item.name}
                      {isActive(item.href) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      )}
                    </Link>
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
