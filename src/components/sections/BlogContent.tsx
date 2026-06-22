"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";

const blogs = [
  {
    id: 1,
    tag: "Lifestyle",
    readTime: "1.5 mins",
    title: "The Art of Fine Living: Welcome to the Limited-Edition Villas of Fortune Hestia",
    description:
      "Luxury living focused on emotion, space, and exclusivity in Fortune Hestia villas — where every corner is an intentional expression of refined taste.",
    accent: "from-amber-500/10 to-transparent",
    dot: "bg-amber-400",
    dotColor: "rgba(251,191,36,0.15)",
    fullContent: `There are homes, and then there are sanctuaries. Fortune Hestia belongs firmly in the second category — a limited collection of villas designed not just for habitation, but for a life fully and deliberately lived.

From the moment you step through the entrance, you sense it. The proportions feel generous yet intimate. The materials — stone, brass, aged oak — speak of permanence in an age of the disposable. The light, carefully choreographed by the architecture, moves through each space like a quiet resident.

**Spaces That Breathe**

Each villa in Fortune Hestia is designed around a simple but radical principle: every square foot must earn its place. There are no wasted corridors, no rooms that exist merely to fill a floor plan. Instead, every transition from one space to another is an experience in itself — a shift in ceiling height, a change in material underfoot, a view revealed.

The living spaces open generously onto private gardens, blurring the boundary between interior luxury and outdoor serenity. Morning light floods the east-facing bedrooms. The kitchen is positioned to catch the evening breeze.

**The Emotion of Exclusivity**

Exclusivity, at Fortune Hestia, is not a marketing term. It is a felt reality. With only a limited number of villas, your neighbours are few, your privacy absolute, your sense of belonging to something rare and enduring — genuine.

This is fine living as it was always meant to be: not a display, but a feeling.`,
  },
  {
    id: 2,
    tag: "Infrastructure",
    readTime: "2 mins",
    title: "Engineered for the Monsoons: Why Infrastructure Matters at Fortune Cosmos",
    description:
      "Advanced drainage and civil engineering systems ensuring monsoon resilience — because true luxury means never worrying about what nature brings.",
    accent: "from-sky-500/10 to-transparent",
    dot: "bg-sky-400",
    dotColor: "rgba(56,189,248,0.15)",
    fullContent: `Bangalore's monsoons are beautiful, relentless, and unforgiving to poorly planned developments. At Fortune Cosmos, we made a decision early in the design process: the infrastructure would be engineered to the same standard as the architecture itself.

**The Hidden Work**

Most of what makes Fortune Cosmos monsoon-resilient is invisible — and intentionally so. Beneath the landscaped pathways and villa driveways lies a carefully designed storm-water drainage network, sized not for average rainfall but for the peaks that Bangalore's southwest monsoon occasionally delivers.

The network incorporates French drains, percolation pits, and a central retention pond that serves dual purpose: flood mitigation during peak rainfall and a year-round water feature during drier months.

**Civil Engineering as a Luxury Amenity**

We think of the civil infrastructure at Fortune Cosmos as a luxury amenity that you will never consciously enjoy — because when it works perfectly, you simply never think about it. Your villa remains dry. The pathways drain within minutes of a downpour. The garden bounces back.

**Rainwater Harvesting**

The system is also designed to capture and reuse. Rooftop collection channels feed underground storage tanks, which in turn supply garden irrigation during dry months. It is infrastructure that gives back as much as it protects.

True luxury, we believe, is never having to worry about what the sky might bring. Fortune Cosmos was built with that conviction at its core.`,
  },
  {
    id: 3,
    tag: "Smart Living",
    readTime: "1.5 mins",
    title: "Subtle & Seamless: Redefining Smart Living at Fortune Cosmos",
    description:
      "Invisible smart home automation integrated into modern luxury living — technology that anticipates your needs before you do.",
    accent: "from-violet-500/10 to-transparent",
    dot: "bg-violet-400",
    dotColor: "rgba(167,139,250,0.15)",
    fullContent: `The best technology disappears. It becomes so woven into the rhythm of your life that you stop noticing it — and start simply living better. This is the philosophy behind smart living at Fortune Cosmos.

**Automation That Anticipates**

Each villa comes equipped with a home automation system that learns your routines over time. The morning light in your bedroom begins to brighten fifteen minutes before your alarm. The climate control adjusts to the outdoor temperature before you feel it change. The garden irrigation runs in the pre-dawn hours, never interrupting an afternoon on the terrace.

None of this requires deliberate instruction. The system observes, adapts, and eventually anticipates.

**The Interface Is Absence**

We made a deliberate choice not to fill the villas with screens and panels. There are no dashboards cluttering the walls, no complex interfaces demanding your attention. Control, when you want it, comes through a single app or a simple voice command. When you don't want it, the system simply runs.

**Security, Silently**

The smart system extends to security — perimeter sensors, smart locks, and camera integration that activates only when relevant. Your privacy is as protected as your home.

**A Note on Connectivity**

Fortune Cosmos is built with fibre-optic backbone infrastructure, ensuring that the smart systems that depend on connectivity never falter. It is, in the truest sense, a connected community — one where technology serves life, rather than the other way around.`,
  },
];

