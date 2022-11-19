import type { IContent } from "./types";
import {
  getRepositoryFileContent,
  getRepositoryFolderContent,
} from "~/services/github.server";
import { convertToHtml } from "~/utils/markdown";
import { extractData } from "./utils";

class GithubContentServer implements IContent {
  private PATH_PREFIX: string = "content/blog";
  private BLOG_FILENAME: string = "index.md";

  // https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
  private REPO_OWNER: string = process.env.VERCEL_GIT_REPO_OWNER ?? "";
  private REPO_NAME: string = process.env.VERCEL_GIT_REPO_SLUG ?? "";
  private REPO_BRANCH: string = process.env.VERCEL_GIT_COMMIT_REF ?? "";

  private async getFileContent(folderName: string) {
    try {
      const response = await getRepositoryFileContent({
        owner: this.REPO_OWNER,
        repo: this.REPO_NAME,
        ref: this.REPO_BRANCH,
        path: `${this.PATH_PREFIX}/${folderName}/${this.BLOG_FILENAME}`,
      });
      return Buffer.from(response?.content ?? "", "base64").toString();
    } catch (error) {
      // TODO
      // 404 Handling - return null to indicate that we should show a not found page
      // if (error.name === "HttpError" && error.status === 404) return null;
      throw error;
    }
  }

  public async getContent(slug: string) {
    const fileContent = await this.getFileContent(slug);
    const { metadata, markdown } = extractData(fileContent);
    const html = convertToHtml(markdown);
    return {
      metadata: {
        ...metadata,
        slug: slug,
      },
      html,
    };
  }

  public async getAllContent() {
    const folderContent = await getRepositoryFolderContent({
      owner: this.REPO_OWNER,
      repo: this.REPO_NAME,
      ref: this.REPO_BRANCH,
      path: this.PATH_PREFIX,
    });
    const blogContents = folderContent
      .filter(({ type }) => type === "dir")
      .map(async ({ name }) => {
        const fileContent = await this.getFileContent(name);
        const { metadata } = extractData(fileContent);
        return {
          ...metadata,
          slug: name,
        };
      });
    return Promise.all(blogContents);
  }
}

export default GithubContentServer;
