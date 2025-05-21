import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
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
    <View>
      <Text>Home</Text>
    </View>
  );
}
