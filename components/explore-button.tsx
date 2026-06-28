"use client";

import { Button } from "@/components/ui/button";
import { useWebGPUSupported } from "@/lib/use-webgpu-supported";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const WebGPUEarth = dynamic(
  async () => (await import("./web-gpu-earth.js")).default,
  { ssr: false },
);

export function ExploreButton() {
  const supported = useWebGPUSupported();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!supported) return;
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [supported]);

  if (!supported) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <span>Explore</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>E
        </kbd>
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black">
          <WebGPUEarth />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10 h-9 w-9 text-white hover:bg-white/10 hover:text-white"
            onClick={close}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
    </>
  );
}
