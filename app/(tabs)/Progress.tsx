import React from "react";
import { Platform, Text, View } from "react-native";

export default function Progress() {
  return (
    <View style={{ paddingTop: Platform.OS === "ios" ? 72 : 0, padding: 20 }}>
      <Text>Progress</Text>
    </View>
  );
}
