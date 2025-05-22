import { useRouter } from "expo-router";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { Platform, View } from "react-native";
import { FlatList } from "react-native-actions-sheet";
import GenerateReceipeCard from "./../../components/GenerateReceipeCard";
import HomeHeader from "./../../components/HomeHeader";
import TodayMealPlan from "./../../components/TodayMealPlan";
import TodayProgress from "./../../components/TodayProgress";
import { UserContext } from "./../../context/UserContext";

export default function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (
      !user?.weight &&
      !user?.height &&
      !user?.gender &&
      !user?.goal &&
      !user?.calories &&
      !user?.proteins
    ) {
      router.replace("/preference");
    }
  }, [user, router]);

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View
          style={{ paddingTop: Platform.OS === "ios" ? 72 : 0, padding: 20 }}
        >
          <HomeHeader />
          <TodayProgress />
          <GenerateReceipeCard />
          <TodayMealPlan date={moment().format("DD/MM/YYYY")} />
        </View>
      }
    />
  );
}
