import type { MarkdownContent } from "./types";
import frontmatter from "@github-docs/frontmatter";

export const extractData = (markdown: string): MarkdownContent => {
  const { data, content } = frontmatter(markdown);
  return { metadata: data, markdown: content };
};