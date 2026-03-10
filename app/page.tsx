"use client";

import { Timeline, MILESTONE_COUNT } from "@/components/timeline";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const TOTAL_SECTIONS = 1 + MILESTONE_COUNT;

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(TOTAL_SECTIONS - 1, index));
    if (next === currentIndex) return;
    isAnimating.current = true;
    setCurrentIndex(next);
    // Unlock after transition completes
    setTimeout(() => {
      isAnimating.current = false;
    }, 700);
  }, [currentIndex]);

  // Wheel events
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;
      if (e.deltaY > 0) goTo(currentIndex + 1);
      else goTo(currentIndex - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [currentIndex, goTo]);

  // Touch events
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return; // ignore tiny swipes
      if (isAnimating.current) return;
      if (delta > 0) goTo(currentIndex + 1);
      else goTo(currentIndex - 1);
      touchStartY.current = null;
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentIndex, goTo]);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown") goTo(currentIndex + 1);
      if (e.key === "ArrowUp") goTo(currentIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, goTo]);

  return (
    <div
      className="relative overflow-hidden bg-black text-white"
      style={{ height: "calc(100vh - 3.5rem)" }}
    >
      {/* Sliding container */}
      <div
        style={{
          transform: `translateY(calc(-${currentIndex} * (100vh - 3.5rem)))`,
          transition: "transform 0.65s cubic-bezier(0.77, 0, 0.175, 1)",
          willChange: "transform",
        }}
      >
        {/* Hero Section */}
        <div
          className="flex flex-col items-center justify-center px-6 text-center"
          style={{ height: "calc(100vh - 3.5rem)" }}
        >
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

          <button
            onClick={() => goTo(1)}
            className="flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
          >
            <span className="text-sm tracking-widest uppercase">
              Scroll down to get a glimpse of my journey
            </span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>

        {/* Timeline Sections */}
        <Timeline currentIndex={currentIndex} />
      </div>

      {/* Up chevron */}
      {currentIndex > 0 && (
        <button
          onClick={() => goTo(currentIndex - 1)}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all animate-bounce"
          aria-label="Go up"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Down chevron */}
      {currentIndex > 0 && currentIndex < TOTAL_SECTIONS - 1 && (
        <button
          onClick={() => goTo(currentIndex + 1)}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all animate-bounce"
          aria-label="Go down"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      )}

      {/* Scroll to top on last section */}
      {currentIndex === TOTAL_SECTIONS - 1 && (
        <button
          onClick={() => goTo(0)}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all text-sm tracking-wide"
        >
          ↑ Scroll to top
        </button>
      )}
    </div>
  );
}
