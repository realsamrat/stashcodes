import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const analytics = defineTable({
  slug: v.string(),
  event: v.string(), // "view" | "download" | "copy"
  timestamp: v.number(),
  metadata: v.optional(v.any()),
}).index("by_slug", ["slug"]);

const waitlist = defineTable({
  email: v.string(),
  createdAt: v.number(),
});

export default defineSchema({
  analytics,
  waitlist,
});

