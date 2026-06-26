"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
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

const floorPlans = [
  {
    id: 1,
    direction: "North",
    images: ["/north1.webp", "/north2.webp", "/north3.webp", "/north4.webp", "/north5.webp", "/north6.webp"],
    cover: "/north1.webp",
  },
  {
    id: 2,
    direction: "South",
    images: ["/south1.webp", "/south2.webp", "/south3.webp", "/south4.webp", "/south5.webp", "/south6.webp"],
    cover: "/south1.webp",
  },
  {
    id: 3,
    direction: "East",
    images: ["/east1.webp", "/east2.webp", "/east3.webp", "/east4.webp", "/east5.webp", "/east6.webp"],
    cover: "/east1.webp",
  },
  {
    id: 4,
    direction: "West",
    images: ["/west1.webp", "/west2.webp", "/west3.webp", "/west4.webp", "/west5.webp", "/west6.webp"],
    cover: "/west1.webp",
  },
];

function FloorPlanCard({
  plan,
  index,
  onView,
}: {
  plan: (typeof floorPlans)[0];
  index: number;
  onView: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
    >
      {/* Blurred Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <Image
          src={plan.cover}
          alt={`${plan.direction} Villa Floor Plan`}
          fill
          className="object-cover scale-105 blur-sm group-hover:blur-md transition-all duration-500"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-500" />

        {/* Index badge */}
        <div className="absolute top-4 left-4">
          <span className={`${jetbrainsMono.className} text-[9px] tracking-[0.3em] text-white/30`}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* View CTA */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            onClick={onView}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`${jetbrainsMono.className} px-7 py-3 border border-white/30 text-white text-[9px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500`}
          >
            View →
          </motion.button>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl">
        <h3 className={`${cormorant.className} font-light italic text-xl text-white leading-snug`}>
          {plan.direction} Villa
        </h3>
        <p className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.3em] text-white/30 mt-1.5`}>
          Floor Plans
        </p>
      </div>
    </motion.div>
  );
}

function Modal({
  plan,
  onClose,
}: {
  plan: (typeof floorPlans)[0];
  onClose: () => void;
}) {
  const [active, setActive] = useState(0);
  const total = plan.images.length;

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 30 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
        style={{ height: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 shrink-0">
          <div>
            <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.4em] text-white/30`}>
              Fortune Hestia
            </span>
            <h2 className={`${cormorant.className} font-light italic text-3xl text-white mt-1`}>
              {plan.direction} Villa Floor Plans
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`${jetbrainsMono.className} text-[9px] tracking-[0.3em] uppercase text-white/30 hover:text-white transition-colors duration-300`}
          >
            Close ✕
          </button>
        </div>

        {/* Main Image + Arrows */}
        <div className="relative flex-1 overflow-hidden bg-[#080808]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={plan.images[active]}
                alt={`${plan.direction} floor plan ${active + 1}`}
                fill
                className="object-contain p-8"
              />
            </motion.div>
          </AnimatePresence>

          {/* Prev Arrow */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all duration-300 rounded-full bg-black/40 backdrop-blur-sm"
          >
            <span className={`${jetbrainsMono.className} text-xs`}>←</span>
          </button>

          {/* Next Arrow */}
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all duration-300 rounded-full bg-black/40 backdrop-blur-sm"
          >
            <span className={`${jetbrainsMono.className} text-xs`}>→</span>
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <span className={`${jetbrainsMono.className} text-[9px] tracking-[0.3em] text-white/30`}>
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="shrink-0 flex gap-3 px-8 py-5 border-t border-white/10 overflow-x-auto">
          {plan.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative shrink-0 h-16 w-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                active === i
                  ? "border-amber-400/70 opacity-100"
                  : "border-white/10 hover:border-white/30 opacity-50 hover:opacity-80"
              }`}
            >
              <Image src={img} alt={`Thumb ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FloorPlansPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [selected, setSelected] = useState<(typeof floorPlans)[0] | null>(null);

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* Grid */}
      <section className="px-6 pt-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {floorPlans.map((plan, i) => (
            <FloorPlanCard
              key={plan.id}
              plan={plan}
              index={i}
              onView={() => setSelected(plan)}
            />
          ))}
        </div>
      </section>

      {/* Heading below cards */}
      <section className="pt-16 pb-28 text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="h-px w-8 bg-amber-400/30" />
          <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.4em] text-white/30`}>
            Fortune Hestia
          </span>
          <span className="h-px w-8 bg-amber-400/30" />
        </motion.div>

        <motion.h2
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`${cormorant.className} font-light italic text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em] leading-[1.0]`}
        >
          View{" "}
          <span className="not-italic font-normal text-amber-400">Floor Plans</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.8 }}
          className={`${inter.className} font-light text-white/40 mt-6 max-w-md mx-auto text-base leading-relaxed`}
        >
          Luxury villas designed with precision, space, and modern elegance.
        </motion.p>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <Modal plan={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

    </main>
  );
}