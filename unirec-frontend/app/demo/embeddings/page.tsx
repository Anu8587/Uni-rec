"use client";

import { useEffect, useState, useMemo } from "react";
import Sidebar from "../Sidebar";
import dynamic from "next/dynamic";

// Dynamic Recharts imports (for Next.js App Router)
const ScatterChart = dynamic(
  () => import("recharts").then((m) => m.ScatterChart),
  { ssr: false }
);
const Scatter = dynamic(() => import("recharts").then((m) => m.Scatter), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), {
  ssr: false,
});
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((m) => m.CartesianGrid),
  { ssr: false }
);

type Domain = "all" | "ecommerce" | "movies" | "news" | "other";

type ItemPoint = {
  id: string;
  x: number;
  y: number;
  label?: string;
  tags?: string[];
  domain: Domain;
};

type UserPoint = {
  x: number;
  y: number;
};

const USER_ID = "embedding_user"; // you can change this if needed

const domainColor = (domain: Domain) => {
  switch (domain) {
    case "ecommerce":
      return "#A78BFA"; // purple
    case "movies":
      return "#60A5FA"; // blue
    case "news":
      return "#34D399"; // green
    default:
      return "#F97373"; // soft red for "other"
  }
};

const userColor = "#FF3D7A"; // neon-ish pink

function detectDomain(id: string): Domain {
  if (id.startsWith("ec")) return "ecommerce";
  if (id.startsWith("mv")) return "movies";
  if (id.startsWith("news")) return "news";
  return "other";
}

