export {};

declare global {
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
