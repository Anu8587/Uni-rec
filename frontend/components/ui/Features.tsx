"use client";
import { Sparkles } from "lucide-react";

export default function Features() {
  return (
    <section className="relative py-40 overflow-hidden">

      {/* TOP GLOW — matches Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] pointer-events-none" />

      {/* CONTENT */}
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
          
          {/* Card 1 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-md hover:bg-white/[0.07] transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-700/30 flex items-center justify-center">
                <Sparkles className="text-purple-300" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">Context Engine</h3>
            </div>
            <p className="text-gray-300">
              Understands user behavior, mood, recency, time of day, and real-world context
              — dynamically shaping recommendations.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-md hover:bg-white/[0.07] transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-700/30 flex items-center justify-center">
                <Sparkles className="text-purple-300" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">Cross-Domain</h3>
            </div>
            <p className="text-gray-300">
              Works for ecommerce, media, finance, education, healthcare,
              fitness, travel — anything.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-md hover:bg-white/[0.07] transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-700/30 flex items-center justify-center">
                <Sparkles className="text-purple-300" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">Real-Time Ready</h3>
            </div>
            <p className="text-gray-300">
              Update signals instantly — mood, clicks, search, or scroll behavior.
              Your recommendations adapt immediately.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-md hover:bg-white/[0.07] transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-700/30 flex items-center justify-center">
                <Sparkles className="text-purple-300" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">Privacy First</h3>
            </div>
            <p className="text-gray-300">
              No user-identifying data required. Works with anonymous sessions &
              local signals — built for security.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
