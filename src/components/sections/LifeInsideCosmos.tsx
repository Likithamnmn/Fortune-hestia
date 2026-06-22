"use client";

import { useEffect, useRef } from "react";

const features = [
  { label: "50 Acres" },
  { label: "Landscaped Gardens" },
  { label: "Premium Infrastructure" },
  { label: "Community Living" },
];

export default function LifeInsideCosmos() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const progress = rect.top * 0.15;

      const bg = el.querySelector(".parallax-bg") as HTMLElement;
      if (bg) {
        bg.style.transform = `translateY(${progress}px) scale(1.1)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <div
        className="parallax-bg absolute inset-0 scale-110 bg-cover bg-center transition-transform duration-300"
        style={{
          backgroundImage: "url('/image (3).jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Center content */}
      <div className="relative z-10 max-w-4xl text-center px-6">
        <h2 className="font-serif text-5xl md:text-7xl leading-tight text-white">
          More Than a Township. <br />
          A Living Ecosystem.
        </h2>

        <p className="mt-8 text-lg text-white/70 leading-relaxed">
          Fortune Cosmos brings together luxury residences, green spaces,
          premium amenities, and vibrant community living within a carefully
          planned environment.
        </p>
      </div>

      {/* Bigger Floating Feature Cards */}
      {features.map((item, i) => (
        <div
          key={item.label}
          className="absolute group"
          style={{
            top: `${22 + i * 17}%`,
            left: i % 2 === 0 ? "8%" : "72%",
            animationDelay: `${i * 200}ms`,
          }}
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-3xl bg-white/10 blur-2xl opacity-40 group-hover:opacity-60 transition" />

          {/* Card */}
          <div
            className="
               relative
  px-10 py-6
  rounded-3xl

  border border-white/70
  ring-1 ring-white/10

  bg-white/5 backdrop-blur-md
  text-white text-base md:text-lg
  tracking-wide

  shadow-[0_0_50px_rgba(255,255,255,0.08)]

  animate-float
  transition-all duration-300

  border-white/30
  ring-white/20
  bg-white/10
  shadow-[0_0_90px_rgba(255,255,255,0.18)]
            "
          >
            {/* Accent dot */}
           

            {item.label}
          </div>
        </div>
      ))}
    </section>
  );
}