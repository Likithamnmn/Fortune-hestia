"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stories = [
  {
    title: "Morning",
    description:
      "Wake up to tree-lined avenues, fresh air, and peaceful surroundings.",
    image: "/image (5).jpg",
  },
  {
    title: "Family",
    description: "Large homes designed for moments that matter most.",
    image: "/image (4).jpg",
  },
  {
    title: "Nature",
    description:
      "Beautiful landscapes that become part of everyday life.",
    image: "/image (5).jpg",
  },
  {
    title: "Community",
    description:
      "A vibrant neighborhood where connections grow naturally.",
    image: "/image (7).jpg",
  },
];

export default function Experience() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative h-[250vh] bg-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        <motion.div
          style={{ x }}
          className="flex h-full w-[400vw]"
        >
          {stories.map((story, index) => (
            <div
              key={index}
              className="relative flex h-[80vh] w-screen items-center overflow-hidden"
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

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/55" />

              {/* CONTENT */}
              <div className="relative z-10 mx-auto max-w-6xl px-8 text-white">

                <span className="mb-6 block text-sm uppercase tracking-[0.4em] text-white/60">
                  Experience Hestia
                </span>

                <motion.h2
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-serif text-6xl md:text-7xl lg:text-[8rem]"
                >
                  {story.title}
                </motion.h2>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                  {story.description}
                </p>

              </div>

            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}