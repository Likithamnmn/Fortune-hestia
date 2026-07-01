"use client";

import { useState } from "react";
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

const autofillReset = `
  bg-transparent border-b border-white/20 text-white py-1.5 outline-none
  focus:border-[#E6F6BA]/60 transition-colors duration-300
  [&:-webkit-autofill]:bg-transparent
  [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_transparent]
  [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]
  [&:-webkit-autofill]:[-webkit-text-fill-color:rgba(255,255,255,0.9)]
`;

export default function QuickEnquiry() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="quick-enquiry" className="bg-[#FCFFEE] py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] px-8 py-5 md:px-14 md:py-6 shadow-[0_18px_45px_rgba(0,0,0,0.15)]">
          {!submitted ? (
            <div className="grid items-center gap-6 md:grid-cols-[0.7fr_1.8fr]">
              {/* Left */}
              <div>
                <span
                  className={`${jetbrainsMono.className} text-[8px] uppercase tracking-[0.45em] text-[#E6F6BA]/70`}
                >
                  Fortune Hestia
                </span>

                <h2
                  className={`${cormorant.className} mt-2 text-[2rem] md:text-[2.4rem] leading-none font-light italic text-white`}
                >
                  Begin your
                  <br />
                  <span className="not-italic font-normal text-[#E6F6BA]">
                    journey home.
                  </span>
                </h2>

                <p
                  className={`${inter.className} mt-2 max-w-[240px] text-xs leading-relaxed text-white/40`}
                >
                  Leave your details and our team will reach out with everything you need to know.
                </p>
              </div>

              {/* Right */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Name | Phone | Email | Submit — single inline row */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                  <div className="flex-1">
                    <label
                      className={`${jetbrainsMono.className} mb-1 block text-[8px] uppercase tracking-[0.3em] text-white/40`}
                    >
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`${inter.className} w-full text-sm ${autofillReset}`}
                    />
                  </div>

                  <div className="flex-1">
                    <label
                      className={`${jetbrainsMono.className} mb-1 block text-[8px] uppercase tracking-[0.3em] text-white/40`}
                    >
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className={`${inter.className} w-full text-sm ${autofillReset}`}
                    />
                  </div>

                  <div className="flex-1">
                    <label
                      className={`${jetbrainsMono.className} mb-1 block text-[8px] uppercase tracking-[0.3em] text-white/40`}
                    >
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`${inter.className} w-full text-sm ${autofillReset}`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !agreed}
                    className={`${jetbrainsMono.className} whitespace-nowrap rounded-full border border-white/30 px-6 py-2 text-[8px] uppercase tracking-[0.4em] text-white transition-all duration-500 hover:bg-[#E6F6BA] hover:border-[#E6F6BA] hover:text-black disabled:opacity-40`}
                  >
                    {submitting ? "Sending..." : "Submit"}
                  </button>
                </div>

                {/* divider */}
                <div className="h-px w-full bg-white/10" />

                {/* checkbox row */}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    required
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-3 w-3 accent-[#E6F6BA]"
                  />

                  <span
                    className={`${inter.className} text-[10px] leading-relaxed text-white/35`}
                  >
                    I agree to the privacy policy and consent to being contacted regarding this enquiry.
                  </span>
                </label>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <span
                className={`${jetbrainsMono.className} text-[16px] uppercase tracking-[0.45em] text-[E6F6BA]/100`}
              >
                Thank You
              </span>

              <h3
                className={`${cormorant.className} mt-2 text-3xl font-light italic text-white`}
              >
                We'll be in touch shortly.
              </h3>

              <p
                className={`${inter.className} mt-2 text-sm text-white/40`}
              >
                Our team has received your enquiry and will reach out soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}