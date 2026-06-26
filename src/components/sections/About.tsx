"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function TypewriterHeading({
  text,
  start,
  speed = 75,
}: {
  text: string;
  start: boolean;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!start) {
      setDisplayed("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [start, text, speed]);

  return (
    <>
      {displayed}
      <span className="animate-pulse">|</span>
    </>
  );
}

export default function About() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.25,
    once: false,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAF7F0] py-20 lg:py-24 overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.2fr_0.75fr] items-center gap-10 lg:gap-14">

          {/* LEFT */}
          <div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
              className="italic font-light text-5xl md:text-6xl lg:text-7xl leading-[0.88] tracking-[-0.04em] text-black"
            >
              <TypewriterHeading
                start={isInView}
                speed={75}
                text={` Live in a Limited-Edition Home Crafted for Modern Luxury.`}
              />
            </motion.h2>

            <motion.div
              animate={
                isInView
                  ? { width: "4rem", opacity: 1 }
                  : { width: 0, opacity: 0 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 h-px bg-black/10"
            />
          </div>

          {/* CENTER IMAGE */}
          <div className="relative overflow-hidden">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="relative h-[500px] md:h-[620px] lg:h-[720px]"
            >
              <Image
                src="/image (6).jpg"
                alt="Fortune Hestia Architecture"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-center">

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{ fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif' }}
              className="text-base md:text-lg leading-relaxed text-gray-400 font-light text-left lg:text-right"
            >
              Discover an elite lifestyle at Fortune Hestia. Our premium gated community offers luxury villas built for privacy and comfort. Enjoy beautiful modern design, open spaces, and excellent clubhouse amenities.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif' }}
              className="mt-5 text-base md:text-lg leading-relaxed text-gray-400 font-light text-left lg:text-right"
            >
              Located right on Sarjapur Road, you get easy connectivity to Bengaluru's top IT parks and schools. It is the perfect peaceful home with all the city connections you need.
            </motion.p>

            {/* Download Brochure */}
            <motion.a
              href="/brochure.pdf"
              download="Fortune-Hestia-Brochure.pdf"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              className="mt-8 self-start lg:self-end inline-flex items-center gap-3 py-4 px-8 border border-black/20 text-black text-[9px] tracking-[0.4em] uppercase hover:bg-black hover:text-white transition-all duration-500"
            >
              Download Brochure ↓
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-10 border-t border-black/8 pt-8"
            />

          </div>

        </div>
      </div>
    </section>
  );
}