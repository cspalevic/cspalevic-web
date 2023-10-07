"use client";

import { useEffect, useState } from "react";
import { default as ImageLightbox } from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";

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
  return <ImageLightbox mainSrc={imageSrc} onCloseRequest={closeLightbox} />;
};
