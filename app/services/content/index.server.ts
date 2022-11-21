import type { IContent } from "./types";
import LocalContentServer from "./local.server";
import RemoteContentServer from "./remote.server";
import RemoteCachedContentServer from "./remoteCached.server";

let contentServer: IContent;

if (process.env.NODE_ENV === "development") {
  contentServer = new LocalContentServer();
} else if (process.env.VERCEL_ENV === "preview") {
  contentServer = new RemoteContentServer();
} else {
  contentServer = new RemoteCachedContentServer();
}

export default contentServer;
