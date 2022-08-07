
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;

  if (!body || typeof body.slug !== "string") {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "pls use with a slug" }));

    return;
  }

  const data = await prisma.url.create({
    data: {
      slug: body.slug,
      redirect: body.redirect,
    }
  })

  if (!data) {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "slug not found" }));

    return;
  }



  return res.json(data);
};

export default post
