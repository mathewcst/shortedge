import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

export async function setUrl(slug: string, redirect: string) {
  await redis.set(`short/${slug}`, redirect);
  return slug;
}

export async function getUrl(slug: string): Promise<string> {
  const redirect = await redis.get(`short/${slug}`) as string
  return redirect;
}

export async function deleteUrl(slug: string): Promise<void> {
  await redis.del(`short/${slug}`)
}


export async function isSlugAvailable(slug: string): Promise<boolean> {
  const redirect = await redis.get(`short/${slug}`) as string
  return redirect ? false : true;
}
