import {
  Coffee02FreeIcons,
  Moon02FreeIcons,
  Sun02FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useMutation } from "convex/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-actions-sheet";
import { UserContext } from "./../context/UserContext";
import { api } from "./../convex/_generated/api";
import Colors from "./../shared/Colors";
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
  const [dateList, setDateList] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMeal, setSelectedMeal] = useState<string>("");

  const { user } = useContext(UserContext);
  const CreateMealPlan = useMutation(api.MealPlan.CreateMealPlan);

  const generateDates = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      const nextDate = moment().add(i, "days").format("DD/MM/YYYY");
      result.push(nextDate);
    }

    setDateList(result);
  };

  const addToMealPlan = async () => {
    if (!selectedDate || !selectedMeal) {
      Alert.alert("Please select date and meal");
      return;
    }

    const result = await CreateMealPlan({
      date: selectedDate,
      mealType: selectedMeal,
      uid: user?._id,
      recipeId: recipeDetail?._id,
    });

    hideActionSheet();
  };

  useEffect(() => {
    generateDates();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
        Add to Meal
      </Text>

      <Text style={{ marginTop: 16, fontSize: 16, fontWeight: "bold" }}>
        Select Date
      </Text>
      <FlatList
        data={dateList}
        numColumns={4}
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
              borderColor: selectedDate === item ? Colors.PRIMARY : Colors.GRAY,
              backgroundColor:
                selectedDate === item ? Colors.SECONDARY : Colors.WHITE,
            }}
            onPress={() => setSelectedDate(item)}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {moment(item, "DD/MM/YYYY").format("ddd")}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {moment(item, "DD/MM/YYYY").format("DD")}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {moment(item, "DD/MM/YYYY").format("MMM")}
            </Text>
          </Pressable>
        )}
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
