import type { BlogMetadata, IContent } from "./types";
import {
  getFileContents,
  getDirectoryContents,
  isDirectory,
  doesExist,
} from "~/services/fs.server";
import { convertToHtml } from "~/services/markdown.server";
import { extractData, sortBlogs } from "./utils";

class LocalContentServer implements IContent {
  private BASE_PATH: string = "./content/blog";

  private buildPath(folderName: string) {
    return `${this.BASE_PATH}/${folderName}/index.md`;
  }

  private readFile(folderName: string) {
    return getFileContents(this.buildPath(folderName));
  }

  public async getContent(slug: string) {
    const fileExists = doesExist(this.buildPath(slug));
    if (!fileExists) return null;

    const fileContent = await this.readFile(slug);
    const { metadata, markdown } = extractData(fileContent);
    const html = convertToHtml(markdown);
    return {
      metadata: {
        ...metadata,
        slug,
      },
      html,
    };
  }

  public async getAllContent() {
    const blogDirectoryContent = await getDirectoryContents(this.BASE_PATH);
    const blogs: BlogMetadata[] = [];
    for (const folderName of blogDirectoryContent) {
      if (!isDirectory(`${this.BASE_PATH}/${folderName}`)) continue;
      const fileContent = await this.readFile(folderName);
      const { metadata } = extractData(fileContent);
      blogs.push({
        ...metadata,
        slug: folderName,
      });
    }
    return sortBlogs(blogs);
  }
}

export default LocalContentServer;
