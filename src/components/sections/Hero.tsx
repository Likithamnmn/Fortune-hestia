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
        <div className="flex flex-col justify-end h-full pb-16 px-6 lg:hidden">

          {/* Eyebrow — Mono */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`${jetbrainsMono.className} block text-[9px] uppercase tracking-[0.5em] text-white/80 mb-5`}
          >
            Fortune Hestia
          </motion.span>

          {/* Headline — Cormorant */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className={`${cormorant.className} font-light italic text-[3.5rem] leading-[0.88] tracking-[-0.03em] text-white`}
          >
            Live the<br />
            <span className="relative inline-block not-italic font-normal">
              <span className="text-amber-400">Greek</span> Life
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                className="absolute left-0 -bottom-3 h-px w-full origin-left bg-white/40"
              />
            </span>
          </motion.h1>

          {/* Body — Inter light */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={`${inter.className} font-light mt-6 max-w-sm text-sm text-white/60 leading-relaxed`}
          >
            A limited collection of luxury villas shaped by architectural calm,
            where form, nature, and modern living converge into a private township
            experience in Bangalore.
          </motion.p>

        </div>

        {/* ── DESKTOP (≥ lg) ── */}
        <div className="hidden lg:block">

          {/* Left — eyebrow + headline */}
          <div className="absolute left-20 top-[38%] text-white">

            {/* Eyebrow — Mono */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.5em] text-white/30`}>
                Fortune
              </span>
              <span className="h-px w-6 bg-amber-400/40" />
              <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.5em] text-amber-400/60`}>
                Hestia
              </span>
            </motion.div>

            {/* Headline — Cormorant */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className={`${cormorant.className} font-light italic text-[10rem] leading-[0.85] tracking-[-0.03em]`}
            >
              Live the<br />
              <span className="relative inline-block not-italic font-normal">
                <span className="text-amber-400">Greek</span> Life
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                  className="absolute left-0 -bottom-4 h-px w-full origin-left bg-white/30"
                />
              </span>
            </motion.h1>

          </div>

          {/* Right — body copy */}
          <motion.p
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={`${inter.className} font-light absolute right-20 top-[62%] max-w-sm text-right text-base text-white/50 leading-relaxed`}
          >
            A limited collection of luxury villas shaped by architectural calm,
            where form, nature, and modern living converge into a private township
            experience in Bangalore.
          </motion.p>

        </div>

      </div>
    </section>
  );
}