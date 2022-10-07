import { marked } from "marked";
import hljs from "highlight.js";

const renderer = new marked.Renderer();
renderer.code = (code: string, language: string) => {
  const highlightLang = hljs.getLanguage(language) ? language : "plaintext";
  return `<blockquote>${
    hljs.highlight(code, { language: highlightLang }).value
  }</blockquote>`;
};

// .img-lightbox class will trigger the image lightbox component and styles
renderer.image = (href: string, title: string, text: string) => {
  return `<img src="${href}" class="img-lightbox" alt="${text}" />`;
};

renderer.link = (href: string, title: string, text: string) => {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

marked.use({ renderer, async: true });

export const convertToHtml = (markdown: string) => marked.parse(markdown);
