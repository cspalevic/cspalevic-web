import devServer from "./dev.server";
import stageServer from "./stage.server";
import prodServer from "./prod.server";

import type { IContent } from "./types";

let contentServer: IContent;
if (process.env.NODE_ENV === "development") contentServer = devServer;
else if (process.env.VERCEL_ENV === "preview") contentServer = stageServer;
else contentServer = prodServer;

export default contentServer;
