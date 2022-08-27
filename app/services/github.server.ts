import { Octokit } from "@octokit/rest";

import type { RestEndpointMethodTypes } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.OCTOKIT_API_KEY,
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

// Get Repository Content API Documention
// https://docs.github.com/en/rest/repos/contents#get-repository-content
const getRepositoryContent = async <T>(
  params: GetContentParams
): Promise<T> => {
  const response = await octokit.repos.getContent(params);
  // Response data object is dynamic. But we will always get data in the form of RepositoryContent
  const data = response.data as unknown;
  return data as T;
};

export const getRepositoryFolderContent = async (
  params: GetContentParams
): Promise<RepositoryContent[]> => getRepositoryContent(params);

export const getRepositoryFileContent = async (
  params: GetContentParams
): Promise<RepositoryContent> => getRepositoryContent(params);
