"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type TimelineProps = {
  slides: React.ReactNode[];
};

export function Timeline({ slides }: TimelineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(total - 1, index));
      if (next === currentIndex) return;
      isAnimating.current = true;
      setCurrentIndex(next);
      setTimeout(() => {
        isAnimating.current = false;
      }, 700);
    },
    [currentIndex, total]
  );

  // Wheel
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

  // Touch
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || isAnimating.current) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return;
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

  // Keyboard
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
    <>
      {/* Sliding container */}
      <div
        style={{
          transform: `translateY(calc(-${currentIndex} * (100vh - 3.5rem)))`,
          transition: "transform 0.65s cubic-bezier(0.77, 0, 0.175, 1)",
          willChange: "transform",
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              height: "calc(100vh - 3.5rem)",
              opacity: currentIndex === index ? 1 : 0,
              transform:
                currentIndex === index ? "scale(1)" : "scale(0.92)",
              transition:
                "opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s",
            }}
            className="flex flex-col items-center justify-center px-6 text-center"
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Hero scroll CTA */}
      {currentIndex === 0 && (
        <button
          onClick={() => goTo(1)}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <span className="text-sm tracking-widest uppercase">
            Scroll down to get a glimpse of my journey
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      )}

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
      {currentIndex > 0 && currentIndex < total - 1 && (
        <button
          onClick={() => goTo(currentIndex + 1)}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all animate-bounce"
          aria-label="Go down"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      )}

      {/* Scroll to top on last section */}
      {currentIndex === total - 1 && (
        <button
          onClick={() => goTo(0)}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all text-sm tracking-wide"
        >
          ↑ Scroll to top
        </button>
      )}
    </>
  );
}
