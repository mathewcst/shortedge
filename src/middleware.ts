import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { redis } from "./lib/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, "10 s")
})

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  /**
   * RATE LIMITING
   */
  const ip = req.ip ?? "127.0.0.1"
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(`mw_${ip}`)

  ev.waitUntil(pending)

  const res = success ? NextResponse.next() : NextResponse.rewrite(new URL("/api/blocked", req.url), req)


  /**
   * ONLY REDIRECT IF NOT API
   */
  if (!req.nextUrl.pathname.includes('/api/')) {
    const slug = req.nextUrl.pathname.split("/").pop();

    const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);

    if (slugFetch.status === 404) {
      return NextResponse.redirect(req.nextUrl.origin);
    }

    const data = await slugFetch.json();

    if (data?.redirect) {
      return NextResponse.redirect(data.redirect);
    }

  }

  res.headers.set('X-RateLimit-Limit', limit.toString())
  res.headers.set('X-RateLimit-Remaining', remaining.toString())
  res.headers.set('X-RateLimit-Reset', reset.toString())

  return res

}
