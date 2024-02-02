import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";
import { Id } from "./_generated/dataModel";
export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.auth.getUserIdentity();

    if (!id) {
      throw new Error("Unauthorized");
    }

    if (args.favorites) {
      const favBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", id.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favBoards.map((b) => b.boardId);
      const boards = await getAllOrThrow(ctx.db, ids as [Id<"boards">]);

      return boards.map((board) => {
        return { ...board, isFav: true };
      });
    }

    const title = args.search as string;
    let boards = [];
    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boardsFaved = boards.map((e) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) => {
          return q.eq("userId", id.subject).eq("boardId", e._id);
        })
        .unique()
        .then((fav) => {
          return {
            ...e,
            isFav: !!fav,
          };
        });
    });

    const boardsWithFavBool = await Promise.all(boardsFaved);
    return boardsWithFavBool;
  },
});
