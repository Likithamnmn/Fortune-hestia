"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const blogs = [
  {
    id: 1,
    image: "/mojo1 (1).jpg",
    tag: "Lifestyle",
    readTime: "1.5 mins",
    cardTitle: "FORTUNE HESTIA",
    description:
      "The sound of laughter spilling out of large windows. Cosy family gatherings on the spacious terrace. Homes filled with warmth and light. Welcome to Fortune Hestia, our limited edition villas within the Cosmos enclave.",
    accent: "from-amber-5 to-transparent",
    dot: "bg-amber-400",
    blogTitle:
      "The Art of Fine Living: Welcome to the Limited-Edition Villas of Fortune Hestia",
    fullContent: `True luxury isn't just about premium materials; it's about the feeling a home evokes. Tucked away within the grand 50-acre, Greek-inspired Fortune Cosmos township, Fortune Hestia is designed to capture life's finest moments.\n\nImagine sun-drenched rooms where morning light floods through expansive windows, and quiet evenings spent hosting family gatherings on your large, private terrace. Built on generous plots (up to 50'x80'), these exclusive 4BHK luxury villas offer a rare blend of expansive privacy and vibrant community spirit. Located off Sarjapur Road, it is a peaceful, gated sanctuary that brings warmth, architectural elegance, and elite living together in perfect harmony.`,
  },
  {
    id: 2,
    image: "/mojo1 (2).jpg",
    tag: "Infrastructure",
    readTime: "2 mins",
    cardTitle: "ENGINEERED FOR THE MONSOONS",
    description:
      "While heavy rainfall challenges modern urban infrastructure across Bangalore, Fortune Cosmos stands prepared. Discover how our elite internal drainage networks, scientifically planned soil retention, and robust civil engineering ensure absolute safety, uncompromising luxury, and peace of mind all year round.",
    accent: "from-sky-500/10 to-transparent",
    dot: "bg-sky-400",
    blogTitle:
      "Engineered for the Monsoons: Why Infrastructure Matters at Fortune Cosmos",
    fullContent: `Every monsoon, Bangalore's rapid urban growth is put to the test. While waterlogging, failing storm-water systems, and poor street planning heavily disrupt major tech corridors like Whitefield and Marathahalli, Fortune Cosmos stands prepared as an exception.\n\nTrue luxury means absolute peace of mind, even during the heaviest downpours. Our township features advanced internal drainage networks engineered specifically to handle extreme rain cycles without pooling. Combined with scientifically calculated soil retention walls and robust civil foundation designs, we protect your property investment from structural wear and erosion. At Fortune Cosmos, uncompromising premium living is backed by world-class structural foresight.`,
  },
  
];

type Blog = (typeof blogs)[0];

const fontSerif = '"Cormorant Garamond", "Times New Roman", serif';
const fontSans = '"Inter", ui-sans-serif, system-ui, sans-serif';
const fontMono = '"JetBrains Mono", ui-monospace, monospace';

/* ---------------- MODAL ---------------- */

function BlogModal({ blog, onClose }: { blog: Blog; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] flex flex-col rounded-t-3xl sm:rounded-2xl overflow-hidden bg-[#0b0b0b] border border-white/10"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Hero Image */}
          <div className="relative h-56 shrink-0">
            <Image
              src={blog.image}
              alt={blog.blogTitle}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/30 to-transparent" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#121212]/50 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white transition"
            >
              <X size={14} />
            </button>

            {/* Tag */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${blog.dot}`} />
              <span
                style={{ fontFamily: fontMono }}
                className="text-[9px] uppercase tracking-[0.3em] text-white/50"
              >
                {blog.tag}
              </span>
              <span
                style={{ fontFamily: fontMono }}
                className="text-[9px] tracking-[0.2em] text-white/25 ml-2"
              >
                {blog.readTime}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-5">
            <h2
              style={{ fontFamily: fontSerif }}
              className="text-white font-light italic text-2xl sm:text-3xl leading-snug tracking-[-0.02em]"
            >
              {blog.blogTitle}
            </h2>

            <div className="h-px w-12 bg-white/10" />

            {blog.fullContent.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{ fontFamily: fontSans }}
                className="text-white/55 font-light text-sm leading-7"
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------------- CARD ---------------- */

function BlogCard({ blog, onOpen }: { blog: Blog; onOpen: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={onOpen}
      className="cursor-pointer group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <Image
          src={blog.image}
          alt={blog.cardTitle}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[#121212]/35 group-hover:bg-black/20 transition" />

        {/* Tag pill on image */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${blog.dot}`} />
          <span
            style={{ fontFamily: fontMono }}
            className="text-[9px] uppercase tracking-[0.3em] text-white/50"
          >
            {blog.tag}
          </span>
        </div>

        {/* Read time */}
        <div className="absolute top-4 right-4">
          <span
            style={{ fontFamily: fontMono }}
            className="text-[9px] tracking-[0.2em] text-white/30"
          >
            {blog.readTime}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">

        {/* Card Title — Mono caps */}
        <p
          style={{ fontFamily: fontMono }}
          className="text-[9px] uppercase tracking-[0.35em] text-white/30 mb-3"
        >
          {blog.cardTitle}
        </p>

        {/* Description — Cormorant italic */}
        <h3
          style={{ fontFamily: fontSerif }}
          className="font-light italic text-xl leading-snug text-white/90 group-hover:text-[#E6F6BA] transition-colors duration-300 tracking-[-0.01em] flex-1"
        >
          {blog.description}
        </h3>

        {/* Read more */}
        <div className="mt-6 flex items-center gap-2">
          <span
            style={{ fontFamily: fontMono }}
            className="text-[9px] uppercase tracking-[0.25em] text-white/20 group-hover:text-[#E6F6BA] transition-colors duration-300"
          >
            Read Article
          </span>
          <div className="h-px w-6 bg-white/15 group-hover:w-10 group-hover:bg-[#E6F6BA]/40 transition-all duration-500" />
        </div>

      </div>
    </motion.div>
  );
}

/* ---------------- PAGE ---------------- */

export default function BlogPage() {
  const [active, setActive] = useState<Blog | null>(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  return (
    <main className="min-h-screen bg-[#121212] text-white px-6 py-32">

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isHeadingInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-3 mb-8"
      >
        <span className="h-px w-8 bg-[#E6F6BA]" />
        <span
          style={{ fontFamily: fontMono }}
          className="text-[9px] uppercase tracking-[0.4em] text-white/60"
        >
          Fortune Hestia
        </span>
        <span className="h-px w-8 bg-[#E6F6BA]" />
      </motion.div>

      {/* Main Heading */}
      <div className="text-center mb-16">
        <motion.h1
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: fontSerif }}
          className="font-light italic text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.05]"
        >
          Our Latest{" "}
          <span className="not-italic font-normal text-[#E6F6BA]">
            Insights & News
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isHeadingInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.8 }}
          style={{ fontFamily: fontSans }}
          className="text-white/40 font-light mt-5 text-base tracking-wide"
        >
          Architecture, lifestyle, and design philosophy.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogs.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <BlogCard blog={b} onOpen={() => setActive(b)} />
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <BlogModal blog={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>

    </main>
  );
}