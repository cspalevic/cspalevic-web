import contentServer from "./content/index.server";

type CustomResponse = {
  value: string;
  byteLength: string;
};

export const getByteLength = (text: string) =>
  new TextEncoder().encode(text).byteLength.toString();

export const getOrigin = (request: Request) => new URL(request.url).origin;

export const getRobots = (request: Request): CustomResponse => {
  const origin = getOrigin(request);
  const values = {
    "User-agent": "*",
    Allow: "/",
    Sitemap: `${origin}/sitemap.xml`,
  };
  const robotsTxt = Object.entries(values)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  const byteLength = getByteLength(robotsTxt);
  return {
    value: robotsTxt,
    byteLength,
  };
};

type URLEntry = {
  location: string;
};

const getUrlEntry = ({ location }: URLEntry) => `
    <url>
        <loc>${location}</loc>
    </url>
`;

export const getSitemap = async (request: Request): Promise<CustomResponse> => {
  const origin = getOrigin(request);

  const contentList = await contentServer.getAllContent();
  const sitemap: URLEntry[] = [
    { location: origin },
    { location: `${origin}/resume` },
    { location: `${origin}/blog` },
  ].concat(
    contentList.map((blog) => ({
      location: `${origin}/blog/${blog.slug}`,
    }))
  );
  const sitemapXml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    ${sitemap.map(getUrlEntry).join("")}
  </urlset>`.trim();
  const byteLength = getByteLength(sitemapXml);
  return {
    value: sitemapXml,
    byteLength,
  };
};
