import type { RestEndpointMethodTypes } from "@octokit/rest";
import { RequestError } from "@octokit/request-error";
import { Octokit } from "@octokit/rest";

const { OCTOKIT_API_KEY } = process.env;

const octokit = new Octokit({
  auth: OCTOKIT_API_KEY,
  userAgent: "cedomir.tech OctoKit API Key",
  timeZone: "America/Chicago",
});

type GetContentParams =
  RestEndpointMethodTypes["repos"]["getContent"]["parameters"];

type RepositoryContent = {
  type: string;
  size: number;
  name: string;
  path: string;
  content?: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
  _links: {
    git: string;
    html: string;
    self: string;
  };
};

type GetRepositoryContentFunc<T> = (params: GetContentParams) => Promise<T>;

// Get Repository Content API Documention
// https://docs.github.com/en/rest/repos/contents#get-repository-content
export const getRepositoryFolderContent: GetRepositoryContentFunc<
  RepositoryContent[]
> = async (params) => {
  const response = await octokit.repos.getContent(params);
  // Response data object is dynamic. But we will always get data in the form of RepositoryContent
  const data = response.data as unknown;
  return data as RepositoryContent[];
};

// Only when requesting a single file will we handle specific 404 errors
export const getRepositoryFileContent: GetRepositoryContentFunc<
  RepositoryContent | null
> = async (params) => {
  try {
    const response = await octokit.repos.getContent(params);
    // Response data object is dynamic. But we will always get data in the form of RepositoryContent
    const data = response.data as unknown;
    return data as RepositoryContent;
  } catch (error) {
    if (error instanceof RequestError && error?.status === 404) {
      return null;
    }
    throw error;
  }
};
