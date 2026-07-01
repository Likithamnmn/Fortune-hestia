"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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
  bg-transparent border-0 border-b border-white/20 rounded-none
  text-white/90 placeholder-white/30 outline-none
  focus:border-white/50 focus:ring-0
  transition-colors duration-300
  pb-2 w-full
  [&:-webkit-autofill]:[-webkit-text-fill-color:rgba(255,255,255,0.9)]
  [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]
  [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_transparent_inset]
  [&:-webkit-autofill:hover]:[-webkit-text-fill-color:rgba(255,255,255,0.9)]
  [&:-webkit-autofill:hover]:[box-shadow:0_0_0px_1000px_transparent_inset]
  [&:-webkit-autofill:focus]:[-webkit-text-fill-color:rgba(255,255,255,0.9)]
  [&:-webkit-autofill:focus]:[box-shadow:0_0_0px_1000px_transparent_inset]
  [&:-webkit-autofill:active]:[-webkit-text-fill-color:rgba(255,255,255,0.9)]
  [&:-webkit-autofill:active]:[box-shadow:0_0_0px_1000px_transparent_inset]
`;

const fields = [
  { label: "Full Name", type: "text", placeholder: "Your name" },
  { label: "Phone Number", type: "tel", placeholder: "+91 00000 00000" },
  { label: "Email Address", type: "email", placeholder: "you@example.com" },
];

function EnquiryForm() {
  return (
    <div id="Hero" className="relative border border-white/12 bg-white/5 backdrop-blur-md p-5 md:p-7 lg:p-10 xl:p-12">
      <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E6F6BA] to-transparent" />

      <div className="mb-5 md:mb-6 lg:mb-8">
        <p className={`${jetbrainsMono.className} text-[8px] uppercase tracking-[0.5em] text-[#E6F6BA] mb-2`}>
          Private Enquiry
        </p>
        <p className={`${cormorant.className} text-lg md:text-2xl lg:text-3xl xl:text-4xl font-light text-white/90 leading-snug`}>
          Reserve your viewing
        </p>
      </div>

      <form className="space-y-5 md:space-y-6 lg:space-y-8" onSubmit={(e) => e.preventDefault()}>
        {fields.map(({ label, type, placeholder }) => (
          <div key={label} className="flex flex-col gap-2">
            <label className={`${jetbrainsMono.className} text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/50`}>
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              className={`${inter.className} font-light text-sm ${autofillReset}`}
            />
          </div>
        ))}

        <div className="pt-3 md:pt-4">
          <button
            type="submit"
            className={`${jetbrainsMono.className} w-full py-3 md:py-4 border border-white/30 text-white text-[8px] md:text-[9px] tracking-[0.4em] uppercase hover:bg-[#E6F6BA] hover:text-black transition-all duration-500`}
          >
            Send Request →
          </button>
        </div>
      </form>

      <p className={`${inter.className} mt-5 text-[10px] text-white/25 leading-relaxed font-light`}>
        Our team will reach out within 24 hours to schedule your exclusive tour.
      </p>
    </div>
  );
}

export default function Hero() {
  const images = ["/hero-1.jpg", "/hero-2.jpg"];
  const [currentImage, setCurrentImage] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            animate={{
              opacity: currentImage === index ? 1 : 0,
              scale:   currentImage === index ? 1.12 : 1,
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Image
  src={image}
  alt=""
  fill
  priority
  className="object-cover brightness-95 contrast-95 saturate-120"
/>
          </motion.div>
        ))}
      </div>

      {/* Overlay — deep green gradient for real contrast + mood */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#02150C]/75 via-[#04361F]/30 to-[#02150C]/80" />

      {/* Content — stacks on mobile, side-by-side from md (768px) up */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between min-h-screen px-6 md:px-10 lg:px-16 xl:px-20">

        {/* LEFT — headline */}
        <div className="flex flex-col justify-end md:justify-center pt-28 pb-8 md:py-0 text-white md:w-[52%] lg:w-[55%]">

            <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className={`${jetbrainsMono.className} text-sm md:text-base uppercase tracking-[0.5em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
              Fortune
            </span>
            <span className="h-px w-6 bg-[#E6F6BA]" />
            <span className={`${jetbrainsMono.className} text-sm md:text-base uppercase tracking-[0.5em] text-[#E6F6BA] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]`}>
              Hestia
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className={`${cormorant.className} font-normal text-[2.6rem] md:text-[3.8rem] lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.92] tracking-[-0.03em]`}
          >
            <span className="relative inline-block">
              Luxury Villas in<br />Sarjapur Road<br />Bangalore
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                className="absolute left-0 -bottom-3 md:-bottom-4 h-px w-full origin-left bg-white/30"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className={`${inter.className} font-light mt-7 max-w-sm text-sm text-white/55 leading-relaxed`}
          >
            Thoughtfully crafted homes that bring together contemporary living,
            open spaces, and seamless connectivity in Bengaluru's thriving IT corridor.
          </motion.p>

        </div>

        {/* RIGHT — form */}
        <div className="w-full md:w-[280px] lg:w-[380px] xl:w-[440px] flex-shrink-0 pb-12 md:py-0">
          <AnimatePresence>
            {showForm && (
              <motion.div
                key="hero-form"
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 48 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <EnquiryForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}