import createMDX from "@next/mdx";
import rehypeShiki from "rehype-shiki";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cedomir.mo.cloudinary.net",
        port: "",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [
      [
        rehypeShiki,
        {
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
