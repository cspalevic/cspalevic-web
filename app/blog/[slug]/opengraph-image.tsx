import { getBlogMetadata } from "@/lib/blog";
import { parseAndFormat } from "@/lib/date";
import { createOgImage, ogContentType, OgLayout, ogSize } from "@/lib/og";
import { notFound } from "next/navigation";

export const size = ogSize;
export const contentType = ogContentType;

export async function generateImageMetadata({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getBlogMetadata(slug);

  return [
    {
      id: "og",
      size: ogSize,
      contentType: ogContentType,
      alt: post
        ? `${post.title} — Charlie Spalevic`
        : "Charlie Spalevic — Blog",
    },
  ];
}

export default async function Image({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getBlogMetadata(slug);

  if (!post) {
    notFound();
  }

  return createOgImage(
    <OgLayout
      eyebrow="Charlie Spalevic · Blog"
      title={post.title}
      footer={`${parseAndFormat(post.date)}  ·  cspalevic.com`}
    />,
  );
}
