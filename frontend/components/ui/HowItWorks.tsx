import {
  Database,
  MousePointerClick,
  Sparkles,
} from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-[#0b0014] to-[#0a0010]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* TITLE */}
        <h2 className="text-4xl font-bold text-white mb-6">
          How It Works
        </h2>

        <p className="text-purple-200/80 max-w-2xl mx-auto mb-16">
          A simple 3-step API workflow to power universal recommendations for any app or platform.
        </p>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">

          {/* STEP 1 */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.5)]">
            <div className="flex justify-center mb-6">
              <Database className="text-purple-300 w-12 h-12" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">
              1. Ingest Your Items
            </h3>

            <p className="text-purple-200/70 leading-relaxed">
              Send your catalog — products, songs, posts, videos, anything —
              using a simple <code className="text-purple-300">POST /items</code> API call.
            </p>
          </div>

          {/* STEP 2 */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.5)]">
            <div className="flex justify-center mb-6">
              <MousePointerClick className="text-purple-300 w-12 h-12" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">
              2. Track User Activity
            </h3>

            <p className="text-purple-200/70 leading-relaxed">
              Log likes, views, clicks, or any behavior using
              <code className="text-purple-300"> POST /events</code>.
            </p>
          </div>

          {/* STEP 3 */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.5)]">
            <div className="flex justify-center mb-6">
              <Sparkles className="text-purple-300 w-12 h-12" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">
              3. Get Recommendations
            </h3>

            <p className="text-purple-200/70 leading-relaxed">
              Ask <code className="text-purple-300">POST /recommend</code> and get contextual,
              mood-aware, personalized results for every user instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
