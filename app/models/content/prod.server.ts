import { wrapper } from "~/services/redis.server";
import { getBlogMetadataList, getBlog } from "./utils";

import type { IContent, Blog } from "./types";

const contentServer: IContent = {
  getContent: async (slug: string) => {
    return wrapper<Blog | null>(slug, () => getBlog(slug));
  },
  getAllContent: async () => {
    return wrapper("all", getBlogMetadataList);
  },
};

export default contentServer;
