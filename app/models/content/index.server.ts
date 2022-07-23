import fsContent from "./fs.server";
import githubContent from "./github.server";

import type { IContent } from "./types";

let contentProvider: IContent;

if (process.env.OCTOKIT_API_KEY) contentProvider = githubContent;
else contentProvider = fsContent;

export default contentProvider;
