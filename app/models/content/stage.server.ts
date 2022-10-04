import { getBlogMetadataList, getBlog } from "./utils";

import type { IContent } from "./types";

const contentServer: IContent = {
  getContent: getBlog,
  getAllContent: getBlogMetadataList,
};

export default contentServer;
