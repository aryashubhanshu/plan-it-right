import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateRecipe = mutation({
  args: {
    recipeName: v.any(),
    imageUrl: v.string(),
    jsonData: v.any(),
    uid: v.id("Users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("Recipes", {
      recipeName: args.recipeName,
      imageUrl: args.imageUrl,
      jsonData: args.jsonData,
      uid: args.uid,
    });
    return result;
  },
});
