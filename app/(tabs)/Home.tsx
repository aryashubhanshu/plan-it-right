import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";
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
    <View style={{ padding: 20 }}>
      <HomeHeader />
      <TodayProgress />
      <GenerateReceipeCard />
      <TodayMealPlan />
    </View>
  );
}
