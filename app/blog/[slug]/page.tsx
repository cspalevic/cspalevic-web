import type { Metadata } from "next";
import { getAllBlogMetadata, getBlogMetadata } from "@/lib/blog";
import { parse } from "@/lib/date";

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

  return <Post />;
}
