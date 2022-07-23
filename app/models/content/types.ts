/**
 * Interface to plug and play blog serving
 * Choices to choose from:
 * - file system (for fast local development)
 * - github (for production content)
 *
 * Future use case (for better pagination, sorting and searching support):
 * - faunadb
 * - mongodb
 * - algolia
 */
export interface IContent {
  /**
   * Get a blog's content given its slug name
   * @returns blog content
   */
  getContent: (slug: string) => Promise<string>;
  /**
   * Get all blogs available
   * @returns all blogs
   */
  getAllContent: () => Promise<string[]>;
}
