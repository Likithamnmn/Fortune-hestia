"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  { title: "Clubhouse", desc: "A social hub for recreation and connection.", image: "/clubhouse.jpeg" },
  { title: "Swimming Pool", desc: "Relax, recharge, and unwind.", image: "/pool.jpeg" },
  { title: "Landscaped Gardens", desc: "Nature integrated into everyday life.", image: "/garden.jpeg" },
  { title: "Sports Facilities", desc: "Designed for active lifestyles.", image: "/sports.jpeg" },
  { title: "Children's Play Area", desc: "Safe spaces for young explorers.", image: "/kids.jpg" },
  { title: "Community Spaces", desc: "Places that bring people together.", image: "/comm.png" },
];

function getCardDimensions(width: number): { w: number; h: number } {
  if (width < 480) return { w: 10, h: 13 };
  if (width < 640) return { w: 13, h: 17 };
  if (width < 768) return { w: 15, h: 20 };
  if (width < 1024) return { w: 18, h: 24 };
  return { w: 22, h: 28 };
}

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

function getHeightMultiplier(width: number) {
  const { h } = getCardDimensions(width);
  const idealPx = h * 16;
  const available = window.innerHeight * 0.7;
  return available >= idealPx ? 1 : available / idealPx;
}

function getContainerHeight(width: number): string {
  if (width < 480) return "18rem";
  if (width < 640) return "22rem";
  if (width < 768) return "26rem";
  if (width < 1024) return "30rem";
  return "38rem";
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

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalCards = amenities.length;

  const getVisibleMap = useCallback(() => {
    const map = new Map<number, number>();
    amenities.forEach((_, i) => map.set(i, i));
    return map;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const container = containerRef.current;
    if (!section || !heading || !container) return;

    const cardElements = Array.from(
      container.querySelectorAll<HTMLElement>(".fan-card")
    );
    const visibleMap = getVisibleMap();

    const applyCardDimensions = () => {
      const { w, h } = getCardDimensions(window.innerWidth);
      cardElements.forEach((card) => {
        card.style.width = `${w}rem`;
        card.style.height = `${h}rem`;
      });
      if (container) {
        container.style.height = getContainerHeight(window.innerWidth);
      }
    };
    applyCardDimensions();

    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const config = (slot: number) => getSlotConfig(totalCards, slot);

    gsap.set(heading, { opacity: 0, x: 80, filter: "blur(8px)" });

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      if (slot !== undefined) {
        gsap.set(card, {
          x: 0,
          y: `${12 * hMult}rem`,
          rotation: 0,
          scale: 0.5,
          opacity: 0,
        });
      }
    });

    let hoverSetupTimer: NodeJS.Timeout;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(heading, {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
        });

        cardElements.forEach((card, cardIndex) => {
          const slot = visibleMap.get(cardIndex);
          if (slot === undefined) return;
          const { x, y, rot, scale, zIndex } = config(slot);
          gsap.to(card, {
            x: `${x * multiplier}rem`,
            y: `${y * hMult}rem`,
            rotation: rot,
            scale,
            opacity: 1,
            zIndex,
            duration: 1.2,
            ease: "elastic.out(1.05,.78)",
            delay: 0.3 + slot * 0.06,
          });
        });

        const visibleEntries: { el: HTMLElement; slot: number }[] = [];
        cardElements.forEach((el, i) => {
          const slot = visibleMap.get(i);
          if (slot !== undefined) visibleEntries.push({ el, slot });
        });
        visibleEntries.sort((a, b) => a.slot - b.slot);

        const centerSlot = visibleEntries.length >> 1;
        let activeSlot: number | null = null;
        let leaveTimer: NodeJS.Timeout | null = null;
        const entranceDuration = (0.3 + (totalCards - 1) * 0.06 + 1.2) * 1000;

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

        hoverSetupTimer = setTimeout(() => {
          const enterHandlers = visibleEntries.map(({ el, slot }) => {
            const handler = () => {
              if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
              if (activeSlot !== slot) { activeSlot = slot; updateHoverLayout(slot); }
            };
            el.addEventListener("mouseenter", handler);
            return { el, handler };
          });

          const onMouseLeave = () => {
            if (leaveTimer) clearTimeout(leaveTimer);
            leaveTimer = setTimeout(() => { activeSlot = null; updateHoverLayout(null); }, 50);
          };
          container.addEventListener("mouseleave", onMouseLeave);

          const onResize = () => {
            applyCardDimensions();
            updateHoverLayout(activeSlot);
          };
          window.addEventListener("resize", onResize);

          (container as any)._hoverCleanup = () => {
            enterHandlers.forEach(({ el, handler }) =>
              el.removeEventListener("mouseenter", handler)
            );
            container.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("resize", onResize);
            if (leaveTimer) clearTimeout(leaveTimer);
          };
        }, entranceDuration);
      },
    });

    return () => {
      trigger.kill();
      clearTimeout(hoverSetupTimer);
      (container as any)._hoverCleanup?.();
    };
  }, [getVisibleMap, totalCards]);

  return (
    <section id="amenities" ref={sectionRef} className="bg-[#FAF7F0] py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="mb-24 text-center overflow-hidden">
          <h2
            ref={headingRef}
            style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
            className="text-6xl md:text-8xl lg:text-9xl text-black leading-[1.05] tracking-[-0.03em] will-change-transform"
          >
            {/* Line 1 — light italic */}
            <span
              className="block font-light italic text-black"
            >
              Living
            </span>

            {/* Line 2 — regular weight, no bold */}
            <span className="block font-normal text-black">
              <span className="text-amber-400">Space</span>{" "}
              <span style={{ fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif', fontWeight: 300 }}
                className="text-black/60 text-5xl md:text-6xl lg:text-7xl align-baseline italic"
              >
                Amenities
              </span>
            </span>
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
              <div className="relative w-full h-full overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-colors duration-500 group-hover:border-white/30">
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/80 group-hover:via-black/30 transition-all duration-700" />
                </div>

                <div className="relative z-10 flex flex-col justify-end h-full p-4 sm:p-6">
                  {/* Index — JetBrains Mono */}
                  <span
                    style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
                    className="mb-3 text-[10px] tracking-[0.25em] text-white/25 group-hover:text-white/50 transition-colors duration-500"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Title — Cormorant Garamond */}
                  <h3
                    style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
                    className="font-light italic text-xl sm:text-2xl leading-snug text-white"
                  >
                    {item.title}
                  </h3>

                  {/* Description — Inter light */}
                  <p
                    style={{ fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif' }}
                    className="mt-2 text-xs sm:text-sm font-light leading-relaxed text-white/50 group-hover:text-white/75 transition-colors duration-500"
                  >
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