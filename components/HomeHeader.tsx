import { UserCircleFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { UserContext } from "./../context/UserContext";
import Colors from "./../shared/Colors";

export default function HomeHeader() {
  const { user } = useContext(UserContext);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <HugeiconsIcon
        icon={UserCircleFreeIcons}
        size={60}
        color={Colors.PRIMARY}
        strokeWidth={1.5}
      />
      <View>
        <Text style={{ fontSize: 20 }}>Hello 👋</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{user?.name}</Text>
      </View>
    </View>
  );
}
