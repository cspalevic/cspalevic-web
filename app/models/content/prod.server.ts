import { wrapper } from "~/services/redis.server";
import { getAllBlogsMetadata, getBlogFromGithub } from "./utils";

import type { IContent, Blog } from "./types";

const contentServer: IContent = {
  getContent: async (slug: string) => {
    return wrapper<Blog | null>(slug, () => getBlogFromGithub(slug));
  },
  getAllContent: async () => {
    return wrapper("all", getAllBlogsMetadata);
  },
};

export default contentServer;
