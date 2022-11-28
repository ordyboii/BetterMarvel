import type { APIRoute } from "astro";
import { z } from "zod";
import { prisma } from "../server/db";

const voteSchema = z.object({
  voteForId: z.string(),
  voteAgainstId: z.string()
});

export const post: APIRoute = async ({ request }) => {
  const { voteForId, voteAgainstId } = voteSchema.parse(await request.json());

  await prisma.vote.create({
    data: {
      votedAgainst: { connect: { id: voteAgainstId } },
      votedFor: { connect: { id: voteForId } }
    }
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
