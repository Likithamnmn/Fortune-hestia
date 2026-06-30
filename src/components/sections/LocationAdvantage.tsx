"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
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

const sarjapur = {
  coords: [77.7512, 12.8615],
};

export default function LocationAdvantage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map          = useRef<maplibregl.Map | null>(null);
  const sectionRef   = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: sarjapur.coords as [number, number],
      zoom: 10.5,
      pitch: 55,
      bearing: -18,
    });

    // Marker — JetBrains Mono for the label
    const el = document.createElement("div");
    el.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
        <div style="
          width:10px;height:10px;
          background:#fbbf24;
          border-radius:999px;
          box-shadow:0 0 28px rgba(251,191,36,0.7);
        "></div>
        <span style="
          font-family:'JetBrains Mono',ui-monospace,monospace;
          font-size:8px;
          letter-spacing:0.3em;
          color:rgba(255,255,255,0.35);
          text-transform:uppercase;
        ">Sarjapur</span>
      </div>
    `;

    new maplibregl.Marker(el)
      .setLngLat(sarjapur.coords as [number, number])
      .addTo(map.current);

    setTimeout(() => {
      map.current?.flyTo({
        center: sarjapur.coords as [number, number],
        zoom: 12.6,
        speed: 0.9,
        curve: 1.6,
        essential: true,
      });
    }, 900);

    return () => map.current?.remove();
  }, []);

  return (
    <section id="location" ref={sectionRef} className="bg-[#050505] py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT TEXT */}
          <div className="relative">

            <div className="absolute -left-10 top-10 w-40 h-40 bg-white/5 blur-3xl rounded-full" />

            {/* Eyebrow — Mono */}
            <div className="overflow-hidden mb-6">
              <div
                className={`flex items-center gap-3
                  transform transition-all duration-[900ms] ease-[cubic-bezier(0.77,0,0.175,1)]
                  ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.45em] text-white/25`}>
                  Location
                </span>
                <span className="h-px w-6 bg-amber-400/35" />
                <span className={`${jetbrainsMono.className} text-[9px] uppercase tracking-[0.45em] text-amber-400/50`}>
                  Sarjapur Road
                </span>
              </div>
            </div>

            {/* Heading — Cormorant */}
            <div className="overflow-hidden">
              <h2
                className={`${cormorant.className} font-light italic text-5xl md:text-7xl text-white leading-[1.0] tracking-[-0.03em]
                  transform transition-all duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]
                  ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
              >
                Everything Within 
                <span className="text-amber-400 not-italic font-normal"> Reach</span>
              </h2>
            </div>

            {/* Description — Inter light */}
            <div className="overflow-hidden mt-8">
              <p
                className={`${inter.className} font-light max-w-sm text-white/45 text-base leading-relaxed
                  transform transition-all duration-[1400ms] delay-200 ease-[cubic-bezier(0.77,0,0.175,1)]
                  ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
              >
                Thoughtfully located off Sarjapur Road, with seamless access to Bengaluru's IT hubs, schools and daily conveniences.
* map is perfect but resize this section neately.
              </p>
            </div>

            {/* Line reveal */}
            <div className="overflow-hidden">
              <div
                className={`mt-10 h-px w-20 bg-white/15
                  transform transition-all duration-[1600ms] delay-300
                  ${visible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
              />
            </div>

          </div>

          {/* RIGHT MAP */}
          <div
            ref={mapContainer}
            className={`h-[620px] rounded-2xl overflow-hidden
              border border-white/5 shadow-[0_0_120px_rgba(255,255,255,0.04)]
              transition-all duration-[1600ms] ease-out
              ${visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"}`}
          />

        </div>
      </div>
    </section>
  );
}