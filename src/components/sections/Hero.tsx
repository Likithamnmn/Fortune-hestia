"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            animate={{
              opacity: currentImage === index ? 1 : 0,
              scale: currentImage === index ? 1.12 : 1,
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Image
              src={image}
              alt=""
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
      {/* Extra bottom gradient on mobile so text is always readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:hidden" />

      {/* COMPOSITION FIELD */}
      <div className="absolute inset-0 z-10">

        {/* ── MOBILE / TABLET layout (< lg) ── */}
        <div className="flex flex-col justify-end h-full pb-16 px-6 lg:hidden">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="block text-xs uppercase tracking-[0.5em] text-white/70 mb-4"
          >
            Fortune Hestia
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-serif text-[3.5rem] leading-[0.88] tracking-[-0.02em] text-white"
          >
            Live the<br />
            <span className="relative inline-block font-[500]">
              <span className="text-amber-300">Greek</span> Life
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                className="absolute left-0 -bottom-3 h-[1px] w-full origin-left bg-white/80"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-6 max-w-sm text-sm text-white/75 leading-relaxed"
          >
            A limited collection of luxury villas shaped by architectural calm,
            where form, nature, and modern living converge into a private township
            experience in Bangalore.
          </motion.p>
        </div>

        {/* ── DESKTOP layout (≥ lg) ── */}
        <div className="hidden lg:block">
          <div className="absolute left-20 top-[38%] text-white">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="block text-base uppercase tracking-[0.5em] text-white/70 mb-6"
            >
              Fortune Hestia
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="font-serif text-[11rem] leading-[0.85] tracking-[-0.02em]"
            >
              Live the<br />
              <span className="relative inline-block font-[500]">
                <span className="text-amber-300">Greek</span> Life
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                  className="absolute left-0 -bottom-4 h-[1px] w-full origin-left bg-white/80"
                />
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute right-20 top-[62%] max-w-md text-right text-lg text-white/80 leading-relaxed"
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
