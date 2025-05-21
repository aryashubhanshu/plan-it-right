import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Pressable, Text, View } from "react-native";
import Colors from "./../shared/Colors";

export default function GenerateReceipeCard() {
  return (
    <View
      style={{
        marginTop: 16,
        padding: 16,
        borderColor: Colors.GRAY,
        backgroundColor: Colors.WHITE,
        borderWidth: 1.2,
        borderRadius: 12,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: Colors.PRIMARY }}>
        Need More Ideas? ✨
      </Text>

      <Text style={{ fontSize: 16, opacity: 0.8, marginTop: 4 }}>
        Let our AI generate personalized receips just for you!
      </Text>

      <Pressable
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          padding: 12,
          marginTop: 8,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 12,
          width: 180,
        }}
      >
        <Text
          style={{ fontSize: 16, color: Colors.WHITE, fontWeight: "medium" }}
        >
          Generate with AI
        </Text>
        <HugeiconsIcon icon={ArrowRight02FreeIcons} color={Colors.WHITE} />
      </Pressable>
    </View>
  );
}
