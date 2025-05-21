import { CalendarAdd01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Colors from "./../shared/Colors";
import Button from "./shared/Button";

export default function TodayMealPlan() {
  const [mealPlan, setMealPlan] = useState();

  return (
    <View
      style={{
        marginTop: 16,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Today&apos;s Meal Plan
      </Text>

      {!mealPlan && (
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

          <Button title="Create New Meal Plan" onPress={() => {}} />
        </View>
      )}
    </View>
  );
}
