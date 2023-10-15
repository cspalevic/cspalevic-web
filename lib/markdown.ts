import DOMPurify from "dompurify";
import hljs from "highlight.js";
import { JSDOM } from "jsdom";
import { marked } from "marked";

const renderer = new marked.Renderer();
renderer.code = (code: string, language: string) => {
  const highlightLang = hljs.getLanguage(language) ? language : "plaintext";
  return `<blockquote>${
    hljs.highlight(code, { language: highlightLang }).value
  }</blockquote>`;
};

renderer.link = (href: string, title: string, text: string) => {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

marked.use({ renderer, async: true });

export const convertToHtml = (markdown: string) => {
  const html = marked.parse(markdown);
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);
  return purify.sanitize(html);
};
