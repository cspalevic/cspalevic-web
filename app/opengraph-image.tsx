import { createOgImage, ogContentType, OgLayout, ogSize } from "@/lib/og";

export const alt = "Charlie Spalevic";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return createOgImage(
    <OgLayout
      eyebrow="Charlie Spalevic"
      title="Software engineer in Chicago"
      footer="cspalevic.com"
    />,
  );
}
