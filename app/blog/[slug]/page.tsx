import { Lightbox } from "@/components/lightbox";
import { contentServer } from "@/lib/content/index";

type BlogPostProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const blogs = await contentServer.getAllContent();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: BlogPostProps) {
  // Good to know: fetch requests are automatically memoized for the same data across generateMetadata,
  // generateStaticParams, Layouts, Pages, and Server Component
  const { slug } = await params;
  const blog = await contentServer.getContent(slug);
  const title = blog?.metadata.title;
  return {
    title: `Charlie Spalevic - ${title}`,
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const blog = await contentServer.getContent(slug);

  return (
    <div className="flex w-full h-full flex-col">
      <h1 className="md:text-center">{blog?.metadata?.title}</h1>
      <h4 className="md:text-center">{blog?.metadata?.date}</h4>
      <div
        className="mt-5 grid grid-rows-1 gap-y-6 w-full flex-col markdown-content"
        dangerouslySetInnerHTML={{
          __html: blog?.html ?? "",
        }}
      />
      <Lightbox />
    </div>
  );
}
