import { NextApiRequest, NextApiResponse } from "next";

import { getUrl } from "../../../lib/redis";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "You must provide a slug" }));

    return;
  }

  const data = await getUrl(slug)

  if (!data) {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "Slug not found" }));

    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Cache-Control",
    "s-maxage=1000000000, stale-while-revalidate"
  );

  return res.json({ slug, redirect: data });
};

export default get
