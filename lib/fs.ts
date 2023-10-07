import { readdir, readFile, lstatSync, existsSync } from "fs";
import { promisify } from "util";

const readDirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);

export const isDirectory = (path: string) => lstatSync(path).isDirectory();

export const doesExist = (path: string) => existsSync(path);

export const getFileContents = async (path: string) =>
  readFileAsync(path, "utf-8");

export const getDirectoryContents = async (path: string) => readDirAsync(path);
