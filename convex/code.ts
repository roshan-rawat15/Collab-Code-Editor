import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new room
export const createRoom = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const existingRoom = await ctx.db
      .query("rooms")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();

    if (existingRoom) {
      return existingRoom._id;
    }

    const roomId = await ctx.db.insert("rooms", {
      name: args.name,
      createdAt: Date.now(),
    });

    return roomId;
  },
});

// Fetch a room by name
export const getRoom = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rooms")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();
  },
});
