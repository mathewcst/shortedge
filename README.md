# shortedge

A super basic URL shortener using Next.js middleware, Upstash for a Redis DB and Vercel's Edge functions for fast redirects.

---

This project exposes two endpoints:

- Get URL
- New URL

## Get URL

This endpoint basically checks if that slug exists and, if so, redirects to the URL the slug belongs to.

## New URL

This endpoint creates a new URL in the Redis (Upstash) database and returns the slug. You have to send a POST request with the body:

```json
{
  "redirect": "https://example.com/something",
  "slug": "something-else"
}
```

Now if someone goes to the website of this project, ex:`www.shortedge.com/something-else`, they will be redirected to the URL you specified in "redirect".

---

## Development

### Env variables

Check out the `.example.env`, you need the following variables:

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
BASE_APP_URL=
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
```
