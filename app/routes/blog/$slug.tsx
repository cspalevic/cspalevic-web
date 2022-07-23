import React from "react";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import contentServer from "~/models/content/index.server";
import { extractData } from "~/models/markdown.server";
import Markdown from "~/components/markdown";

import type { LoaderFunction } from "@remix-run/server-runtime";

interface LoaderData {
  blog?: Blog;
}

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) return json<LoaderData>({});
  const content = await contentServer.getContent(params.slug);
  const blog = await extractData(content);
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
