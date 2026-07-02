"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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

const stories = [
  {
    title: "Contemporary Living",
    description:
      "Experience peaceful surroundings thoughtfully designed for modern family living.",
    image: "/image (5).jpg",
    overlay: "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
    tint: "bg-[#047C3D]/10",
  },
  {
    title: "Natural Light",
    description:
      "Thoughtfully designed spaces that welcome daylight, bringing warmth, comfort and openness into every home.",
    image: "/image (4).jpg",
    overlay: "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
    tint: "bg-[#047C3D]/10",
  },
  {
    title: "Modern Living",
    description:
      "Thoughtfully designed spaces where families come together, surrounded by comfort, greenery and everyday moments.",
    image: "/image (5).jpg",
    overlay: "bg-gradient-to-t from-black/55 via-black/10 to-transparent",
    tint: "bg-[#047C3D]/10",
  },
];

export default function Experience() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative h-[200dvh] bg-[#212121] overflow-x-clip"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div style={{ x }} className="flex h-full w-[300vw]">
          {stories.map((story, index) => (
            <div
              key={index}
              className="relative flex h-[80dvh] w-screen items-center overflow-hidden"
            >
              {/* IMAGE */}
              <div className="absolute inset-0">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* OVERLAY — gradient for text contrast + a light green tint for mood */}
              <div className={`absolute inset-0 ${story.overlay}`} />
              <div className={`absolute inset-0 ${story.tint}`} />

              {/* CONTENT */}
              <div className="relative z-10 mx-auto max-w-6xl px-8 text-white">

                {/* Slide number — Mono, top right feel anchored to content */}
                <div className="absolute top-0 right-8 md:right-16">
                  <span
                    className={`${jetbrainsMono.className} text-[9px] tracking-[0.3em] text-white/20`}
                  >
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(stories.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Title — Cormorant Garamond */}
                <motion.h2
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: false, amount: 0.3 }}
                  className={`${cormorant.className} italic font-light text-6xl md:text-7xl lg:text-[8rem] leading-[0.88] tracking-[-0.04em] text-white`}
                >
                  {story.title}
                </motion.h2>

                {/* Divider */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: "3rem", opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="mt-6 h-px bg-white/20"
                />

                {/* Description — Inter light */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.4,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.3,
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  className={`${inter.className} mt-5 max-w-md text-base font-light leading-relaxed text-white/85`}
                >
                  {story.description}
                </motion.p>

              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}