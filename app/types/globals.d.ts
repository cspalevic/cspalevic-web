import type { ENV } from "~/models/session/types";

export {};

declare global {
  interface Window {
    ENV: ENV;
  }

  interface NetworkInformation {
    readonly effectiveType?: EffectiveConnectionType;
  }

  type EffectiveConnectionType = "2g" | "3g" | "4g" | "slow-2g";

  type Maybe<T> = T | null | undefined;
}
