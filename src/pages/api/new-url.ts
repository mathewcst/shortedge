
import { NextApiRequest, NextApiResponse } from "next";

import { isSlugAvailable, setUrl } from "../../lib/redis";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;

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

  return res.json(data);
};

export default post
