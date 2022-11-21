import type { IContent } from "./types";
import { cacheGetSetWrapper } from "~/services/redis.server";
import GithubContentServer from "./remote.server";

class RemoteCachedContentServer
  extends GithubContentServer
  implements IContent
{
  async getContent(slug: string) {
    return cacheGetSetWrapper(slug, () => {
      return super.getContent(slug);
    });
  }

  async getAllContent() {
    return cacheGetSetWrapper("all", () => {
      return super.getAllContent();
    });
  }
}

export default RemoteCachedContentServer;
