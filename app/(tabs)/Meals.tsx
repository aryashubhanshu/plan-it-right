import { useQuery } from "convex/react";
import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import GenerateReceipeCard from "./../../components/GenerateReceipeCard";
import RecipeCard from "./../../components/RecipeCard";
import { api } from "./../../convex/_generated/api";

export default function Meals() {
  // @ts-ignore
  const recipesList = useQuery(api.Recipes.GetAllRecipes);

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View style={{ paddingTop: 72, padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Discover Recipes 🥗
          </Text>

          <GenerateReceipeCard />

          <FlatList
            data={recipesList}
            style={{ marginTop: 16 }}
            renderItem={({ item, index }) => <RecipeCard recipe={item} />}
          />
        </View>
      }
    />
  );
}
