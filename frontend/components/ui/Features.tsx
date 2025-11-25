"use client";

import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Context-Aware Personalisation",
    description:
      "Blend time of day, device, location, and session data to serve experiences that feel instantly relevant.",
    tag: "Context engine",
  },
  {
    title: "Cross-Domain Ready",
    description:
      "Use the same API for ecommerce, media, healthcare, education, or fintech without changing the core logic.",
    tag: "Any industry",
  },
  {
    title: "Mood & Behavior Signals",
    description:
      "Leverage implicit behavior and mood signals to move users from ‘scrolling’ to ‘actually converting’.",
    tag: "User understanding",
  },
  {
    title: "Privacy-First by Design",
    description:
      "Bring your own IDs, anonymised events, and keep control of what data is stored, where, and for how long.",
    tag: "Trust & compliance",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative w-full py-32 "
    >
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-[500px] w-[700px] rounded-full bg-purple-700/20 blur-[140px]" />
      </div>
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-700/20 blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-purple-300/80">
            Why UniRecAI
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
            Built for Personalisation at Scale
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Drop in one API and let it handle user signals, context, and
            semantics — while you focus on your product.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-purple-500/15 bg-white/5 bg-clip-padding p-[1px]"
            >
              <div className="h-full rounded-2xl bg-black/80 p-6 flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-purple-300">
                  <span className="h-6 w-6 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-[10px]">
                    ✦
                  </span>
                  {feature.tag}
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-4 text-xs text-purple-300/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  Optimised for low-latency, real-world use cases.
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA under grid */}
        <div className="mt-12 flex justify-center">
          <Button className="px-8 py-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white">
            Explore API capabilities
          </Button>
        </div>
      </div>
    </section>
  );
}
