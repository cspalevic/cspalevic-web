"use client";

import Image from "next/image";
import Lottie from "lottie-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type Milestone = {
  lottie?: string;
  emoji?: string;
  image?: string;
  component?: React.ReactNode;
  date?: string;
  title?: string;
  description?: string;
};

export const MILESTONE_COUNT = 13;

// ------- Icon renderer -------

function MilestoneIcon({ milestone }: { milestone: Milestone }) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    if (!milestone.lottie) return;
    fetch(milestone.lottie)
      .then((r) => r.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, [milestone.lottie]);

  if (milestone.image) {
    return (
      <div className="w-28 h-28 rounded-2xl overflow-hidden mb-6 shadow-lg">
        <Image
          src={milestone.image}
          alt={milestone.title ?? ""}
          width={112}
          height={112}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (milestone.lottie && animationData) {
    return (
      <div className="w-32 h-32 mb-6">
        <Lottie animationData={animationData} loop autoplay />
      </div>
    );
  }

  return (
    <span className="text-[6rem] leading-none mb-6 animate-bounce-slow block">
      {milestone.emoji ?? "⭐"}
    </span>
  );
}

// ------- Milestone card -------

function MilestoneCard({
  milestone,
  sectionIndex,
  currentIndex,
}: {
  milestone: Milestone;
  sectionIndex: number;
  currentIndex: number;
}) {
  const visible = currentIndex === sectionIndex;

  return (
    <div
      style={{
        height: "calc(100vh - 3.5rem)",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.92)",
        transition: "opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s",
      }}
      className="flex flex-col items-center justify-center px-6 text-center bg-black"
    >
      {milestone.component ? (
        milestone.component
      ) : (
        <>
          <MilestoneIcon milestone={milestone} />
          {milestone.date && (
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-2">
              {milestone.date}
            </span>
          )}
          {milestone.title && (
            <h3 className="text-2xl font-bold text-white mb-3 max-w-xl">
              {milestone.title}
            </h3>
          )}
          {milestone.description && (
            <p className="text-zinc-400 max-w-lg leading-relaxed">
              {milestone.description}
            </p>
          )}
        </>
      )}
    </div>
  );
}

// ------- Timeline -------

export function Timeline({ milestones }: { milestones: Milestone[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const total = milestones.length;

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
        {milestones.map((milestone, index) => (
          <MilestoneCard
            key={index}
            milestone={milestone}
            sectionIndex={index}
            currentIndex={currentIndex}
          />
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
    </div>
  );
}
