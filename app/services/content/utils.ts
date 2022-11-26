import type { BlogMetadata, MarkdownContent } from "./types";
import frontmatter from "@github-docs/frontmatter";

export const extractData = (markdown: string): MarkdownContent => {
  const { data, content } = frontmatter(markdown);
  return { metadata: data, markdown: content };
};

export const sortBlogs = (blogsMetadata: BlogMetadata[]) =>
  blogsMetadata.sort((a, b) => {
    const firstBlogCreateTime = new Date(a.date).getTime();
    const secondBlogCreateTime = new Date(b.date).getTime();
    return firstBlogCreateTime > secondBlogCreateTime ? -1 : 1;
  });
