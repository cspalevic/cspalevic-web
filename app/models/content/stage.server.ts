import type { IContent } from "./types";
import { getBlogMetadataList, getBlog } from "./utils";

const contentServer: IContent = {
  getContent: getBlog,
  getAllContent: getBlogMetadataList,
};

export default contentServer;
