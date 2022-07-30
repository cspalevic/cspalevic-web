import { Octokit } from "@octokit/rest";

import type { RestEndpointMethodTypes } from "@octokit/rest";
import type { IContent } from "./types";

const octokit = new Octokit({
  auth: process.env.OCTOKIT_API_KEY,
  userAgent: "cedomir.tech OctoKit API Key",
  timeZone: "America/Chicago",
});

type GetContentParams =
  RestEndpointMethodTypes["repos"]["getContent"]["parameters"];
const defaultParams: GetContentParams = {
  owner: "cedomir-spalevic",
  repo: "cspalevic",
  ref: "main",
  path: "",
};

const PATH_PREFIX = "content/blog";

// Get Repository Content API Documention
// https://docs.github.com/en/rest/repos/contents#get-repository-content
const githubContent: IContent = {
  getContent: async (folderName: string): Promise<string> => {
    const response = await octokit.repos.getContent({
      ...defaultParams,
      path: `${PATH_PREFIX}/${folderName}/index.md`,
    });
    const {
      data: { content = "" },
    } = response as { data: { content: string } };
    return Buffer.from(content, "base64").toString();
  },
  getAllContent: async (): Promise<string[]> => {
    const response = await octokit.repos.getContent({
      ...defaultParams,
      path: PATH_PREFIX,
    });
    const { data = [] } = response as { data: any[] };
    return Promise.all(
      data
        .filter(({ type }) => type === "dir")
        .map(({ name }) => githubContent.getContent(name))
    );
  },
};

export default githubContent;
