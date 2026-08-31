import type { Metadata } from "next";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { getAllBlogMetadata } from "@/lib/blog-metadata";
import { parseAndFormat } from "@/lib/date";
import Link from "next/link";
import { ViewTransition } from "react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Charlie Spalevic - Blog",
};

export default async function Blog() {
  const blogs = await getAllBlogMetadata();

  return (
    <div className="flex flex-col gap-6">
      {blogs.map((blog) => (
        <Link
          key={blog.slug}
          href={`/blog/${blog.slug}`}
          className="group flex flex-row justify-start items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both ease-out"
        >
          <ViewTransition name={`blog-image-${blog.slug}`}>
            <CloudinaryImage
              path={`/${blog.slug}/${blog.image}`}
              alt={blog.alt}
              className="h-16 w-28  rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
              transformations={{
                quality: "auto",
                format: "auto",
                cropMode: "fill",
              }}
              width={224}
              height={128}
            />
          </ViewTransition>
          <div className="min-w-0">
            <ViewTransition name={`blog-title-${blog.slug}`}>
              <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:underline underline-offset-4">
                {blog.title}
              </h3>
            </ViewTransition>
            <ViewTransition name={`blog-date-${blog.slug}`}>
              <time className="text-sm text-muted-foreground">
                {parseAndFormat(blog.date)}
              </time>
            </ViewTransition>
          </div>
        </Link>
      ))}
    </div>
  );
}
