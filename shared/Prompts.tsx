export default {
  CALORIES_PROMPT: `Based on Weight, Height, Gender, Goal give me calories and proteins need daily. Consider age as 25 in JSON format and follow the schema: { calories: <>, proteins: <> }`,
  GENERATE_RECIPE_OPTION_FORMAT: `Depends on user instruction create 3 different Recipe variant with Recipe Name with Emoji, 2 line description, and main ingredient list in JSON format with field recipeName, description, ingredients (without size) only. Don't give text response`,
  GENERATE_COMPLETE_RECIPE_PROMPT: `
    - As per recipeName and description give me recipeName and description as field, give me all list of ingredients,
    - emoji icons for each ingredient as icon, quantity as quantity, along with detail step by step recipe as step,
    - total calories as calories (only number), minutes to cook as cookTime and serving number as serveTo,
    - realistic image Text prompt as per recipe as imagePrompt,
    - Give me category list for reciep from [Breakfast, Lunch, Dinner, Salad, Dessert, Fastfood] as category,
    - Give me response in JSON format only,
    - Schema format should be: 
    {
    "description: "string",
    "recipeName": "string",
    "calories": "number",
    "category": ["string"],
    "cookTime": "number",
    "imagePrompt": "string",
    "ingredients": [
      {
        "icon": "string",
        "ingredient": "string",
        "quantity": "string"
      }
    ],
    "serveTo": "number",
    "steps": ["string"]
    }
  `,
};
