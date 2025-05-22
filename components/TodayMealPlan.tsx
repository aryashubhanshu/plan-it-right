import { CalendarAdd01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useConvex } from "convex/react";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { RefreshDataContext } from "./../context/RefreshDataContext";
import { UserContext } from "./../context/UserContext";
import { api } from "./../convex/_generated/api";
import Colors from "./../shared/Colors";
import MealPlanCard from "./MealPlanCard";
import Button from "./shared/Button";

export default function TodayMealPlan({ date }: { date: string }) {
  const [mealPlan, setMealPlan] = useState<any>([]);

  const { user } = useContext(UserContext);
  const { refreshData } = useContext(RefreshDataContext);
  const router = useRouter();

  const convex = useConvex();

  const getTodayMealPlan = async () => {
    const result = await convex.query(api.MealPlan.GetTodayMealPlan, {
      date: date ?? moment().format("DD/MM/YYYY"),
      uid: user?._id,
    });
    setMealPlan(result);
  };

  useEffect(() => {
    user && getTodayMealPlan();
  }, [user, refreshData, date]);

  return (
    <View
      style={{
        marginTop: 16,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Meal Plan</Text>

      {!mealPlan ? (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            padding: 20,
            backgroundColor: Colors.WHITE,
            marginTop: 16,
            borderRadius: 12,
          }}
        >
          <HugeiconsIcon
            icon={CalendarAdd01FreeIcons}
            size={40}
            color={Colors.PRIMARY}
          />
          <Text
            style={{
              fontSize: 16,
              color: Colors.GRAY,
              marginTop: 8,
              marginBottom: 16,
            }}
          >
            You don&apos;t have any meal plan for today!
          </Text>

          <Button
            title="Create New Meal Plan"
            onPress={() => router.push("/(tabs)/Meals")}
          />
        </View>
      ) : (
        <View>
          <FlatList
            data={mealPlan}
            renderItem={({ item, index }) => (
              <MealPlanCard mealPlanInfo={item} />
            )}
          />
        </View>
      )}
    </View>
  );
}
