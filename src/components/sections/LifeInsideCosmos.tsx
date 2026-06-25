"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

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

const features = [
  { label: "50 Acres",              desc: "Expansive township crafted for freedom.",    num: "01" },
  { label: "Premium Infrastructure", desc: "Future-ready world-class planning.",         num: "02" },
  { label: "Landscaped Gardens",    desc: "Nature integrated into daily living.",        num: "03" },
  { label: "Community Living",      desc: "Designed for connection and growth.",         num: "04" },
];

const BLOCK_DIRECTIONS = [
  { x: -30, y: 0   },
  { x: 0,   y: 40  },
  { x: 0,   y: -40 },
  { x: 30,  y: 0   },
  { x: -30, y: 0   },
  { x: 0,   y: 40  },
];

const STAGGER_ORDER = [0,1, 4, 2, 5, 3];

export default function LifeInsideCosmos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const col1TopRef = useRef<HTMLDivElement>(null);
  const col1BotRef = useRef<HTMLDivElement>(null);
  const col2Ref    = useRef<HTMLDivElement>(null);
  const col4TopRef = useRef<HTMLDivElement>(null);
  const col4BotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el   = sectionRef.current;
    const bg   = bgRef.current;
    const text = textRef.current;
    if (!el || !bg || !text) return;

    const blocks = [
      col1TopRef.current,
      col1BotRef.current,
      col2Ref.current,
      text,
      col4TopRef.current,
      col4BotRef.current,
    ].filter(Boolean) as HTMLElement[];

    blocks.forEach((block, i) => {
      const dir = BLOCK_DIRECTIONS[i] ?? { x: 0, y: 40 };
      gsap.set(block, { opacity: 0, x: dir.x, y: dir.y, filter: "blur(5px)" });
    });

    const tlIn = gsap.timeline({ paused: true });
    STAGGER_ORDER.forEach((blockIdx, orderIdx) => {
      const block = blocks[blockIdx];
      if (!block) return;
      const isSlow = blockIdx === 1 || blockIdx === 5;
      tlIn.to(
        block,
        {
          opacity: 1, x: 0, y: 0, filter: "blur(0px)",
          duration: isSlow ? 1.6 : 0.9,
          ease: isSlow ? "power1.out" : "power2.out",
        },
        orderIdx * 0.18 + (isSlow ? 0.3 : 0)
      );
    });

    const tlOut = gsap.timeline({ paused: true });
    blocks.forEach((block, i) => {
      const dir = BLOCK_DIRECTIONS[i] ?? { x: 0, y: 40 };
      tlOut.to(
        block,
        {
          opacity: 0, x: -dir.x, y: -dir.y, filter: "blur(5px)",
          duration: 0.7, ease: "power2.in",
        },
        0
      );
    });

    ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      end: "bottom 30%",
      onEnter:     () => { tlOut.pause(0); tlIn.restart(); },
      onLeave:     () => { tlIn.pause();   tlOut.restart(); },
      onEnterBack: () => { tlOut.pause(0); tlIn.restart(); },
      onLeaveBack: () => { tlIn.pause();   tlOut.restart(); },
    });

    let mx = 0, my = 0, tx = 0, ty = 0, rafId: number;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const tick = () => {
      tx += (mx - tx) * 0.05;
      ty += (my - ty) * 0.05;
      bg.style.transform = `translate3d(${tx * 60}px,${ty * 40}px,0) scale(1.45)`;
      rafId = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  /* ── shared class fragments ── */
  const monoLabel   = `${jetbrainsMono.className} text-[10px] sm:text-[9px] tracking-[0.4em] text-amber-400/50 uppercase`;
  const featureHead = `${cormorant.className} font-light italic text-xl sm:text-3xl lg:text-[3.4rem] leading-[1.1] tracking-tight text-white/90 mb-2 sm:mb-4`;
  const featureBody = `${inter.className} font-light text-[12px] sm:text-base lg:text-[17px] leading-[1.7] sm:leading-[1.8] text-white/70`;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] overflow-hidden bg-[#050505]"
    >
      {/* BG */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url('/image (3).jpg')",
          filter: "brightness(0.60) contrast(1.2) saturate(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* 4-col grid */}
      <div className="absolute inset-0 grid grid-cols-4">

        <div className="absolute inset-y-0 left-1/4 w-px bg-white/20" />
        <div className="absolute inset-y-0 left-2/4 w-px bg-white/30" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-white/20" />
        <div className="absolute inset-x-0 top-1/2  h-px bg-white/10" />

        {/* COL 1 */}
        <div className="feature-col relative flex flex-col">

          <div ref={col1TopRef} className="flex-1 flex flex-col justify-between p-3 sm:p-5 lg:p-12 border-b border-white/8 will-change-transform">
            <span className={monoLabel}>{features[0].num}</span>
            <div>
              <h3 className={featureHead}>{features[0].label}</h3>
              <div className="w-5 sm:w-7 h-px bg-amber-400/30 mb-2 sm:mb-4" />
              <p className={featureBody}>{features[0].desc}</p>
            </div>
          </div>

          <div ref={col1BotRef} className="flex-1 flex flex-col justify-between p-3 sm:p-5 lg:p-12 will-change-transform">
            <span className={monoLabel}>{features[1].num}</span>
            <div>
              <h3 className={featureHead}>{features[1].label}</h3>
              <div className="w-5 sm:w-7 h-px bg-amber-400/30 mb-2 sm:mb-4" />
              <p className={featureBody}>{features[1].desc}</p>
            </div>
          </div>

        </div>

        {/* COL 2 */}
        <div ref={col2Ref} className="feature-col relative overflow-hidden will-change-transform">
          <div className="absolute inset-0 " />
          <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-5 lg:p-8">
            <div>
              <span className={`${monoLabel} block mb-4 sm:mb-8`}>
                Fortune Cosmos
              </span>
              <h3 className={featureHead}>{features[3].label}</h3>
              <div className="w-5 sm:w-7 h-px bg-amber-400/30 mb-2 sm:mb-4" />
              <p className={`${featureBody} max-w-[22ch]`}>{features[3].desc}</p>
            </div>
          </div>
        </div>

        {/* COL 3 — centre text */}
        <div
          ref={textRef}
          className="relative flex flex-col items-center justify-center text-center px-3 sm:px-5 lg:px-8 will-change-transform"
        >
          {/* Eyebrow — Mono */}
          <p className={`${monoLabel} mb-3 sm:mb-6`}>Fortune Cosmos</p>

          {/* Heading — Cormorant */}
          <h2 className={`${cormorant.className} font-light leading-[1.05] tracking-tight text-white mb-3 sm:mb-6 text-2xl sm:text-4xl lg:text-[4.9rem]`}>
            <span className="block italic text-white/80">More Than</span>
            <span className="block italic text-white/80">a Township</span>
            <span className="block mt-1 sm:mt-2 not-italic font-normal text-amber-400">
              living ecosystem.
            </span>
          </h2>

          <div className="w-8 sm:w-10 h-px bg-white/15 mb-3 sm:mb-6" />

          {/* Body — Inter light */}
          <p className={`${inter.className} font-light text-[12px] sm:text-base lg:text-[17px] leading-[1.7] sm:leading-[1.85] text-white/55 max-w-[26ch]`}>
            A carefully composed environment where architecture, nature, and community
            exist in quiet balance.
          </p>
        </div>

        {/* COL 4 */}
        <div className="feature-col relative flex flex-col">

          <div ref={col4TopRef} className="flex-1 flex flex-col justify-between p-3 sm:p-5 lg:p-8 border-b border-white/8 will-change-transform">
            {/* Label — Mono */}
            <span className={monoLabel}>Vision</span>
            {/* Body — Inter light */}
            <p className={`${inter.className} font-light text-[12px] sm:text-sm lg:text-[20px] leading-[1.7] sm:leading-[1.85] text-white/45`}>
              Our mission is to immerse you in a lifestyle that balances refined
              aesthetics, architectural excellence, and a profound sense of community.
            </p>
          </div>

          <div ref={col4BotRef} className="flex-1 flex flex-col justify-between p-3 sm:p-5 lg:p-12 will-change-transform">
            <span className={monoLabel}>{features[2].num}</span>
            <div>
              <h3 className={featureHead}>{features[2].label}</h3>
              <div className="w-5 sm:w-7 h-px bg-amber-400/30 mb-2 sm:mb-4" />
              <p className={featureBody}>{features[2].desc}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}