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
      <div className="relative mt-20 flex justify-center">
        <div className="w-[80%] max-w-4xl rounded-2xl overflow-hidden border border-purple-700/20 shadow-2xl shadow-purple-900/40 bg-black/40 backdrop-blur-xl">
          <Image
            src="/dashboard_placeholder.png"
            alt="Dashboard Demo"
            width={1400}
            height={800}
            className="opacity-90"
          />
        </div>
      </div>
    </section>
  );
}
