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
    title:
      "The Art of Fine Living: Welcome to the Limited-Edition Villas of Fortune Hestia",
    description:
      "Luxury living focused on emotion, space, and exclusivity in Fortune Hestia villas — where every corner is an intentional expression of refined taste.",
    accent: "from-amber-500/10 to-transparent",
    dot: "bg-amber-400",
    dotColor: "rgba(251,191,36,0.15)",
    fullContent: `There are homes, and then there are sanctuaries...`,
  },
  {
    id: 2,
    image: "/mojo1 (2).jpg",
    tag: "Infrastructure",
    readTime: "2 mins",
    title:
      "Engineered for the Monsoons: Why Infrastructure Matters at Fortune Cosmos",
    description:
      "Advanced drainage and civil engineering systems ensuring monsoon resilience — because true luxury means never worrying about what nature brings.",
    accent: "from-sky-500/10 to-transparent",
    dot: "bg-sky-400",
    dotColor: "rgba(56,189,248,0.15)",
    fullContent: `Bangalore's monsoons are beautiful, relentless...`,
  },
  {
    id: 3,
    image: "/mojo1 (3).jpg",
    tag: "Smart Living",
    readTime: "1.5 mins",
    title: "Subtle & Seamless: Redefining Smart Living at Fortune Cosmos",
    description:
      "Invisible smart home automation integrated into modern luxury living — technology that anticipates your needs before you do.",
    accent: "from-violet-500/10 to-transparent",
    dot: "bg-violet-400",
    dotColor: "rgba(167,139,250,0.15)",
    fullContent: `The best technology disappears...`,
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
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] flex flex-col rounded-t-3xl sm:rounded-2xl overflow-hidden bg-[#0b0b0b] border border-white/10"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
        >
          {/* Modal Header */}
          <div className="flex justify-between px-6 py-4 border-b border-white/10">
            <div className="flex gap-3 items-center">
              <span className={`w-1.5 h-1.5 rounded-full ${blog.dot}`} />
              <span
                style={{ fontFamily: fontMono }}
                className="text-[10px] uppercase tracking-[0.3em] text-white/35"
              >
                {blog.tag}
              </span>
            </div>
            <button onClick={onClose}>
              <X className="text-white/50" size={15} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-5">
            <h2
              style={{ fontFamily: fontSerif }}
              className="text-white font-light italic text-2xl sm:text-3xl leading-snug tracking-[-0.02em]"
            >
              {blog.title}
            </h2>
            <p
              style={{ fontFamily: fontSans }}
              className="text-white/55 font-light text-sm leading-7"
            >
              {blog.fullContent}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------------- CARD ---------------- */

function BlogCard({ blog, onOpen }: { blog: Blog; onOpen: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -6 }}
      onClick={onOpen}
      className="cursor-pointer group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Tag + read time — mono */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${blog.dot}`} />
            <span
              style={{ fontFamily: fontMono }}
              className="text-[9px] uppercase tracking-[0.3em] text-white/35"
            >
              {blog.tag}
            </span>
          </div>
          <span
            style={{ fontFamily: fontMono }}
            className="text-[9px] tracking-[0.2em] text-white/25"
          >
            {blog.readTime}
          </span>
        </div>

        {/* Title — Cormorant Garamond */}
        <h3
          style={{ fontFamily: fontSerif }}
          className="font-light italic text-xl leading-snug text-white/90 group-hover:text-amber-300 transition-colors duration-300 tracking-[-0.01em]"
        >
          {blog.title}
        </h3>

        {/* Description — Inter light */}
        <p
          style={{ fontFamily: fontSans }}
          className="text-white/45 font-light text-sm mt-3 leading-relaxed"
        >
          {blog.description}
        </p>

        {/* Read more hint */}
        <div className="mt-5 flex items-center gap-2">
          <span
            style={{ fontFamily: fontMono }}
            className="text-[9px] uppercase tracking-[0.25em] text-white/20 group-hover:text-white/40 transition-colors duration-300"
          >
            Read
          </span>
          <div className="h-px w-6 bg-white/15 group-hover:w-10 group-hover:bg-amber-400/40 transition-all duration-500" />
        </div>

      </div>
    </motion.div>
  );
}

/* ---------------- PAGE ---------------- */

export default function BlogPage() {
  const [active, setActive] = useState<Blog | null>(null);

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-32">

      {/* Hero */}
      <div className="text-center mb-16">
        <h1
          style={{ fontFamily: fontSerif }}
          className="font-light italic text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.05]"
        >
          Stories of{" "}
          <span className="text-amber-400 not-italic font-normal">Luxury Living</span>
        </h1>
        <p
          style={{ fontFamily: fontSans }}
          className="text-white/40 font-light mt-5 text-base tracking-wide"
        >
          Architecture, lifestyle, and design philosophy.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogs.map((b) => (
          <BlogCard key={b.id} blog={b} onOpen={() => setActive(b)} />
        ))}
      </div>

      {/* Modal */}
      {active && (
        <BlogModal blog={active} onClose={() => setActive(null)} />
      )}
    </main>
  );
}