import frontmatter from "@github-docs/frontmatter";
import { lstatSync, readFileSync } from "fs";
import { readdir } from "fs/promises";
import { join } from "path";
import { cache } from "react";
import { z } from "zod/v4";

const blogMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
});

export type BlogMetadata = z.infer<typeof blogMetadataSchema>;

export type BlogPost = BlogMetadata & { slug: string };

export const getAllBlogMetadata = cache(async (): Promise<BlogPost[]> => {
  const postsPath = join(process.cwd(), "posts");
  const postsDirectoryContent = await readdir(postsPath);
  const blogs: BlogPost[] = [];

  for (const folderName of postsDirectoryContent) {
    const fullFolderPath = join(postsPath, folderName);
    if (!lstatSync(fullFolderPath).isDirectory()) continue;

    const pagePath = join(fullFolderPath, "page.mdx");
    const fileContent = readFileSync(pagePath, "utf-8");
    const { data } = frontmatter(fileContent);
    const metadata = blogMetadataSchema.parse(data);
    blogs.push({
      ...metadata,
      slug: folderName,
    });
  }

  // sort newest to oldest
  return blogs.sort((a, b) => {
    const firstBlogCreateTime = new Date(a.date).getTime();
    const secondBlogCreateTime = new Date(b.date).getTime();
    return firstBlogCreateTime > secondBlogCreateTime ? -1 : 1;
  });
});

export async function getBlogMetadata(
  slug: string,
): Promise<BlogPost | undefined> {
  const blogs = await getAllBlogMetadata();
  return blogs.find((blog) => blog.slug === slug);
}
