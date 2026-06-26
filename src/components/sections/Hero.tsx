"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default function Hero() {
  const images = ["/hero-1.jpg", "/hero-2.jpg"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToPrivateCTA = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            animate={{
              opacity: currentImage === index ? 1 : 0,
              scale:   currentImage === index ? 1.12 : 1,
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Image src={image} alt="" fill priority className="object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:hidden" />

      {/* Content */}
      <div className="absolute inset-0 z-10">

        {/* ── MOBILE / TABLET (< lg) ── */}
        <div className="flex flex-col justify-end h-full pb-14 px-6 lg:hidden">

          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`${jetbrainsMono.className} block text-[9px] uppercase tracking-[0.5em] text-white/80 mb-4`}
          >
            Fortune Hestia
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className={`${cormorant.className} font-normal text-[2.4rem] leading-[1] tracking-[-0.02em] text-white`}
          >
            <span className="relative inline-block">
              Luxury Villas in<br />Sarjapur Road<br />Bangalore
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                className="absolute left-0 -bottom-3 h-px w-full origin-left bg-white/40"
              />
            </span>
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={`${inter.className} font-light mt-5 max-w-sm text-sm text-white/60 leading-relaxed`}
          >
            Discover an elite lifestyle at Fortune Hestia. Experience modern design and world-class amenities. Enjoy the privacy of a limited-edition township. All this, located right in Bengaluru's prime tech hub.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            type="button"
            onClick={scrollToPrivateCTA}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className={`${jetbrainsMono.className} mt-8 w-full py-4 border border-white/30 text-white text-[9px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500`}
          >
            Book a Private Tour
          </motion.button>

        </div>

        {/* ── DESKTOP (≥ lg) ── */}
        <div className="hidden lg:block">

          {/* Left — eyebrow + headline */}
          <div className="absolute left-20 top-[30%] text-white max-w-[55vw]">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.5em] text-white/30`}>
                Fortune
              </span>
              <span className="h-px w-6 bg-amber-400/40" />
              <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.5em] text-amber-400/60`}>
                Hestia
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className={`${cormorant.className} font-normal text-[6.5rem] leading-[0.9] tracking-[-0.03em]`}
            >
              <span className="relative inline-block">
                Luxury Villas in<br />Sarjapur Road Bangalore
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                  className="absolute left-0 -bottom-4 h-px w-full origin-left bg-white/30"
                />
              </span>
            </motion.h1>

            {/* CTA Button */}
            <motion.button
              type="button"
              onClick={scrollToPrivateCTA}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className={`${jetbrainsMono.className} mt-12 py-4 px-10 border border-white/30 text-white text-[9px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500`}
            >
              Book a Private Tour
            </motion.button>

          </div>

          {/* Right — body copy */}
          <motion.p
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={`${inter.className} font-light absolute right-20 bottom-[12%] max-w-xs text-right text-sm text-white/50 leading-relaxed`}
          >
            Discover an elite lifestyle at Fortune Hestia. Experience modern design and world-class amenities. Enjoy the privacy of a limited-edition township. All this, located right in Bengaluru's prime tech hub.
          </motion.p>

        </div>

      </div>
    </section>
  );
}