import {
  getFileContents,
  getDirectoryContents,
  isDirectory,
} from "~/services/fs.server";
import { extractData } from "./utils";

import type { IContent } from "./types";
import { convertToHtml } from "~/utils/markdown";

const BASE_PATH = "./content/blog";

const readFile = (folderName: string) =>
  getFileContents(`${BASE_PATH}/${folderName}/index.md`);

const getContent: IContent["getContent"] = async (folderName: string) => {
  const fileContent = await readFile(folderName);
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

const getAllContent: IContent["getAllContent"] = async () => {
  const directoryContents = await getDirectoryContents(BASE_PATH);
  const blogContents = directoryContents
    .filter((folderName) => isDirectory(`${BASE_PATH}/${folderName}`))
    .map(async (folderName) => {
      const fileContent = await readFile(folderName);
      const { metadata } = extractData(fileContent);
      return {
        ...metadata,
        slug: folderName,
      };
    });
  return Promise.all(blogContents);
};

const contentServer: IContent = { getContent, getAllContent };

export default contentServer;
