import React, { forwardRef, useState } from "react";

type CropMode = "crop" | "fill";

interface Transformations {
  // https://cloudinary.com/documentation/media_optimizer_transformation_reference#q_quality
  quality?: "auto";
  // https://cloudinary.com/documentation/media_optimizer_transformation_reference#f_format
  format?: "auto" | "webm" | "gif" | "jpg" | "png";
  // https://cloudinary.com/documentation/transformation_reference#c_crop_resize
  cropMode?: CropMode;
}

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  path?: string;
  // Adding alt as prop to suppress alt-text eslint rule
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md
  alt: string;
  hideOnError?: boolean;
  transformations?: Transformations;
  ref?: React.ForwardedRef<HTMLImageElement>;
  width?: string;
  height?: string;
}

const BASE_URL = "https://cedomir.mo.cloudinary.net/assets";
const ERROR_IMAGE = "error.png";

const buildImageUrl = (
  path: string,
  { quality = "auto", format = "auto", cropMode }: Transformations = {},
  width?: string,
  height?: string
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

const Image: React.FC<Props> = ({
  src,
  path = "",
  hideOnError = false,
  alt = "",
  transformations = {},
  width,
  height,
  ...rest
}) => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [image, setImage] = useState<string>(
    !src ? buildImageUrl(path, transformations, width, height) : src
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
      width={width}
      height={height}
      {...rest}
    />
  );
};

// eslint-disable-next-line react/display-name
const ForwardImage = forwardRef<HTMLImageElement, Props>((props, ref) => (
  <Image {...props} ref={ref} />
));

export default ForwardImage;
