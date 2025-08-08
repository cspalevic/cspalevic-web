import type { BlogMetadata, IContent } from "./types";
import {
  getFileContents,
  getDirectoryContents,
  isDirectory,
  doesExist,
} from "@/lib/fs";
import { convertToHtml } from "@/lib/markdown";
import { extractData, sortBlogs } from "./utils";

class LocalContentServer implements IContent {
  private BASE_PATH: string = "./content/blog";

  private buildPath(folderName: string) {
    return `${this.BASE_PATH}/${folderName}/index.md`;
  }

  public async getContent(slug: string) {
    const path = this.buildPath(slug);
    const fileExists = doesExist(path);
    if (!fileExists) return null;

    const fileContent = await getFileContents(path);
    const { metadata, markdown } = extractData(fileContent);
    const html = await convertToHtml(markdown);
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
      const path = this.buildPath(folderName);
      const fileContent = await getFileContents(path);
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
