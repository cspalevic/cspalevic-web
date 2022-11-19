import * as redis from "redis";
import logger from "~/models/logger.server";

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT ?? "", 10),
  },
  password: REDIS_PASSWORD,
});
client.connect();

client.on("error", (error) => {
  logger.error("Redis error: ", error);
});

export const cacheGetSetWrapper = async <T>(
  key: string,
  fn: () => Promise<T>
) => {
  const hit = await client.get(key);
  if (hit) return JSON.parse(hit) as T;
  const result = await fn();
  // Only cache if we have a proper value
  if (result) {
    await client.set(key, JSON.stringify(result));
  }
  return result;
};
