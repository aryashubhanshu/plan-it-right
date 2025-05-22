import {
  Coffee02FreeIcons,
  Moon02FreeIcons,
  Sun02FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useMutation } from "convex/react";
import { useContext, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-actions-sheet";
import { RefreshDataContext } from "./../context/RefreshDataContext";
import { UserContext } from "./../context/UserContext";
import { api } from "./../convex/_generated/api";
import Colors from "./../shared/Colors";
import DateSelectionCard from "./DateSelectionCard";
import Button from "./shared/Button";

const mealOptions = [
  {
    title: "Breakfast",
    icon: Coffee02FreeIcons,
  },
  {
    title: "Lunch",
    icon: Sun02FreeIcons,
  },
  {
    title: "Dinner",
    icon: Moon02FreeIcons,
  },
];

export default function AddToMealActionSheet({
  recipeDetail,
  hideActionSheet,
}: any) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMeal, setSelectedMeal] = useState<string>("");

  const { setRefreshData } = useContext(RefreshDataContext);
  const { user } = useContext(UserContext);
  const CreateMealPlan = useMutation(api.MealPlan.CreateMealPlan);

  const addToMealPlan = async () => {
    if (!selectedDate || !selectedMeal) {
      Alert.alert("Please select date and meal");
      return;
    }

    await CreateMealPlan({
      date: selectedDate,
      mealType: selectedMeal,
      uid: user?._id,
      recipeId: recipeDetail?._id,
    });

    setRefreshData(Date.now());
    hideActionSheet();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
        Add to Meal
      </Text>

      <DateSelectionCard
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <Text style={{ marginTop: 16, fontSize: 16, fontWeight: "bold" }}>
        Select Meal
      </Text>
      <FlatList
        data={mealOptions}
        numColumns={3}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              padding: 8,
              paddingTop: 12,
              borderWidth: 0.5,
              borderRadius: 12,
              margin: 4,
              gap: 4,
              marginTop: 8,
              borderColor:
                selectedMeal === item.title ? Colors.PRIMARY : Colors.GRAY,
              backgroundColor:
                selectedMeal === item.title ? Colors.SECONDARY : Colors.WHITE,
            }}
            onPress={() => setSelectedMeal(item.title)}
          >
            <HugeiconsIcon icon={item.icon} size={32} />
            <Text style={{}}>{item.title}</Text>
          </Pressable>
        )}
      />
      <View style={{ marginTop: 16 }}>
        <Button title="Add to Meal Plan" onPress={addToMealPlan} />
        <Pressable style={{ marginTop: 16 }} onPress={() => hideActionSheet()}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Cancel
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
