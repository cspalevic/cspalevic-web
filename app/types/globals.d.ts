import type { ENV } from "~/models/session/types";

export {};

declare global {
  interface Window {
    ENV: ENV;
  }

  type Maybe<T> = T | null | undefined;
}
