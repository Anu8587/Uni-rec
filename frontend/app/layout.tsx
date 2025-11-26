import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniRec AI – Universal Recommendation API",
  description:
    "A plug-and-play personalization engine that adapts to user behavior, mood, and context.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          text-white 
        `}
      >
        
        <div className="fixed inset-0 -z-10 bg-grid"></div>

       
        <Navbar />

        
        <main className="pt-20 relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
