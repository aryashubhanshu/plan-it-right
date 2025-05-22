import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useRef } from "react";
import { FlatList, Platform, Text, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import AddToMealActionSheet from "./../../components/AddToMealActionSheet";
import RecipeIngredient from "./../../components/RecipeIngredient";
import RecipeIntro from "./../../components/RecipeIntro";
import RecipeSteps from "./../../components/RecipeSteps";
import Button from "./../../components/shared/Button";

export default function RecipeDetail() {
  const { recipeId } = useLocalSearchParams();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const recipeDetail = useQuery(api.Recipes.GetRecipesById, {
    id: recipeId as Id<"Recipes">,
  });

  if (!recipeDetail) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View
          style={{ paddingTop: Platform.OS === "ios" ? 72 : 0, padding: 20 }}
        >
          {/* Recipe Intro */}
          <RecipeIntro recipeDetail={recipeDetail} />
          {/* Recipe Ingredient */}
          <RecipeIngredient recipeDetail={recipeDetail} />
          {/* Cooking Steps */}
          <RecipeSteps recipeDetail={recipeDetail} />

          <View style={{ marginTop: 16 }}>
            <Button
              title={"Add to Meal Plan"}
              onPress={() => actionSheetRef?.current?.show()}
            />
          </View>

          <ActionSheet ref={actionSheetRef}>
            <AddToMealActionSheet
              recipeDetail={recipeDetail}
              hideActionSheet={() => actionSheetRef?.current?.hide()}
            />
          </ActionSheet>
        </View>
      }
    />
  );
}
