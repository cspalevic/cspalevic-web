import { getAllBlogsMetadata, getBlogFromGithub } from "./utils";

import type { IContent } from "./types";

const contentServer: IContent = {
  getContent: getBlogFromGithub,
  getAllContent: getAllBlogsMetadata,
};

export default contentServer;
