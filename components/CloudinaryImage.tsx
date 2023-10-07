"use client";

import Image from "next/image";
import React, { useState } from "react";

const BASE_URL = "https://cedomir.mo.cloudinary.net/assets";
const ERROR_IMAGE = "error.png";

const buildImageUrl = (
  path: string,
  { quality = "auto", format = "auto", cropMode }: Transformations = {},
  width?: number,
  height?: number
) => {
  if (path.startsWith("/")) path = path.substring(1);
  if (path.includes("?")) {
    let url = `${BASE_URL}/${path}`;
    if (width) url += `,w_${width}`;
    if (height) url += `,h_${height}`;
    return url;
  }

  let txQuery = `tx=q_${quality},f_${format}`;
  if (cropMode) txQuery = `tx=c_${cropMode}`;
  if (width) txQuery += `,w_${width}`;
  if (height) txQuery += `,h_${height}`;
  return `${BASE_URL}/${path}?${txQuery}`;
};

type CropMode = "crop" | "fill";

type Transformations = {
  // https://cloudinary.com/documentation/media_optimizer_transformation_reference#q_quality
  quality?: "auto";
  // https://cloudinary.com/documentation/media_optimizer_transformation_reference#f_format
  format?: "auto" | "webm" | "gif" | "jpg" | "png";
  // https://cloudinary.com/documentation/transformation_reference#c_crop_resize
  cropMode?: CropMode;
};

type CloudinaryImageProps = {
  path: string;
  alt: string;
  hideOnError?: boolean;
  transformations?: Transformations;
  ref?: React.ForwardedRef<HTMLImageElement>;
  width?: number;
  height?: number;
  className?: string;
};

export const CloudinaryImage = ({
  path,
  hideOnError = false,
  alt = "",
  transformations = {},
  width,
  height,
  className,
}: CloudinaryImageProps) => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [image, setImage] = useState<string>(
    buildImageUrl(path, transformations, width, height)
  );

  const onError = () => {
    if (hideOnError) {
      setHidden(true);
      return;
    }
    setImage(buildImageUrl(ERROR_IMAGE, transformations));
  };

  if (hidden) return null;
  return (
    <Image
      src={image}
      alt={alt}
      onError={onError}
      aria-hidden="true"
      width={width}
      height={height}
      className={className}
    />
  );
};
