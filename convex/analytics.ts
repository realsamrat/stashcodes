import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const trackEvent = mutation({
  args: {
    slug: v.string(),
    event: v.string(), // "view" | "download" | "copy"
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("analytics", {
      ...args,
      timestamp: Date.now(),
    });
  },
});
