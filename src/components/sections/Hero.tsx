"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const images = [
    "/image 45.jpg",
    "/image.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden"
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            animate={{
              opacity: currentImage === index ? 1 : 0,
              scale: currentImage === index ? 1.08 : 1,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="mx-auto max-w-6xl px-6 text-center text-white">

          <span className="mb-8 block text-sm uppercase tracking-[0.45em] text-white/70">
            Fortune Hestia
          </span>

          <h1 className="font-serif text-6xl leading-none md:text-8xl lg:text-[8rem]">
            Live the
            <br />
            Greek Life
          </h1>

          <p className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">
            Discover a limited collection of luxury villas nestled within
            Bangalore's most distinctive Greek-inspired township, where
            architecture, nature, and modern living come together seamlessly.
          </p>

        </div>
      </div>
    </section>
  );
}