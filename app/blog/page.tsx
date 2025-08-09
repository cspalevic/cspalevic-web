import type { Metadata } from "next";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { contentServer } from "@/lib/content/index";
import { parseAndFormat } from "@/lib/date";
import Link from "next/link";

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
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-gray-100 dark:bg-gray-800">
              <CloudinaryImage
                path={`/${blog.slug}/${blog.image}`}
                alt={blog.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                transformations={{
                  quality: "auto",
                  format: "auto",
                  cropMode: "fill",
                }}
                width={800}
                height={450}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-200 text-sm">
                  {parseAndFormat(blog.date)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
