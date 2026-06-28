"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => !!navigator.gpu;
const getServerSnapshot = () => false;

export function useWebGPUSupported() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
