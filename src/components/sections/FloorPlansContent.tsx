"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const floorPlanTypes = [
  {
    slug: "40x60",
    label: "40 × 60 Villas",
    images: ["/401.jpg", "/402.png", "/403.png", "/404.png"],
  },
  {
    slug: "50x80",
    label: "50 × 80 Villas",
    images: ["/501.png", "/502.jpg", "/503.png", "/504.png"],
  },
  {
    slug: "north",
    label: "North Villas",
    images: ["/north1.webp", "/north2.webp", "/north3.webp", "/north4.webp", "/north5.webp", "/north6.webp"],
  },
  {
    slug: "south",
    label: "South Villas",
    images: ["/south1.webp", "/south2.webp", "/south3.webp", "/south4.webp", "/south5.webp", "/south6.webp"],
  },
  {
    slug: "east",
    label: "East Villas",
    images: ["/east1.webp", "/east2.webp", "/east3.webp", "/east4.webp", "/east5.webp", "/east6.webp"],
  },
  {
    slug: "west",
    label: "West Villas",
    images: ["/west1.webp", "/west2.webp", "/west3.webp", "/west4.webp", "/west5.webp", "/west6.webp"],
  },
];

type FloorPlanType = (typeof floorPlanTypes)[number];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  plan,
  index,
  onClose,
  onNav,
}: {
  plan: FloorPlanType;
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const total = plan.images.length;
  const prev = () => onNav((index - 1 + total) % total);
  const next = () => onNav((index + 1) % total);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl"
      >
        <div className="flex items-center justify-between mb-4">
          <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.4em] text-white/40`}>
            {plan.label} — {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={onClose}
            className={`${jetbrainsMono.className} text-[9px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors duration-300`}
          >
            Close ✕
          </button>
        </div>

        <div className="relative h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden border border-white/10 bg-[#080808]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={plan.images[index]}
                alt={`${plan.label} floor plan ${index + 1}`}
                fill
                className="object-contain p-6"
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all duration-300 rounded-full bg-black/40 backdrop-blur-sm"
          >
            <span className={`${jetbrainsMono.className} text-xs`}>←</span>
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all duration-300 rounded-full bg-black/40 backdrop-blur-sm"
          >
            <span className={`${jetbrainsMono.className} text-xs`}>→</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Content ─────────────────────────────────────────────────────────────

export default function FloorPlansContent() {
  const searchParams = useSearchParams();
  const requestedType = searchParams.get("type");

  const defaultSlug = floorPlanTypes.some((t) => t.slug === requestedType)
    ? (requestedType as string)
    : floorPlanTypes[0].slug;

  const [activeSlug, setActiveSlug] = useState(defaultSlug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activePlan = floorPlanTypes.find((t) => t.slug === activeSlug)!;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <section className="px-6 pt-32 md:pt-40 max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-7">
          <span className="h-px w-8 bg-amber-400/30" />
          <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.4em] text-white/30`}>
            Fortune Hestia
          </span>
          <span className="h-px w-8 bg-amber-400/30" />
        </div>

        <h1 className={`${cormorant.className} font-light italic text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em] leading-[1.0]`}>
          View{" "}
          <span className="not-italic font-normal text-amber-400">Floor Plans</span>
        </h1>

        <p className={`${inter.className} font-light text-white/40 mt-6 max-w-md mx-auto text-base leading-relaxed`}>
          Luxury villas designed with precision, space, and modern elegance.
        </p>
      </section>

      {/* Tabs */}
      <section className="px-6 mt-14 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {floorPlanTypes.map((type) => {
            const isActive = type.slug === activeSlug;
            return (
              <button
                key={type.slug}
                onClick={() => {
                  setActiveSlug(type.slug);
                  setLightboxIndex(null);
                }}
                className={`${jetbrainsMono.className} px-5 py-2.5 rounded-full text-[9px] uppercase tracking-[0.3em] border transition-all duration-400 ${
                  isActive
                    ? "bg-amber-400 border-amber-400 text-black"
                    : "border-white/15 text-white/50 hover:text-white hover:border-white/35"
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery for active tab */}
      <section className="px-6 mt-12 pb-28 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.3em] text-white/30`}>
                Gallery
              </span>
              <span className="h-px flex-1 bg-white/10" />
              <h2 className={`${cormorant.className} font-light italic text-2xl md:text-3xl text-white`}>
                {activePlan.label}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {activePlan.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-500"
                >
                  <Image
                    src={src}
                    alt={`${activePlan.label} floor plan ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                  <span className={`${jetbrainsMono.className} absolute top-4 left-4 text-[9px] tracking-[0.3em] text-white/40`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`${jetbrainsMono.className} absolute inset-0 flex items-center justify-center text-[9px] uppercase tracking-[0.4em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                    View →
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            plan={activePlan}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNav={(i) => setLightboxIndex(i)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
