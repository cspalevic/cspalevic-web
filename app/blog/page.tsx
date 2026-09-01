import { getAllBlogMetadata, type BlogPost } from "@/lib/blog";
import { parse } from "@/lib/date";
import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Charlie Spalevic - Blog",
  description:
    "Writing on software, engineering, and things I learn along the way.",
  openGraph: {
    type: "website",
    siteName: "Charlie Spalevic",
    title: "Blog",
    description:
      "Writing on software, engineering, and things I learn along the way.",
    url: "/blog",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charlie Spalevic - Blog",
    description:
      "Writing on software, engineering, and things I learn along the way.",
  },
};

export function BlogPreview({ blog }: { blog: BlogPost }) {
  const date = parse(blog.date);
  const monthDay = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const year = date.getFullYear();

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both ease-out"
    >
      <ViewTransition name={`blog-date-${blog.slug}`}>
        <time
          dateTime={`${year}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`}
          className="flex flex-col pt-0.5 text-sm leading-tight text-muted-foreground tabular-nums"
        >
          <span>{monthDay}</span>
          <span>{year}</span>
        </time>
      </ViewTransition>
      <div className="flex min-w-0 flex-col gap-1">
        <ViewTransition name={`blog-title-${blog.slug}`}>
          <h3 className="text-lg font-semibold text-foreground group-hover:underline underline-offset-4">
            {blog.title}
          </h3>
        </ViewTransition>
        <p className="text-sm text-secondary-foreground leading-relaxed">
          {blog.description}
        </p>
      </div>
    </Link>
  );
}

export default async function Blog() {
  const blogs = await getAllBlogMetadata();

  return (
    <div className="flex flex-col gap-6">
      {blogs.map((blog) => (
        <BlogPreview key={blog.slug} blog={blog} />
      ))}
    </div>
  );
}
