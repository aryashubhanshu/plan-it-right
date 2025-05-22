import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const GetTodayMealPlan = query({
  args: {
    uid: v.id("Users"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    // fetch all meal plans
    const mealPlans = await ctx.db
      .query("MealPlan")
      .filter((q) =>
        q.and(q.eq(q.field("uid"), args.uid), q.eq(q.field("date"), args.date))
      )
      .collect();

    // fetch recips belong to meal plan
    const result = await Promise.all(
      mealPlans.map(async (mealPlan) => {
        const recipe = await ctx.db.get(mealPlan.recipeId);
        return {
          mealPlan,
          recipe,
        };
      })
    );

    return result;
  },
});

export const UpdateStatus = mutation({
  args: {
    id: v.id("MealPlan"),
    status: v.boolean(),
    calories: v.number(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.id, {
      status: args.status,
      calories: args.calories,
    });
    return result;
  },
});

export const GetTotalCalories = query({
  args: {
    date: v.string(),
    uid: v.id("Users"),
  },
  handler: async (ctx, args) => {
    const mealPlans = await ctx.db
      .query("MealPlan")
      .filter((q) =>
        q.and(
          q.eq(q.field("uid"), args.uid),
          q.eq(q.field("date"), args.date),
          q.eq(q.field("status"), true)
        )
      )
      .collect();

    const totalCalories = mealPlans?.reduce((sum, meal) => {
      return sum + (meal?.calories ?? 0);
    }, 0);

    return totalCalories;
  },
});
