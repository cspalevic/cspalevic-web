import fs from "fs";
import util from "util";

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

export const isDirectory = (path: string) => fs.lstatSync(path).isDirectory();

export const getFileContents = async (path: string) => readFile(path, "utf-8");

export const getDirectoryContents = async (path: string) => readDir(path);
