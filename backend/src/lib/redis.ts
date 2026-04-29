import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL is not defined in environment variables");
}

export const redis = createClient({
  url: redisUrl,
});





redis.on("error", (err) => console.error("Redis Client Error", err));

export async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
    console.log("Connected to Redis");
  }
}

export const LocationCache = {
  async set(jobId: string, location: any) {
    await connectRedis();
    await redis.set(`location:${jobId}`, JSON.stringify(location), {
      EX: 10, // TTL 10 seconds
    });
  },

  async get(jobId: string) {
    await connectRedis();
    const data = await redis.get(`location:${jobId}`);
    return data ? JSON.parse(data) : null;
  },
};
