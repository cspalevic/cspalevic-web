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
    <div className="grid gap-y-10 grid-cols-1 md:gap-10 md:grid-cols-2 lg:gap-20 py-5">
      {blogs.map((blog) => (
        <Link
          key={blog.slug}
          href={`/blog/${blog.slug}`}
          className="group block animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both ease-out"
        >
          <div className="relative overflow-hidden rounded-xl aspect-[16/9]">
            <ViewTransition name={`blog-image-${blog.slug}`}>
              <CloudinaryImage
                path={`/${blog.slug}/${blog.image}`}
                alt={blog.alt}
                className="rounded-xl aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-105"
                transformations={{
                  quality: "auto",
                  format: "auto",
                  cropMode: "fill",
                }}
                width={800}
                height={450}
              />
            </ViewTransition>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <ViewTransition name={`blog-title-${blog.slug}`}>
                <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
                  {blog.title}
                </h3>
              </ViewTransition>
              <ViewTransition name={`blog-date-${blog.slug}`}>
                <p className="text-gray-200 text-sm">
                  {parseAndFormat(blog.date)}
                </p>
              </ViewTransition>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
