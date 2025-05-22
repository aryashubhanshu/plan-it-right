import {
  Fire02FreeIcons,
  PlusSignSquareFreeIcons,
  ServingFoodFreeIcons,
  TimeQuarter02FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { StyleSheet, Text, View } from "react-native";
import Colors from "./../shared/Colors";

export default function RecipeIntro({ recipeDetail }: any) {
  const recipeJSON = recipeDetail?.jsonData;

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {recipeDetail?.recipeName}
        </Text>
        <HugeiconsIcon
          icon={PlusSignSquareFreeIcons}
          color={Colors.BLUE}
          size={28}
        />
      </View>
      <Text
        style={{
          color: Colors.GRAY,
          fontSize: 16,
          marginTop: 8,
          lineHeight: 24,
          paddingLeft: 32,
        }}
      >
        {recipeJSON?.description}
      </Text>

      <View
        style={{
          marginTop: 16,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <View>
          <View style={styles.descContainer}>
            <HugeiconsIcon
              icon={Fire02FreeIcons}
              color={Colors.PRIMARY}
              size={28}
            />
            <Text style={styles.subText}>Calories</Text>
            <Text style={styles.count}>{recipeJSON?.calories}</Text>
          </View>
        </View>
        <View style={styles.descContainer}>
          <HugeiconsIcon
            icon={TimeQuarter02FreeIcons}
            color={Colors.PRIMARY}
            size={28}
          />
          <Text style={styles.subText}>Time</Text>
          <Text style={styles.count}>{recipeJSON?.calories}</Text>
        </View>
        <View style={styles.descContainer}>
          <HugeiconsIcon
            icon={ServingFoodFreeIcons}
            color={Colors.PRIMARY}
            size={28}
          />
          <Text style={styles.subText}>Serve</Text>
          <Text style={styles.count}>{recipeJSON?.calories}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  descContainer: {
    display: "flex",
    gap: 2,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: 8,
    borderRadius: 12,
    width: 108,
  },
  subText: {
    fontSize: 16,
  },
  count: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
});
