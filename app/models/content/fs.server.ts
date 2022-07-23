import fs from "fs";
import util from "util";

import type { IContent } from "./types";

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const PATH = "./content/blog";

const fsContent: IContent = {
  getContent: async (folderName: string): Promise<string> => {
    const file = await readFile(`${PATH}/${folderName}/index.md`, "utf-8");
    return file;
  },
  getAllContent: async (): Promise<string[]> => {
    const dir = await readDir(PATH);
    return Promise.all(
      dir
        .filter((path) => fs.lstatSync(`${PATH}/${path}`).isDirectory())
        .map(fsContent.getContent)
    );
  },
};

export default fsContent;
