import {
  getFileContents,
  getDirectoryContents,
  isDirectory,
} from "~/services/fs.server";
import { extractData } from "./utils";

import type { IContent } from "./types";

const BASE_PATH = "./content/blog";

const getContent: IContent["getContent"] = async (folderName: string) => {
  const contents = await getFileContents(`${BASE_PATH}/${folderName}/index.md`);
  return extractData(contents);
};

const getAllContent: IContent["getAllContent"] = async () => {
  const directoryContents = await getDirectoryContents(BASE_PATH);
  const blogContents = directoryContents
    .filter((folderName) => isDirectory(`${BASE_PATH}/${folderName}`))
    .map(async (folderName) => {
      const { metadata } = await getContent(folderName);
      return metadata;
    });
  return Promise.all(blogContents);
};

const contentServer: IContent = { getContent, getAllContent };

export default contentServer;
