import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import DateSelectionCard from "./../../components/DateSelectionCard";
import GenerateReceipeCard from "./../../components/GenerateReceipeCard";
import TodayMealPlan from "./../../components/TodayMealPlan";
import TodayProgress from "./../../components/TodayProgress";

export default function Progress() {
  const [selectedDate, setSelectedDate] = useState<string>("");

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View style={{ paddingTop: 72, padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Your Progress 📈
          </Text>

          <DateSelectionCard
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <TodayMealPlan date={selectedDate} />

          <TodayProgress />
          <GenerateReceipeCard />
        </View>
      }
    />
  );
}
