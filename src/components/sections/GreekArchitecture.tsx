"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stories = [
  {
    title: "Elegant Greek-Inspired Facades",
    description:
      "Graceful colonnades, balanced proportions, and timeless detailing establish a distinctive architectural identity.",
    image: "/greek.jpg",
  },
  {
    title: "Openness & Harmony",
    description:
      "Wide streets and symmetrical planning encourage openness, movement, and harmony throughout the community.",
    image: "/open.jpg",
  },
  {
    title: "Refined Luxury",
    description:
      "Natural materials and meticulous craftsmanship elevate everyday living with understated sophistication.",
    image: "/refined (2).jpg",
  },
  {
    title: "Living Close To Nature",
    description:
      "Landscaped surroundings reinforce the Greek philosophy of living in balance with nature.",
    image: "/closenature.jpg",
  },
];

export default function GreekArchitecture() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "40% start"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const headingScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    // Only run scroll-spy on desktop (≥ 1024px)
    if (window.innerWidth < 1024) return;

    const sections = document.querySelectorAll(".story-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActive(index);
          }
        });
      },
      { threshold: 0.55 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="architecture" ref={sectionRef} className="bg-black py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8">

        {/* ── Heading (desktop: sticky + animated, mobile: static) ── */}
        <motion.div
          style={{
            opacity: headingOpacity,
            y: headingY,
            scale: headingScale,
          }}
          className="sticky top-12 z-20 mb-16 md:mb-24 text-center"
        >
          <span className="text-xs uppercase tracking-[0.6em] text-white/40">
            Greek Architecture
          </span>
          <h2 className="mt-6 font-serif text-[2.8rem] leading-[0.9] tracking-[-0.05em] text-white md:text-[5rem] lg:text-[7rem]">
            <span className="text-amber-300">Greek Architecture.</span>
            <br />
            Reimagined.
          </h2>
        </motion.div>

        {/* ── MOBILE / TABLET layout (< 1024px): vertical cards, image on top ── */}
        <div className="block lg:hidden space-y-16">
          {stories.map((story, index) => (
            <div key={index} className="flex flex-col gap-6">
              {/* Image on top */}
              <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-sm">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              {/* Content below */}
              <div className="px-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-12 bg-white/20" />
                  <span className="text-xs uppercase tracking-[0.5em] text-white/40">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-[0.95] tracking-[-0.04em] text-white">
                  {story.title}
                </h3>
                <p className="mt-5 text-base leading-[1.9] text-white/60">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── DESKTOP layout (≥ 1024px): sticky image left, scrolling text right ── */}
        <div className="hidden lg:grid gap-16 lg:grid-cols-[1.45fr_0.55fr]">
          {/* Sticky Image */}
          <div>
            <div className="sticky top-24">
              <div className="relative h-[850px] overflow-hidden">
                {stories.map((story, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      opacity: active === index ? 1 : 0,
                      scale: active === index ? 1 : 1.05,
                    }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      priority={index === 0}
                      sizes="65vw"
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling Content */}
          <div>
            {stories.map((story, index) => (
              <section
                key={index}
                data-index={index}
                className="story-section flex min-h-[85vh] items-center"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <div className="h-px w-16 bg-white/20" />
                    <span className="text-xs uppercase tracking-[0.5em] text-white/40">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-white md:text-7xl">
                    {story.title}
                  </h3>
                  <p className="mt-8 max-w-md text-lg leading-[2] text-white/60">
                    {story.description}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
