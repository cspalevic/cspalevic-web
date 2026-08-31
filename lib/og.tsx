import { ImageResponse } from "next/og";
import type { ReactElement } from "react";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const notoSansMedium = fetch(
  "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@5.2.8/latin-500-normal.ttf",
).then((res) => res.arrayBuffer());

const notoSansBold = fetch(
  "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@5.2.8/latin-700-normal.ttf",
).then((res) => res.arrayBuffer());

export function OgLayout({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer: string;
}) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#171717",
        color: "#fafafa",
        padding: "72px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: 3.2,
          color: "#a3a3a3",
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: title.length > 42 ? 56 : 72,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: -1.5,
          maxWidth: 980,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          fontSize: 22,
          fontWeight: 500,
          color: "#a3a3a3",
        }}
      >
        {footer}
      </div>
    </div>
  );
}

export async function createOgImage(element: ReactElement) {
  const [medium, bold] = await Promise.all([notoSansMedium, notoSansBold]);

  return new ImageResponse(element, {
    ...ogSize,
    fonts: [
      {
        name: "Noto Sans",
        data: medium,
        style: "normal",
        weight: 500,
      },
      {
        name: "Noto Sans",
        data: bold,
        style: "normal",
        weight: 700,
      },
    ],
  });
}
