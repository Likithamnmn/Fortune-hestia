"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Maximize2,
  TreePine,
  Cpu,
  ShieldCheck,
  Sparkles,
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
    <div className="flex min-w-[140px] flex-1 flex-col">
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
      <p className={`${inter.className} font-light mt-2 text-[11px] leading-snug text-white/40 whitespace-nowrap`}>
        {fact.caption}
      </p>
    </div>
  );
}

export default function ProjectHighlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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

        {/* Highlights — small boxes, single horizontal row, fade in randomly on scroll */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 min-w-max md:min-w-0 md:grid md:grid-cols-6">
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
                className="group flex w-32 shrink-0 flex-col items-center gap-3 border border-white/10 px-3 py-6 text-center transition-colors duration-500 hover:border-[#E6F6BA]/40 md:w-auto"
              >
                <Icon
                  size={20}
                  strokeWidth={1.1}
                  className="shrink-0 text-white transition-colors duration-500 group-hover:text-white"
                />

                <div>
                  <h3 className={`${cormorant.className} font-light  text-lg leading-snug text-white`}>
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
        </div>

        {/* Facts — single row, big serif numbers */}
        <div className="overflow-x-auto scrollbar-hide mt-10">
          <div className="flex items-start gap-10 md:gap-12 min-w-max md:min-w-0 md:justify-between border-t border-white/40 pt-8 italic">
            {facts.map((fact, index) => (
              <FactStat key={index} fact={fact} active={inView} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}