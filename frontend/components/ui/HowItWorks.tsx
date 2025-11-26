import { Database, MousePointerClick, Sparkles } from "lucide-react";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Soft purple glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] bg-purple-600/20 blur-[150px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          How It Works
        </h2>

        <p className="text-purple-200/80 max-w-2xl mx-auto mb-16 text-lg">
          A simple 3-step API workflow to power universal recommendations for any app or platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {/* Step Cards */}
          {[
            {
              icon: <Database className="text-purple-300 w-12 h-12" />,
              title: "1. Ingest Your Items",
              desc: `Send your catalog — products, songs, posts, videos — using a simple POST /items API call.`,
            },
            {
              icon: <MousePointerClick className="text-purple-300 w-12 h-12" />,
              title: "2. Track User Activity",
              desc: `Log likes, views, clicks, or any behavior using POST /events.`,
            },
            {
              icon: <Sparkles className="text-purple-300 w-12 h-12" />,
              title: "3. Get Recommendations",
              desc: `Call POST /recommend to get contextual, mood-aware, instant personalized results.`,
            },
          ].map((step, i) => (
            <div
              key={i}
              className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(157,78,221,0.4)] transition"
            >
              <div className="flex justify-center mb-6">{step.icon}</div>

              <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>

              <p className="text-purple-200/70 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
