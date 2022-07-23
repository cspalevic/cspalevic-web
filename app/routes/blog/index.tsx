import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "~/components/card";
import contentServer from "~/models/content/index.server";
import { extractData } from "~/models/markdown.server";
import { parse, parseAndFormat } from "~/utils/date";

interface LoaderData {
  blogs: BlogMetadata[];
}

export const loader = async () => {
  const contentList = await contentServer.getAllContent();
  let metadataList = await Promise.all(
    contentList.map(async (content) => {
      const { metadata } = await extractData(content);
      return metadata;
    })
  );
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  metadataList = metadataList.sort((prev, curr) =>
    parse(prev.date).isAfter(parse(curr.date)) ? -1 : 1
  );
  return json<LoaderData>({ blogs: metadataList });
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
