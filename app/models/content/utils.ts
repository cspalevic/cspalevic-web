import frontmatter from "@github-docs/frontmatter";
import {
  getRepositoryFileContent,
  getRepositoryFolderContent,
} from "~/services/github.server";

import type { Blog, BlogMetadata } from "./types";

export const extractData = (markdown: string): Blog => {
  const { data, content } = frontmatter(markdown);
  return { metadata: data, content };
};

const PATH_PREFIX = "content/blog";
const BLOG_FILENAME = "index.md";
// https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
const REPO_OWNER = process.env.VERCEL_GIT_REPO_OWNER;
const REPO_NAME = process.env.VERCEL_GIT_REPO_SLUG;
const REPO_BRANCH = process.env.VERCEL_GIT_COMMIT_REF;

export const getBlogFromGithub = async (
  folderName: string
): Promise<Blog | null> => {
  try {
    const data = await getRepositoryFileContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: REPO_BRANCH,
      path: `${PATH_PREFIX}/${folderName}/${BLOG_FILENAME}`,
    });
    const content = Buffer.from(data.content, "base64").toString();
    return extractData(content);
  } catch (error) {
    // TODO: handle 404s
    //if (error.name === "HttpError" && error.status === 404) return null;
    throw error;
  }
};

export const getAllBlogsMetadata = async (): Promise<BlogMetadata[]> => {
  const data = await getRepositoryFolderContent({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    ref: REPO_BRANCH,
    path: PATH_PREFIX,
  });
  const blogContents = data
    .filter(({ type }) => type === "dir")
    .map(async ({ name }) => {
      const { metadata } = await getBlogFromGithub(name);
      return metadata;
    });
  return Promise.all(blogContents);
};
