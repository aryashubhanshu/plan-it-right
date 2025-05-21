import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});

export const calculateCaloriesWithAI = async (PROMPT: string) =>
  await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-lite-001",
    messages: [{ role: "user", content: PROMPT }],
  });
