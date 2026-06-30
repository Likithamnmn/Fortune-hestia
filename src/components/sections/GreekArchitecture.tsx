"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
    title: "Gracefully Inspired",
    description:
      "Timeless Greek-inspired facades crafted with elegant proportions and refined architectural detailing.",
    image: "/greek.jpg",
  },
  {
    title: "Open Spaces",
    description:
      "Thoughtfully planned spaces that embrace natural light, openness and harmonious everyday living.",
    image: "/open.jpg",
  },
  {
    title: "Crafted Elegance",
    description:
      "Every detail is thoughtfully crafted to create homes of timeless character and understated luxury.",
    image: "/refined (2).jpg",
  },
  {
    title: "Closer to Nature",
    description:
      "Beautifully landscaped surroundings bring nature, peace and everyday comfort closer to home.",
    image: "/closenature.jpg",
  },
];

const AUTO_ADVANCE_MS = 4500;

function ParallaxCard({ story, index }: { story: typeof stories[0]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div className="flex flex-col gap-6">
      <div ref={ref} className="relative w-full h-64 md:h-80 overflow-hidden rounded-sm">
        <motion.div style={{ y }} className="absolute inset-0 scale-[1.15]">
          <Image
            src={story.image}
            alt={story.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      <div className="px-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-white/20" />
          <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.45em] text-white/35`}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className={`${cormorant.className} font-light italic text-3xl md:text-4xl leading-[0.95] tracking-[-0.04em] text-white`}>
          {story.title}
        </h3>

        <p className={`${inter.className} font-light mt-5 text-base leading-[1.9] text-white/50`}>
          {story.description}
        </p>
      </div>
    </div>
  );
}

export default function GreekArchitecture() {
  const [active, setActive] = useState(0);
  const [prev, setPrev]     = useState<number | null>(null);
  const sectionRef          = useRef<HTMLElement>(null);
  const desktopRef          = useRef<HTMLDivElement>(null);

  const { scrollYProgress: headingProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "40% start"],
  });
  const headingOpacity = useTransform(headingProgress, [0, 0.15, 0.5], [1, 1, 0]);
  const headingY       = useTransform(headingProgress, [0, 0.5], [0, -80]);
  const headingScale   = useTransform(headingProgress, [0, 0.5], [1, 0.95]);

  const { scrollYProgress: imageProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end end"],
  });
  const imageParallaxY = useTransform(imageProgress, [0, 1], [-60, 60]);

  // Auto-advance the photos (and synced text) slowly, on a timer.
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((curr) => {
        const next = (curr + 1) % stories.length;
        setPrev(curr);
        return next;
      });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="architecture" ref={sectionRef} className="bg-black py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8">

        {/* Heading */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY, scale: headingScale }}
          className="sticky top-12 z-20 mb-16 md:mb-24 text-center"
        >
          <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.55em] text-white/30`}>
            Greek Architecture
          </span>

          <h2 className={`${cormorant.className} mt-6 font-light text-[2.8rem] leading-[0.9] tracking-[-0.05em] text-white md:text-[5rem] lg:text-[7rem]`}>
            <span className="italic text-amber-400">Live the Greek</span>
            <br />
            <span className="not-italic font-normal">Life.</span>
          </h2>
        </motion.div>

        {/* Mobile */}
        <div className="block lg:hidden space-y-16">
          {stories.map((story, index) => (
            <ParallaxCard key={index} story={story} index={index} />
          ))}
        </div>

        {/* Desktop */}
        <div
          ref={desktopRef}
          className="hidden lg:grid lg:grid-cols-[1.45fr_0.55fr] gap-16"
        >
          {/* LEFT — sticky image, auto-advancing */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative h-[850px] overflow-hidden">

                <div className="absolute inset-0 scale-[1.12]">
                  <motion.div style={{ y: imageParallaxY }} className="absolute inset-0">
                    <Image
                      src={stories[active].image}
                      alt={stories[active].title}
                      fill
                      sizes="65vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {prev !== null && prev !== active && (
                    <motion.div
                      key={prev}
                      initial={{ opacity: 1, y: 0, scale: 1.12, filter: "blur(0px) saturate(1)" }}
                      animate={{ opacity: 0, y: -30, scale: 1.16, filter: "blur(14px) saturate(0.3)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                      className="absolute inset-0"
                    >
                      <motion.div style={{ y: imageParallaxY }} className="absolute inset-0">
                        <Image
                          src={stories[prev].image}
                          alt={stories[prev].title}
                          fill
                          sizes="65vw"
                          className="object-cover"
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20, scale: 1.16, filter: "blur(12px) saturate(0.4)" }}
                    animate={{ opacity: 1, y: 0, scale: 1.12, filter: "blur(0px) saturate(1)" }}
                    transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
                    className="absolute inset-0"
                  >
                    <motion.div style={{ y: imageParallaxY }} className="absolute inset-0">
                      <Image
                        src={stories[active].image}
                        alt={stories[active].title}
                        fill
                        sizes="65vw"
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/10 z-10" />

                <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
                  {stories.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        width:   i === active ? 28 : 6,
                        opacity: i === active ? 1  : 0.3,
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="h-[2px] bg-white rounded-full"
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT — all 4 stacked column-wise; active one pulses font-size, text always fully visible */}
          {/* RIGHT — all 4 stacked column-wise; active one pulses font-size once, then holds until next change */}
<div className="flex flex-col justify-center gap-14 min-h-[850px]">
  {stories.map((story, index) => {
    const isActive = index === active;
    return (
      <div key={index}>
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ width: isActive ? 32 : 16 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-px bg-white/20"
          />
          <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.45em] text-white/30`}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title — remounts (via key) only when this item becomes/leaves active, so it pulses
            exactly once and then holds steady, never re-triggering on unrelated re-renders */}
        <motion.h3
          key={`title-${index}-${isActive}`}
          initial={{ fontSize: isActive ? "1.5rem" : "1.5rem" }}
          animate={{ fontSize: isActive ? "1.75rem" : "1.5rem" }}
          transition={
            isActive
              ? { fontSize: { duration: 1, times: [0, 0.5, 1], ease: [0.25, 0.1, 0.25, 1] } }
              : { duration: 0.4, ease: "easeInOut" }
          }
          className={`${cormorant.className} mt-4 font-light italic leading-[0.95] tracking-[-0.04em] text-white`}
        >
          {story.title}
        </motion.h3>

        {/* Description — same locked, one-shot pulse-and-hold treatment */}
        <motion.p
          key={`desc-${index}-${isActive}`}
          initial={{ fontSize: "0.8rem" }}
          animate={{ fontSize: isActive ? "0.95rem" : "0.8rem" }}
          transition={
            isActive
              ? { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
              : { duration: 0.4, ease: "easeInOut" }
          }
          className={`${inter.className} font-light mt-3 max-w-sm leading-[1.8] text-white/50`}
        >
          {story.description}
        </motion.p>
      </div>
    );
  })}
</div>
        </div>

      </div>
    </section>
  );
}