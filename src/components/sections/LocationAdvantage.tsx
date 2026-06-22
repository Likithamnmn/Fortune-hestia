"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const sarjapur = {
  coords: [77.7512, 12.8615], // Sarjapur Road approx center
};

export default function LocationAdvantage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: sarjapur.coords as [number, number],
      zoom: 10.5,
      pitch: 45,
      bearing: -20,
    });

    map.current.addControl(new maplibregl.NavigationControl({ visualizePitch: true }));

    // 🔥 MAIN SARJAPUR MARKER (GLOW LABEL STYLE)
    const el = document.createElement("div");
    el.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="
          width:16px;height:16px;
          background:white;
          border-radius:999px;
          box-shadow:0 0 25px rgba(255,255,255,0.8);
        "></div>

        <div style="
          margin-top:6px;
          font-size:10px;
          color:white;
          letter-spacing:1px;
          text-transform:uppercase;
          opacity:0.8;
        ">
          Sarjapur
        </div>
      </div>
    `;

    new maplibregl.Marker(el)
      .setLngLat(sarjapur.coords as [number, number])
      .addTo(map.current);

    // ✨ CINEMATIC FOCUS
    setTimeout(() => {
      map.current?.flyTo({
        center: sarjapur.coords as [number, number],
        zoom: 12.2,
        speed: 1.2,
        curve: 1.4,
        essential: true,
      });
    }, 700);

    return () => map.current?.remove();
  }, []);

  return (
    <section className="bg-[#050505] py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* HEADER (unchanged) */}
        <div className="text-center mb-28">
          <h2 className="font-serif text-5xl md:text-7xl text-white leading-[1.1]">
            Connected to Everything That Matters
          </h2>

          <p className="mt-10 text-white/60 max-w-3xl mx-auto text-lg leading-relaxed">
            Strategically located on Sarjapur Road, Fortune Hestia offers seamless access
            to Bangalore’s most important destinations.
          </p>
        </div>

        {/* MAP */}
        <div
          ref={mapContainer}
          className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10"
        />
      </div>
    </section>
  );
}