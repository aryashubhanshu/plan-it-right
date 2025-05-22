import { FlatList, Text, View } from "react-native";
import Colors from "./../shared/Colors";

export default function RecipeIngredient({ recipeDetail }: any) {
  const ingredients = recipeDetail?.jsonData?.ingredients;
  console.log(ingredients);

  return (
    <View style={{ marginTop: 16 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 8,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ingredients</Text>
        <Text style={{ fontSize: 16 }}>{ingredients?.length} items</Text>
      </View>

      <FlatList
        data={ingredients}
        renderItem={({ item, index }) => (
          <View
            style={{
              marginTop: 8,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  backgroundColor: Colors.SECONDARY,
                  padding: 8,
                  borderRadius: 99,
                }}
              >
                {item?.icon}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {item?.ingredient}
              </Text>
            </View>
            <Text style={{ color: Colors.GRAY, fontSize: 16 }}>
              {item?.quantity}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
