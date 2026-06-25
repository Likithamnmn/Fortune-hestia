"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

const autofillReset = `
  bg-transparent border-b border-white/20 text-white py-2 outline-none
  focus:border-white/55 transition-colors duration-300
  [&:-webkit-autofill]:bg-transparent
  [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_transparent]
  [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]
  [&:-webkit-autofill]:[-webkit-text-fill-color:rgba(255,255,255,0.9)]
`;

const fields = [
  { label: "Name",           type: "text" },
  { label: "Email",          type: "email" },
  { label: "Phone",          type: "tel" },
  { label: "Preferred Date", type: "text" },
];

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
      id="contact"
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center bg-black"
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
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
      </div>

      {/* Layout */}
      <div className="relative z-10 w-full max-w-[1400px] px-8 md:px-16 py-24 grid grid-cols-1 md:grid-cols-[3.2fr_1.8fr] gap-0 items-end min-h-screen">

        {/* LEFT */}
        <div
          className={`flex flex-col justify-end pb-24 pr-16 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Eyebrow — Mono */}
          <div className="flex items-center gap-3 mb-10">
            <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.45em] text-white/25`}>
              Fortune Hestia
            </span>
            <span className="h-px w-5 bg-amber-400/30" />
            <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.45em] text-amber-400/45`}>
              Private Residences
            </span>
          </div>

          {/* Heading — Cormorant */}
          <h2 className={`${cormorant.className} font-light text-[4rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.92] tracking-[-0.03em] text-white`}>
            Experience the
            <br />
            <span className="italic text-white/75">Essence</span>
            <br />
            <span className="not-italic font-normal text-amber-400">of Calm Living</span>
          </h2>

          {/* Body — Inter light */}
          <p className={`${inter.className} font-light mt-10 text-white/40 leading-relaxed text-base md:text-lg max-w-[38ch]`}>
            Experience the harmony of timeless design and wellness-centered living.
            Schedule a private viewing or request a brochure to begin your journey
            toward refined serenity.
          </p>

          <div className="mt-12 w-14 h-px bg-white/15" />
        </div>

        {/* RIGHT — form */}
        <div
          className={`flex flex-col justify-start pt-28 pl-8 border-l border-white/8 transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Form intro — Cormorant italic */}
          <p className={`${cormorant.className} font-light italic text-white/40 text-xl mb-12 leading-snug`}>
            Envision your life
            <br />
            at Hestia
          </p>

          <form className="space-y-9">
            {fields.map(({ label, type }) => (
              <div key={label} className="flex flex-col gap-2">
                {/* Field label — Mono */}
                <label className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.4em] text-white/80`}>
                  {label}
                </label>
                {/* Input — Inter light */}
                <input
                  type={type}
                  className={`${inter.className} font-light text-sm ${autofillReset}`}
                />
              </div>
            ))}

            <div className="pt-6">
              {/* Button — Mono */}
              <button
                type="submit"
                className={`${jetbrainsMono.className} w-full py-4 border border-white/30 text-white text-[9px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500`}
              >
                Send Request →
              </button>
            </div>
          </form>

          {/* Disclaimer — Inter light */}
          <p className={`${inter.className} font-light mt-8 text-white/20 text-[11px] leading-relaxed max-w-[32ch]`}>
            By sending your request, you're agreeing to our privacy policy.
            We keep your personal information safe and secure.
          </p>
        </div>

      </div>
    </section>
  );
}