const redis = require("redis");
const REDIS_HOST = "redis-11436.c283.us-east-1-4.ec2.cloud.redislabs.com";
const REDIS_PORT = "11436";
const REDIS_PASSWORD = "4hm&8EcB?@gk&Jgt";
const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT ?? "", 10),
  },
  password: REDIS_PASSWORD,
});

client.on("error", (error) => {
  console.error("Redis error: ", error);
  process.exit(1);
});

const run = async (changedFiles: string[] = []) => {
  await client.connect();

  const blogsChanged = changedFiles
    .filter((file) => file.startsWith("content/blog/"))
    .map((file) => {
      const [, folder] = file.split("content/blog/");
      const [slug] = folder.split("/index.md");
      return client.del(slug);
    });
  await Promise.all(blogsChanged);
  if (blogsChanged.length > 0) await client.del("all");
  process.exit(0);
};

console.log(process.argv[2]);
run();
