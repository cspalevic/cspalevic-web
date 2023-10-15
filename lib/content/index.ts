import type { IContent } from "./types";
import LocalContentServer from "./local";
import RemoteContentServer from "./remote";

let contentServer: IContent;

if (process.env.NODE_ENV === "development") {
  contentServer = new LocalContentServer();
} else {
  contentServer = new RemoteContentServer();
}

export { contentServer };
