"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, label: "Acres Township", suffix: "+" },
  { value: 1, label: "Prime Sarjapur Location", suffix: "" },
  { value: 1, label: "Greek-Inspired Community", suffix: "" },
  { value: 1, label: "Luxury Villa Collection", suffix: "" },
  { value: 1, label: "Premium Lifestyle Amenities", suffix: "" },
  { value: 1, label: "RERA Approved Development", suffix: "" },
];

function useInView(ref: any) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    });

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [ref]);

  return visible;
}

function Counter({ value, start }: { value: number; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const step = Math.ceil(value / 40);

    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }
      setCount(current);
    }, 30);

    return () => clearInterval(interval);
  }, [start, value]);

  return <span>{count}</span>;
}

export default function TrustLegacy() {
  const ref = useRef<HTMLDivElement>(null);
  const start = useInView(ref);

  return (
    <section className="bg-[#050505] py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="font-serif text-5xl md:text-7xl text-white">
            Built on Trust
          </h2>
        </div>

        {/* Stats Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center"
        >
          {stats.map((item, i) => (
            <div
              key={i}
              className="group relative"
            >
              {/* Number */}
              <div className="text-5xl md:text-6xl font-serif text-white tracking-tight">
                {item.label.includes("50") ? (
                  <Counter value={item.value} start={start} />
                ) : (
                  <span className="text-4xl">✓</span>
                )}
                <span className="text-white/80">{item.suffix}</span>
              </div>

              {/* Label */}
              <div className="mt-4 text-white/60 text-sm tracking-wide group-hover:text-white transition">
                {item.label}
              </div>

              {/* underline glow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 group-hover:w-24 h-px bg-white/40 transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}