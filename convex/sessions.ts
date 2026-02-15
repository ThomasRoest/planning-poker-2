import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createSession = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const title = args.title.trim();
    const uid = crypto.randomUUID();
    const createdAt = Date.now();
    const id = await ctx.db.insert("sessions", {
      title,
      uid,
      createdAt,
    });

    return {
      id,
      title,
      uid,
      created_at: createdAt,
    };
  },
});

export const getByUid = query({
  args: { uid: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_uid", (q) => q.eq("uid", args.uid))
      .first();

    if (!session) return null;

    const participants = await ctx.db
      .query("participants")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", session._id))
      .collect();

    return {
      id: session._id,
      title: session.title,
      uid: session.uid,
      created_at: session.createdAt,
      participants: participants.map((participant) => ({
        id: participant._id,
        name: participant.name,
        owner: participant.owner,
        vote: participant.vote,
        priority: participant.priority,
      })),
    };
  },
});
