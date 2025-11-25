"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full pt-32 pb-40 overflow-hidden ">

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[900px] rounded-full bg-purple-600/20 blur-[160px]" />
      </div>

      {/* Main text */}
      <div className="relative mx-auto max-w-5xl text-center px-6">
        <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight">
          <span className="text-white">The Universal</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Recommendation
          </span>{" "}
          <span className="text-white">API</span>
        </h1>

        <h2 className="mt-4 text-5xl md:text-6xl font-semibold text-white">
          for Every Product.
        </h2>

        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Plug-and-play personalization that adapts to{" "}
          <span className="text-purple-300 font-medium">user behavior, mood, and context</span>.  
          Works across ecommerce, media, healthcare — anywhere.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button className="px-8 py-5 text-lg bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
            Start for Free
          </Button>

          <Button
            variant="outline"
            className="px-8 py-5 text-lg border-purple-500 text-purple-300 hover:bg-purple-900/30 rounded-xl"
          >
            Watch Demo
          </Button>
        </div>
      </div>

      {/* Dashboard preview section */}
     {/* =========================== */}
{/*   VIDEO DEMO PREVIEW       */}
{/* =========================== */}

<div className="relative w-full max-w-6xl mx-auto mt-20 rounded-3xl overflow-hidden shadow-[0_0_60px_-10px_rgba(157,78,221,0.55)]">

  {/* Glow background */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 via-purple-900/20 to-black/40 blur-2xl" />

  {/* Video Wrapper */}
  <div className="relative z-10 aspect-video bg-black/40 backdrop-blur-xl border border-purple-400/20 rounded-3xl overflow-hidden flex items-center justify-center">

    {/* PLAY BUTTON */}
    <button className="group flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="white"
        className="w-10 h-10 ml-1 group-hover:scale-110 transition-transform"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 5.653v12.694a.75.75 0 001.133.65l10.548-6.347a.75.75 0 000-1.3L6.383 5a.75.75 0 00-1.133.653z"
        />
      </svg>
    </button>

  </div>
</div>

        
    </section>
  );
}
