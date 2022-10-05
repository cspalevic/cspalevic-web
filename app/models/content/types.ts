export interface BlogMetadata {
  title: string;
  alt: string;
  slug: string;
  date: string;
  image?: string;
}

export interface Blog {
  metadata: BlogMetadata;
  html: string;
}

export interface MarkdownContent {
  metadata: Pick<BlogMetadata, "title" | "date" | "image" | "alt">;
  markdown: string;
}

/**
 * Interface to plug and play blog serving
 */
export interface IContent {
  /**
   * Get a blog's content given its slug name
   * @returns blog content
   */
  getContent: (slug: string) => Promise<Blog>;
  /**
   * Get all blogs available
   * @returns all blogs
   */
  getAllContent: () => Promise<BlogMetadata[]>;
}
