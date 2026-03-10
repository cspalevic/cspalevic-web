"use client";

import { Timeline, MILESTONE_COUNT } from "@/components/timeline";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// Hero + all timeline milestones
const TOTAL_SECTIONS = 1 + MILESTONE_COUNT;

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Track which section is active via scroll position
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const index = Math.round(el.scrollTop / el.clientHeight);
      setCurrentIndex(index);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((index: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: index * el.clientHeight, behavior: "smooth" });
  }, []);

  return (
    <div className="relative">
      {/* Scroll snap container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white"
      >
        {/* Hero Section */}
        <section className="h-screen snap-start flex-shrink-0 flex flex-col items-center justify-center px-6 text-center bg-black">
          <div className="h-28 w-28 rounded-full overflow-hidden mb-6 ring-2 ring-zinc-700">
            <CloudinaryImage
              path="me.jpg"
              alt="Charlie Spalevic"
              width={112}
              height={112}
              className="object-contain w-full h-full"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Charlie Spalevic
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mb-12">
            Engineer. Builder. Curious human trying to decode how the world works.
          </p>

          <div className="flex flex-col items-center gap-2 text-zinc-500">
            <span className="text-sm tracking-widest uppercase">
              Scroll down to get a glimpse of my journey
            </span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </div>
        </section>

        {/* Timeline Section */}
        <Timeline />
      </div>

      {/* Scroll up — top center */}
      {currentIndex > 0 && (
        <button
          onClick={() => scrollTo(currentIndex - 1)}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all animate-bounce"
          aria-label="Scroll up"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Scroll down — bottom center */}
      {currentIndex < TOTAL_SECTIONS - 1 && (
        <button
          onClick={() => scrollTo(currentIndex + 1)}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
