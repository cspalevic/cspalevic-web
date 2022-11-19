import type { LoaderFunction } from "@remix-run/server-runtime";
import type { Blog } from "~/models/content/types";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Lightbox from "react-18-image-lightbox";
import contentServer from "~/models/content/index.server";

interface LoaderData {
  blog: Maybe<Blog>;
}

export const loader: LoaderFunction = async ({ params }) => {
  const blog = await contentServer.getContent(params?.slug ?? "");

  // https://remix.run/docs/en/v1/guides/not-found
  if (!blog) {
    throw new Response("Not found", {
      status: 404,
    });
  }

  return json<LoaderData>({ blog });
};

const BlogSlug: React.FC = () => {
  const { blog } = useLoaderData<LoaderData>();
  const [lightboxImageSrc, setLightboxImageSrc] = useState<string | null>(null);

  const lightboxClickListener: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "IMG" && target.className.includes("img-lightbox")) {
      const img = event.target as HTMLImageElement;
      if (img.src) {
        setLightboxImageSrc(img.src);
        document.body.classList.add("overflow-hidden");
      }
    }
    event.stopPropagation();
  };

  const closeLightbox = () => {
    setLightboxImageSrc(null);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <div
      onClick={lightboxClickListener}
      className="flex w-full h-full flex-col"
    >
      <h1 className="md:text-center">{blog?.metadata?.title}</h1>
      <h4 className="md:text-center">{blog?.metadata?.date}</h4>
      <div
        className="mt-5 grid grid-rows-1 gap-y-6 w-full flex-col md-content"
        dangerouslySetInnerHTML={{
          __html: blog?.html ?? "",
        }}
      />
      {!!lightboxImageSrc && (
        <Lightbox mainSrc={lightboxImageSrc} onCloseRequest={closeLightbox} />
      )}
    </div>
  );
};

export default BlogSlug;
