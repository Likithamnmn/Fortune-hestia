"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Maximize2,
  TreePine,
  Cpu,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";
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

const highlights = [
  { icon: Home, title: "4 BHK Limited Edition Villas" },
  { icon: Maximize2, title: "40'×60' & 50'×80'", sub: "Premium Plot Size" },
  { icon: TreePine, title: "Private Garden Spaces" },
  { icon: Cpu, title: "Smart Home Integration" },
  { icon: ShieldCheck, title: "Gated Community Living" },
  { icon: Sparkles, title: "Exclusive Premium Amenities" },
];

const facts = [
  { type: "number" as const, value: 50, suffix: "%", caption: "open spaces, up to." },
  { type: "text" as const, big: "RERA", caption: "pre-approved project." },
  { type: "text" as const, big: "BMRDA", caption: "approved layout." },
  { type: "text" as const, big: "A+", caption: "excellent connectivity." },
];

function useCountUp(target: number | null, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || target === null) return;
    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function FactStat({ fact, active }: { fact: (typeof facts)[number]; active: boolean }) {
  const count = useCountUp(fact.type === "number" ? fact.value : null, active);

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-1">
        <span className={`${cormorant.className} font-light text-white text-3xl md:text-4xl leading-none tracking-[-0.02em]`}>
          {fact.type === "number" ? count : fact.big}
        </span>
        {fact.type === "number" && fact.suffix && (
          <span className={`${cormorant.className} italic font-light text-white/40 text-base md:text-lg`}>
            {fact.suffix}
          </span>
        )}
      </div>
      <p className={`${inter.className} font-light mt-2 text-[11px] leading-snug text-white/40`}>
        {fact.caption}
      </p>
    </div>
  );
}

export default function ProjectHighlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRowRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const randomEntries = useMemo(
    () =>
      highlights.map(() => ({
        delay: Math.random() * 0.8,
        y: 10 + Math.random() * 16,
        x: (Math.random() - 0.5) * 14,
      })),
    []
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleRowScroll = () => {
    const el = scrollRowRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 16;
    setShowSwipeHint(!atEnd);
  };

  return (
    <section id="project-highlights" ref={sectionRef} className="bg-black py-16 md:py-20">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-10">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-6 bg-white/15" />
          <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.45em] text-white/30`}>
            Fortune Hestia
          </span>
          <span className="h-px w-6 bg-white/15" />
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          className={`${cormorant.className} text-center font-light italic text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.03em] text-white mb-10`}
          style={{ textShadow: "0 0 20px rgba(255,255,255,0.15)" }}
        >
          Project <span className="not-italic font-normal text-[#E6F6BA]">Highlights</span>
        </motion.h2>

        {/* Highlights row: horizontal swipe below sm, grid from sm up */}
        <div className="relative">
          <div
            ref={scrollRowRef}
            onScroll={handleRowScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 gap-3 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-6 sm:overflow-visible"
          >
            {highlights.map(({ icon: Icon, title, sub }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: randomEntries[index].y, x: randomEntries[index].x }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, x: 0 }
                    : { opacity: 0, y: randomEntries[index].y, x: randomEntries[index].x }
                }
                transition={{
                  duration: 0.9,
                  delay: randomEntries[index].delay,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group flex w-[42%] shrink-0 snap-start flex-col items-center gap-3 border border-white/10 px-3 py-6 text-center transition-colors duration-500 hover:border-[#E6F6BA]/40 sm:w-full sm:shrink"
              >
                <Icon
                  size={20}
                  strokeWidth={1.1}
                  className="shrink-0 text-white transition-colors duration-500 group-hover:text-white"
                />

                <div>
                  <h3 className={`${cormorant.className} font-light text-lg leading-snug text-white`}>
                    {title}
                  </h3>
                  {sub && (
                    <p className={`${inter.className} font-light mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50`}>
                      {sub}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile-only swipe cue: fade + bouncing chevron, hides once scrolled to the end */}
          <AnimatePresence>
            {isMobile && showSwipeHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-10 bg-gradient-to-l from-black via-black/70 to-transparent"
              >
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronRight size={18} className="text-[#E6F6BA]/70" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Facts — grid on mobile, single row from md up */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-6 md:flex md:items-start md:justify-between mt-10 border-t border-white/40 pt-8 italic">
          {facts.map((fact, index) => (
            <FactStat key={index} fact={fact} active={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}