"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { label: "50 Acres", desc: "Expansive township crafted for freedom.", num: "01" },
  { label: "Premium Infrastructure", desc: "Future-ready world-class planning.", num: "02" },
  { label: "Landscaped Gardens", desc: "Nature integrated into daily living.", num: "03" },
  { label: "Community Living", desc: "Designed for connection and growth.", num: "04" },
];

export default function LifeInsideCosmos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el   = sectionRef.current;
    const bg   = bgRef.current;
    const text = textRef.current;
    if (!el || !bg || !text) return;

    const cols = Array.from(el.querySelectorAll<HTMLElement>(".feature-col"));

    // initial states
    gsap.set(text, { opacity: 0, y: 40 });
    cols.forEach((col, i) => gsap.set(col, { opacity: 0, y: 50 }));

    ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(text, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 });
        cols.forEach((col, i) => {
          gsap.to(col, {
            opacity: 1, y: 0,
            duration: 0.9,
            delay: 0.15 + i * 0.1,
            ease: "power3.out",
          });
        });
      },
    });

    // mouse parallax
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

    const handleScroll = () => {
      const rect     = el.getBoundingClientRect();
      const progress = 1 - Math.min(Math.max(rect.top / window.innerHeight, 0), 1);
      const y        = (1 - progress) * 100 - 50;
      text.style.transform = `translate3d(0,${y}px,0)`;
      text.style.opacity   = `${Math.min(progress * 1.3, 1)}`;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    tick();
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#050505]"
    >
      {/* BG */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url('/image (3).jpg')",
          filter: "brightness(0.70) contrast(1.2) saturate(1.05)",
        }}
      />
      {/* vignette */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 " />

      {/* ── 4-COLUMN GRID — full height ── */}
      <div className="absolute inset-0 grid grid-cols-4">

        {/* hairline dividers */}
        <div className="absolute inset-y-0 left-1/4   w-px bg-white/8" />
        <div className="absolute inset-y-0 left-2/4   w-px bg-white/8" />
        <div className="absolute inset-y-0 left-3/4   w-px bg-white/8" />
        {/* horizontal mid-line */}
        <div className="absolute inset-x-0 top-1/2    h-px bg-white/8" />

        {/* COL 1 — split top / bottom */}
        <div className="feature-col relative flex flex-col will-change-transform">
          {/* top half */}
          <div className="flex-1 flex flex-col justify-between p-8 border-b border-white/8">
            <span className="font-mono text-[9px] tracking-[0.4em] text-amber-300/50 uppercase">
              {features[0].num}
            </span>
            <div>
              <h3 className="font-serif italic font-extralight text-[2rem] leading-[1.1] tracking-tight text-white/90 mb-4">
                {features[0].label}
              </h3>
              <div className="w-7 h-px bg-amber-300/40 mb-4" />
              <p className="text-[16px] leading-[1.8] text-white/80 font-light">
                {features[0].desc}
              </p>
            </div>
          </div>
          {/* bottom half */}
          <div className="flex-1 flex flex-col justify-between p-8">
            <span className="font-mono text-[9px] tracking-[0.4em] text-amber-300/50 uppercase">
              {features[2].num}
            </span>
            <div>
              <h3 className="font-serif italic font-extralight text-[2rem] leading-[1.1] tracking-tight text-white/90 mb-4">
                {features[2].label}
              </h3>
              <div className="w-7 h-px bg-amber-300/40 mb-4" />
              <p className="text-[16px] leading-[1.8] text-white/80 font-light">
                {features[2].desc}
              </p>
            </div>
          </div>
        </div>

        {/* COL 2 — tall, center-top content, bg image peek */}
        <div className="feature-col relative overflow-hidden will-change-transform">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          <div className="relative z-10 h-full flex flex-col justify-between p-8">
            <div>
              <span className="font-mono text-[9px] tracking-[0.4em] text-amber-300/50 uppercase block mb-8">
                Fortune Cosmos
              </span>
              <h3 className="font-serif italic font-extralight text-[2rem] leading-[1.1] tracking-tight text-white/90 mb-4">
                {features[1].label}
              </h3>
              <div className="w-7 h-px bg-amber-300/40 mb-4" />
              <p className="text-[16px] leading-[1.8] text-white/80 font-light max-w-[22ch]">
                {features[1].desc}
              </p>
            </div>
            {/* bottom index */}
            
          </div>
        </div>

        {/* COL 3 — CENTER TEXT block */}
        <div
          ref={textRef}
          className="relative flex flex-col items-center justify-center text-center px-8 will-change-transform"
          style={{ transition: "transform 0.25s linear, opacity 0.25s linear" }}
        >
          <p className="text-[9px] tracking-[0.55em] text-amber-300/50 uppercase mb-6 font-light">
            Fortune Cosmos
          </p>
          <h2 className="font-serif text-[2.6rem] leading-[1.05] tracking-tight text-white mb-6">
            <span className="block font-extralight text-white/85">More Than</span>
            <span className="block font-extralight text-white/85">a Township</span>
            <span className="block mt-2 font-light text-amber-300">living ecosystem.</span>
          </h2>
          <div className="w-10 h-px bg-white/20 mb-6" />
          <p className="text-[20px] leading-[1.85] text-white/80 font-light max-w-[26ch]">
            A carefully composed environment where architecture, nature, and community
            exist in quiet balance.
          </p>
        </div>

        {/* COL 4 — split top text / bottom card */}
        <div className="feature-col relative flex flex-col will-change-transform">
          {/* top — editorial text */}
          <div className="flex-1 flex flex-col justify-between p-8 border-b border-white/8">
            <span className="font-mono text-[9px] tracking-[0.4em] text-amber-300/50 uppercase">
              Vision
            </span>
            <p className="text-[14px] leading-[1.85] text-white/55 font-light">
              Our mission is to immerse you in a lifestyle that balances refined
              aesthetics, architectural excellence, and a profound sense of community.
            </p>
          </div>
          {/* bottom */}
          <div className="flex-1 flex flex-col justify-between p-8">
            <span className="font-mono text-[9px] tracking-[0.4em] text-amber-300/50 uppercase">
              {features[3].num}
            </span>
            <div>
              <h3 className="font-serif italic font-extralight text-[2rem] leading-[1.1] tracking-tight text-white/90 mb-4">
                {features[3].label}
              </h3>
              <div className="w-7 h-px bg-amber-300/40 mb-4" />
              <p className="text-[16px] leading-[1.8] text-white/80 font-light">
                {features[3].desc}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}