import { mutation } from "./_generated/server";
import { v } from "convex/values";

const priorityValidator = v.union(
  v.literal("LOW"),
  v.literal("MEDIUM"),
  v.literal("HIGH"),
  v.null()
);

export const createParticipant = mutation({
  args: {
    name: v.string(),
    sessionId: v.id("sessions"),
    owner: v.boolean(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("participants", {
      name: args.name,
      sessionId: args.sessionId,
      owner: args.owner,
      vote: null,
      priority: null,
    });

    return {
      id,
      name: args.name,
      owner: args.owner,
    };
  },
});

export const setVote = mutation({
  args: {
    participantId: v.id("participants"),
    vote: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.participantId, { vote: args.vote });
  },
});

export const setPriority = mutation({
  args: {
    participantId: v.id("participants"),
    priority: priorityValidator,
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.participantId, { priority: args.priority });
  },
});

export const resetVotes = mutation({
  args: {
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    const participants = await ctx.db
      .query("participants")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    await Promise.all(
      participants.map((participant) =>
        ctx.db.patch(participant._id, { vote: null, priority: null })
      )
    );
  },
});

export const deleteParticipant = mutation({
  args: {
    participantId: v.id("participants"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.participantId);
  },
});
