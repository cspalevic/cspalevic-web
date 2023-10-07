import { contentServer } from "@/lib/content/index";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await contentServer.getAllContent();

  const url = process.env.VERCEL_URL ?? "https://cspalevic.com";
  return [
    {
      url,
      lastModified: new Date(),
    },
    {
      url: `${url}/resume`,
      lastModified: new Date(),
    },
    {
      url: `${url}/blog`,
      lastModified: new Date(),
    },
    ...blogs.map(({ slug }) => ({
      url: `${url}/blog/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
