import frontmatter from "@github-docs/frontmatter";

export const extractData = (markdown: string): Blog => {
  const { data, content } = frontmatter(markdown);
  return { metadata: data, content };
};
