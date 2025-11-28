"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname.startsWith(path)
      ? "flex items-center justify-between px-3 py-2 rounded-xl bg-purple-600/20 text-purple-200"
      : "block px-3 py-2 rounded-xl text-slate-300 hover:bg-purple-600/10";

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-purple-800/40 bg-black/40 backdrop-blur-xl">
      {/* LOGO */}
      <div className="px-6 py-6 border-b border-purple-800/40">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500" />
          <div>
            <p className="text-sm uppercase tracking-widest text-purple-300">
              UniRec AI
            </p>
            <p className="text-xs text-slate-400">
              Universal Personalization
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-1 text-sm">
        <Link href="/demo/ecommerce" className={isActive("/demo/ecommerce")}>
          <span>E-commerce</span>
          {pathname.startsWith("/demo/ecommerce") && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/50">
              Active
            </span>
          )}
        </Link>

        <Link href="/demo/movies" className={isActive("/demo/movies")}>
          <span>Movies / OTT</span>
          {pathname.startsWith("/demo/movies") && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/50">
              Active
            </span>
          )}
        </Link>

        <Link href="/demo/blogs" className={isActive("/demo/blogs")}>
          <span>Blogs / News</span>
          {pathname.startsWith("/demo/blogs") && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/50">
              Active
            </span>
          )}
        </Link>

        {/* COMING SOON */}
        <Link href="/demo/embeddings" className={isActive("/demo/embeddings")}>
          <span>Embedding Map</span>
          {pathname.startsWith("/demo/embeddings") && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/50">
              Active
            </span>
          )}
        </Link>
      </nav>
    </aside>
  );
}
