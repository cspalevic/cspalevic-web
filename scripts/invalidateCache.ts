import * as redis from "redis";
import * as dotenv from "dotenv";

dotenv.config({
  override: false,
});

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? "", 10),
  },
  password: process.env.REDIS_PASSWORD,
});

client.on("connect", () => {
  console.log("Connected to Redis...");
});

client.on("error", (error) => {
  console.error("Redis error: ", error);
  process.exit(1);
});

const invalidateCache = async (changedFiles: string[] = []) => {
  console.log(`${changedFiles.length} files changed`);
  await client.connect();

  const blogsChanged = changedFiles
    .filter((file) => file.startsWith("content/blog/"))
    .map(async (file) => {
      const [, folder] = file.split("content/blog/");
      const [slug] = folder.split("/index.md");
      const res = await client.del(slug);
      console.log(`Invalidated cache for ${slug}: ${res ? "OK" : "FAIL"}`);
      return res;
    });
  await Promise.all(blogsChanged);
  if (blogsChanged.length > 0) {
    const res = await client.del("all");
    console.log(`Invalidated cache for all: ${res ? "OK" : "FAIL"}`);
  }
  await client.disconnect();
};

const transformInput = (): string[] => {
  if (process.env.CHANGED_FILES) return process.env.CHANGED_FILES.split(",");

  const args = process.argv.slice(2);
  if (args.length === 0) return [];

  return args[0].split(",");
};

const run = async () => {
  // Try to transform input to an array of changed files
  const changedFiles = transformInput();

  // Try to invalidate the redis cache of changed blogs
  try {
    await invalidateCache(changedFiles);
  } catch (error) {
    console.error("Error while invalidating Redis cache...");
    console.error(error);
  } finally {
    process.exit(0);
  }
};

run();
