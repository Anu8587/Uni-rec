"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-white">
          UniRec<span className="text-purple-400">AI</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-10 text-gray-300">
          <Link href="#features" className="hover:text-white">
            Features
          </Link>
          <Link href="#demo" className="hover:text-white">
            Demo
          </Link>
          <Link href="#pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="#docs" className="hover:text-white">
            Docs
          </Link>
        </div>

        {/* CTA */}
        <Button className="bg-purple-600 hover:bg-purple-700 px-6">
          Get Started
        </Button>
      </div>
    </nav>
  );
}
