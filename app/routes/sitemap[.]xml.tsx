import type { LoaderFunction } from "@remix-run/node";
import { getSitemap } from "~/services/seo.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { value, byteLength } = await getSitemap(request);
  return new Response(value, {
    headers: {
      "Content-Type": "application/xml",
      "Content-Length": byteLength,
    },
  });
};
