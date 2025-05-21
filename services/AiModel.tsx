import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});

const aiModel = "google/gemini-2.0-flash-lite-001";

export const calculateCaloriesWithAI = async (PROMPT: string) =>
  await openai.chat.completions.create({
    model: aiModel,
    messages: [{ role: "user", content: PROMPT }],
  });

export const generateRecipeOptionsWithAI = async (PROMPT: string) =>
  await openai.chat.completions.create({
    model: aiModel,
    messages: [{ role: "user", content: PROMPT }],
  });

export const generateRecipeWithAI = async (PROMPT: string) =>
  await openai.chat.completions.create({
    model: aiModel,
    messages: [{ role: "user", content: PROMPT }],
  });

export const generateRecipeImage = async (PROMPT: string) =>
  await axios.post(
    "https://aigurulab.tech/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: PROMPT,
      model: "sdxl", //'flux'
      aspectRatio: "1:1", //Applicable to Flux model only
    },
    {
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_AIGURU_LAB_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
