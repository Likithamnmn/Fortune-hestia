"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PrivateTourCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/coco.jpg"
          alt="Background"
          fill
          className="object-cover scale-105"
          priority
        />

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,101,52,0.10),transparent_60%)]" />
      </div>

      {/* ASYMMETRIC LAYOUT */}
      <div className="relative z-10 w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-5 gap-10 items-center">

        {/* LEFT (dominant visual text block) */}
        <div
          className={`md:col-span-3 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-6xl md:text-7xl leading-[1.05] text-white">
            Experience <br />
            Luxury Living <br />
            Firsthand
          </h2>

          <div className="mt-8 max-w-xl">
            <p className="text-white/70 leading-relaxed text-lg">
              The best way to understand Fortune Hestia is to step inside it.
              A private visit reveals a lifestyle shaped by nature, space, and quiet luxury.
            </p>
          </div>

          {/* subtle accent line */}
          <div className="mt-10 w-24 h-[2px] bg-[#166534]" />
        </div>

        {/* RIGHT (floating form card) */}
        <div
          className={`md:col-span-2 transition-all duration-1000 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="p-6  bg-[#047857] shadow-[0_0_90px_rgba(0,0,0,0.4)] border border-white/10">
            <form className="space-y-4">

              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/40 outline-none"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/40 outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/40 outline-none"
              />

              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none"
              />

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-white text-black hover:scale-[1.02] transition"
              >
                Book Your Private Tour
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}