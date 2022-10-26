import type { IContent } from "./types";
import { cacheGetSetWrapper } from "~/services/redis.server";
import GithubContentServer from "./gh.server";

class RedisContentServer extends GithubContentServer implements IContent {
  async getContent(slug: string) {
    return cacheGetSetWrapper(slug, () => {
      return super.getContent(slug);
    });
  }

  async getAllContent() {
    return cacheGetSetWrapper("all", () => {
      return super.getAllContent();
    })
  }
}

export default RedisContentServer;
