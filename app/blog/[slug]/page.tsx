import type { Metadata } from "next";
import { getAllBlogMetadata, getBlogMetadata } from "@/lib/blog";

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

  return {
    title: `Charlie Spalevic - ${post.title}`,
    description: post.description,
  };
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const { default: Post } = await import(`@/posts/${slug}/page.mdx`);

  return <Post />;
}
