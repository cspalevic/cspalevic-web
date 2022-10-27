import type { IContent } from "./types";
import FileSystemContentServer from "./fs.server";
import GithubContentServer from "./gh.server";
import RedisContentServer from "./redis.server";

let contentServer: IContent;

if (process.env.NODE_ENV === "development") {
  contentServer = new FileSystemContentServer();
} else if (process.env.VERCEL_ENV === "preview") {
  contentServer = new GithubContentServer();
} else {
  contentServer = new RedisContentServer();
}

export default contentServer;
