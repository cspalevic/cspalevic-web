import { parseAndFormat } from "@/lib/date";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { ViewTransition } from "react";

interface BlogHeaderProps {
  slug: string;
  title: string;
  date: string;
  image?: {
    path: string;
    alt: string;
  };
}

export function BlogHeader({ slug, title, date, image }: BlogHeaderProps) {
  return (
    <header className="mb-8">
      {image && (
        <ViewTransition name={`blog-image-${slug}`}>
          <div className="w-full flex justify-center">
            <CloudinaryImage
              path={image.path}
              alt={image.alt}
              className="rounded-xl inset-0 object-cover transition-transform duration-300 group-hover:scale-105"
              transformations={{
                quality: "auto",
                format: "auto",
                cropMode: "fill",
              }}
              width={800}
              height={450}
            />
          </div>
        </ViewTransition>
      )}
      <ViewTransition name={`blog-title-${slug}`}>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h1>
      </ViewTransition>
      <ViewTransition name={`blog-date-${slug}`}>
        <time className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {parseAndFormat(date)}
        </time>
      </ViewTransition>
    </header>
  );
}
