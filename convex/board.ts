import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const images = [
  "/placeholder/1.svg",
  "/placeholder/10.svg",
  "/placeholder/2.svg",
  "/placeholder/3.svg",
  "/placeholder/4.svg",
  "/placeholder/5.svg",
  "/placeholder/6.svg",
  "/placeholder/7.svg",
  "/placeholder/8.svg",
  "/placeholder/9.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const board = ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    const userId = identity.subject;
    const existingFav = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id)
      )
      .unique();
    if (existingFav) {
      await ctx.db.delete(existingFav._id);
    }
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const title = args.title.trim();
    if (!title) {
      throw new Error("Title cannot be empty.");
    }
    if (title.length > 60) {
      throw new Error(
        `Title is too long. It should have at most 60 characters.`
      );
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });
    return board;
  },
});

export const favorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async function (ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error(`Board not found`);
    }

    const userId = identity.subject;
    const existingFav = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) => {
        return q.eq("userId", userId).eq("boardId", board._id);
      })
      .unique();

    if (existingFav) {
      throw Error("Board already favored");
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });
    return board;
  },
});
export const unFavorite = mutation({
  args: { id: v.id("boards") },
  handler: async function (ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error(`Board not found`);
    }

    const userId = identity.subject;
    const existingFav = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) => {
        return q.eq("userId", userId).eq("boardId", board._id);
        // todo check id org id needed
      })
      .unique();

    if (!existingFav) {
      throw Error("Favorited board not found");
    }

    await ctx.db.delete(existingFav._id);
    return board;
  },
});

export const get = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const board = ctx.db.get(args.id);
    return board;
  },
});
