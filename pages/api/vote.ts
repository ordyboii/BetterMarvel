import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "@server/db";

const voteSchema = z.object({
  voteForId: z.string(),
  voteAgainstId: z.string()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { voteForId, voteAgainstId } = voteSchema.parse(req.body);

  const vote = await prisma.vote.create({
    data: {
      votedAgainst: { connect: { id: voteAgainstId } },
      votedFor: { connect: { id: voteForId } }
    }
  });

  res.status(200).json(vote);
}
