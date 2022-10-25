import type { IContent } from "./types";
import devServer from "./dev.server";
import prodServer from "./prod.server";
import stageServer from "./stage.server";

let contentServer: IContent;
if (process.env.NODE_ENV === "development") contentServer = devServer;
else if (process.env.VERCEL_ENV === "preview") contentServer = stageServer;
else contentServer = prodServer;

export default contentServer;
