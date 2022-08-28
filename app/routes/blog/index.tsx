import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "~/components/card";
import contentServer from "~/models/content/content.server";
import { parseAndFormat } from "~/utils/date";

import type { LoaderFunction } from "@remix-run/server-runtime";
import type { BlogMetadata } from "~/models/content/types";

interface LoaderData {
  blogs: BlogMetadata[];
}

export const loader: LoaderFunction = async () => {
  const contentList = await contentServer.getAllContent();
  return json<LoaderData>({ blogs: contentList });
};

const BlogList: React.FC = () => {
  const { blogs } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col">
      <h1>Blog</h1>
      <div className="grid gap-y-10 grid-cols-1 md:gap-10 md:grid-cols-2 lg:gap-20 py-5">
        {blogs.map((blog) => (
          <Card
            key={blog.slug}
            to={`/blog/${blog.slug}`}
            image={blog.image}
            alt={blog.alt}
            title={blog.title}
            subTitle={parseAndFormat(blog.date)}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
