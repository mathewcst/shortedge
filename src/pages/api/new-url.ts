import NextCors from 'nextjs-cors'

import { NextApiRequest, NextApiResponse } from "next";

import { isSlugAvailable, setUrl } from "../../lib/redis";


const post = async (req: NextApiRequest, res: NextApiResponse) => {

  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',

  })

  const body = req.body;
  const { origin } = req.headers;

  if (!process.env.BASE_APP_URL?.includes(origin!)) {
    return res.status(401).send(JSON.stringify({ error: "Unauthorized" }));
  }

  if (!body || typeof body.slug !== "string") {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "You must provide a slug" }));

    return;
  }

  const isValidSlug = await isSlugAvailable(body.slug);

  if (!isValidSlug) {
    res.statusCode = 401;

    res.send(JSON.stringify({ message: "Slug already in use" }));

    return;
  }

  const data = await setUrl(body.slug, body.redirect);

  if (!data) {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "Slug not found" }));

    return;
  }
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");


  return res.json(data);
};

export default post
