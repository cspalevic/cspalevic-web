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

  type RootData = {
    theme: Theme;
    env: ENV;
  };

  type ENV = {
    NODE_ENV: string;
    VERCEL_ANALYTICS_ID: string;
  };

  type Theme = "light" | "dark";
}
