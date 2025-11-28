"use client";

import { useState } from "react";
import Link from "next/link";
import ItemGrid from "@/components/ItemGrid";
import ContextSelector from "@/components/ContextSelector";
import { uploadItems, logEvent, getRecommendations } from "@/lib/api";

import Sidebar from "../Sidebar";
type Item = {
  id: string;
  title: string;
  image?: string;
  description?: string;
  tags: string[];
  metadata?: Record<string, any>;
};

export default function EcommerceDemo() {
  const userId = "ecommerce_user";

  const [items, setItems] = useState<Item[]>([]);
  const [recommendationItems, setRecommendationItems] = useState<Item[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [context, setContext] = useState({
    device: "mobile",
    location_type: "home",
    time_of_day: "evening",
  });

  const pushLog = (msg: string) => setLogs((prev) => [...prev, msg]);

  const resetDB = async () => {
    await fetch("http://127.0.0.1:8000/reset", { method: "POST" });
    pushLog("Database reset!");
    setItems([]);
    setRecommendationItems([]);
  };

  const loadDataset = async () => {
    const data: Item[] = await fetch("/data/ecommerce.json").then((r) => r.json());
    setItems(data);
    await uploadItems(data);
    pushLog(`Loaded ${data.length} ecommerce items`);
  };

  const handleEvent = async (type: string, id: string) => {
    await logEvent({
      user_id: userId,
      event_type: type,
      item_id: id,
      context,
    });
    pushLog(`Event: ${type} → ${id}`);
  };

  const loadRecommendations = async () => {
    const res = await getRecommendations(userId, context);
    const recIds = res.recommendations.map((r: any) => r.item_id);
    setRecommendationItems(items.filter((i) => recIds.includes(i.id)));
    pushLog("Recommendations updated.");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#020015] via-[#050019] to-black text-slate-100 flex">
      {/* Sidebar */}
     <Sidebar />


      {/* Main content */}
      <div className="flex-1 px-4 py-6 md:px-10 md:py-8">
        {/* Top bar */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple-400">
              E-commerce · Real-time AI
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold mt-1">
              Personalised Shopping at Scale
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Upload catalog items, track real user events and see how UniRec AI
              learns to recommend the right products for each context.
            </p>
          </div>

          <button
            onClick={resetDB}
            className="text-xs px-3 py-2 rounded-lg border border-red-500/60 text-red-300 hover:bg-red-500/10"
          >
            Reset Engine
          </button>
        </header>

        {/* Hero + primary actions */}
    <div className="w-full bg-[#0d0a1a] p-8 rounded-2xl border border-purple-800/40 mb-8">

  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full">
    
    {/* LEFT SIDE TEXT */}
    <div className="flex-1">
      <span className="px-3 py-1 text-sm bg-purple-600/20 text-purple-300 rounded-full">
        ● Live demo · Embedding-based recommendations
      </span>

      <h1 className="text-4xl font-bold mt-4 mb-2 text-white">
        Turn clickstream into <span className="text-purple-400">product intelligence.</span>
      </h1>

      <p className="text-slate-300 text-sm mb-6">
        1) Load sample products, 2) Interact with items as a user, 3) Get personalised<br />
        recommendations ranked by AI.
      </p>

      <div className="flex gap-4">
        <button
          onClick={loadDataset}
          className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
        >
          Load Ecommerce Items
        </button>

        <button
          onClick={loadRecommendations}
          className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white"
        >
          Get Recommendations
        </button>
      </div>
    </div>

    {/* RIGHT SIDE CONTEXT BOX */}
    <div className="flex-shrink-0 w-full lg:w-auto">
      <ContextSelector context={context} setContext={setContext} />
    </div>

  </div>
</div>


        {/* Grids */}
        <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,2.2fr)_minmax(0,1.4fr)] gap-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">All Items</h3>
              <span className="text-xs text-slate-400">
                {items.length ? `${items.length} items loaded` : "No items yet"}
              </span>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-black/40 p-3">
              {items.length > 0 ? (
                <ItemGrid items={items} onEvent={handleEvent} />
              ) : (
                <p className="text-sm text-slate-500">
                  Click <span className="text-purple-300">“Load Ecommerce Items”</span>{" "}
                  to ingest the catalog.
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Recommended For You</h3>
              <span className="text-xs text-slate-400">
                Context-aware · Mood-aware
              </span>
            </div>
            <div className="rounded-2xl border border-purple-700/40 bg-[#050014] p-3 min-h-[220px]">
              {recommendationItems.length > 0 ? (
                <ItemGrid items={recommendationItems} onEvent={() => {}} />
              ) : (
                <p className="text-sm text-slate-500">
                  Interact with a few items and click{" "}
                  <span className="text-purple-300">“Get Recommendations”</span> to
                  see personalised results.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Logs */}
        <section className="mt-8">
          <h3 className="text-sm font-semibold mb-2 text-slate-300">
            Event & Engine Log
          </h3>
          <div className="rounded-2xl border border-slate-800 bg-black/60 p-3 text-xs max-h-64 overflow-auto font-mono text-slate-300">
            {logs.length === 0 && (
              <div className="text-slate-500">
                Engine logs will appear here as you interact with the demo.
              </div>
            )}
            {logs.map((l, i) => (
              <div key={i} className="py-0.5">
                {l}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
