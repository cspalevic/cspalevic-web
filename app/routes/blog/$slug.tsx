import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import contentServer from "~/models/content/content.server";

import type { LoaderFunction } from "@remix-run/server-runtime";
import type { Blog } from "~/models/content/types";

interface LoaderData {
  blog: Blog;
}

export const loader: LoaderFunction = async ({ params }) => {
  const blog = await contentServer.getContent(params.slug);

  // TODO
  // Running the below gives me: TypeError: body used already for:
  // https://remix.run/docs/en/v1/guides/not-found
  //if (!blog) throw new Response("Not found", { status: 404 });

  return json<LoaderData>({ blog });
};

const BlogSlug: React.FC = () => {
  const {
    blog: {
      metadata: { title, date },
      html,
    },
  } = useLoaderData<LoaderData>();

  return (
    <div className="flex w-full h-full flex-col">
      <h1 className="md:text-center">{title}</h1>
      <h4 className="md:text-center">{date}</h4>
      <div
        className="mt-5 grid grid-rows-1 gap-y-6 w-full flex-col md-content"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
};

export default BlogSlug;
