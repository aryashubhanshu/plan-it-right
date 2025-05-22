import { Clock02FreeIcons, Fire02FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "./../shared/Colors";

export default function RecipeCard({ recipe }: any) {
  const recipeJSON = recipe?.jsonData;

  return (
    <Link
      href={`/recipe-detail?recipeId=${recipe?._id}`}
      style={{
        flex: 1,
        borderWidth: 0.5,
        borderColor: Colors.GRAY,
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        padding: 12,
        height: 80,
        marginTop: 8,
      }}
    >
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {recipe?.recipeName}
        </Text>

        <View style={[styles.infoContainer, { gap: 15, marginTop: 8 }]}>
          <View style={styles.infoContainer}>
            <HugeiconsIcon
              icon={Fire02FreeIcons}
              color={Colors.RED}
              size={20}
            />
            <Text style={{ fontSize: 16, color: Colors.GRAY }}>
              {recipeJSON?.calories} kcal
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <HugeiconsIcon
              icon={Clock02FreeIcons}
              color={Colors.RED}
              size={20}
            />
            <Text style={{ fontSize: 16, color: Colors.GRAY }}>
              {recipeJSON?.cookTime} min
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
