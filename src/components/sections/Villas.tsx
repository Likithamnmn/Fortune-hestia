"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
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

// ─── ContainerScroll ──────────────────────────────────────────────────────────

const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotate    = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale     = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.9] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>

        {/* Title */}
        <motion.div
          style={{ translateY: translate }}
          className="max-w-5xl mx-auto text-center mb-0"
        >
          {titleComponent}
        </motion.div>

        {/* Card */}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            boxShadow:
              "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
          }}
          className="max-w-6xl -mt-12 mx-auto h-[34rem] md:h-[44rem] w-full border-4 border-[#2a2a2a] p-2 md:p-4 bg-[#111111] rounded-[30px] shadow-2xl"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-[#0A0A0A]">
            {children}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const villas = [
  {
    title: "40 × 60 Villas",
    description:
      "Spacious homes thoughtfully designed for modern families seeking comfort and elegance.",
    image: "/villa1.jpg",
    num: "01",
  },
  {
    title: "50 × 80 Villas",
    description:
      "Grand residences offering expansive living spaces, private gardens, and premium finishes.",
    image: "/villa2.jpg",
    num: "02",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Villas() {
  return (
    <section id="villa-design" className="bg-[#FAF7F0]">
      <ContainerScroll
        titleComponent={
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Eyebrow — Mono */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            >
              <span className="h-px w-6 bg-black/20" />
              <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.45em] text-black/40`}>
                The Villas
              </span>
              <span className="h-px w-6 bg-black/20" />
            </motion.div>

            {/* Heading — Cormorant */}
            <motion.h2
              className={`${cormorant.className} font-light italic text-6xl md:text-8xl lg:text-9xl text-black leading-[1.0] tracking-[-0.03em]`}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
            >
              Homes Designed
              <br />
              <span className="not-italic font-normal text-amber-500">Around Life</span>
            </motion.h2>
          </motion.div>
        }
      >
        {/* Villa cards */}
        <div className="h-full overflow-y-auto scrollbar-hide">
          <div className="grid gap-6 p-6 lg:grid-cols-2">
            {villas.map((villa) => (
              <div
                key={villa.title}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition-all duration-700 hover:border-white/20"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={villa.image}
                    alt={villa.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Index on image — Mono */}
                  <span className={`${jetbrainsMono.className} absolute top-4 left-4 text-[9px] tracking-[0.3em] text-white/30`}>
                    {villa.num}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8">

                  {/* Villa title — Cormorant */}
                  <h3 className={`${cormorant.className} font-light italic text-3xl text-white leading-snug`}>
                    {villa.title}
                  </h3>

                  {/* Description — Inter light */}
                  <p className={`${inter.className} font-light mt-4 text-base leading-relaxed text-white/50`}>
                    {villa.description}
                  </p>

                  {/* CTA — Mono */}
                  <button className={`${jetbrainsMono.className} mt-8 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors duration-500`}>
                    View Floor Plans
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-500 group-hover:translate-x-2"
                    />
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}