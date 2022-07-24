import type { ENV } from "~/models/session/types";

export {};

declare global {
  interface Window {
    ENV: ENV;
  }

  interface BlogMetadata {
    title: string;
    alt: string;
    slug: string;
    date: string;
    image?: string;
  }

  interface Blog {
    metadata: BlogMetadata;
    content: string;
  }

  type Maybe<T> = T | null | undefined;
}
