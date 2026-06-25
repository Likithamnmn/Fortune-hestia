"use client";

import Image from "next/image";
import { useState } from "react";
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

const images = [
  { src: "/gallery/architecture.jpg", label: "Architecture", index: "01" },
  { src: "/gallery/interiors.jpg",    label: "Interiors",    index: "02" },
  { src: "/gallery/landscapes.jpg",   label: "Landscapes",   index: "03" },
  { src: "/gallery/amenities.jpg",    label: "Amenities",    index: "04" },
  { src: "/gallery/township.jpg",     label: "Township",     index: "05" },
  { src: "/gallery/lifestyle.jpg",    label: "Lifestyle",    index: "06" },
];

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="bg-[#050505] py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-20">

          {/* Eyebrow — Mono */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-8 bg-amber-400/30" />
            <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.4em] text-white/25`}>
              Fortune Hestia
            </span>
            <span className="h-px w-8 bg-amber-400/30" />
          </div>

          {/* Heading — Cormorant */}
          <h2 className={`${cormorant.className} font-light italic text-5xl md:text-7xl lg:text-8xl text-white tracking-[-0.03em] leading-[1.0]`}>
            Discover the{" "}
            <span className="not-italic font-normal text-amber-400">Details</span>
          </h2>

          {/* Subtitle — Inter light */}
          <p className={`${inter.className} font-light mt-6 text-white/40 max-w-lg mx-auto text-base leading-relaxed`}>
            Explore the architecture, landscapes, interiors, and lifestyle experiences
            that define Fortune Hestia.
          </p>

        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {images.map((img) => (
            <div
              key={img.src}
              onClick={() => setActive(img.src)}
              className="relative break-inside-avoid overflow-hidden rounded-2xl cursor-pointer group"
            >
              <div className="relative h-[420px] w-full">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500" />
              </div>

              {/* Bottom label row */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-end justify-between">

                {/* Label — Cormorant italic */}
                <span className={`${cormorant.className} font-light italic text-xl text-white/80 group-hover:text-white transition-colors duration-300 leading-none`}>
                  {img.label}
                </span>

                {/* Index — Mono */}
                <span className={`${jetbrainsMono.className} text-[9px] tracking-[0.3em] text-white/25 group-hover:text-white/40 transition-colors duration-300`}>
                  {img.index}
                </span>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Viewer */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        >
          {/* Close hint — Mono */}
          <div className={`${jetbrainsMono.className} absolute top-8 right-8 text-[9px] uppercase tracking-[0.3em] text-white/30 hover:text-white/60 transition-colors cursor-pointer`}>
            Close ✕
          </div>

          <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
            <Image
              src={active}
              alt="fullscreen"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}