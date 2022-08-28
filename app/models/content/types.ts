export interface BlogMetadata {
  title: string;
  alt: string;
  slug: string;
  date: string;
  image?: string;
}

export interface Blog {
  metadata: BlogMetadata;
  content: string;
}

/**
 * Interface to plug and play blog serving
 */
export interface IContent {
  /**
   * Get a blog's content given its slug name
   * @returns blog content
   */
  getContent: (slug: string) => Promise<Blog | null>;
  /**
   * Get all blogs available
   * @returns all blogs
   */
  getAllContent: () => Promise<BlogMetadata[]>;
}
