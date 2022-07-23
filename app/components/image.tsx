import { useState } from "react";

import type { FC, ImgHTMLAttributes } from "react";

interface Transformations {
  // https://cloudinary.com/documentation/media_optimizer_transformation_reference#q_quality
  quality?: "auto";
  // https://cloudinary.com/documentation/media_optimizer_transformation_reference#f_format
  format?: "auto" | "webm" | "gif" | "jpg" | "png";
  width?: string;
  height?: string;
  crop?: boolean;
}

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  filename: string;
  // Adding alt as prop to suppress alt-text eslint rule
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md
  alt: string;
  hideOnError?: boolean;
  transformations?: Transformations;
}

const BASE_URL = "https://cedomir.mo.cloudinary.net/images";
const ERROR_IMAGE = "error.png";

const buildImageUrl = (
  filename: string,
  transformations: Transformations = {}
) => {
  const {
    quality = "auto",
    format = "auto",
    crop = false,
    width = "",
    height = "",
  } = transformations;
  let txQuery = `tx=q_${quality},f_${format}`;
  if (crop) txQuery += `,c_crop`;
  if (width) txQuery += `,w_${width}`;
  if (height) txQuery += `,h_${height}`;
  return `${BASE_URL}/${filename}?${txQuery}`;
};

const Image: FC<Props> = ({
  filename,
  hideOnError = false,
  alt = "",
  transformations = {},
  ...rest
}) => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [image, setImage] = useState<string>(
    buildImageUrl(filename, transformations)
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
    <img
      src={image}
      alt={alt}
      onError={onError}
      loading="lazy"
      aria-hidden="true"
      {...rest}
    />
  );
};

export default Image;
