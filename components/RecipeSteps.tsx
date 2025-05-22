import { FlatList, Text, View } from "react-native";
import Colors from "./../shared/Colors";

export default function RecipeSteps({ recipeDetail }: any) {
  const steps = recipeDetail?.jsonData?.steps;

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cooking Steps</Text>

      <FlatList
        data={steps}
        renderItem={({ item, index }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
              marginTop: 8,
              padding: 8,
              flex: 1,
              alignItems: "center",
              borderWidth: 1,
              borderColor: Colors.GRAY,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                backgroundColor: Colors.SECONDARY,
                padding: 12,
                paddingHorizontal: 16,
                borderRadius: 99,
              }}
            >
              {index + 1}
            </Text>
            <Text style={{ fontSize: 16, flex: 1, flexShrink: 1 }}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}
