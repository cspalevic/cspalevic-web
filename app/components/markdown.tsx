import { useMarkdown } from "~/providers/markdown";

import type { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  content: string;
}

const Markdown: FC<Props> = ({ content, ...rest }) => {
  const { convertToHtml } = useMarkdown();

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: convertToHtml(content),
      }}
      {...rest}
    />
  );
};

export default Markdown;