type Blog = typeof blogs[0];

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal panel */}
        <motion.div
          className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(18,18,18,0.98) 0%, rgba(10,10,10,0.99) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Drag handle (mobile) */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-7 pt-5 pb-5 border-b border-white/[0.07] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: blog.dotColor.replace("0.15", "0.9") }}
              />
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">{blog.tag}</span>
              <span className="text-white/20 text-xs">·</span>
              <span className="text-xs text-white/30">{blog.readTime} read</span>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              <X size={14} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1 px-7 py-7 scroll-smooth">
            <h2 className="font-serif text-2xl sm:text-3xl text-white leading-snug mb-8">
              {blog.title}
            </h2>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              <div className="w-1 h-1 rounded-full bg-white/20" />
            </div>

            {/* Body content */}
            <div className="space-y-5 text-white/60 text-sm leading-[1.85]">
              {blog.fullContent.split("\n\n").map((para, i) => {
                if (para.startsWith("**") && para.endsWith("**")) {
                  return (
                    <h4 key={i} className="text-white/90 font-medium text-base mt-8 mb-2">
                      {para.replace(/\*\*/g, "")}
                    </h4>
                  );
                }
                // Handle inline bold
                const parts = para.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p key={i}>
                    {parts.map((part, j) =>
                      part.startsWith("**") ? (
                        <strong key={j} className="text-white/85 font-medium">
                          {part.replace(/\*\*/g, "")}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              })}
            </div>

            {/* Bottom padding for scroll comfort */}
            <div className="h-8" />
          </div>

          {/* Footer CTA */}
          <div className="px-7 py-5 border-t border-white/[0.07] flex-shrink-0">
            <a
              href="/#contact"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-xs uppercase tracking-[0.25em] transition-all duration-300"
              style={{
                background: blog.dotColor,
                border: `1px solid ${blog.dotColor.replace("0.15", "0.3")}`,
                color: "rgba(255,255,255,0.7)",
              }}
              onClick={onClose}
            >
              Enquire About This Villa
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function BlogCard({ blog, index, onOpen }: { blog: Blog; index: number; onOpen: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.09)",
      }}
      onClick={onOpen}
    >
      {/* Top accent gradient */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${blog.accent}`} />

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ boxShadow: "0 8px 60px rgba(255,255,255,0.04), inset 0 0 30px rgba(255,255,255,0.02)" }}
      />

      {/* Card content */}
      <div className="relative z-10 p-7 flex flex-col flex-1">
        {/* Tag + read time */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${blog.dot}`} />
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">{blog.tag}</span>
          </div>
          <span className="text-xs text-white/30 tracking-wide">{blog.readTime} read</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl md:text-2xl text-white leading-snug group-hover:text-white/90 transition-colors duration-300 flex-1">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="mt-4 text-sm text-white/45 leading-relaxed">{blog.description}</p>

        {/* Read more */}
        <div className="mt-7 pt-5 border-t border-white/[0.07] flex items-center gap-2">
          <span className="text-xs uppercase tracking-[0.25em] text-white/30 group-hover:text-white/60 transition-colors duration-300">
            Read Article
          </span>
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            className="text-white/30 group-hover:text-white/60 transition-all duration-300 group-hover:translate-x-1"
          >
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogContent() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);

  return (
    <>
      <main className="min-h-screen bg-[#050505]">
        {/* Hero */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-8 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(160,130,80,0.3) 0%, transparent 70%)" }}
          />

          <div ref={heroRef} className="mx-auto max-w-5xl text-center">
            <motion.span
              className="block text-xs uppercase tracking-[0.5em] text-amber-400/70 mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Fortune Hestia Journal
            </motion.span>

            <motion.h1
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05]"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={isHeroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Stories of
              <br />
              <span className="text-amber-300/90">Refined Living</span>
            </motion.h1>

            <motion.p
              className="mt-8 mx-auto max-w-2xl text-base md:text-lg text-white/50 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Insights on architecture, luxury living, and the philosophy behind every space we craft at Fortune Cosmos.
            </motion.p>

            <motion.div
              className="mt-12 mx-auto flex items-center gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-white/20" />
            </motion.div>
          </div>
        </section>

        {/* Blog Cards Grid */}
        <section className="px-6 pb-28 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} onOpen={() => setActiveBlog(blog)} />
            ))}
          </div>

          {/* Subscribe nudge */}
          <motion.div
            className="mt-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-10 py-7 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(196,160,90,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                border: "1px solid rgba(196,160,90,0.15)",
              }}
            >
              <div className="text-left">
                <p className="text-white text-sm font-medium">Stay updated</p>
                <p className="text-white/40 text-xs mt-0.5">New articles on luxury &amp; lifestyle</p>
              </div>
              <a
                href="/#contact"
                className="flex-shrink-0 px-6 py-3 bg-amber-400/10 border border-amber-400/30 text-amber-400/80 text-xs uppercase tracking-[0.25em] rounded-full hover:bg-amber-400/20 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Blog Modal */}
      <AnimatePresence>
        {activeBlog && (
          <BlogModal blog={activeBlog} onClose={() => setActiveBlog(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
