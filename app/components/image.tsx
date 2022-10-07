import React, { forwardRef, useState } from "react";

interface Transformations {
  // https://cloudinary.com/documentation/media_optimizer_transformation_reference#q_quality
  quality?: "auto";
  // https://cloudinary.com/documentation/media_optimizer_transformation_reference#f_format
  format?: "auto" | "webm" | "gif" | "jpg" | "png";
  width?: string;
  height?: string;
  crop?: boolean;
}

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  path?: string;
  // Adding alt as prop to suppress alt-text eslint rule
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md
  alt: string;
  hideOnError?: boolean;
  transformations?: Transformations;
  ref?: React.ForwardedRef<HTMLImageElement>;
}

const BASE_URL = "https://cedomir.mo.cloudinary.net/assets";
const ERROR_IMAGE = "error.png";

const buildImageUrl = (path: string, transformations: Transformations = {}) => {
  if (path.startsWith("/")) path = path.substring(1);
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
  return `${BASE_URL}/${path}?${txQuery}`;
};

const Image: React.FC<Props> = ({
  src,
  path,
  hideOnError = false,
  alt = "",
  transformations = {},
  ...rest
}) => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [image, setImage] = useState<string>(
    !src ? buildImageUrl(path, transformations) : src
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

// eslint-disable-next-line react/display-name
const ForwardImage = forwardRef<HTMLImageElement, Props>((props, ref) => (
  <Image {...props} ref={ref} />
));

export default ForwardImage;
