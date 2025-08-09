import type { BlogMetadata, IContent } from "./types";
import {
  getRepositoryFileContent,
  getRepositoryFolderContent,
} from "@/lib/github";
import { convertToHtml } from "@/lib/markdown";
import { extractData, sortBlogs } from "./utils";

class RemoteContentServer implements IContent {
  private PATH_PREFIX: string = "content/blog";
  private BLOG_FILENAME: string = "index.md";

  // https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
  private REPO_OWNER: string = process.env.VERCEL_GIT_REPO_OWNER ?? "";
  private REPO_NAME: string = process.env.VERCEL_GIT_REPO_SLUG ?? "";
  private REPO_BRANCH: string = process.env.VERCEL_GIT_COMMIT_REF ?? "";

  private async getFileContent(folderName: string) {
    const response = await getRepositoryFileContent({
      owner: this.REPO_OWNER,
      repo: this.REPO_NAME,
      ref: this.REPO_BRANCH,
      path: `${this.PATH_PREFIX}/${folderName}/${this.BLOG_FILENAME}`,
    });
    if (!response) return null;
    return Buffer.from(response?.content ?? "", "base64").toString();
  }

  public async getContent(slug: string) {
    const fileContent = await this.getFileContent(slug);
    if (!fileContent) return null;
    const { metadata, markdown } = extractData(fileContent);
    const html = await convertToHtml(markdown);
    return {
      metadata: {
        ...metadata,
        slug: slug,
      },
      html,
    };
  }

  public async getAllContent() {
    const blogDirectoryContent = await getRepositoryFolderContent({
      owner: this.REPO_OWNER,
      repo: this.REPO_NAME,
      ref: this.REPO_BRANCH,
      path: this.PATH_PREFIX,
    });
    const blogs: BlogMetadata[] = [];
    for (const { type, name } of blogDirectoryContent) {
      if (type !== "dir") continue;
      const fileContent = await this.getFileContent(name);
      if (fileContent === null) continue;
      const { metadata } = extractData(fileContent);
      blogs.push({
        ...metadata,
        slug: name,
      });
    }
    return sortBlogs(blogs);
  }
}

export default RemoteContentServer;
