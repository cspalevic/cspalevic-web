import { getAllBlogMetadata, getBlogMetadata } from "@/lib/blog";
import { parse, parseAndFormat } from "@/lib/date";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllBlogMetadata();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogMetadata(slug);

  if (!post) {
    return {};
  }

  const title = `Charlie Spalevic - ${post.title}`;
  const url = `/blog/${slug}`;
  const publishedTime = parse(post.date).toISOString();

  return {
    title,
    description: post.description,
    openGraph: {
      type: "article",
      siteName: "Charlie Spalevic",
      title: post.title,
      description: post.description,
      url,
      locale: "en_US",
      publishedTime,
      authors: ["Charlie Spalevic"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const { default: Post } = await import(`@/posts/${slug}/page.mdx`);
  const post = await getBlogMetadata(slug);

  if (!post) {
    return notFound();
  }

  const { title, date } = post;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <ViewTransition name={`blog-title-${slug}`}>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h1>
        </ViewTransition>
        <ViewTransition name={`blog-date-${slug}`}>
          <time className="text-sm text-muted-foreground font-medium">
            {parseAndFormat(date)}
          </time>
        </ViewTransition>
      </div>
      <div>
        <Post />
      </div>
    </div>
  );
}
