import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length === 0) {
      const data = {
        name: args.name,
        email: args.email,
        credits: 10,
      };
      const result = await ctx.db.insert("Users", {
        ...data,
      });

      return data;
    }
    return user[0];
  },
});

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return user[0];
  },
});

export const UpdateUserPref = mutation({
  args: {
    uid: v.id("Users"),
    height: v.string(),
    weight: v.string(),
    gender: v.string(),
    goal: v.string(),
    calories: v.number(),
    proteins: v.number(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.uid, {
      height: args.height,
      weight: args.weight,
      gender: args.gender,
      goal: args.goal,
      calories: args.calories,
      proteins: args.proteins,
    });
    return result;
  },
});
