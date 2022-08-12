import { NextApiRequest, NextApiResponse } from "next";

import { deleteUrl } from "../../../lib/redis";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "You must provide a slug" }));

    return;
  }

  await deleteUrl(slug)

  return res.json({ success: true });
};

export default get
