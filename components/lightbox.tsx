"use client";

import { useEffect, useState } from "react";
import ImageLightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export const Lightbox = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const lightboxClickListener = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "IMG") {
      const img = event.target as HTMLImageElement;
      if (img.src) {
        setImageSrc(img.src);
        document.body.classList.add("overflow-hidden");
      }
    }
    event.stopPropagation();
  };

  const closeLightbox = () => {
    setImageSrc(null);
    document.body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    window.addEventListener("click", lightboxClickListener);
    return () => {
      window.removeEventListener("click", lightboxClickListener);
    };
  }, []);

  if (!imageSrc) return null;
  return (
    <ImageLightbox
      open={!!imageSrc}
      close={closeLightbox}
      slides={[{ src: imageSrc }]}
    />
  );
};