export default function EmbeddingPage() {
  const [items, setItems] = useState<ItemPoint[]>([]);
  const [userPoint, setUserPoint] = useState<UserPoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [advanced, setAdvanced] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain>("all");
  const [selected, setSelected] = useState<ItemPoint | null>(null);

  // ---------- FETCH DATA FROM BACKEND ----------
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/visualize_embeddings/${USER_ID}`
        );
        const json = await res.json();

        if (!json.items || !json.user) {
          setError("No embeddings available. Interact with items first.");
          setLoading(false);
          return;
        }

        const pts: ItemPoint[] = json.items.map((p: any) => ({
          id: p.id,
          x: p.x,
          y: p.y,
          label: p.label || p.title || p.id,
          tags: p.tags || [],
          domain: detectDomain(p.id),
        }));

        const usr: UserPoint = {
          x: json.user.x,
          y: json.user.y,
        };

        setItems(pts);
        setUserPoint(usr);
      } catch (e) {
        console.error(e);
        setError("Failed to load embeddings.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ---------- DERIVED: FILTERED ITEMS BY DOMAIN ----------
  const filteredItems = useMemo(() => {
    if (selectedDomain === "all") {
      return items.filter((i) => i.domain !== "other");
    }
    return items.filter((i) => i.domain === selectedDomain);
  }, [items, selectedDomain]);

  // ---------- NEAREST NEIGHBOURS (ADVANCED MODE) ----------
  const neighbors = useMemo(() => {
    if (!userPoint || filteredItems.length === 0) return [];
    const withDist = filteredItems.map((p) => ({
      ...p,
      dist: Math.hypot(p.x - userPoint.x, p.y - userPoint.y),
    }));
    withDist.sort((a, b) => a.dist - b.dist);
    return withDist.slice(0, 12); // top 12
  }, [filteredItems, userPoint]);

  const highlightIds = useMemo(
    () => new Set(advanced ? neighbors.map((n) => n.id) : []),
    [neighbors, advanced]
  );

  // ---------- TOOLTIP ----------
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload[0]) return null;
    const p = payload[0].payload as ItemPoint;

    return (
      <div className="p-3 rounded-lg bg-black/80 border border-purple-600 text-white text-xs shadow-xl max-w-xs">
        <p className="text-purple-300 font-semibold">
          {p.label || p.id}
        </p>
        {p.tags && p.tags.length > 0 && (
          <p className="mt-1 text-slate-300">
            Tags:{" "}
            <span className="text-purple-400">{p.tags.join(", ")}</span>
          </p>
        )}
        <p className="mt-1 text-[10px] text-slate-500">
          Domain: {p.domain === "ecommerce"
            ? "E-commerce"
            : p.domain === "movies"
            ? "Movies / OTT"
            : p.domain === "news"
            ? "Blogs / News"
            : "Other"}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading embedding map…
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </main>
    );
  }

  return (
    <main className="flex bg-black text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10 space-y-8">
        {/* HEADER */}
        <section className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-800/40 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-purple-300 mb-1">
              🔮 Embedding Space · Advanced View
            </p>
            <h1 className="text-3xl font-bold mb-2">
              How UniRec AI understands your items
            </h1>
            <p className="text-slate-400 max-w-2xl text-sm">
              Each dot is an item embedding projected into 2D. Colors represent
              different domains (E-commerce, Movies/OTT, Blogs/News). The pink
              star is the current user embedding. In advanced mode we highlight
              the closest items and explain why they’re recommended.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-3 md:items-end">
            <button
              onClick={() => setAdvanced((prev) => !prev)}
              className={`px-4 py-2 rounded-xl text-sm border text-left ${
                advanced
                  ? "bg-purple-600 border-purple-400"
                  : "bg-black border-purple-700"
              }`}
            >
              {advanced ? "Advanced mode: ON" : "Advanced mode: OFF"}
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="opacity-80">Domain:</span>
              <select
                className="bg-black border border-purple-700 rounded-lg px-3 py-1 text-xs outline-none"
                value={selectedDomain}
                onChange={(e) =>
                  setSelectedDomain(e.target.value as Domain)
                }
              >
                <option value="all">All domains</option>
                <option value="ecommerce">E-commerce only</option>
                <option value="movies">Movies / OTT only</option>
                <option value="news">Blogs / News only</option>
              </select>
            </div>
          </div>
        </section>

        {/* MAIN: CHART + SIDE PANEL */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* CHART CARD */}
          <div className="relative bg-black/40 border border-purple-900/40 rounded-3xl p-4 shadow-2xl flex-1 h-[640px]">
            <ScatterChart
              width={900}
              height={600}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#3A2B6A"
                opacity={0.25}
              />
              <XAxis dataKey="x" type="number" hide />
              <YAxis dataKey="y" type="number" hide />
              <Tooltip content={<CustomTooltip />} cursor={{ opacity: 0.15 }} />

              {/* ITEMS BY DOMAIN */}
              {["ecommerce", "movies", "news", "other"].map((dom) => {
                const domainItems = filteredItems.filter(
                  (i) => i.domain === dom
                );
                if (domainItems.length === 0) return null;
                return (
                  <Scatter
                    key={dom}
                    data={domainItems}
                    fill={domainColor(dom as Domain)}
                    shape="circle"
                    r={4}
                    onClick={(data: any) =>
                      setSelected(
                        data && data.payload
                          ? (data.payload as ItemPoint)
                          : null
                      )
                    }
                    opacity={
                      advanced
                        ? 0.35
                        : 0.9
                    }
                  />
                );
              })}

              {/* HIGHLIGHTED NEIGHBORS (ADVANCED) */}
              {advanced && neighbors.length > 0 && (
                <Scatter
                  data={neighbors}
                  fill="#FACC15"
                  r={7}
                  shape="circle"
                  onClick={(data: any) =>
                    setSelected(
                      data && data.payload
                        ? (data.payload as ItemPoint)
                        : null
                    )
                  }
                />
              )}

              {/* USER STAR */}
              {userPoint && (
                <Scatter
                  data={[userPoint]}
                  fill={userColor}
                  shape="star"
                  r={12}
                />
              )}
            </ScatterChart>

            {/* LEGEND CARD */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-xl border border-purple-700/40 p-4 rounded-xl text-xs text-slate-200 shadow-xl space-y-2">
              <p className="text-purple-300 font-semibold mb-1">Legend</p>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: domainColor("ecommerce") }}
                />
                <span>E-commerce items</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: domainColor("movies") }}
                />
                <span>Movies / OTT items</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: domainColor("news") }}
                />
                <span>Blogs / News items</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: userColor }}
                />
                <span>User embedding</span>
              </div>
              {advanced && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-3 h-3 rounded-full bg-yellow-300" />
                  <span>Top nearest items</span>
                </div>
              )}
            </div>
          </div>

          {/* SIDE PANEL */}
          <div className="w-full lg:w-80 bg-black/40 border border-purple-900/40 rounded-3xl p-5 space-y-4">
            <h2 className="text-lg font-semibold text-purple-300 mb-1">
              Embedding insights
            </h2>

            <p className="text-xs text-slate-400 leading-relaxed">
              UniRec converts each item (product, movie, or article) and each
              user into vectors in the same space. Distance in this space is a
              measure of similarity. Recommendations come from items that are
              closest to the user vector.
            </p>

            {advanced && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-200">
                  Top closest items
                </h3>
                <div className="max-h-56 overflow-auto text-xs space-y-1">
                  {neighbors.map((n) => (
                    <button
                      key={n.id}
                      className={`w-full text-left px-2 py-1 rounded-lg ${
                        selected?.id === n.id
                          ? "bg-purple-700/60"
                          : "bg-black/40 hover:bg-purple-900/30"
                      }`}
                      onClick={() => setSelected(n)}
                    >
                      <span className="font-medium text-slate-100">
                        {n.label || n.id}
                      </span>
                      <span className="block text-[10px] text-slate-500">
                        Domain:{" "}
                        {n.domain === "ecommerce"
                          ? "E-commerce"
                          : n.domain === "movies"
                          ? "Movies / OTT"
                          : n.domain === "news"
                          ? "Blogs / News"
                          : "Other"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-purple-800/40 pt-3">
              <h3 className="text-sm font-semibold text-slate-200 mb-1">
                Selected item
              </h3>
              {selected ? (
                <div className="text-xs text-slate-300 space-y-1">
                  <p>
                    <span className="font-semibold">ID:</span> {selected.id}
                  </p>
                  {selected.label && (
                    <p>
                      <span className="font-semibold">Label:</span>{" "}
                      {selected.label}
                    </p>
                  )}
                  {selected.tags && selected.tags.length > 0 && (
                    <p>
                      <span className="font-semibold">Tags:</span>{" "}
                      {selected.tags.join(", ")}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">Domain:</span>{" "}
                    {selected.domain === "ecommerce"
                      ? "E-commerce"
                      : selected.domain === "movies"
                      ? "Movies / OTT"
                      : selected.domain === "news"
                      ? "Blogs / News"
                      : "Other"}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  Click on a dot in the map or select from the list (in advanced
                  mode) to inspect an item.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* EXPLANATION PANEL */}
        <section className="mt-2 bg-black/40 border border-purple-800/40 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-purple-300 mb-2">
            What this embedding map shows
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            UniRec AI represents every item and user as points in the same
            high-dimensional vector space using text embeddings. This chart is a
            2D projection of that space. Items close together share similar
            meaning:{" "}
            <span className="text-purple-300">
              hoodies, sneakers, and joggers
            </span>{" "}
            might cluster in one region, while{" "}
            <span className="text-purple-300">
              horror movies or AI startup news
            </span>{" "}
            cluster in others.
            <br />
            <br />
            The <span className="text-pink-400 font-bold">pink star</span>{" "}
            represents the current user embedding built from their recent
            events (clicks, views, likes, etc.). In advanced mode, the yellow
            points are the items closest to this star — effectively, the top
            recommendations the engine would choose right now for this user.
          </p>
        </section>
      </div>
    </main>
  );
}
