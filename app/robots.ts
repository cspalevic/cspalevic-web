import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const url = process.env.VERCEL_URL ?? "https://cspalevic.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
