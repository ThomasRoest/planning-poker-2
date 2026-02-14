import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sessions: defineTable({
    title: v.string(),
    uid: v.string(),
    createdAt: v.number(),
  }).index("by_uid", ["uid"]),
  participants: defineTable({
    sessionId: v.id("sessions"),
    name: v.string(),
    owner: v.boolean(),
    vote: v.union(v.number(), v.null()),
    priority: v.union(
      v.literal("LOW"),
      v.literal("MEDIUM"),
      v.literal("HIGH"),
      v.null()
    ),
  }).index("by_sessionId", ["sessionId"]),
});
