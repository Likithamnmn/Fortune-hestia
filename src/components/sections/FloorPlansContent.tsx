"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const floorPlans = [
  { id: 1, image: "/image (9).png", title: "Villa Type A", area: "3,200 sq.ft", beds: "4 BHK", label: "Image Slot 1" },
  { id: 2, image: "/image (10).png", title: "Villa Type B", area: "3,800 sq.ft", beds: "4 BHK", label: "Image Slot 2" },
  { id: 3, image: "/image (11).png", title: "Villa Type C", area: "4,200 sq.ft", beds: "5 BHK", label: "Image Slot 3" },
  { id: 4, image: "/image (12).png", title: "Villa Type D", area: "4,600 sq.ft", beds: "5 BHK", label: "Image Slot 4" },
  { id: 5, image: "/image (13).png", title: "Villa Type E", area: "5,100 sq.ft", beds: "6 BHK", label: "Image Slot 5" },
  { id: 6, image: "/image (15).png", title: "Villa Type F", area: "5,800 sq.ft", beds: "6 BHK", label: "Image Slot 6" },
];

function FloorPlanCard({ plan, index }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />
      </div>

      {/* Content */}
      <div className="p-5 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-white font-semibold group-hover:text-amber-300 transition">
              {plan.title}
            </h3>
            <p className="text-white/40 text-xs uppercase tracking-wider mt-1">
              {plan.beds}
            </p>
          </div>

          <div className="text-right">
            <p className="text-white/70 text-sm">{plan.area}</p>
            <p className="text-white/30 text-xs">Area</p>
          </div>
        </div>

        <div className="mt-4 text-xs uppercase tracking-[0.25em] text-amber-400/70 group-hover:text-amber-300 flex items-center gap-2">
          View Details →
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
      {/* HERO */}
      <section className="pt-40 pb-20 text-center px-6 relative">
        <motion.h1
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif"
        >
          Exclusive <span className="text-amber-300">Floor Plans</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-white/50 mt-6 max-w-2xl mx-auto"
        >
          Luxury villas designed with precision, space, and modern elegance.
        </motion.p>
      </section>

      {/* GRID */}
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