import * as redis from "redis";
import logger from "~/models/logger.server";

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
  },
  password: process.env.REDIS_PASSWORD,
});
client.connect();

client.on("error", (error) => {
  logger.error("Redis error: ", error);
});

export const wrapper = async <T>(key: string, fn: () => Promise<T>) => {
  const hit = await client.get(key);
  if (hit) return JSON.parse(hit) as T;
  const result = await fn();
  await client.set(key, JSON.stringify(result));
  return result;
};
