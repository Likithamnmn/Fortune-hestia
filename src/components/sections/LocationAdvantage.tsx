"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const sarjapur = {
  coords: [77.7512, 12.8615],
};

export default function LocationAdvantage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: sarjapur.coords as [number, number],
      zoom: 10.5,
      pitch: 55,
      bearing: -18,
    });

    const el = document.createElement("div");
    el.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="width:14px;height:14px;background:#fff;border-radius:999px;box-shadow:0 0 35px rgba(255,255,255,0.9)"></div>
        <div style="margin-top:6px;font-size:9px;letter-spacing:2px;color:white;opacity:0.6;text-transform:uppercase;">
          Sarjapur
        </div>
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

            {/* 🔥 HEADING SLIDE REVEAL */}
            <div className="overflow-hidden">
              <h2
                className={`font-serif text-5xl md:text-7xl text-white leading-[1.05]
                transform transition-all duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]
                ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
              >
               <span className="text-amber-300">Connected to</span> Everything That Matters
              </h2>
            </div>

            {/* 🔥 DESC SLIDE REVEAL */}
            <div className="overflow-hidden mt-10">
              <p
                className={`max-w-md text-white/50 text-lg italic leading-relaxed
                transform transition-all duration-[1400ms] delay-200 ease-[cubic-bezier(0.77,0,0.175,1)]
                ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
              >
                Strategically positioned on Sarjapur Road — where movement, business,
                and lifestyle converge seamlessly.
              </p>
            </div>

            {/* line reveal */}
            <div className="overflow-hidden">
              <div
                className={`mt-10 h-[1px] w-24 bg-gradient-to-r from-white/30 to-transparent
                transform transition-all duration-[1600ms] delay-300
                ${visible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
              />
            </div>
          </div>

          {/* RIGHT MAP */}
          <div
            ref={mapContainer}
            className={`h-[620px] rounded-3xl overflow-hidden
            border border-white/5 shadow-[0_0_120px_rgba(255,255,255,0.06)]
            transition-all duration-[1600ms] ease-out
            ${visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"}`}
          />
        </div>
      </div>
    </section>
  );
}