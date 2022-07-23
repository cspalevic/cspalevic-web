import { useEffect, useContext, createContext } from "react";
import { marked } from "marked";
import mermaid from "mermaid";
import hljs from "highlight.js";

import type { FC, ReactNode } from "react";

const renderer = new marked.Renderer();
renderer.code = (code: string, language: string) => {
  if (language === "mermaid") return `<div class="mermaid">${code}</div>`;
  const highlightLang = hljs.getLanguage(language) ? language : "plaintext";
  return `<blockquote>${
    hljs.highlight(code, { language: highlightLang }).value
  }</blockquote>`;
};

marked.use({ renderer });

type Context = {
  convertToHtml: (markdown: string) => string;
};

const MarkdownContext = createContext<Context | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const MarkdownProvider: FC<Props> = ({ children }) => {
  const convertToHtml = (markdown: string) => marked.parse(markdown);

  useEffect(() => {
    // Mermaid only adds theme on the initialize function
    // Ideally, if the site theme changes based on a user preference, we should be able to dynamically
    // change this theme on the init() call in the useMarkdown() hook
    // For now, the neutral theme looks ok for both light and dark modes
    //
    // TODO: Raise issue on Mermaid github page
    // OR determine if you are doing something wrong for adding theme on init() call
    mermaid.initialize({ theme: "neutral" });
  }, []);

  return (
    <MarkdownContext.Provider value={{ convertToHtml }}>
      {children}
    </MarkdownContext.Provider>
  );
};

export const useMarkdown = (): Context => {
  const markdown = useContext<Context>(MarkdownContext);

  useEffect(() => {
    // Whenever we want to render mermaid content after mermaid has been initialized,
    // we must use the init() function
    // https://mermaid-js.github.io/mermaid/#/usage?id=calling-mermaidinit
    mermaid.init();
  }, []);

  return markdown;
};

export default MarkdownProvider;
