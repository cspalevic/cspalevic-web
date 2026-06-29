"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic.js";

const DynamicGalaxyShaderBackground = dynamic(
  async () =>
    (await import("./galaxy-shader-background.js")).GalaxyShaderBackground,
  { ssr: false },
);

const subscribe = () => () => {};
const getSnapshot = () => !!navigator.gpu;
const getServerSnapshot = () => false;

export function WebGPUFeatures() {
  const isWebGPUSupported = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isWebGPUSupported) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <DynamicGalaxyShaderBackground />
    </div>
  );
}
