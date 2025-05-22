import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateMealPlan = mutation({
  args: {
    recipeId: v.id("Recipes"),
    date: v.string(),
    mealType: v.string(),
    uid: v.id("Users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("MealPlan", {
      ...args,
    });
    return result;
  },
});
