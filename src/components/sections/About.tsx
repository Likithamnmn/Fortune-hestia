"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["italic"],
});

const inter = Inter({ subsets: ["latin"], weight: ["300", "400"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"] });

/* ─── Typewriter ──────────────────────────────────────────────── */
function TypewriterHeading({
  text,
  start,
  speed = 55,
}: {
  text: string;
  start: boolean;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!start) { setDisplayed(""); return; }
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
      {displayed.length < text.length && (
        <span className="animate-pulse opacity-60">|</span>
      )}
    </>
  );
}

/* ─── Brochure Gate Modal ─────────────────────────────────────── */
const autofillReset = `
  bg-transparent border-0 border-b border-black/20 rounded-none
  text-black/80 placeholder-black/30 outline-none
  focus:border-black/50 focus:ring-0
  transition-colors duration-300 pb-2 w-full
  [&:-webkit-autofill]:[-webkit-text-fill-color:rgba(0,0,0,0.8)]
  [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]
  [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_transparent_inset]
  [&:-webkit-autofill:hover]:[-webkit-text-fill-color:rgba(0,0,0,0.8)]
  [&:-webkit-autofill:hover]:[box-shadow:0_0_0px_1000px_transparent_inset]
  [&:-webkit-autofill:focus]:[-webkit-text-fill-color:rgba(0,0,0,0.8)]
  [&:-webkit-autofill:focus]:[box-shadow:0_0_0px_1000px_transparent_inset]
  [&:-webkit-autofill:active]:[-webkit-text-fill-color:rgba(0,0,0,0.8)]
  [&:-webkit-autofill:active]:[box-shadow:0_0_0px_1000px_transparent_inset]
`;

const gateFields = [
  { label: "Full Name",     type: "text",  placeholder: "Your name" },
  { label: "Phone Number",  type: "tel",   placeholder: "+91 00000 00000" },
  { label: "Email Address", type: "email", placeholder: "you@example.com" },
];

function BrochureModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // trigger download
    const a = document.createElement("a");
    a.href = "/brochure.pdf";
    a.download = "Fortune-Hestia-Brochure.pdf";
    a.click();
    // close after short delay
    setTimeout(onClose, 2000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 bg-[#FAF7F0] w-full max-w-md p-8 md:p-10"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className={`${jetbrainsMono.className} absolute top-4 right-5 text-[10px] tracking-[0.3em] text-black/30 hover:text-black transition-colors`}
        >
          ✕ CLOSE
        </button>

        {!submitted ? (
          <>
            <p className={`${jetbrainsMono.className} text-[8px] uppercase tracking-[0.5em] text-amber-600/70 mb-2`}>
              Download Brochure
            </p>
            <p className={`${cormorant.className} text-3xl font-light text-black/90 leading-snug mb-8`}>
              A few details first
            </p>

            <form className="space-y-7" onSubmit={handleSubmit}>
              {gateFields.map(({ label, type, placeholder }) => (
                <div key={label} className="flex flex-col gap-2">
                  <label className={`${jetbrainsMono.className} text-[8px] uppercase tracking-[0.4em] text-black/40`}>
                    {label}
                  </label>
                  <input
                    required
                    type={type}
                    placeholder={placeholder}
                    className={`${inter.className} font-light text-sm ${autofillReset}`}
                  />
                </div>
              ))}

              <div className="pt-4">
                <button
                  type="submit"
                  className={`${jetbrainsMono.className} w-full py-4 border border-black/20 text-black text-[8px] tracking-[0.4em] uppercase hover:bg-black hover:text-white transition-all duration-500`}
                >
                  Download Brochure ↓
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <p className={`${cormorant.className} text-3xl font-light text-black/80 mb-3`}>
              Your brochure is downloading
            </p>
            <p className={`${inter.className} text-sm text-black/40 font-light`}>
              Thank you. Our team will be in touch shortly.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── About Section ───────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const isInView = useInView(sectionRef, { amount: 0.2, once: false });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-[#FAF7F0] py-16 lg:py-20 overflow-hidden"
      >
        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px_1fr] items-center gap-8 lg:gap-12 xl:gap-16">

            {/* ── LEFT — heading ── */}
            <div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`${cormorant.className} italic font-light text-4xl md:text-5xl lg:text-6xl xl:text-[4.2rem] leading-[1.0] tracking-[-0.03em] text-black`}
              >
                <TypewriterHeading
                  start={isInView}
                  speed={55}
                  text="Contemporary Villas Designed for Timeless Living"
                />
              </motion.h2>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={isInView ? { width: "3.5rem", opacity: 1 } : { width: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-7 h-px bg-black/15"
              />
            </div>

            {/* ── CENTER — image (constrained height) ── */}
            <div className="relative overflow-hidden h-[380px] md:h-[460px] lg:h-[520px]">
              <motion.div style={{ y: imageY }} className="absolute inset-0">
                <Image
                  src="/image (6).jpg"
                  alt="Fortune Hestia Villa"
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* ── RIGHT — body + CTA ── */}
            <div className="flex flex-col justify-center">

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className={`${inter.className} text-sm md:text-base leading-relaxed text-gray-400 font-light text-left lg:text-right`}
              >
                Designed with care and crafted for modern families, every villa brings together contemporary architecture, open spaces and timeless comfort, creating a home that welcomes you with warmth every day.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.8, delay: 0.28 }}
                className={`${inter.className} mt-5 text-sm md:text-base leading-relaxed text-gray-400 font-light text-left lg:text-right`}
              >
                Thoughtfully located off Sarjapur Road, with seamless connectivity to Bengaluru's leading IT hubs, renowned schools and everyday conveniences.
              </motion.p>

              <motion.button
                type="button"
                onClick={() => setShowModal(true)}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.8, delay: 0.42 }}
                className={`${jetbrainsMono.className} mt-8 self-start lg:self-end inline-flex items-center gap-3 py-4 px-8 border border-black/20 text-black text-[9px] tracking-[0.4em] uppercase hover:bg-black hover:text-white transition-all duration-500`}
              >
                Download Brochure ↓
              </motion.button>

            </div>

          </div>
        </div>
      </section>

      {/* Brochure gate modal */}
      {showModal && <BrochureModal onClose={() => setShowModal(false)} />}
    </>
  );
}