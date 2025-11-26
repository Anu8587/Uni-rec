"use client";
import { Sparkles } from "lucide-react";

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Soft centered purple glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-purple-700/20 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <p className="uppercase tracking-widest text-purple-400/80 text-sm mb-4">
          Why UniRecAI
        </p>

        <h2 className="text-4xl md:text-6xl font-bold text-white">
          Built for <span className="text-purple-300">Personalisation</span> at Scale
        </h2>

        <p className="text-lg text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed">
          Drop in a single API and let it handle user signals, mood, context, and semantics —
          while you stay focused on building your product.
        </p>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-10 mt-20">
          {[
            {
              title: "Context Engine",
              desc: "Understands user behavior, mood, recency, time of day, and real-world context — dynamically shaping recommendations.",
            },
            {
              title: "Cross-Domain",
              desc: "Works for ecommerce, media, finance, education, healthcare, fitness, travel — anything.",
            },
            {
              title: "Real-Time Ready",
              desc: "Update signals instantly — mood, clicks, search, or scroll behavior. Recommendations adapt immediately.",
            },
            {
              title: "Privacy First",
              desc: "No user-identifying data required. Works with anonymous sessions & local signals — built for security.",
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-md hover:bg-white/[0.07] transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-700/30 flex items-center justify-center">
                  <Sparkles className="text-purple-300" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-white">{feat.title}</h3>
              </div>
              <p className="text-gray-300">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
