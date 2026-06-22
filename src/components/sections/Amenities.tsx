"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const amenities = [
  {
    title: "Clubhouse",
    desc: "A social hub for recreation and connection.",
    image: "/clubhouse.jpeg",
  },
  {
    title: "Swimming Pool",
    desc: "Relax, recharge, and unwind.",
    image: "/pool.jpeg",
  },
  {
    title: "Landscaped Gardens",
    desc: "Nature integrated into everyday life.",
    image: "/garden.jpeg",
  },
  {
    title: "Sports Facilities",
    desc: "Designed for active lifestyles.",
    image: "/sports.jpeg",
  },
  {
    title: "Children's Play Area",
    desc: "Safe spaces for young explorers.",
    image: "/kids.jpg",
  },
  {
    title: "Community Spaces",
    desc: "Places that bring people together.",
    image: "/comm.png",
  },
];

// ─── Fan layout helpers ───────────────────────────────────────────────────────

const MAX_VISIBLE = 7;

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

function getHeightMultiplier(width: number) {
  let idealPx: number;
  if (width < 480) idealPx = 22 * 16;
  else if (width < 640) idealPx = 26 * 16;
  else if (width < 768) idealPx = 28 * 16;
  else if (width < 1024) idealPx = 34 * 16;
  else idealPx = 38 * 16;
  const available = window.innerHeight * 0.7;
  if (available >= idealPx) return 1;
  return available / idealPx;
}

function getSlotConfig(totalCards: number, slot: number) {
  const center = totalCards >> 1;
  const distance = totalCards > 1 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * absDistance * absDistance,
    x: distance * 30,
    y: absDistance * absDistance * 7.3,
    zIndex: 10 - Math.abs(slot - center),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Amenities() {
  const totalCards = amenities.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const prevVisible = useRef<Set<number>>(new Set());

  // With 6 cards (< MAX_VISIBLE=7) we never paginate — all cards always visible.
  const getVisibleMap = useCallback(() => {
    const map = new Map<number, number>();
    amenities.forEach((_, i) => map.set(i, i));
    return map;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardElements = Array.from(
      container.querySelectorAll<HTMLElement>(".fan-card")
    );
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap();
    const previouslyVisible = prevVisible.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const config = (slot: number) => getSlotConfig(totalCards, slot);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, {
            x: 0,
            y: `${12 * hMult}rem`,
            rotation: 0,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: 1.2,
            ease: "elastic.out(1.05,.78)",
            delay: 0.2 + slot * 0.06,
            onComplete: onCardDone,
          });
        } else if (!wasVisible) {
          gsap.set(card, {
            x: `40rem`,
            y: `${y * hMult}rem`,
            rotation: 30,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: 0.6,
            ease: "power2.out",
            onComplete: onCardDone,
          });
        } else {
          gsap.to(card, {
            ...target,
            duration: 0.5,
            ease: "power2.out",
            onComplete: onCardDone,
          });
        }
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    // ── Hover interactions ────────────────────────────────────────────────────
    const visibleEntries: { el: HTMLElement; slot: number }[] = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    let activeSlot: number | null = null;
    let leaveTimer: NodeJS.Timeout | null = null;
    const centerSlot = visibleEntries.length >> 1;

    const updateHoverLayout = (hoveredSlot: number | null) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM;
            targetScale *= 1.08;
          } else {
            const normalized =
              centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const pushStrength =
              8 *
              (1 - Math.abs(normalized)) *
              (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (slot === visibleEntries.length - 1 && hoveredSlot < centerSlot)
              targetY -= 1 * hM;
            if (slot === 0 && hoveredSlot > centerSlot) targetY -= 1 * hM;
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
        }

        gsap.to(el, {
          x: `${targetX}rem`,
          y: `${targetY}rem`,
          rotation: targetRot,
          scale: targetScale,
          duration: 0.5,
          delay,
          ease: "elastic.out(1,.75)",
          overwrite: "auto",
        });
        gsap.set(el, { zIndex: base.zIndex });
      });
    };

    const enterHandlers = visibleEntries.map(({ el, slot }) => {
      const handler = () => {
        if (isAnimating.current) return;
        if (leaveTimer) {
          clearTimeout(leaveTimer);
          leaveTimer = null;
        }
        if (activeSlot !== slot) {
          activeSlot = slot;
          updateHoverLayout(slot);
        }
      };
      el.addEventListener("mouseenter", handler);
      return { el, handler };
    });

    const onMouseLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => {
        activeSlot = null;
        updateHoverLayout(null);
      }, 50);
    };
    container.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => {
      if (!isAnimating.current) updateHoverLayout(activeSlot);
    };
    window.addEventListener("resize", onResize);

    return () => {
      enterHandlers.forEach(({ el, handler }) =>
        el.removeEventListener("mouseenter", handler)
      );
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [getVisibleMap, totalCards]);

  return (
    <section className="bg-[#050505] py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="font-serif text-5xl md:text-7xl text-white">
            Curated for Exceptional Living
          </h2>
        </div>

        {/* Fan layout */}
        <div
          ref={containerRef}
          className="relative flex items-center justify-center w-full"
          style={{ height: "38rem" }}
        >
          {amenities.map((item, index) => (
            <div
              key={item.title}
              className="fan-card group absolute cursor-pointer"
              style={{ width: "22rem", height: "28rem" }}
            >
              {/* Card shell */}
              <div className="relative w-full h-full overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-colors duration-500 group-hover:border-white/30">

                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-0 scale-110 opacity-100 scale-100 transition-all duration-700"
                  />
                  {/* Always-present dark scrim — deepens on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/80 group-hover:via-black/30 transition-all duration-700" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-6">
                  {/* Index number — quiet, typographic accent */}
                  <span className="mb-3 font-mono text-xs tracking-[0.2em] text-white/25 group-hover:text-white/40 transition-colors duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-serif text-xl leading-snug text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/50 group-hover:text-white/80 transition-colors duration-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}