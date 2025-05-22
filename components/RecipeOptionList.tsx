import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { UserContext } from "../context/UserContext";
import { api } from "../convex/_generated/api";
import { generateRecipeWithAI } from "../services/AiModel";
import Colors from "../shared/Colors";
import Prompts from "../shared/Prompts";
import LoadingDialog from "./shared/LoadingDialog";

export default function RecipeOptionList({ options }: any) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user } = useContext(UserContext);

  const CreateRecipe = useMutation(api.Recipes.CreateRecipe);

  const onRecipeOptionSelect = async (recipe: any) => {
    setLoading(true);
    const prompt = `RecipeName: ${recipe?.recipeName}, Description: ${recipe?.description}, ${Prompts.GENERATE_COMPLETE_RECIPE_PROMPT}`;

    try {
      const result = await generateRecipeWithAI(prompt);
      const aiResponse = result.choices[0].message;
      const extractJSON =
        aiResponse?.content?.replace("```json", "").replace("```", "") ?? "";
      const JSONContent = JSON.parse(extractJSON);

      // Generate Recipe Image
      //   const aiImageResponse = await generateRecipeImage(
      //     JSONContent?.imagePrompt
      //   );

      // Save to Database
      const saveRecipeResult = await CreateRecipe({
        recipeName: JSONContent?.recipeName,
        jsonData: JSONContent,
        imageUrl: "",
        uid: user?._id,
      });

      setLoading(false);

      // Redirect to Recipe Details Screen
      router.push({
        pathname: "/recipe-detail",
        params: { recipeId: saveRecipeResult },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Select Recipe</Text>

      <View>
        {options?.map((option: any, index: number) => (
          <Pressable
            key={index}
            onPress={() => onRecipeOptionSelect(option)}
            style={{
              padding: 16,
              borderWidth: 0.2,
              borderRadius: 12,
              marginTop: 16,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {option?.recipeName}
            </Text>
            <Text style={{ color: Colors.GRAY, marginTop: 4 }}>
              {option?.description}
            </Text>
          </Pressable>
        ))}
      </View>

      <LoadingDialog loading={loading} />
    </View>
  );
}
