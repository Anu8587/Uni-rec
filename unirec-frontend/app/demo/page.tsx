"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">

      {/* HERO */}
      <div className="max-w-3xl text-center space-y-6">

        <p className="text-purple-300 text-sm tracking-widest">
          UniRec AI · Universal Personalization Engine
        </p>

        <h1 className="text-5xl font-bold leading-tight">
          Turn user behaviour into{" "}
          <span className="text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text">
            real-time intelligence
          </span>
        </h1>

        <p className="text-slate-400 text-lg">
          Try personalised recommendations across E-commerce, OTT, and News.
          Interact with real sample datasets and watch the AI adapt instantly.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="/demo/ecommerce"
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-sm"
          >
            E-commerce Demo
          </Link>

          <Link
            href="/demo/movies"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-sm"
          >
            Movies / OTT Demo
          </Link>

          <Link
            href="/demo/blogs"
            className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-sm"
          >
            Blogs / News Demo
          </Link>
        </div>
      </div>
    </main>
  );
}
