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
  bg-transparent border-b border-white/20 text-white py-2.5 outline-none
  focus:border-amber-400/70 transition-colors duration-300
  [&:-webkit-autofill]:bg-transparent
  [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_transparent]
  [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]
  [&:-webkit-autofill]:[-webkit-text-fill-color:rgba(255,255,255,0.95)]
`;

const fields = [
  { label: "Name", type: "text", placeholder: "Your full name" },
  { label: "Email", type: "email", placeholder: "you@example.com" },
  { label: "Phone", type: "tel", placeholder: "+91 00000 00000" },
  { label: "Preferred Date", type: "text", placeholder: "DD / MM / YYYY" },
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
      className="relative min-h-screen overflow-hidden bg-black grid grid-cols-1 md:grid-cols-[1.25fr_1fr]"
    >
      {/* LEFT — image panel */}
      <div className="relative flex flex-col justify-end px-8 md:px-16 py-20 md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/image (3).jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />
        </div>

        <div
          className={`relative z-10 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.45em] text-white/40`}>
              Fortune Hestia
            </span>
            <span className="h-px w-5 bg-amber-400/50" />
            <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.45em] text-amber-400/70`}>
              Private Residences
            </span>
          </div>

          <h2 className={`${cormorant.className} font-light text-[3rem] md:text-[4.4rem] lg:text-[5.6rem] leading-[0.95] tracking-[-0.02em] text-white`}>
            Experience
            <br />
            <span className="italic text-white/85">Timeless</span>
            <br />
            <span className="not-italic font-normal text-amber-400">Villa Living</span>
          </h2>

          <p className={`${inter.className} font-light mt-8 text-white/55 leading-relaxed text-base md:text-lg max-w-[42ch]`}>
            Discover thoughtfully crafted 4 BHK luxury villas off Sarjapur Road, where timeless design, comfort and contemporary living come together.
          </p>

          <div className="mt-10 w-14 h-px bg-amber-400/40" />
        </div>
      </div>

      {/* RIGHT — solid color panel, full bleed */}
      <div
        className={`relative flex flex-col justify-center bg-[#10231c] px-10 md:px-16 py-20 md:py-24 transition-all duration-1000 delay-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.45em] text-amber-400/70 mb-6`}>
          Request a Visit
        </p>

        <h3 className={`${cormorant.className} font-normal text-[2.6rem] md:text-[3.4rem] leading-[1.02] text-white mb-3`}>
          Envision <span className="italic text-white/80">your life</span>
          <br />
          at <span className="text-amber-400">Hestia</span>
        </h3>

        <p className={`${inter.className} font-light text-white/45 text-sm mb-12 max-w-[36ch]`}>
          Our team will reach out personally to arrange your private tour.
        </p>

        <form className="space-y-8">
          {fields.map(({ label, type, placeholder }) => (
            <div key={label} className="flex flex-col gap-2">
              <label className={`${jetbrainsMono.className} text-[8px] uppercase tracking-[0.4em] text-white/45`}>
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                className={`${inter.className} font-light text-sm ${autofillReset}`}
              />
            </div>
          ))}

          <div className="pt-6">
            <button
              type="submit"
              className={`${jetbrainsMono.className} group w-full py-4 rounded-full bg-amber-400 text-black text-[9px] tracking-[0.4em] uppercase transition-all duration-500 hover:bg-amber-300 flex items-center justify-center gap-3`}
            >
              Send Request
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </form>

        <p className={`${inter.className} font-light mt-8 text-white/25 text-[10.5px] leading-relaxed max-w-[34ch]`}>
          By sending your request, you're agreeing to our privacy policy. We keep your personal information safe and secure.
        </p>
      </div>
    </section>
  );
}