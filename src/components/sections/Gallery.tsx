"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  { src: "/gallery/architecture.jpg", label: "Architecture" },
  { src: "/gallery/interiors.jpg", label: "Interiors" },
  { src: "/gallery/landscapes.jpg", label: "Landscapes" },
  { src: "/gallery/amenities.jpg", label: "Amenities" },
  { src: "/gallery/township.jpg", label: "Township" },
  { src: "/gallery/lifestyle.jpg", label: "Lifestyle" },
];

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="bg-[#050505] py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-7xl text-white">
            Discover the Details
          </h2>

          <p className="mt-6 text-white/60 max-w-3xl mx-auto">
            Explore the architecture, landscapes, interiors, and lifestyle experiences
            that define Fortune Hestia.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

          {images.map((img, i) => (
            <div
              key={img.src}
              onClick={() => setActive(img.src)}
              className="relative break-inside-avoid overflow-hidden rounded-3xl cursor-pointer group"
            >

              <div className="relative h-[420px] w-full">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
              </div>

              {/* label */}
              <div className="absolute bottom-4 left-4 text-white/90 text-sm tracking-wide">
                {img.label}
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
          <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
            <Image
              src={active}
              alt="fullscreen"
              fill
              className="object-contain transition-all duration-700 scale-105"
            />
          </div>
        </div>
      )}
    </section>
  );
}