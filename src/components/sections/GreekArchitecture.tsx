"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const stories = [
  {
    title: "Elegant Greek-Inspired Facades",
    description:
      "Elegant Greek-inspired facades create a distinctive visual identity.",
    image: "/greek.jpg",
  },
  {
    title: "Openness & Harmony",
    description:
      "Wide streets and symmetrical planning promote openness and harmony.",
    image: "/open.jpg",
  },
  {
    title: "Refined Luxury",
    description:
      "Natural materials and refined detailing enhance everyday luxury.",
    image: "/refined (2).jpg",
  },
  {
    title: "Living Close To Nature",
    description:
      "Landscaped surroundings reinforce the Greek philosophy of living close to nature.",
    image: "/closenature.jpg",
  },
];

export default function GreekArchitecture() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll(".story-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              entry.target.getAttribute("data-index")
            );

            setActive(index);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="architecture"
      className="bg-black py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        <div className="mb-24 text-center">
          <span className="text-sm uppercase tracking-[0.4em] text-white/50">
            Greek Architecture
          </span>

          <h2 className="mt-6 font-serif text-5xl text-white md:text-7xl">
            Architecture Inspired
            <br />
            by Timeless Beauty
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">

          {/* Sticky Image */}
          <div className="hidden lg:block">
            <div className="sticky top-24">

              <div className="relative h-[700px] overflow-hidden rounded-2xl">

                {stories.map((story, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ${
                      active === index
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  >
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </div>
                ))}

              </div>

            </div>
          </div>

          {/* Stories */}
          <div>

            {stories.map((story, index) => (
              <div
                key={index}
                data-index={index}
                className="story-section flex min-h-screen items-center"
              >
                <div>

                  <span className="text-sm uppercase tracking-[0.35em] text-white/40">
                    0{index + 1}
                  </span>

                  <h3 className="mt-4 font-serif text-4xl text-white md:text-6xl">
                    {story.title}
                  </h3>

                  <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
                    {story.description}
                  </p>

                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}