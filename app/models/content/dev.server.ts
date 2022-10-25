import type { IContent } from "./types";
import {
  getFileContents,
  getDirectoryContents,
  isDirectory,
  doesExist,
} from "~/services/fs.server";
import { convertToHtml } from "~/utils/markdown";
import { extractData } from "./utils";

const BASE_PATH = "./content/blog";

const buildPath = (folderName: string) => `${BASE_PATH}/${folderName}/index.md`;

const readFile = (folderName: string) => getFileContents(buildPath(folderName));

const getContent: IContent["getContent"] = async (folderName: string) => {
  const fileExists = doesExist(buildPath(folderName));
  if (!fileExists) return null;

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
