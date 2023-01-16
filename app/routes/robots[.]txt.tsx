import type { LoaderFunction } from "@remix-run/node";
import { getRobots } from "~/services/seo.server";

export const loader: LoaderFunction = ({ request }) => {
  const { value, byteLength } = getRobots(request);
  return new Response(value, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Length": byteLength,
    },
  });
};
