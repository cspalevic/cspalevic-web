import frontmatter from "@github-docs/frontmatter";
import { lstatSync, readFileSync } from "fs";
import { readdir } from "fs/promises";
import { join } from "path";
import { z } from "zod/v4";

const blogMetadataSchema = z.object({
  title: z.string(),
  alt: z.string(),
  date: z.string(),
  image: z.string().optional(),
});

export type BlogMetadata = z.infer<typeof blogMetadataSchema>;

export async function getAllBlogMetadata(): Promise<
  (BlogMetadata & { slug: string })[]
> {
  const blogPath = join(process.cwd(), "app/blog");
  const blogDirectoryContent = await readdir(blogPath);
  const blogs: (BlogMetadata & { slug: string })[] = [];

  for (const folderName of blogDirectoryContent) {
    const fullFolderPath = join(blogPath, folderName);
    if (!lstatSync(fullFolderPath).isDirectory()) continue;

    const pagePath = join(fullFolderPath, "page.mdx");
    const fileContent = await readFileSync(pagePath, "utf-8");
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
}
