"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
  { id: 1, image: "/image (9).png",  title: "Villa Type A", area: "3,200 sq.ft", beds: "4 BHK" },
  { id: 2, image: "/image (10).png", title: "Villa Type B", area: "3,800 sq.ft", beds: "4 BHK" },
  { id: 3, image: "/image (11).png", title: "Villa Type C", area: "4,200 sq.ft", beds: "5 BHK" },
  { id: 4, image: "/image (12).png", title: "Villa Type D", area: "4,600 sq.ft", beds: "5 BHK" },
  { id: 5, image: "/image (13).png", title: "Villa Type E", area: "5,100 sq.ft", beds: "6 BHK" },
  { id: 6, image: "/image (15).png", title: "Villa Type F", area: "5,800 sq.ft", beds: "6 BHK" },
];

function FloorPlanCard({ plan, index }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10"
    >
      {/* Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <Image
          src={plan.image}
          alt={plan.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />

        {/* Index badge — Mono, sits on the image */}
        <div className="absolute top-4 left-4">
          <span className={`${jetbrainsMono.className} text-[9px] tracking-[0.3em] text-white/30`}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl">
        <div className="flex justify-between items-start gap-4">

          {/* Left — title + beds */}
          <div>
            {/* Title — Cormorant italic light */}
            <h3 className={`${cormorant.className} font-light italic text-xl text-white group-hover:text-amber-300 transition-colors duration-300 leading-snug`}>
              {plan.title}
            </h3>
            {/* Beds — Mono label */}
            <p className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.3em] text-white/30 mt-1.5`}>
              {plan.beds}
            </p>
          </div>

          {/* Right — area */}
          <div className="text-right shrink-0">
            {/* Area value — Cormorant, feels like a measurement */}
            <p className={`${cormorant.className} font-light text-lg text-white/70 leading-none`}>
              {plan.area}
            </p>
            {/* Area label — Mono */}
            <p className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.3em] text-white/25 mt-1`}>
              Area
            </p>
          </div>

        </div>

        {/* CTA — Mono */}
        <div className={`${jetbrainsMono.className} mt-5 text-[9px] uppercase tracking-[0.3em] text-amber-400/60 group-hover:text-amber-300 transition-colors duration-300 flex items-center gap-2`}>
          View Details
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FloorPlansPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* Hero */}
      <section className="pt-40 pb-20 text-center px-6 relative">

        {/* Eyebrow — Mono */}
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

        {/* Heading — Cormorant */}
        <motion.h1
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`${cormorant.className} font-light italic text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em] leading-[1.0]`}
        >
          Exclusive{" "}
          <span className="not-italic font-normal text-amber-400">Floor Plans</span>
        </motion.h1>

        {/* Subheading — Inter light */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.8 }}
          className={`${inter.className} font-light text-white/40 mt-6 max-w-md mx-auto text-base leading-relaxed`}
        >
          Luxury villas designed with precision, space, and modern elegance.
        </motion.p>

      </section>

      {/* Grid */}
      <section className="px-6 pb-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {floorPlans.map((plan, i) => (
            <FloorPlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
      </section>

    </main>
  );
}