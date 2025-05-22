import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.optional(v.string()),
    subscriptionId: v.optional(v.string()),
    credits: v.number(),
    height: v.optional(v.string()),
    weight: v.optional(v.string()),
    gender: v.optional(v.string()),
    goal: v.optional(v.string()),
    calories: v.optional(v.number()),
    proteins: v.optional(v.number()),
  }),
  Recipes: defineTable({
    recipeName: v.any(),
    jsonData: v.any(),
    imageUrl: v.optional(v.string()),
    uid: v.id("Users"),
  }),
  MealPlan: defineTable({
    recipeId: v.id("Recipes"),
    date: v.string(),
    mealType: v.string(),
    uid: v.id("Users"),
  }),
});
