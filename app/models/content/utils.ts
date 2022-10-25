import type { Blog, BlogMetadata, MarkdownContent } from "./types";
import frontmatter from "@github-docs/frontmatter";
import {
  getRepositoryFileContent,
  getRepositoryFolderContent,
} from "~/services/github.server";
import { convertToHtml } from "~/utils/markdown";

export const extractData = (markdown: string): MarkdownContent => {
  const { data, content } = frontmatter(markdown);
  return { metadata: data, markdown: content };
};

const PATH_PREFIX = "content/blog";
const BLOG_FILENAME = "index.md";
// https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
const REPO_OWNER = process.env.VERCEL_GIT_REPO_OWNER;
const REPO_NAME = process.env.VERCEL_GIT_REPO_SLUG;
const REPO_BRANCH = process.env.VERCEL_GIT_COMMIT_REF;

const getFileContent = async (folderName: string): Promise<string> => {
  try {
    const response = await getRepositoryFileContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: REPO_BRANCH,
      path: `${PATH_PREFIX}/${folderName}/${BLOG_FILENAME}`,
    });
    return Buffer.from(response.content, "base64").toString();
  } catch (error) {
    // TODO
    // 404 Handling - return null to indicate that we should show a not found page
    // if (error.name === "HttpError" && error.status === 404) return null;
    throw error;
  }
};

export const getBlog = async (folderName: string): Promise<Blog> => {
  const fileContent = await getFileContent(folderName);
  const { metadata, markdown } = extractData(fileContent);
  const html = convertToHtml(markdown);
  return {
    metadata: {
      ...metadata,
      slug: folderName,
    },
    html,
  };
};

export const getBlogMetadataList = async (): Promise<BlogMetadata[]> => {
  const folderContent = await getRepositoryFolderContent({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    ref: REPO_BRANCH,
    path: PATH_PREFIX,
  });
  const blogContents = folderContent
    .filter(({ type }) => type === "dir")
    .map(async ({ name }) => {
      const fileContent = await getFileContent(name);
      const { metadata } = extractData(fileContent);
      return {
        ...metadata,
        slug: name,
      };
    });
  return Promise.all(blogContents);
};
