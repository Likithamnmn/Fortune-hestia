"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative bg-black py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* STRICT 3-COLUMN GEOMETRIC GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_0.8fr] min-h-[900px]">

          {/* LEFT — TYPOGRAPHY MODULE (CENTER-ANCHORED VERTICALLY) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-center justify-start h-full"
          >
            <div className="max-w-sm text-left">
              <h2 className="font-serif text-5xl md:text-6xl leading-tight text-white">
                Inspired by Greece.
                <br />
                Crafted for Modern Bangalore.
              </h2>

              <div className="mt-10 h-px w-28 bg-white/20" />
            </div>
          </motion.div>

          {/* CENTER — VISUAL CORE (FULL HEIGHT IMAGE FRAME) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-full flex items-stretch"
          >
            <div className="relative w-full h-[700px] lg:h-[780px] overflow-hidden self-center">

              <Image
                src="/image (6).jpg"
                alt="Fortune Hestia Architecture"
                fill
                className="object-cover"
                priority
              />

              {/* dark sandwich framing */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
              <div className="absolute inset-0 shadow-[inset_0_0_220px_rgba(0,0,0,0.8)]" />
            </div>
          </motion.div>

          {/* RIGHT — BODY MODULE (TOP-ALIGNED SMALL TEXT) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-full"
          >
            {/* TOP ANCHORED CONTENT */}
            <div className="pt-10 lg:pt-0 text-left lg:text-right max-w-xs ml-auto">

              <p className="text-lg leading-relaxed text-white/70">
                Fortune Hestia is more than a collection of villas.
                It is a thoughtfully designed community inspired by timeless Greek architecture.
              </p>

              <p className="mt-6 text-lg leading-relaxed text-white/70">
                Located within a 50-acre township, every detail is crafted to create elegance, space, and connection.
              </p>

            </div>

            {/* BOTTOM MACRO WHITESPACE */}
            <div className="absolute bottom-0 right-0 max-w-xs text-right border-t border-white/10 pt-10">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-4xl text-white">50</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">
                    Acres
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-4xl text-white">Greek</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">
                    Inspired
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
