import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { contentServer } from "@/lib/content/index";
import { parseAndFormat } from "@/lib/date";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Charlie Spalevic - Blog",
};

export default async function Blog() {
  const blogs = await contentServer.getAllContent();

  return (
    <div className="flex flex-col">
      <h1>Blog</h1>
      <div className="grid gap-y-10 grid-cols-1 md:gap-10 md:grid-cols-2 lg:gap-20 py-5">
        {blogs.map((blog) => (
          <Card
            key={blog.slug}
            to={`/blog/${blog.slug}`}
            imagePath={`/${blog.slug}/${blog.image}`}
            alt={blog.alt}
            title={blog.title}
            subTitle={parseAndFormat(blog.date)}
          />
        ))}
      </div>
    </div>
  );
}
