import { useLoaderData } from "@remix-run/react";
import { json, Response } from "@remix-run/node";
import contentServer from "~/models/content/content.server";
import Markdown from "~/components/markdown";

import type { LoaderFunction } from "@remix-run/server-runtime";
import type { Blog } from "~/models/content/types";

interface LoaderData {
  blog?: Blog;
}

export const loader: LoaderFunction = async ({ params }) => {
  const blog = await contentServer.getContent(params.slug);

  // TODO: handle 404. Below does not seem to work
  // https://remix.run/docs/en/v1/guides/not-found
  //if (!blog) throw new Response("Not found", { status: 404 });

  return json<LoaderData>({ blog });
};

const BlogSlug: React.FC = () => {
  const {
    blog: { metadata, content },
  } = useLoaderData<LoaderData>();

  return (
    <div className="flex w-full h-full flex-col">
      <h1 className="text-center">{metadata.title}</h1>
      <h4 className="text-center">{metadata.date}</h4>
      <Markdown
        content={content}
        className="mt-5 grid grid-rows-1 gap-y-6 w-full flex-col"
      />
    </div>
  );
};

export default BlogSlug;
